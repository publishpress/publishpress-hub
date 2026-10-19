/** Package the desktop runtime from Hub's root dependency tree during production builds. */
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import webpack from 'webpack';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const modules = resolve(root, 'node_modules');

/** Resolve packages from each dependency's location, preserving nested version resolutions. */
export function getDesktopPackages() {
    const packages = new Map();
    const collect = (name, parent, optional = false) => {
        const require = createRequire(join(parent, 'package.json'));
        const directory = (require.resolve.paths(name) || [])
            .map((location) => join(location, name))
            .find((location) => existsSync(join(location, 'package.json')));
        if (!directory) {
            if (optional) return;
            throw new Error(`Missing desktop dependency: ${name}. Install Hub's root dependencies first.`);
        }
        const destination = relative(modules, directory);
        if (destination.startsWith('..') || isAbsolute(destination)) {
            throw new Error(`Desktop dependency is outside Hub's root node_modules: ${name}`);
        }
        if (packages.has(directory)) return;
        const manifest = JSON.parse(readFileSync(join(directory, 'package.json'), 'utf8'));
        packages.set(directory, { destination, manifest });
        const dependencies = { ...manifest.dependencies, ...manifest.optionalDependencies, ...manifest.peerDependencies };
        for (const dependency of Object.keys(dependencies)) {
            const optionalDependency = Object.hasOwn(manifest.optionalDependencies || {}, dependency)
                || manifest.peerDependenciesMeta?.[dependency]?.optional === true;
            collect(dependency, directory, optionalDependency);
        }
    };
    collect('@automattic/mcp-wordpress-remote', root);
    return packages;
}

/** Compile the maintained bridge; WordPress creates the installer archive on demand. */
export async function buildMcpDesktop() {
    const output = resolve(root, 'resources/dist/mcp/desktop-bridge');
    const stamp = resolve(root, '.cache/mcp-desktop-build.json');
    const digest = (value) => createHash('sha256').update(value).digest('hex');
    const packages = getDesktopPackages();
    const inputs = [];
    inputs.push(readFileSync(fileURLToPath(import.meta.url)), readFileSync(join(root, 'package.json')),
        readFileSync(join(root, 'yarn.lock')));
    for (const { destination, manifest } of packages.values()) inputs.push(Buffer.from(destination + JSON.stringify(manifest)));
    const sourceHash = digest(Buffer.concat(inputs));
    if (existsSync(stamp)) {
        const previous = JSON.parse(readFileSync(stamp, 'utf8'));
        if (previous.source === sourceHash && previous.files && Object.entries(previous.files).every(([name, hash]) =>
            existsSync(join(output, name)) && hash === digest(readFileSync(join(output, name))))) return;
    }
    const runtime = mkdtempSync(join(tmpdir(), 'publishpress-desktop-'));
    try {
        const bridge = [...packages].find(([, item]) => item.manifest.name === '@automattic/mcp-wordpress-remote')[0];
        const server = join(runtime, 'server');
        mkdirSync(server, { recursive: true });
        await new Promise((success, failure) => {
            webpack({
                mode: 'production', target: 'node22', context: root, devtool: false,
                entry: join(bridge, 'dist/proxy.js'),
                experiments: { outputModule: true },
                output: { path: server, filename: 'bridge.mjs', chunkFormat: 'module', module: true },
                // Keep the upstream native loader and import.meta.url valid at the installed location.
                module: { parser: { javascript: { importMeta: false, createRequire: false } } },
                node: { __dirname: 'node-module', __filename: 'node-module' },
                optimization: { minimize: false },
                plugins: [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })],
            }, (error, stats) => {
                if (error || stats.hasErrors() || stats.hasWarnings()) {
                    failure(error || new Error(stats.toString({ all: false, errors: true, warnings: true })));
                    return;
                }
                success();
            });
        });
        const notices = [];
        for (const [directory, { manifest }] of packages) {
            for (const entry of readdirSync(directory, { withFileTypes: true })) {
                const file = entry.name;
                if (!entry.isFile() || !/^(licen[cs]e|copying|notice)([._-]|$)/i.test(file)) continue;
                notices.push(`${manifest.name}@${manifest.version} - ${file}\n${'='.repeat(72)}\n`
                    + readFileSync(join(directory, file), 'utf8'));
            }
        }
        writeFileSync(join(runtime, 'THIRD-PARTY-LICENSES.txt'), notices.join('\n\n'));
        const files = {};
        for (const entry of readdirSync(runtime, { recursive: true, withFileTypes: true })) {
            if (!entry.isFile()) continue;
            const filename = join(entry.parentPath, entry.name);
            files[relative(runtime, filename).replaceAll('\\', '/')] = digest(readFileSync(filename));
        }
        mkdirSync(dirname(output), { recursive: true });
        // This fixed generated directory stays inside the repository's resources/dist tree.
        if (existsSync(output)) rmSync(output, { recursive: true, force: true });
        cpSync(runtime, output, { recursive: true });
        mkdirSync(dirname(stamp), { recursive: true });
        writeFileSync(stamp, JSON.stringify({ source: sourceHash, files }));
        console.log('Compiled desktop bridge and license files.');
    } finally {
        rmSync(runtime, { recursive: true, force: true });
    }
}
