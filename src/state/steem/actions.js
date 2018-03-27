import types from './types'

const usernameStatusChanged = (usernameStatus) => ({
  type: types.USERNAME_STATUS_CHANGED,
  usernameStatus
})

const usernameChanged = (username) => ({
  type: types.USERNAME_CHANGED,
  username
})

const usernameSubmitted = () => ({
  type: types.USERNAME_SUBMITTED
})

const reputationSet = (reputation) => ({
  type: types.REPUTATION_SET,
  reputation
})

const errorOccurred = (errorMessage) => ({
  type: types.ERROR_OCCURRED,
  errorMessage
})

const errorCleared = () => ({
  type: types.ERROR_CLEARED,
  errorMessage: ''
})

export default {
  usernameStatusChanged,
  usernameChanged,
  usernameSubmitted,
  reputationSet,
  errorOccurred,
  errorCleared
}
