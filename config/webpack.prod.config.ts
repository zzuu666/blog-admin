import * as merge from 'webpack-merge'
import * as webpack from 'webpack'
import commonConfig from './webpack.common.config'

const config: webpack.Configuration = merge(commonConfig, {
    mode: 'production'
})
