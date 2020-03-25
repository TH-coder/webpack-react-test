const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const friendlyPlugin = require('Friendly-errors-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/Index/index.js',
    mode: 'development',
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: './dist',
        stats: 'errors-only'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
        }, {
            test: /\.(png|svg|jpg|gif|jpeg)$/,
            use: [
                'file-loader',
            ],
        }]
    },
    plugins: [new HtmlWebpackPlugin({
            title: 'react-wb-init',
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: `[name][contenthash:8].css`
        }),
        new friendlyPlugin()
    ],
    devtool: 'inline-source-map'
};