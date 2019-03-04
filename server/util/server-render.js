const asyncBootstrap = require('react-async-bootstrapper')
const ejs = require('ejs')
const ReactDomServer = require('react-dom/server')
const Helmet = require('react-helmet').default

const getStroeState = (stores) => (
  Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
)

module.exports = async (bundle, template, ctx) => {
  const { createStoreMap } = bundle
  const createApp = bundle.default
  const routerContext = {}
  const stores = createStoreMap()
  const app = createApp(stores, routerContext, ctx.url)
  await asyncBootstrap(app)
  const content = ReactDomServer.renderToString(app)
  if (routerContext.url) {
    // console.log(routerContext.url)
    // if there is redirect,after ReactDomServer.renderToString() the routerContext will have property that url
    ctx.status = 302
    ctx.redirect(routerContext.url)
    return
  }
  const helmet = Helmet.rewind()
  // ctx.body = template.data.replace('<!-- App -->', content)
  const state = getStroeState(stores)
  const html = ejs.render(template, {
    appString: content,
    initialState: JSON.stringify(state),
    meta: helmet.meta.toString(),
    title: helmet.title.toString(),
    style: helmet.style.toString(),
    link: helmet.link.toString()
  })
  // console.log(html)
  ctx.body = html
}
