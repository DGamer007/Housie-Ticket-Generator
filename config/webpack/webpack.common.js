const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const config = {
    entry: path.join(__dirname, '../../root/app.jsx'),
    output: {
        path: path.join(__dirname, '../../public/dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env',
                                {
                                    "useBuiltIns": "usage",
                                    "corejs": 3
                                }
                            ], '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }
                ]
            }
        ]
    },
    plugins: [new MiniCssExtractPlugin({ filename: 'styles.css' })]
}

module.exports = config