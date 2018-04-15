import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import forOwn from 'lodash.forown'
import head from 'lodash.head'
import last from 'lodash.last'
import isEmpty from 'lodash.isempty'
import moment from 'moment'

import Page from '@atlaskit/page'
import ErrorIcon from '@atlaskit/icon/glyph/error'
import Banner from '@atlaskit/banner'
import Button from '@atlaskit/button'
import Spinner from '@atlaskit/spinner'

import { steemOperations, steemSelectors } from '../../state/steem'
import ContentWrapper from '../../components/ContentWrapper'
import PageHeaderWithUserInput from '../../components/PageHeaderWithUserInput'
import { unitString2Number } from '../../common/utils'

const Sample = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid;
  padding-bottom: 10px;
  padding-top: 10px;
`

const ButtonBar = ({startDate, endDate, days, handleButtonClick}) => (
  <Sample>
    <span>{ days > 0 && `${startDate} — ${endDate}`}</span>
    <span>{days} days</span>
  </Sample>
)

class CurrentDelegations extends Component {
  static propTypes = {
    errorMessage: PropTypes.string
  }

  roi = (delegation) => {
    const transfers = delegation.transfers
    const daysDelegated = delegation.endDate.diff(delegation.startDate, 'days') + 1
    let earnedSteem = 0
    let earnedSBD = 0
    let apr = 0
    transfers.forEach((transfer) => {
      let splits = transfer[1].op[1].amount.split(' ', 2)
      if (splits[1] === 'SBD') {
        earnedSBD += Number(splits[0])
      }
      if (splits[1] === 'STEEM') {
        earnedSteem += Number(splits[0])
      }
    })
    let delegatedSP = unitString2Number(delegation.steemPower)
    apr = ((earnedSBD + earnedSteem) / daysDelegated) / delegatedSP * 100 * 365
    return {
      earnedSteem: earnedSteem.toFixed(2),
      earnedSBD: earnedSBD.toFixed(2),
      daysDelegated,
      annualPercentageReturn: apr.toFixed(2)
    }
  }

  render () {
    const { accountHistory, delegationHistory } = this.props
    let delegationRows = []
    let accountHistoryDays = 0
    let bottomBar = null

    const Icon = <ErrorIcon label='Error icon' secondaryColor='inherit' />

    if (isEmpty(accountHistory)) {
      bottomBar = <ButtonBar startDate='' endDate='' days={accountHistoryDays} />
    } else {
      const accountHistoryEnd = moment(head(accountHistory)[1].timestamp, moment.ISO_8601)
      const accountHistoryStart = moment(last(accountHistory)[1].timestamp, moment.ISO_8601)
      accountHistoryDays = accountHistoryEnd.diff(accountHistoryStart, 'days') + 1
      bottomBar = <ButtonBar startDate={accountHistoryStart.format('MMMM Do YYYY')} endDate={accountHistoryEnd.format('MMMM Do YYYY')} days={accountHistoryDays} />
    }

    forOwn(delegationHistory, (delegation, key) => {
      const delegationROI = this.roi(delegation)
      const delegatedSP = delegation.steemPower.split(' ', 2)[0]
      delegationRows.push((
        <tr key={key}>
          <td>{delegation.delegatee}</td>
          <td>{delegation.steemPower}</td>
          <td>{delegationROI.earnedSteem}</td>
          <td>{delegationROI.earnedSBD}</td>
          <td>{delegation.hasMoreData ? '—' : delegation.startDate.format('MMMM Do YYYY')}</td>
          <td>{delegation.hasMoreData ? '—' : delegationROI.daysDelegated}</td>
          <td>{delegationROI.annualPercentageReturn}&nbsp;%</td>
          <td>{delegation.hasMoreData
            ? <Button
                spacing='compact'
                iconAfter={
                  this.props.accountHistoryStatus === 'LOADING' && <Spinner
                    size='small'
                  />
                }
                onClick={this.props.accountHistoryLoadMore}
              >
                Load More
              </Button>
            : 'complete'}
          </td>
        </tr>
      ))
    })

    return (
      <ContentWrapper>
        <Page>
          { // Show error banner only when there is an error set
            (this.props.errorMessage !== '')
              ? <Banner icon={Icon} isOpen appearance='error'>{this.props.errorMessage}</Banner>
              : null
          }
          <PageHeaderWithUserInput title='Current Delegations' bottomBar={bottomBar} />
          <table>
            <thead>
              <tr>
                <th>Delegatee</th>
                <th>Delegated SP</th>
                <th>Earnings SP</th>
                <th>Earnings SBD</th>
                <th>Delegation Start</th>
                <th>Days delegated</th>
                <th>APR</th>
                <th>History Data</th>
              </tr>
            </thead>
            <tbody>
              {delegationRows}
            </tbody>
          </table>
        </Page>
      </ContentWrapper>
    )
  }
}

const mapDispatchToProps = {
  buildDelegationHistory: steemOperations.buildDelegationHistory,
  accountHistoryLoadMore: steemOperations.accountHistoryLoadMore
}

const mapStateToProps = (state) => {
  const accountHistory = steemSelectors.selectAccountHistory(state)
  const accountHistoryStatus = steemSelectors.selectAccountHistoryStatus(state)
  const delegationHistory = steemSelectors.selectDelegationHistory(state)
  const errorMessage = steemSelectors.selectErrorMessage(state)

  return { accountHistory, accountHistoryStatus, delegationHistory, errorMessage }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentDelegations)
