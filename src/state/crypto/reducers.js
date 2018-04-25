import types from './types'

const INITIAL_STATE = {
  priceHistory: {
    STEEM: {
      inBTC: [3.18],
      inUSD: [3.19]
    },
    SBD: {
      inBTC: [1.18],
      inUSD: [1.19]
    }
  },
  // EMPTY, LOADED, LOADING
  priceHistoryStatus: 'EMPTY'
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.PRICE_HISTORY_SET:
      return {
        ...state,
        priceHistory: { ...state.priceHistory,
          [action.priceHistory.symbol]: {
            inUSD: action.priceHistory.priceHistoryInUSD,
            inBTC: action.priceHistory.priceHistoryInBTC
          }
        }
      }

    case types.PRICE_HISTORY_STATUS_SET:
      return { ...state, priceHistoryStatus: action.priceHistoryStatus }

    default:
      return state
  }
}
