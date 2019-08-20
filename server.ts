import * as express from 'express'
import * as webpack from 'webpack'
import * as webpackDevMiddleware from 'webpack-dev-middleware'
import * as opn from 'opn'
import * as history from 'connect-history-api-fallback'
import * as webpackHotMiddleware from 'webpack-hot-middleware'
import * as proxy from 'http-proxy-middleware'
import webpackDevConfig from './config/webpack.dev.config'


const app = express()
const compiler = webpack(webpackDevConfig)
const port = process.env.port || 3001

app.use(
    '/api/v1',
    proxy({ target: 'http://localhost:3000', changeOrigin: false })
)

app.use(history())
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath
}))

app.use(webpackHotMiddleware(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}))

app.listen(3001, () => {
    opn(`http://localhost:${port}`)
    // tslint:disable-next-line:no-console
    console.log(`Example app listening on port ${port}!\n`)
})
