const asyncBootstrap = require('react-async-bootstrapper')
const ejs = require('ejs')
const ReactDomServer = require('react-dom/server')
const Helmet = require('react-helmet').default
const { createMuiTheme, createGenerateClassName } = require('@material-ui/core/styles')
const { lightBlue, pink, grey, lime } = require('@material-ui/core/colors')
const { SheetsRegistry } = require('jss')

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
  const sheetsRegistry = new SheetsRegistry()
  const theme = createMuiTheme({
    palette: {
      primary: lightBlue,
      secondary: {
        main: pink[300],
        light: pink[100],
        dark: pink[900]
      },
      accent: {
        main: grey[300],
        dark: grey[800],
        light: grey[200]
      },
      error: {
        main: lime[500],
        dark: lime[800],
        light: lime[200]
      }
    },
    typography: {
      useNextVariants: true
    }
  })
  const generateClassName = createGenerateClassName()

  const app = createApp(stores, routerContext, ctx.url, theme, sheetsRegistry, generateClassName)
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
    materialCss: sheetsRegistry.toString(),
    initialState: JSON.stringify(state),
    meta: helmet.meta.toString(),
    title: helmet.title.toString(),
    style: helmet.style.toString(),
    link: helmet.link.toString()
  })
  // console.log(html)
  ctx.body = html
}
