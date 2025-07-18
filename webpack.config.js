const NODE_ENV = process.env.NODE_ENV || 'development';
const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: NODE_ENV,
    devtool: NODE_ENV === 'development' ? 'source-map' : false,
    entry: {
        "plugins-dashboard": "./src/Presentation/Asset/src/jsx/plugins-dashboard.jsx",
        "i18n": "./src/Presentation/Asset/src/jsx/i18n.jsx",
        "components-showcase": "./src/Presentation/Asset/src/jsx/components-showcase.jsx",
        "admin-page": "./src/Presentation/Asset/src/css/admin-page.css",
    },
    output: {
        path: path.join(__dirname, "src", "Presentation", "Asset", "dist"),
        filename: "js/" + (NODE_ENV === 'production' ? "[name].min.js" : "[name].js")
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
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ],
            }
        ]
    },
    optimization: {
        minimize: NODE_ENV === 'production',
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/" + (NODE_ENV === 'production' ? "[name].min.css" : "[name].css"),
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static',
        //     reportFilename: 'webpack-bundle-stats.html',
        // }),
    ],
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
        '@publishpress-hub/i18n': 'publishpressHub.i18n'
    },
};

