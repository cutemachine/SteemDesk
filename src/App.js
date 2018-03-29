import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import Flag, { FlagGroup } from '@atlaskit/flag'
import Modal from '@atlaskit/modal-dialog'
import Page from '@atlaskit/page'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import CurrentDelegations from './pages/delegation/CurrentDelegations'
import DelegateSteemPower from './pages/delegation/DelegateSteemPower'
import Navigation from './components/Navigation'
import { selectors } from './state/rootReducer'
import { uiOperations } from './state/ui'
import '@atlaskit/css-reset'

class App extends Component {
  static contextTypes = {
    navOpenState: PropTypes.object,
    children: PropTypes.node
  }

  static propTypes = {
    navOpenState: PropTypes.object,
    location: PropTypes.object,
    onNavResize: PropTypes.func,
    showModal: PropTypes.func,
    isModalOpen: PropTypes.bool,
    flags: PropTypes.array,
    deleteFlag: PropTypes.func
  }

  hideModal = () => {
    this.props.showModal(false)
  }

  onFlagDismissed = (dismissedFlagId) => {
    this.props.deleteFlag(dismissedFlagId)
  }

  render () {
    return (
      <div>
        <Page
          navigationWidth={this.context.navOpenState.width}
          navigation={<Navigation location={this.props.location} />}
        >
          <Route exact path='/' component={Home} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/delegation/current' component={CurrentDelegations} />
          <Route path='/delegation/delegate' component={DelegateSteemPower} />
        </Page>
        <div>
          <FlagGroup onDismissed={this.onFlagDismissed}>
            {
              this.props.flags.map(flag => (
                <Flag
                  id={flag.id}
                  key={flag.id}
                  title={flag.title}
                  description={flag.description}
                />
              ))
            }
          </FlagGroup>
          {
            this.props.isModalOpen && (
              <Modal
                heading='Candy bar'
                actions={[{ text: 'Exit candy bar', onClick: this.hideModal }]}
                onClose={this.hideModal}
              >
                <p style={{ textAlign: 'center' }}>
                  <img src='http://i.giphy.com/yidUztgRB2w2gtDwL6.gif' alt='Moar cupcakes' />
                </p>
              </Modal>
            )
          }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  showModal: uiOperations.showModal,
  deleteFlag: uiOperations.deleteFlag
}

const mapStateToProps = (state) => {
  const isModalOpen = selectors.selectIsModalOpen(state)
  const flags = selectors.selectFlags(state)

  return { isModalOpen, flags }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
