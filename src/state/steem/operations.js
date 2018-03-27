import actions from './actions'
import steem from 'steem'
import { formatReputation } from '../../common/utils'

const {
  usernameStatusChanged,
  usernameChanged,
  reputationSet,
  errorOccurred,
  errorCleared
} = actions

// Thunks
const usernameSubmitted = (name) => async (dispatch) => {
  dispatch(usernameStatusChanged('VALIDATING'))
  try {
    const [account] = await steem.api.getAccountsAsync([name])
    if (!account) { throw new Error('Sorry, no account found. Minimum 3 chars, no uppercase.') }
    dispatch(usernameStatusChanged('VALID'))
    dispatch(reputationSet(formatReputation(account.reputation)))
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
  errorOccurred,
  errorCleared
}
