const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlCriticalPlugin = require("html-critical-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const config = {
    mode: "production",
    devtool: "source-map",
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist"),
        },
        port: 4200,
    },
    entry: {
        script: path.resolve(__dirname, "src", "scripts.js"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        assetModuleFilename: "assets/[name][ext][query]",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
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
            base: path.resolve(__dirname, "dist"),
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
        chunkIds: "named",
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin({ parallel: true })],
    }
}

module.exports = config;
