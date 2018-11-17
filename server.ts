import * as express from 'express'
import * as webpack from 'webpack'
import * as webpackDevMiddleware from 'webpack-dev-middleware'
import * as opn from 'opn'
import webpackDevConfig from './config/webpack.dev.config'

const app = express()
const compiler = webpack(webpackDevConfig)
const port = process.env.port || 3001

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath
}));


app.listen(3001, function () {
    opn(`http://localhost:${port}`)
    console.log(`Example app listening on port ${port}!\n`);
});
