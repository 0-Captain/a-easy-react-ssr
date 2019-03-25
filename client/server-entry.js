import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import JssProvider from 'react-jss/lib/JssProvider'
import {
  MuiThemeProvider,
} from '@material-ui/core/styles'
import App from './views/App'
import { createStoreMap } from './store/store'

useStaticRendering(true)
const sheetsManager = new Map()

export default (stores, routerContext, url, theme, SheetsRegistry, generateClassName) => (
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
