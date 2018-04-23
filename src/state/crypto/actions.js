import types from './types'

const priceHistorySet = priceHistory => ({
  type: types.PRICE_HISTORY_SET,
  priceHistory
})

const priceHistoryStatusSet = priceHistoryStatus => ({
  type: types.PRICE_HISTORY_STATUS_SET,
  priceHistoryStatus
})

export default {
  priceHistorySet,
  priceHistoryStatusSet
}
