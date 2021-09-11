const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')

const config = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, '../../public'),
            publicPath: '/'
        },
        historyApiFallback: true
    }
})

module.exports = config