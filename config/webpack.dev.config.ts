import * as merge from 'webpack-merge'
import * as webpack from 'webpack'
import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'

import commonConfig from './webpack.common.config'

const config: webpack.Configuration = merge(commonConfig, {
    mode: 'development',
    entry: {
        app: './src/index.tsx'
    },
    output: {
        path: path.join(__dirname, '..', '/dist'),
        filename: 'bundle.min.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
})

export default config
