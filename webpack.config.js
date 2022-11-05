const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlCriticalPlugin = require("html-critical-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const DOCS_DIR = path.resolve(__dirname, "docs");

const config = {
    mode: "production",
    // devtool: "source-map",
    devServer: {
        static: {
            directory: DOCS_DIR
        },
        port: 4200,
    },
    entry: {
        script: path.resolve(__dirname, "src", "scripts.js"),
    },
    output: {
        path: DOCS_DIR,
        filename: "[name].[contenthash].js",
        assetModuleFilename: "assets/[name][ext][query]",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
        }),
        new MiniCssExtractPlugin(),
        new HtmlCriticalPlugin({
            base: DOCS_DIR,
            src: "index.html",
            dest: "index.html",
            inline: true,
            minify: true,
            extract: true,
            width: 1200,
            height: 800,
            penthouse: {
                blockJSRequests: false,
            },
        }),
    ],
    optimization: {
        chunkIds: "deterministic",
        minimize: true,
        realContentHash: false,
        removeAvailableModules: true,
        innerGraph: true,
        concatenateModules: true,
        mergeDuplicateChunks: true,
        removeEmptyChunks: true,
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            minChunks: 2,
            chunks: 'all',
            minSize: 1,
        },
        minimizer: [new CssMinimizerPlugin({
            parallel: true,
        }), new TerserPlugin({ parallel: true })],
    }
}

module.exports = config;
