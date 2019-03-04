const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()
const mount = require('koa-mount')

// $ GET /package.json
app.use(serve('.'))
app.use(mount('/public', serve('./dist')))

app.listen(3000)

console.log('listening on port 3000')
