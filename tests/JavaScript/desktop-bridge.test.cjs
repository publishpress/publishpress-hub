const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

(async () => {
    const workspace = path.resolve(__dirname, '../..');
    const temporaryRoot = fs.realpathSync(os.tmpdir());
    const temporary = fs.mkdtempSync(path.join(temporaryRoot, 'publishpress-bridge-test-'));
    const runtime = path.join(workspace, 'resources/dist/mcp/desktop-bridge');
    assert.ok(fs.existsSync(path.join(runtime, 'server/bridge.mjs')));
    assert.ok(fs.existsSync(path.join(runtime, 'THIRD-PARTY-LICENSES.txt')));
    assert.equal(fs.existsSync(path.join(runtime, 'licenses')), false);
    assert.equal(fs.readdirSync(runtime, {recursive:true, withFileTypes:true}).filter((entry) => entry.isFile()).length, 2);
    assert.equal(fs.existsSync(path.join(runtime, 'node_modules')), false);
    assert.equal(fs.existsSync(path.join(workspace, 'resources/dist/mcp/desktop-bridge.zip')), false);
    let child;
    let server;
    const pac = process.argv.includes('--pac');
    try {
        fs.cpSync(runtime, temporary, { recursive: true });
        const requests = [];
        server = http.createServer(async (request, response) => {
            if (request.url === '/proxy.pac') {
                requests.push('pac-script');
                response.setHeader('Content-Type', 'application/x-ns-proxy-autoconfig');
                response.end('function FindProxyForURL(url, host) { return "DIRECT"; }');
                return;
            }
            if (request.method === 'GET') { response.writeHead(405).end(); return; }
            if (request.method === 'DELETE') { response.writeHead(200).end(); return; }
            const chunks = [];
            for await (const chunk of request) chunks.push(chunk);
            assert.equal(request.headers.authorization, 'Basic ' + Buffer.from('fixture:fixture-password').toString('base64'));
            const body = Buffer.concat(chunks).toString();
            if (!body) { response.writeHead(202).end(); return; }
            const message = JSON.parse(body);
            requests.push(message.method);
            if (!('id' in message)) { response.writeHead(202).end(); return; }
            response.setHeader('Content-Type', 'application/json');
            response.setHeader('Mcp-Session-Id', 'fixture-session');
            const result = message.method === 'initialize'
                ? { protocolVersion: '2025-11-25', capabilities: { tools: {} }, serverInfo: { name: 'fixture', version: '1' } }
                : { tools: [{ name: 'fixture-read', description: 'Fixture action', inputSchema: { type: 'object' } }] };
            response.end(JSON.stringify({ jsonrpc: '2.0', id: message.id, result }));
        });
        await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
        const args = [path.join(temporary, 'server/bridge.mjs')];
        if (pac) {
            const preload = path.join(temporary, 'mac-proxy-fixture.mjs');
            fs.writeFileSync(preload, `import cp from 'node:child_process'; import {syncBuiltinESMExports} from 'node:module';
                const original = cp.execSync;
                cp.execSync = (command, options) => command === 'scutil --proxy'
                    ? 'ProxyAutoConfigEnable : 1\\nProxyAutoConfigURLString : http://127.0.0.1:${server.address().port}/proxy.pac\\n'
                    : original(command, options);
                Object.defineProperty(process, 'platform', {value:'darwin'}); syncBuiltinESMExports();`);
            args.unshift('--import', pathToFileURL(preload).href);
        }
        child = spawn(process.execPath, args, {
            cwd: temporary,
            env: { ...process.env, WP_API_URL: `http://127.0.0.1:${server.address().port}/wp-json/mcp/publishpress`,
                WP_API_USERNAME: 'fixture', WP_API_PASSWORD: 'fixture-password', OAUTH_ENABLED: 'false',
                HTTP_PROXY: '', HTTPS_PROXY: '', ALL_PROXY: '', SOCKS_PROXY: '', NO_PROXY: '',
                http_proxy: '', https_proxy: '', all_proxy: '', socks_proxy: '', no_proxy: '',
                USE_SYSTEM_PROXY: pac ? 'true' : 'false', LOG_LEVEL: pac ? '3' : '0',
                LOG_TO_STDERR: pac ? 'true' : 'false', LOG_FILE: '' },
            stdio: ['pipe', 'pipe', 'pipe'],
        });
        let output = '';
        let diagnostics = '';
        child.stdout.on('data', (chunk) => { output += chunk; });
        child.stderr.on('data', (chunk) => { diagnostics += chunk; });
        const wait = async (id) => {
            for (let attempt = 0; attempt < 200; attempt++) {
                const messages = output.split('\n').filter(Boolean).map((line) => JSON.parse(line));
                const message = messages.find((item) => item.id === id);
                if (message) return message;
                if (child.exitCode !== null) throw Error('Bundled bridge exited before responding: ' + diagnostics.replaceAll('fixture-password', '[redacted]'));
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
            throw Error('Bundled bridge response timed out');
        };
        child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {
            protocolVersion: '2025-11-25', capabilities: {}, clientInfo: { name: 'bundle-test', version: '1' },
        } }) + '\n');
        const initialized = await wait(1);
        assert.equal(initialized.result.serverInfo.name, 'fixture');
        child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
        child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} }) + '\n');
        const tools = await wait(2);
        assert.equal(tools.result.tools[0].name, 'fixture-read');
        assert.ok(requests.includes('initialize') && requests.includes('tools/list'));
        assert.ok(!output.includes('fixture-password') && !diagnostics.includes('fixture-password'));
        if (pac) {
            assert.ok(requests.includes('pac-script'));
            assert.ok(diagnostics.includes('PAC proxy initialized'), 'The bundled WebAssembly PAC resolver initializes: ' + diagnostics.replaceAll('fixture-password', '[redacted]'));
        }
        console.log('Desktop bundle passed: standalone startup, authenticated forwarding, initialization and tool discovery.');
    } finally {
        if (child) {
            child.kill();
            if (child.exitCode === null) await new Promise((resolve) => child.once('exit', resolve));
        }
        if (server) await new Promise((resolve) => server.close(resolve));
        assert.ok(temporary.startsWith(temporaryRoot + path.sep));
        fs.rmSync(temporary, { recursive: true, force: true });
    }
})().catch((error) => { console.error(error.message); process.exitCode = 1; });
