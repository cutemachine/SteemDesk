import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Navigation, {
  AkContainerTitle,
  AkCreateDrawer,
  AkContainerNavigationNested,
  AkNavigationItem
} from '@atlaskit/navigation'
import DashboardIcon from '@atlaskit/icon/glyph/dashboard'
import CreateIcon from '@atlaskit/icon/glyph/add'
import PageIcon from '@atlaskit/icon/glyph/page'
import ArrowleftIcon from '@atlaskit/icon/glyph/arrow-left'
import EmojiNatureIcon from '@atlaskit/icon/glyph/emoji/nature'
import FollowersIcon from '@atlaskit/icon/glyph/followers'
import has from 'lodash.has'
import CreateDrawer from '../components/CreateDrawer'
import SteemDeskLogo from '../images/SteemDesk.png'

export default class NavigationPanel extends Component {
  constructor (props) {
    super(props)

    this.state = {
      stack: [
        [
          {
            title: 'Dashboard',
            url: '/',
            Icon: DashboardIcon
          },
          {
            title: 'Activity',
            url: '/activity',
            Icon: PageIcon
          },
          {
            title: 'Delegations …',
            Icon: FollowersIcon,
            children: [
              {
                title: 'Current',
                url: '/delegation/current',
                Icon: FollowersIcon
              },
              {
                title: 'Delegate SP',
                url: '/delegation/delegate',
                Icon: FollowersIcon
              }
            ]
          },
          {
            title: 'About',
            url: '/about',
            Icon: EmojiNatureIcon
          },
        ]
      ]
    }
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

  stackPush = (item) => {
    const stack = [...this.state.stack, item]
    this.setState({ stack })
  }

  stackPop = () => {
    if (this.state.stack.length > 1) {
      const stack = this.state.stack.slice(0, this.state.stack.length - 1)
      this.setState({ stack })
    }
  }

  renderBackButton () {
    return <AkNavigationItem onClick={this.stackPop} text='Back' key='Back' />
  }

  renderHeader = () => {
    const items = []

    if (this.state.stack.length > 1) {
      items.push(this.renderBackButton())
    }

    return items
  }

  renderItem = (item) => {
    const onClick = item.children && (() => this.stackPush(item.children))
    if (has(item, 'children')) {
      return (
        <AkNavigationItem
          icon={<item.Icon label={item.title} size='medium' />}
          text={item.title}
          onClick={onClick}
          key={item.title}
        />
      )
    } else {
      return (
        <Link key={item.title} to={item.url}>
          <AkNavigationItem
            icon={<item.Icon label={item.title} size='medium' />}
            text={item.title}
            isSelected={this.props.location.pathname === item.url}
          />
        </Link>
      )
    }
  }

  renderStack = () =>
    this.state.stack.map(page => page.map(item => this.renderItem(item)));

  render () {
    const backIcon = <ArrowleftIcon label='Back icon' size='medium' />
    const globalPrimaryIcon = <EmojiNatureIcon label='Atlassian icon' size='xlarge' />

    return (
      <Navigation
        isCollapsible
        // isOpen={this.context.navOpenState.isOpen}
        // width={this.context.navOpenState.width}
        onResize={this.props.onNavResize}
        // containerHeaderComponent={this.renderHeader}
        containerHeaderComponent={() => (
          <div>
            <AkContainerTitle
              href='/'
              icon={
                <img alt='SteemDesk logo' src={SteemDeskLogo} />
              }
              text='SteemDesk'
            />
            { (this.state.stack.length > 1)
              ? <AkNavigationItem
                icon={<ArrowleftIcon label='Back icon' size='medium' />}
                onClick={this.stackPop} text='Back' key='Back'
              />
              : null
            }
          </div>
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
        <AkContainerNavigationNested
          stack={this.renderStack()}
        />
      </Navigation>
    )
  }
}
