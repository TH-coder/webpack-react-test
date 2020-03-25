const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const friendlyPlugin = require('Friendly-errors-webpack-plugin');
const glob = require('glob');

const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const path = require('path');

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];

    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));

    entryFiles.forEach(item => {
        const entryFile = item;
        const match = entryFile.match(/src\/(.*)\/index\.js/);
        const pageName = match && match[1];

        entry[pageName] = entryFile;

        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                title: 'react-wb-init',
                template: './public/index.html',
                chunks: [pageName],
                filename: `${pageName}.html`,
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true
                }
            }))
    })

    return {
        entry,
        htmlWebpackPlugins
    }
}

const {
    entry,
    htmlWebpackPlugins
} = setMPA();



module.exports = {
    entry,
    mode: 'none',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
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
            use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', {
                loader: 'postcss-loader',
                options: {
                    plugins: () => [
                        require('autoprefixer')({
                            overrideBrowserslist: ["Android 4.1",
                                "iOS 7.1",
                                "Chrome > 31",
                                "ff > 31",
                                "ie >= 8"
                            ]
                        })
                    ]
                }
            }]
        }, {
            test: /\.(png|svg|jpg|gif|jpeg)$/,
            use: [
                'file-loader',
            ],
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `[name][contenthash:8].css`
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        // new HtmlWebpackExternalsPlugin({
        //     externals: [{
        //         module: 'react',
        //         entry: 'https://lib.baomitu.com/react/16.11.0/umd/react.development.js',
        //         global: 'React'
        //     }, {
        //         module: 'react-dom',
        //         entry: 'https://lib.baomitu.com/react-dom/16.11.0/umd/react-dom.development.js',
        //         global: 'ReactDOM'
        //     }]
        // }),
        new friendlyPlugin()
    ].concat(htmlWebpackPlugins),
    optimization: {
        // splitChunks: {
        //     cacheGroups:{
        //         commons:{
        //             test:/(react|react-dom)/,
        //             name:'vender',
        //             chunks: 'all'
        //         }
        //     }
        // }
    },
    // 日志信息只有错误的时候才会输出
    stats:'errors-only'
};