module.exports = {
    entry: './src/js/show.js',
    output: {
        path: __dirname + '/dist',
        filename: 'index.js'
    },
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     loader: 'style-loader!css-loader'
            // }
        ]
    },
    devServer:{
        port:8082
    }
}