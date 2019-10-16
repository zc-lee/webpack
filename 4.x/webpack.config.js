const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const styleLoader = 'style-loader'
// const styleLoader = MiniCssExtractPlugin.loader
module.exports = {
    mode: 'development',
    // spa
    entry: './index.js',
    output: {
        path: __dirname + '/build',
        filename: '[hash].bundle.js'
    },
    // mpa
    // entry: {
    //     index: './index.js',
    //     test: './test.js'
    // },
    // output: {
    //     path: __dirname + '/build',
    //     filename: '[name].bundle.js'
    // }
    module: {
        rules: [
            {
                // 正则表达式匹配扩展名
                test: /\.css$/,
                // 加载器 loader1!loader2!...
                // loader可声明多个 用!隔开 先后顺序从右向左
                use: [
                    { loader: styleLoader },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }, {
                test: /\.less$/,
                use: [
                    { loader: styleLoader },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            }, {
                /**
                 * 图片加载器 url-loader
                 *  默认以base64编码形式打包到输出文件中
                 *  可以使用设置：
                 *  name:[path]/[name].[ext] // 以原来格式和路径输出
                 *  limit: 8192 设置超出8k不打包
                 */
                test: /\.(jpg|jpeg|png|gif|pdf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[path]/[name].[ext]'
                        }
                    }
                ]
                // loader:'url-loader?name=[path]/[name].[ext]&limit=8192' // 未实现 包版本
                // loader:'file-loader?name=[path]/[name].[ext]&limit=8192'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        // new MiniCssExtractPlugin({
        //     filename: "[name].css",
        //     chunkFilename: "[id].css"
        // })
    ],
    devServer:{
        contentBase: 'build/',
        index: 'index.html',
        open: true
    }
}