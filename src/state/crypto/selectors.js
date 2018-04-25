import last from 'lodash.last'

export default {
  selectSteemPrice: state => last(state.crypto.priceHistory.STEEM.inUSD).close,
  selectSBDPrice: state => last(state.crypto.priceHistory.SBD.inUSD).close,
  selectPriceHistory: state => state.crypto.priceHistory,
  selectPriceHistoryStatus: state => state.crypto.priceHistoryStatus
}
