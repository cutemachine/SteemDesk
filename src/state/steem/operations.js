import actions from './actions'
import steem from 'steem'
import { formatReputation } from '../../common/utils'

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
  // account
  try {
    const [account] = await steem.api.getAccountsAsync([name])
    if (!account) { throw new Error('Sorry, no account found. Minimum 3 chars, no uppercase.') }
    dispatch(usernameStatusChanged('VALID'))
    dispatch(reputationSet(formatReputation(account.reputation)))
  } catch (error) {
    dispatch(usernameStatusChanged('INVALID'))
    dispatch(errorOccurred(error.message))
  }
  // follow count
  try {
    const followCount = await steem.api.getFollowCountAsync(name)
    if (!followCount) { throw new Error('Sorry, could not get follow count for user.') }
    dispatch(followCountSet(followCount))
  } catch (error) {
    dispatch(errorOccurred(error.message))
  }
  // delegations
  try {
    const delegations = await steem.api.getVestingDelegationsAsync(name, -1, 100)
    if (!delegations) { throw new Error('Sorry, could not get delegations for user.') }
    dispatch(delegationsSet(delegations))
  } catch (error) {
    dispatch(errorOccurred(error.message))
  }
  // dynamic global propeties
  try {
    const dynamicGlobalProperties = await steem.api.getDynamicGlobalPropertiesAsync()
    if (!dynamicGlobalProperties) { throw new Error('Sorry, could not get dynamic global properties.') }
    dispatch(dynamicGlobalPropertiesSet(dynamicGlobalProperties))
  } catch (error) {
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
