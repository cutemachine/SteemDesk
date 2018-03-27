// Action type names should adhere to the following schema:
// app/domain/ACTION_TYPE
// domain is optional, we use it only in applications / components with many action types
// describe a change that has happend and name accordingly
// Think what was the effect?

const USERNAME_STATUS_CHANGED = 'steem/USERNAME_STATUS_CHANGED'
const USERNAME_CHANGED = 'steem/USERNAME_CHANGED'
const USERNAME_SUBMITTED = 'steem/USERNAME_SUBMITTED'
const ERROR_OCCURRED = 'steem/ERROR_OCCURRED'
const ERROR_CLEARED = 'steem/ERROR_CLEARED'

export default {
  USERNAME_STATUS_CHANGED,
  USERNAME_CHANGED,
  USERNAME_SUBMITTED,
  ERROR_OCCURRED,
  ERROR_CLEARED
}