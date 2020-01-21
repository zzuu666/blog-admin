import * as merge from 'webpack-merge'
import * as webpack from 'webpack'
import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as CleanWebpackPlugin from 'clean-webpack-plugin'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import commonConfig from './webpack.common.config'

const config: webpack.Configuration = merge(commonConfig, {
    mode: 'production',
    entry: {
        app: ['./src/index.tsx', 'whatwg-fetch']
    },
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: 'https://cdn.zzuu666.com/markii/'
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CleanWebpackPlugin([path.resolve(__dirname, '..', 'dist')], { root: path.resolve(__dirname, '..') }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[name].[chunkhash].css'
        })
    ]
})

export default config
