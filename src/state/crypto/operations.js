import actions from './actions'

const {
  priceHistorySet,
  priceHistoryStatusSet
} = actions

// Thunks
const priceHistoryRequested = (symbol = 'STEEM') => async (dispatch, getState) => {
  dispatch(priceHistoryStatusSet('LOADING'))
  try {
    // async request of prices here
    let [priceHistoryInUSD, priceHistoryInBTC] = await Promise.all([
      window.fetch(
        `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=14`
      ).then(res => res.json()),
      window.fetch(
        `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=BTC&limit=14`
      ).then(res => res.json())
    ])

    if (priceHistoryInUSD.Data.length === 0) { throw new Error(`Sorry, problem retrieving price history in USD for symbol ${symbol}.`) }
    if (priceHistoryInBTC.Data.length === 0) { throw new Error(`Sorry, problem retrieving price history in BTC for symbol ${symbol}.`) }

    dispatch(priceHistorySet({
      symbol,
      priceHistoryInUSD: priceHistoryInUSD.Data,
      priceHistoryInBTC: priceHistoryInBTC.Data
    }))
    dispatch(priceHistoryStatusSet('LOADED'))
  } catch (error) {
    console.log(error.message)
  }
}

export default {
  priceHistorySet,
  priceHistoryStatusSet,
  priceHistoryRequested
}
