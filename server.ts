import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import opn from 'opn'
import history from 'connect-history-api-fallback'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { createProxyMiddleware } from 'http-proxy-middleware'
import webpackDevConfig from './config/webpack.dev.config'


const app = express()
const compiler = webpack(webpackDevConfig)
const port = process.env.port || 3001

app.use(
    '/api/v1',
    // @ts-ignore
    createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: false })
)

app.use(history())
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler))

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
