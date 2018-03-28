import actions from './actions'
import steem from 'steem'
import { formatReputation } from '../../common/utils'
import uiActions from '../ui/actions'

const {
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
    let [accounts, followCount, delegations, dynamicGlobalProperties] = await Promise.all([
      steem.api.getAccountsAsync([name]),
      steem.api.getFollowCountAsync(name),
      steem.api.getVestingDelegationsAsync(name, -1, 100),
      steem.api.getDynamicGlobalPropertiesAsync()
    ])
    if (!accounts[0]) { throw new Error('Sorry, no account found. Minimum 3 chars, no uppercase.') }
    dispatch(usernameStatusChanged('VALID'))
    dispatch(reputationSet(formatReputation(accounts[0].reputation)))
    dispatch(uiActions.addFlag(`Welcome ${name}`, 'SteemDesk loves you!'))

    if (!followCount) { throw new Error('Sorry, could not get follow count for user.') }
    dispatch(followCountSet(followCount))

    if (!delegations) { throw new Error('Sorry, could not get delegations for user.') }
    dispatch(delegationsSet(delegations))

    if (!dynamicGlobalProperties) { throw new Error('Sorry, could not get dynamic global properties.') }
    dispatch(dynamicGlobalPropertiesSet(dynamicGlobalProperties))
  } catch (error) {
    dispatch(usernameStatusChanged('INVALID'))
    dispatch(errorOccurred(error.message))
  }
}

export default {
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
