import forOwn from 'lodash.forown'
import pull from 'lodash.pull'
import head from 'lodash.head'
import last from 'lodash.last'
import isEmpty from 'lodash.isempty'
import moment from 'moment'

const buildDelegationHistory = (state) => {
  const accountHistory = state.accountHistory
  const currentDelegations = state.delegations
  const delegationHistory = {}

  if (isEmpty(accountHistory)) return delegationHistory

  const delegationKeys = Object.keys(currentDelegations)

  const accountHistoryEnd = moment(head(accountHistory)[1].timestamp, moment.ISO_8601)
  const accountHistoryStart = moment(last(accountHistory)[1].timestamp, moment.ISO_8601)

  forOwn(currentDelegations, (delegation) => {
    const { delegator, delegatee, vesting_shares, vesting_shares_sp } = delegation
    delegationHistory[`${delegator}_${delegatee}`] = {
      delegator,
      delegatee,
      vestingShares: vesting_shares,
      steemPower: vesting_shares_sp,
      hasMoreData: true,
      // startDate might be overwritten when we encounter a txType of delegate_vesting_shares
      startDate: accountHistoryStart,
      endDate: accountHistoryEnd,
      transfers: []
    }
  })

  accountHistory.forEach((tx) => {
    const txType = tx[1].op[0]
    const txData = tx[1].op[1]
    if (txType === 'transfer') {
      // tx is of type TRANSFER
      const delegationKey = `${txData.to}_${txData.from}`
      if (delegationKeys.includes(delegationKey)) {
        delegationHistory[delegationKey].transfers.push(tx)
      }
    } else {
      // tx is of type DELEGATE_VESTING_SHARES
      const delegationKey = `${txData.delegator}_${txData.delegatee}`
      // Only process current delegations, ignore the rest
      if (delegationKeys.includes(delegationKey)) {
        // We found when the delegation started, so we overwrite the startDate initialized from accountHistory.
        // This also means we have all data collected for the current delegation.
        delegationHistory[delegationKey].startDate = moment(tx[1].timestamp, moment.ISO_8601)
        // Read all transactions for this delegation, no more data available.
        delegationHistory[delegationKey].hasMoreData = false
        // remove delegation key, because we already collected all transactions from the blockchain
        pull(delegationKeys, delegationKey)
      }
    }
  })

  return delegationHistory
}

export default {
  selectAccountHistory: state => state.steem.accountHistory,
  selectAccountHistoryStatus: state => state.steem.accountHistoryStatus,
  selectDelegations: state => state.steem.delegations,
  selectDelegationHistory: state => buildDelegationHistory(state.steem),
  selectErrorMessage: state => state.steem.errorMessage,
  selectFollowCount: state => state.steem.followCount,
  selectReputation: state => state.steem.reputation,
  selectUsername: state => state.steem.username,
  selectUsernameStatus: state => state.steem.usernameStatus
}
