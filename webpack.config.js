const path = require('path');

const pkg = require('./package.json');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const buildPath = './build/';

module.exports = {
    entry: ['./src/index.ts'],
    output: {
        path: path.join(__dirname, buildPath),
        filename: '[name].[hash].js',
    },
    target: 'web',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader', 'eslint-loader'],
                exclude: path.resolve(__dirname, './node_modules/'),
            },
            {
                test: /\.tsx?$/,
                use: ['awesome-typescript-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg|tga|gltf|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg)$/i,
                use: 'file-loader',
                exclude: path.resolve(__dirname, './node_modules/'),
            },
            {
                test: /\.(vert|frag|glsl|shader|txt)$/i,
                use: 'raw-loader',
                exclude: path.resolve(__dirname, './node_modules/'),
            },
            {
                type: 'javascript/auto',
                test: /\.(json)/,
                exclude: path.resolve(__dirname, './node_modules/'),
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new BundleAnalyzerPlugin({
          openAnalyzer: false
        }),
        new CheckerPlugin(),
        new ProgressBarPlugin(),
        new HtmlWebpackPlugin({
            template: `${__dirname}/src/index.html`,
            filename: 'index.html',
            inject: 'body',
        }),
        new HtmlWebpackPlugin({ title: 'three-seed project' }),
    ],
};
