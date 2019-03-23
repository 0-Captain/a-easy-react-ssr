import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import JssProvider from 'react-jss/lib/JssProvider'
import {
  MuiThemeProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'
import App from './views/App'
import { createStoreMap } from './store/store'

useStaticRendering(true)
const generateClassName = createGenerateClassName()
const sheetsManager = new Map()

export default (stores, routerContext, url, theme, SheetsRegistry) => (
  <Provider {...stores}>
    <StaticRouter location={url} context={routerContext}>
      <JssProvider registry={SheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  </Provider>
)

export { createStoreMap }
