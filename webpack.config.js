const NODE_ENV = process.env.NODE_ENV || 'development';
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const assetsBasePath = "./resources/src";

module.exports = {
    mode: NODE_ENV,
    devtool: NODE_ENV === 'development' ? 'source-map' : false,
    entry: {
        "plugins-dashboard": `${assetsBasePath}/jsx/plugins-dashboard.jsx`,
        "welcome-page": `${assetsBasePath}/jsx/welcome-page.jsx`,
        "settings-page": `${assetsBasePath}/jsx/settings-page.jsx`,
        "i18n": `${assetsBasePath}/jsx/i18n.jsx`,
        "components-showcase": `${assetsBasePath}/jsx/components-showcase.jsx`,
        "mcp-page": `${assetsBasePath}/jsx/mcp-page.jsx`,
        "mcp-page-styles": `${assetsBasePath}/css/mcp-page.css`,
        "admin-page": `${assetsBasePath}/css/admin-page.css`,
        "admin-menu": `${assetsBasePath}/css/admin-menu.css`,
        "welcome-page-styles": `${assetsBasePath}/css/welcome-page.css`,
    },

    output: {
        path: path.join(__dirname, "resources", "dist"),
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
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/" + (NODE_ENV === 'production' ? "[name].min.css" : "[name].css"),
        }),
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
