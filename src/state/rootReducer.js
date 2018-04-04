import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import uiReducer, { uiSelectors } from './ui'
import steemReducer, { steemSelectors } from './steem'

const rootReducer = combineReducers({
  router: routerReducer,
  ui: uiReducer,
  steem: steemReducer
})

export default rootReducer

// Co-locate selectors with reducers here.
// Selector names should start with 'select'.
export const selectors = {
  // UI state
  selectFlags: state => uiSelectors.selectFlags(state.ui),
  selectIsModalOpen: state => uiSelectors.selectIsModalOpen(state.ui),

  // Steem state
  selectAccountHistory: state => steemSelectors.selectAccountHistory(state.steem),
  selectAccountHistoryStatus: state => steemSelectors.selectAccountHistoryStatus(state.steem),
  selectDelegations: state => steemSelectors.selectDelegations(state.steem),
  selectErrorMessage: state => steemSelectors.selectErrorMessage(state.steem),
  selectFollowCount: state => steemSelectors.selectFollowCount(state.steem),
  selectReputation: state => steemSelectors.selectReputation(state.steem),
  selectUsername: state => steemSelectors.selectUsername(state.steem),
  selectUsernameStatus: state => steemSelectors.selectUsernameStatus(state.steem)
}
