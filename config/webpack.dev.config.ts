import { merge } from 'webpack-merge'
import * as webpack from 'webpack'
import * as path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import commonConfig from './webpack.common.config'

const config: webpack.Configuration = merge(commonConfig, {
    mode: 'development',
    entry: {
        app: ['webpack-hot-middleware/client?path=/__webpack_hmr', './src/index.tsx', 'whatwg-fetch']
    },
    output: {
        path: path.join(__dirname, '..', '/dist'),
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
})

export default config
