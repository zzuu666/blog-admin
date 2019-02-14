import * as webpack from 'webpack'
import * as autoprefixer from 'autoprefixer'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as path from 'path'

const isDevMode = process.env.NODE_ENV !== 'production'

const config: webpack.Configuration = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.[j|t]sx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    {
                        loader: isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader
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
                        loader: isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[local]___[hash:base64:5]',
                            importLoaders: 2,
                            camelCase: true,
                            // getLocalIdent: (context, localIdentName, localName, options) => {
                            //     if (
                            //         path
                            //             .parse(context.resourcePath)
                            //             .dir
                            //             .includes(
                            //                 path.join('components', 'styles')
                            //             )
                            //     ) {
                            //         return localName
                            //     }
                            //     return localIdentName
                            // }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
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
