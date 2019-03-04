const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const session = require('koa-session')
const koaJson = require('koa-json')
const serve = require('koa-static')
const path = require('path')
const serverRender = require('./util/server-render')
const fs = require('fs')
const util = require('util')
fs.readFile = util.promisify(fs.readFile)
const mount = require('koa-mount')
// const views = require('koa-views')
// app.use(views('views', { extension: 'ejs' }))

// config and set session
app.keys = ['my cecret 10144132']
const Config = {
  key: 'sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: false,
  signed: true,
  rolling: false
}
app.use(session(Config, app))

// set response to json
app.use(koaJson())

// deal with error
app.use(async (ctx, next) => {
  try {
    console.log(ctx.method, ctx.url)
    await next()
    return
  } catch (err) {
    console.error(err)
  }
})

router.get('/asd', (ctx) => {
  ctx.body = 'dasdasd'
})
// router.use('/api/user', require('./util/login.js'))
const apiProxy = require('./util/proxy.js')
router.all(/^\/api\//, apiProxy)

//  const ReactSSR = require('react-dom/server')
//  let fs = require('fs')
//  const readFile = util.promisify(fs.readFile)
//  const {"default":serverEntry} = require('../dist/server-entry')
//  const staticServe = require('koa-static')
//  app.use('/public',staticServe(path.join(__dirname,'../dist/')));
//  router.get('',async ctx=>{
//     let template = await readFile(path.join(__dirname,'../dist/index.html'),{"encoding":'utf8'})
//     // ctx.status = 200;
//     // let appString = ReactSSR.renderToNodeStream(serverEntry);
//     // appString.pipe(ctx.res);
//     let appString = ReactSSR.renderToString(serverEntry);
//     template = template.replace('<!-- App -->',appString);
//     ctx.body = template;
// })

// const proxy = require('koa-server-http-proxy')
// app.use(proxy('/public', {
//   target: 'http://localhost:8888',
//   changeOrigin: true
// }))

const isDev = process.env.NODE_ENV === 'development'
const productionFun = async () => {
  const serverEntry = require('../dist/server-entry')
  const template = await fs.readFile(path.join(__dirname, '../dist/server.ejs'), 'utf-8')
  router.get('*', async (ctx) => {
    await serverRender(serverEntry, template, ctx)
  })
}
if (!isDev) {
  app.use(mount('/public', serve('./dist')))
  productionFun()
} else {
  const devStatic = require('./util/dev-static')
  router.use('*', devStatic)
}

app.use(router.routes())

app.listen(8080, () => {
  console.log(`server is running on 127.0.0.1:8080`)
})
