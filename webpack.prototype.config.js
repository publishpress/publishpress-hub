const NODE_ENV = process.env.NODE_ENV || 'development';
const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: NODE_ENV,
    devtool: NODE_ENV === 'development' ? 'source-map' : false,
    entry: {
        "hub": "./tests/Support/Data/Plugins/prototype/assets/src/jsx/hub.jsx",
    },
    output: {
        path: path.join(__dirname, "tests", "Support", "Data", "Plugins", "prototype", "assets", "dist", "js"),
        filename: NODE_ENV === 'production' ? "[name].min.js" : "[name].js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            }
        ]
    },
    optimization: {
        minimize: NODE_ENV === 'production',
    },
    // plugins: [
    //     new BundleAnalyzerPlugin({
    //         analyzerMode: 'static',
    //         reportFilename: 'webpack-bundle-stats.html',
    //     }),
    // ],
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "@wordpress/element": "wp.element",
        "@wordpress/components": "wp.components",
        "@wordpress/data": "wp.data",
        "@wordpress/plugins": "wp.plugins",
        "@wordpress/hooks": "wp.hooks",
        "@wordpress/url": "wp.url",
        "@wordpress/i18n": "wp.i18n",
        'wp': 'wp',
        '@publishpress/hub-i18n': 'publishpressHub.i18n'
    },
};
