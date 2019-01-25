const Koa = require('koa')
const path = require('path')
const util = require('util')

const app = new Koa()
const router = require('koa-router')()

app.use(async (ctx, next) => {
  try {
    await next()
    return
  } catch (err) {
    console.error(err)
  }
})

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

const axios = require('axios')
const webpack = require('webpack')
const MemFs = require('memory-fs')
const ReactDomServer = require('react-dom/server')
const serverConfig = require('../build/webpack.config.server')
const mfs = new MemFs()
mfs.readFile = util.promisify(mfs.readFile)
const serverCompiler = webpack(serverConfig)

serverCompiler.outputFileSystem = mfs
const getTemplate = async () => {
  const data = await axios.get('http://localhost:8888/public/index.html')
  return data
}
let serverBundle
serverCompiler.watch({}, async (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlepath = path.join(serverConfig.output.path, serverConfig.output.filename)
  const bundle = await mfs.readFile(bundlepath, 'utf-8')
  const m = new module.constructor()
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
})
router.get('/dev', async ctx => {
  let template = await getTemplate()
  const content = ReactDomServer.renderToString(serverBundle)
  ctx.body = template.data.replace('<!-- App -->', content)
})

app.use(router.routes())

// app.use(ctx=>ctx.respond = false)
const proxy = require('koa-server-http-proxy')
app.use(proxy('/public', {
  target: 'http://localhost:8888',
  changeOrigin: true
}))

app.listen(8080, () => {
  console.log(`server is running on 127.0.0.1:8080`)
})
