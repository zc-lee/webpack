// const webpack = require('webpack')

module.exports = {
    // spa
    entry: './index.js',
    // entry: 'index.js', // ERROR in Entry module not found: Error: Cannot resolve module 'index.js' in 
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    // mpa
    // loader
    module: {
        loaders: [
            {
                // 正则表达式匹配扩展名
                test: /\.css$/,
                // 加载器 loader1!loader2!...
                // loader可声明多个 用!隔开 先后顺序从右向左
                loader: 'style-loader!css-loader',
                // loader:'style!css',
            }, {
                test: /\.less$/,
                loader: 'style!css!less'
            }, {
                /**
                 * 图片加载器 url-loader
                 *  默认以base64编码形式打包到输出文件中
                 *  可以使用设置：
                 *  name:[path]/[name].[ext] // 以原来格式和路径输出
                 *  limit: 8192 设置超出8k不打包
                 */
                test: /\.(jpg|jpeg|png|gif)$/,
                loader:'url'
                // loader:'url-loader?name=[path]/[name].[ext]&limit=8192' // 未实现 包版本
                // loader:'file-loader?name=[path]/[name].[ext]&limit=8192'
            }
        ]
    }
}