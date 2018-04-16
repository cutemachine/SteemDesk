import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { AkNavigationItemGroup, AkNavigationItem } from '@atlaskit/navigation'
import BitbucketBranchesIcon from '@atlaskit/icon/glyph/bitbucket/branches'
import EmojiNatureIcon from '@atlaskit/icon/glyph/emoji/nature'

const createItems = [
  {
    title: null,
    items: [
      // TODO: Add about page and link to it here
      ['/about', 'About', 'About', EmojiNatureIcon]
    ]
  },
  {
    title: 'About',
    items: [
      ['https://github.com/cutemachine', <span>CuteMachine on <strong>GitHub</strong></span>, 'CuteMachine GitHub', BitbucketBranchesIcon]
    ]
  }
]

export default class CreateDrawer extends Component {
  static propTypes = {
    onItemClicked: PropTypes.func
  }

  render () {
    return (
      <div>
        {
          createItems.map(itemGroup => {
            return (
              <AkNavigationItemGroup key={itemGroup.title} title={itemGroup.title}>
                {
                  itemGroup.items.map(item => {
                    const [url, text, label, Icon] = item
                    return (
                      <AkNavigationItem
                        key={url}
                        href={url}
                        icon={<Icon label={label} />}
                        text={text.valueOf()}
                        onClick={this.props.onItemClicked}
                      />
                    )
                  })
                }
              </AkNavigationItemGroup>
            )
          })
        }
      </div>
    )
  }
}
