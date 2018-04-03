import React, { Component } from 'react'
import { connect } from 'react-redux'
import { steemSelectors } from '../state/steem'
import Page from '@atlaskit/page'
import Banner from '@atlaskit/banner'
import ErrorIcon from '@atlaskit/icon/glyph/error'
import ContentWrapper from '../components/ContentWrapper'
import PageHeaderWithUserInput from '../components/PageHeaderWithUserInput'

class Activity extends Component {
  render () {
    console.log(this.props.accountHistory)
    const Icon = <ErrorIcon label='Error icon' secondaryColor='inherit' />

    return (
      <ContentWrapper>
        <Page>
          { // Show error banner only when there is an error set
            (this.props.errorMessage !== '')
              ? <Banner icon={Icon} isOpen appearance='error'>{this.props.errorMessage}</Banner>
              : null
          }
          <PageHeaderWithUserInput title='Activity' />
        </Page>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const accountHistory = steemSelectors.selectAccountHistory(state)
  const errorMessage = steemSelectors.selectErrorMessage(state)

  return { accountHistory, errorMessage }
}

export default connect(mapStateToProps)(Activity)
