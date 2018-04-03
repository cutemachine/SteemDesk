import actions from './actions'
import steem from 'steem'
import { formatReputation } from '../../common/utils'
import uiActions from '../ui/actions'
import { unitString2Number, vests2Steem } from '../../common/utils'

const {
  accountHistorySet,
  usernameStatusChanged,
  usernameChanged,
  reputationSet,
  followCountSet,
  delegationsSet,
  dynamicGlobalPropertiesSet,
  errorOccurred,
  errorCleared
} = actions

// Thunks
const usernameSubmitted = (name) => async (dispatch, getState) => {
  dispatch(usernameStatusChanged('VALIDATING'))
  try {
    let [accounts, accountHistory, followCount, delegations, dynamicGlobalProperties] = await Promise.all([
      steem.api.getAccountsAsync([name]),
      steem.api.getAccountHistoryAsync(name, -1, 5000),
      steem.api.getFollowCountAsync(name),
      steem.api.getVestingDelegationsAsync(name, -1, 100),
      steem.api.getDynamicGlobalPropertiesAsync()
    ])
    if (!accounts[0]) { throw new Error('Sorry, no account found. Minimum 3 chars, no uppercase.') }
    dispatch(usernameChanged(name))
    dispatch(usernameStatusChanged('VALID'))
    dispatch(reputationSet(formatReputation(accounts[0].reputation)))
    dispatch(uiActions.addFlag(`Welcome ${name}`, 'SteemDesk loves you!'))

    if (!accountHistory) { throw new Error('Sorry, no account history found.') }
    accountHistory = accountHistory.reverse()
    dispatch(accountHistorySet(accountHistory))

    if (!followCount) { throw new Error('Sorry, could not get follow count for user.') }
    dispatch(followCountSet(followCount))

    if (!dynamicGlobalProperties) { throw new Error('Sorry, could not get dynamic global properties.') }
    dispatch(dynamicGlobalPropertiesSet(dynamicGlobalProperties))

    if (!delegations) { throw new Error('Sorry, could not get delegations for user.') }
    dispatch(delegationsSet(delegations.map((item) => {
      return {
        delegator: item.delegator,
        delegatee: item.delegatee,
        vesting_shares: item.vesting_shares,
        vesting_shares_sp: `${Number.parseFloat(vests2Steem(item.vesting_shares, dynamicGlobalProperties)).toFixed(0)} SP`,
        min_delegation_time: item.min_delegation_time
      }
    })))
  } catch (error) {
    dispatch(usernameStatusChanged('INVALID'))
    throw new Error('User is invalid.')
  }
}

export default {
  accountHistorySet,
  usernameStatusChanged,
  usernameChanged,
  usernameSubmitted,
  reputationSet,
  followCountSet,
  delegationsSet,
  dynamicGlobalPropertiesSet,
  errorOccurred,
  errorCleared
}
