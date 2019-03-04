const path = require('path')
const util = require('util')
const router = require('koa-router')()
const axios = require('axios')
const webpack = require('webpack')
const MemFs = require('memory-fs')
const serverConfig = require('../../build/webpack.config.server')
const mfs = new MemFs()
mfs.readFile = util.promisify(mfs.readFile)

const serverRender = require('./server-render')

const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs

const NativeModule = require('module')
const vm = require('vm')

const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true
  })
  const result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}

let serverBundle
/* serverCompiler.watch is watching serverCompiler's changes.when it changes,serverBundle will change */
serverCompiler.watch({}, async (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlepath = path.join(serverConfig.output.path, serverConfig.output.filename)
  const bundle = await mfs.readFile(bundlepath, 'utf-8')
  /* this bundle's type is string,not javascript code.So wo through module.constructor() let the string change to javascript code */
  // const m = new module.constructor()
  // m._compile(bundle, 'server-entry.js')
  const m = getModuleFromString(bundle, 'server-entry.js')
  serverBundle = m.exports
})

const getTemplate = async () => {
  const data = await axios.get('http://localhost:8888/public/server.ejs')
  return data.data
}

router.get('*', async ctx => {
  let template = await getTemplate()
  await serverRender(serverBundle, template, ctx)
})

module.exports = router.routes()
