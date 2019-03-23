import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'mobx-react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {
  lightBlue, pink, grey, lime,
} from '@material-ui/core/colors'
import App from './views/App.jsx' // eslint-disable-line
// import AppState from './store/app-state'
import TopicStore from './store/topic-store'

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: {
      main: pink[300],
      light: pink[100],
      dark: pink[900],
    },
    accent: {
      main: grey[300],
      dark: grey[800],
      light: grey[200],
    },
    error: {
      main: lime[500],
      dark: lime[800],
      light: lime[200],
    },
  },
  typography: {
    useNextVariants: true,
  },
})

const deleteMaterialServerCss = (TheApp) => {
  class Main extends React.Component {
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side')
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles)
      }
    }

    render() {
      return <TheApp />
    }
  }
  return Main
}

const initialState = window.__INITIAL__STATE__ || {} // eslint-disable-line

// const appState = new AppState(initialState.appState)
const topicStore = new TopicStore(initialState.topicStore)

const root = document.getElementById('root')
const render = (Component) => {
  const renderMethon = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethon(
    <AppContainer>
      <Provider topicStore={topicStore}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Component />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}

render(deleteMaterialServerCss(App))

if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const nextApp = require('./views/App.jsx').default // eslint-disable-line
    render(deleteMaterialServerCss(nextApp))
  })
}
