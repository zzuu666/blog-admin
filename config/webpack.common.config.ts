import * as webpack from 'webpack'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'

const isDevMode = process.env.NODE_ENV !== 'production'

const config: webpack.Configuration = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false
                }
            },
            {
                test: /\.[j|t]sx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    {
                        loader: isDevMode
                            ? 'style-loader'
                            : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: isDevMode
                            ? 'style-loader'
                            : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                auto: () => true,
                                exportLocalsConvention: 'camelCase'
                            }
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }
        ]
    }
}

export default config
