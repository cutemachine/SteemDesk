import actions from './actions'
import steem from 'steem'

const {
  usernameStatusChanged,
  usernameChanged,
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
    console.log('Account', account)
    // setAccount(account)
  } catch (error) {
    dispatch(usernameStatusChanged('INVALID'))
    dispatch(errorOccurred(error.message))
    console.log(error.message)
    // actions.error.set(error.message)
  }
}

// requestAccount: (name) => async (state, actions) => {
//   try {
//     const [account] = await steem.api.getAccountsAsync([name])
//     if (!account) { throw new Error('Sorry, no account found. Minimum 3 chars, no uppercase.')}
//     console.log('Account', account)
//     actions.setAccount(account)
//     actions.accountStatus('VALID')
//     actions.requestDynamicGlobalProperties()
//     actions.reputation(account.reputation)
//     actions.requestFollowCount()
//     actions.requestAccountHistory(name)
//   } catch (error) {
//     actions.accountStatus('INVALID')
//     actions.error.set(error.message)
//   }
// },

export default {
  usernameStatusChanged,
  usernameChanged,
  usernameSubmitted,
  errorOccurred,
  errorCleared
}
