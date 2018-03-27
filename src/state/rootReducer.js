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
  selectIsModalOpen: state => uiSelectors.selectIsModalOpen(state.ui),
  selectFlags: state => uiSelectors.selectFlags(state.ui),

  // Steem state
  selectUsername: state => steemSelectors.selectUsername(state.steem),
  selectUsernameStatus: state => steemSelectors.selectUsernameStatus(state.steem),
  selectReputation: state => steemSelectors.selectReputation(state.steem),
  selectFollowCount: state => steemSelectors.selectFollowCount(state.steem),
  selectErrorMessage: state => steemSelectors.selectErrorMessage(state.steem)
}
