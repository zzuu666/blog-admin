import * as webpack from 'webpack'

const config: webpack.Configuration = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.[j|t]sx?$/,
                loader: 'babel-loader'
            }
        ]
    }
}

export default config
