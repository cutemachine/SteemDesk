import React, { Component } from 'react'
import { connect } from 'react-redux'
import Page from '@atlaskit/page'
import Button from '@atlaskit/button'
import Banner from '@atlaskit/banner'
import ErrorIcon from '@atlaskit/icon/glyph/error'
import Spinner from '@atlaskit/spinner'
import { CheckboxStateless } from '@atlaskit/checkbox'
import ContentWrapper from '../components/ContentWrapper'
import PageHeaderWithUserInput from '../components/PageHeaderWithUserInput'
import { steemOperations, steemSelectors } from '../state/steem'
import startCase from 'lodash.startcase'
import styled from 'styled-components'
import { TRANSACTION_TYPES, TRANSACTION_TYPES_BASIC, TRANSACTION_TYPES_ADVANCED } from '../common/constants'

const Table = styled.table`
  margin: 2em 0;
`

class Activity extends Component {
  state = {
    filter: {
      author_reward: true,
      curation_reward: true,
      vote: true,
      transfer: true,
      comment: true,
      account_witness_vote: false,
      claim_reward_balance: false,
      custom_json: false,
      comment_options: false,
      transfer_to_vesting: false,
      delegate_vesting_shares: false,
      comment_benefactor_reward: false,
      account_create_with_delegation: false,
      fill_order: false,
      limit_order_cancel: false,
      limit_order_create: false,
      return_vesting_delegation: false,
      producer_reward: false,
      feed_publish: false,
      account_update: false,
      account_witness_proxy: false,
      delete_comment: false
    },
    checkAllCheckmarks: true,
    showAllCheckmarks: false
  }

  setCheckmarks = (typeLabels, check) => {
    let newFilterState = { ...this.state.filter }
    typeLabels.forEach((typeLabel) => {
      newFilterState[typeLabel] = check
    })
    this.setState({filter: newFilterState})
  }

  handleLoadMore = () => {
    this.props.accountHistoryLoadMore()
  }

  handleFilterChange = (event) => {
    this.setState({filter: {...this.state.filter, [event.target.value]: !this.state.filter[event.target.value]}})
  }

  handleCheckAllCheckmarks = () => {
    if (this.state.showAllCheckmarks) {
      if (this.state.checkAllCheckmarks) {
        // uncheck all
        this.setCheckmarks(TRANSACTION_TYPES, false)
      } else {
        // check all
        this.setCheckmarks(TRANSACTION_TYPES, true)
      }
    } else {
      if (this.state.checkAllCheckmarks) {
        // uncheck regular only
        this.setCheckmarks(TRANSACTION_TYPES_BASIC, false)
      } else {
        // check regular only
        this.setCheckmarks(TRANSACTION_TYPES_BASIC, true)
      }
    }
    this.setState({checkAllCheckmarks: !this.state.checkAllCheckmarks})
  }

  handleShowAllCheckmarks = () => {
    if (this.state.showAllCheckmarks) {
      this.setCheckmarks(TRANSACTION_TYPES_ADVANCED, false)
    }
    this.setState({showAllCheckmarks: !this.state.showAllCheckmarks})
  }

  renderFilter () {
    return (
      <div>
        <Button
          spacing='compact'
          size='small'
          appearance='subtle'
          onClick={this.handleCheckAllCheckmarks}
        >
          { this.state.checkAllCheckmarks ? 'Uncheck All' : 'Check All' }
        </Button>
        <Button
          spacing='compact'
          size='small'
          appearance='subtle'
          onClick={this.handleShowAllCheckmarks}
        >
          { this.state.showAllCheckmarks ? 'Show Subset' : 'Show All' }
        </Button>
        <hr />
        <div>
          {
            [...TRANSACTION_TYPES_BASIC].map((label) => {
              return (
                <CheckboxStateless
                  key={label}
                  isChecked={this.state.filter[label]}
                  value={label}
                  label={startCase(label)}
                  onChange={this.handleFilterChange}
                  name={label}
                />
              )
            })
          }
          {
            this.state.showAllCheckmarks && [...TRANSACTION_TYPES_ADVANCED].map((label) => {
              return (
                <CheckboxStateless
                  key={label}
                  isChecked={this.state.filter[label]}
                  value={label}
                  label={startCase(label)}
                  onChange={this.handleFilterChange}
                  name={label}
                />
              )
            })
          }
        </div>
      </div>
    )
  }

  render () {
    const Icon = <ErrorIcon label='Error icon' secondaryColor='inherit' />

    let tableItems = this.props.accountHistory.map((item, index) => {
      const sequenceID = item[0]
      const type = item[1].op[0]
      const content = JSON.stringify(item[1].op[1])
      const timestamp = item[1].timestamp
      if (this.state.filter[type]) {
        return (
          <tr key={sequenceID}>
            <td>{sequenceID}</td>
            <td>{type}</td>
            <td>{content}</td>
            <td>{timestamp}</td>
          </tr>
        )
      } else {
        // console.log('Ignored type:', type)
      }
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
          { this.renderFilter() }
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Content</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {tableItems}
            </tbody>
          </Table>
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
          { this.props.accountHistoryStatus === 'LOADED_COMPLETELY' && <span>&nbsp;&nbsp;All data loaded.</span> }
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
