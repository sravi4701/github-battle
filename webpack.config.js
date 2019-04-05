const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app/index.js', // entry point of application
    output: { // where to bundle the files
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js' // final filename inside dist folder
    },
    module: {
        rules: [ // how to bundle the files, i.e. rules
            {test: /\.(js)$/, use: 'babel-loader'}, // run each js with babel loader
            {test: /\.css$/, use: ['style-loader', 'css-loader']} // run each css with style-loader and css loader
        ]
    },
    mode: 'development', //which mode webpack should bundle
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ]
}