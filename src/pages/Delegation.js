import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ContentWrapper from '../components/ContentWrapper'
import UsernameInput from '../components/UsernameInput'
import Page, { Grid, GridColumn } from '@atlaskit/page'
import PageHeader from '@atlaskit/page-header'
import ErrorIcon from '@atlaskit/icon/glyph/error'
import Banner from '@atlaskit/banner'
import { steemSelectors } from '../state/steem'
import { unitString2Number, vests2Steem } from '../common/utils'

class Delegation extends Component {
  static propTypes = {
    errorMessage: PropTypes.string
  }

  render () {
    const Icon = <ErrorIcon label='Error icon' secondaryColor='inherit' />

    let tableItems = this.props.delegations.map((item, index) => {
      return (
        <tr>
          <td>{item.delegator}</td>
          <td>{item.delegatee}</td>
          <td>{unitString2Number(item.vesting_shares)} VESTS</td>
          {/* <td>{vests2Steem(item.vesting_shares, state.user.dynamicGlobalProperties)} SP</td> */}
          <td>ToDo</td>
          <td>{item.min_delegation_time}</td>
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
          <PageHeader
            breadcrumbs={null}
            actions={null}
            bottomBar={null}
          >
            Current Delegations
          </PageHeader>
          <table>
            <thead>
              <tr>
                <th>Delegator</th>
                <th>Delegatee</th>
                <th>Vesting Shares</th>
                <th>Steem Power</th>
                <th>Min Delegation Time</th>
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

const mapStateToProps = (state) => {
  const delegations = steemSelectors.selectDelegations(state)
  const errorMessage = steemSelectors.selectErrorMessage(state)

  return { delegations, errorMessage }
}

export default connect(mapStateToProps)(Delegation)
