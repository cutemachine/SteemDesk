import types from './types'

const accountHistorySet = (accountHistory) => ({
  type: types.ACCOUNT_HISTORY_SET,
  accountHistory
})

const accountHistoryStatusSet = (accountHistoryStatus) => ({
  type: types.ACCOUNT_HISTORY_STATUS_SET,
  accountHistoryStatus
})

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

const followCountSet = (followCount) => ({
  type: types.FOLLOW_COUNT_SET,
  followCount
})

const delegationsSet = (delegations) => ({
  type: types.DELEGATIONS_SET,
  delegations
})

const dynamicGlobalPropertiesSet = (dynamicGlobalProperties) => ({
  type: types.DYNAMIC_GLOBAL_PROPERTIES_SET,
  dynamicGlobalProperties
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
  accountHistorySet,
  accountHistoryStatusSet,
  delegationsSet,
  dynamicGlobalPropertiesSet,
  errorCleared,
  errorOccurred,
  followCountSet,
  reputationSet,
  usernameChanged,
  usernameStatusChanged,
  usernameSubmitted
}
