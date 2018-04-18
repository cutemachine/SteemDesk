import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Route } from 'react-router'
import App from './App'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import configureStore from './state/store'
import { ThemeProvider } from 'styled-components'
import createHistory from 'history/createBrowserHistory'
import theme from './theme'

const history = createHistory()

const initialState = {}
const store = configureStore(initialState, history)

export default class MainRouter extends Component {
  constructor () {
    super()
    this.state = {
      navOpenState: {
        isOpen: true,
        width: 304
      }
    }
  }

  getChildContext () {
    return {
      navOpenState: this.state.navOpenState
    }
  }

  appWithPersistentNav = () => (props) => (
    <App
      onNavResize={this.onNavResize}
      {...props}
    />
  )

  onNavResize = (navOpenState) => {
    this.setState({
      navOpenState
    })
  }

  render () {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Route component={this.appWithPersistentNav()} />
          </ConnectedRouter>
        </Provider>
      </ThemeProvider>
    )
  }
}

MainRouter.childContextTypes = {
  navOpenState: PropTypes.object
}
