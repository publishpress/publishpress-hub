const NODE_ENV = process.env.NODE_ENV || 'development';
const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: NODE_ENV,
    devtool: NODE_ENV === 'development' ? 'source-map' : false,
    entry: {
        "plugins-dashboard": "./assets/jsx/plugins-dashboard.jsx",
        "i18n": "./assets/jsx/i18n.jsx",
    },
    output: {
        path: path.join(__dirname, "assets", "dist", "js"),
        filename: NODE_ENV === 'production' ? "[name].min.js" : "[name].js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(jsx)$/, // Identifies which file or files should be transformed.
                use: {loader: "babel-loader"}, //
                exclude: [
                    /(node_modules|bower_components)/,
                ]// JavaScript files to be ignored.
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
        "@wordpress/api-fetch": "wp.apiFetch",
        "@wordpress/data-controls": "wp.dataControls",
        'wp': 'wp',
        '@publishpress/hub-i18n': 'publishpressHub.i18n'
    },
};

