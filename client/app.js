import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'mobx-react'
import App from './views/App.jsx' // eslint-disable-line
import appState from './store/app-state'

// ReactDOM.hydrate(<App />,document.getElementById('root'))

const root = document.getElementById('root')
const render = (Component) => {
  const renderMethon = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethon(
    <AppContainer>
      <Provider appState={appState}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const nextApp = require('./views/App.jsx').default // eslint-disable-line
    render(nextApp)
  })
}
