import React, { Component } from 'react'
import { connect } from 'react-redux'
import Page from '@atlaskit/page'
import Button from '@atlaskit/button'
import Banner from '@atlaskit/banner'
import ErrorIcon from '@atlaskit/icon/glyph/error'
import Spinner from '@atlaskit/spinner'
import ContentWrapper from '../components/ContentWrapper'
import PageHeaderWithUserInput from '../components/PageHeaderWithUserInput'
import { steemOperations, steemSelectors } from '../state/steem'

class Activity extends Component {
  handleLoadMore = () => {
    this.props.accountHistoryLoadMore()
  }

  render () {
    const Icon = <ErrorIcon label='Error icon' secondaryColor='inherit' />

    let tableItems = this.props.accountHistory.map((item, index) => {
      const sequenceID = item[0]
      const type = item[1].op[0]
      return (
        <tr key={sequenceID}>
          <td>{sequenceID}</td>
          <td>{type}</td>
        </tr>
      )
    })

    return (
      <ContentWrapper>
        <Page>
          { // Show error banner only when there is an error set
            (this.props.errorMessage !== '')
              ? <Banner icon={Icon} isOpen appearance='error'>{this.props.errorMessage}</Banner>
              : null
          }
          <PageHeaderWithUserInput title='Activity' />
          <Button
            isDisabled={this.props.usernameStatus !== 'VALID' || this.props.accountHistoryStatus === 'LOADED_COMPLETELY'}
            appearance='primary'
            iconAfter={
              this.props.accountHistoryStatus === 'LOADING' && <Spinner
                size='small'
                invertColor
              />
            }
            onClick={this.handleLoadMore}
          >
            Load more
          </Button>
          <table>
            <thead>
              <tr>
                <th>Sequence ID</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {tableItems}
            </tbody>
          </table>
        </Page>
      </ContentWrapper>
    )
  }
}

const mapDispatchToProps = {
  accountHistoryLoadMore: steemOperations.accountHistoryLoadMore
}

const mapStateToProps = (state) => {
  const accountHistory = steemSelectors.selectAccountHistory(state)
  const accountHistoryStatus = steemSelectors.selectAccountHistoryStatus(state)
  const usernameStatus = steemSelectors.selectUsernameStatus(state)
  const errorMessage = steemSelectors.selectErrorMessage(state)

  return { accountHistory, accountHistoryStatus, usernameStatus, errorMessage }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
