// Action type names should adhere to the following schema:
// app/domain/ACTION_TYPE
// domain is optional, we use it only in applications / components with many action types
// describe a change that has happend and name accordingly
// Think what was the effect?

const PRICE_HISTORY_SET = 'crypto/PRICE_HISTORY_SET'
const PRICE_HISTORY_STATUS_SET = 'crypto/PRICE_HISTORY_STATUS_SET'

export default {
  PRICE_HISTORY_SET,
  PRICE_HISTORY_STATUS_SET
}
