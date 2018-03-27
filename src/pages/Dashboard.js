import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ContentWrapper from '../components/ContentWrapper'
import UsernameInput from '../components/UsernameInput'
import Page from '@atlaskit/page'
import PageHeader from '@atlaskit/page-header'
import ErrorIcon from '@atlaskit/icon/glyph/error'
import Banner from '@atlaskit/banner'
import { steemSelectors } from '../state/steem'

const actionsContent = (
  <UsernameInput />
)

class Dashboard extends Component {
  static propTypes = {
    errorMessage: PropTypes.string
  }

  render () {
    const Icon = <ErrorIcon label='Error icon' secondaryColor='inherit' />

    return (
      <ContentWrapper>
        <Page>
          { // Show error banner only when there is an error set
            (this.props.errorMessage !== '')
              ? <Banner icon={Icon} isOpen appearance='error'>{this.props.errorMessage}</Banner>
              : null
          }
          <PageHeader
            breadcrumbs={null}
            actions={actionsContent}
            bottomBar={null}
          >
            Dashboard
          </PageHeader>
        </Page>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const errorMessage = steemSelectors.selectErrorMessage(state)

  return { errorMessage }
}

export default connect(mapStateToProps)(Dashboard)
