// Action type names should adhere to the following schema:
// app/domain/ACTION_TYPE
// domain is optional, we use it only in applications / components with many action types
// describe a change that has happend and name accordingly
// Think what was the effect?

const ACCOUNT_HISTORY_SET = 'steem/ACCOUNT_HISTORY_SET'
const DELEGATIONS_SET = 'steem/DELEGATIONS_SET'
const DYNAMIC_GLOBAL_PROPERTIES_SET = 'steem/DYNAMIC_GLOBAL_PROPERTIES_SET'
const ERROR_CLEARED = 'steem/ERROR_CLEARED'
const ERROR_OCCURRED = 'steem/ERROR_OCCURRED'
const FOLLOW_COUNT_SET = 'steem/FOLLOW_COUNT_SET'
const REPUTATION_SET = 'steem/REPUTATION_SET'
const USERNAME_CHANGED = 'steem/USERNAME_CHANGED'
const USERNAME_STATUS_CHANGED = 'steem/USERNAME_STATUS_CHANGED'
const USERNAME_SUBMITTED = 'steem/USERNAME_SUBMITTED'

export default {
  ACCOUNT_HISTORY_SET,
  DELEGATIONS_SET,
  DYNAMIC_GLOBAL_PROPERTIES_SET,
  ERROR_CLEARED,
  ERROR_OCCURRED,
  FOLLOW_COUNT_SET,
  REPUTATION_SET,
  USERNAME_CHANGED,
  USERNAME_STATUS_CHANGED,
  USERNAME_SUBMITTED
}
