import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Nav, {
  AkContainerTitle,
  AkCreateDrawer,
  AkNavigationItem
} from '@atlaskit/navigation'
import DashboardIcon from '@atlaskit/icon/glyph/dashboard'
import CreateIcon from '@atlaskit/icon/glyph/add'
import ArrowleftIcon from '@atlaskit/icon/glyph/arrow-left'
import EmojiNatureIcon from '@atlaskit/icon/glyph/emoji/nature'
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled'

import CreateDrawer from '../components/CreateDrawer'
import SteemDeskLogo from '../images/SteemDesk.png'

export default class StarterNavigation extends React.Component {
  state = {
    navLinks: [
      ['/', 'Home', HomeFilledIcon],
      ['/dashboard', 'Dashboard', DashboardIcon],
      ['/delegation', 'Delegation', DashboardIcon]
    ]
  }

  static contextTypes = {
    navOpenState: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    location: PropTypes.object
  }

  openDrawer = (openDrawer) => {
    this.setState({ openDrawer })
  }

  shouldComponentUpdate (nextProps, nextContext) {
    return true
  }

  render () {
    const backIcon = <ArrowleftIcon label='Back icon' size='medium' />
    const globalPrimaryIcon = <EmojiNatureIcon label='Atlassian icon' size='xlarge' />

    return (
      <Nav
        isCollapsible
        isOpen={this.context.navOpenState.isOpen}
        width={this.context.navOpenState.width}
        onResize={this.props.onNavResize}
        containerHeaderComponent={() => (
          <AkContainerTitle
            href='/'
            icon={
              <img alt='SteemDesk logo' src={SteemDeskLogo} />
            }
            text='SteemDesk'
          />
        )}
        globalPrimaryIcon={globalPrimaryIcon}
        globalPrimaryItemHref='/'
        hasBlanket
        drawers={[
          <AkCreateDrawer
            backIcon={backIcon}
            isOpen={this.state.openDrawer === 'create'}
            key='create'
            onBackButton={() => this.openDrawer(null)}
            primaryIcon={globalPrimaryIcon}
          >
            <CreateDrawer
              onItemClicked={() => this.openDrawer(null)}
            />
          </AkCreateDrawer>
        ]}
        globalCreateIcon={<CreateIcon label='Create icon' />}
        onCreateDrawerOpen={() => this.openDrawer('create')}
      >
        {
          this.state.navLinks.map(link => {
            const [url, title, Icon] = link
            return (
              <Link key={url} to={url}>
                <AkNavigationItem
                  icon={<Icon label={title} size='medium' />}
                  text={title}
                  isSelected={this.props.location.pathname === url}
                />
              </Link>
            )
          }, this)
        }
      </Nav>
    )
  }
}
