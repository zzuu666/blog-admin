import { merge } from 'webpack-merge'
import * as webpack from 'webpack'
import * as path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import commonConfig from './webpack.common.config'

const config: webpack.Configuration = merge(commonConfig, {
    mode: 'production',
    entry: {
        app: ['./src/index.tsx', 'whatwg-fetch']
    },
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: 'https://cdn.zzuu666.com/markii/'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: false
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CleanWebpackPlugin() as any,
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[name].[chunkhash].css'
        })
    ]
})

export default config
