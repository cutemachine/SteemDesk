import types from './types'

const INITIAL_STATE = {
  username: 'cutemachine',
  // VALID, INVALID, VALIDATING, UNCHECKED
  usernameStatus: 'UNCHECKED',
  errorMessage: '',
  reputation: '',
  followCount: { follower_count: '', following_count: '' },
  delegations: [],
  dynamicGlobalProperties: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USERNAME_STATUS_CHANGED:
      return { ...state, usernameStatus: action.usernameStatus }

    case types.USERNAME_CHANGED:
      return {
        ...state,
        username: action.username,
        usernameStatus: 'UNCHECKED',
        errorMessage: '',
        reputation: '',
        followCount: INITIAL_STATE.followCount,
        delegations: []
      }

    case types.REPUTATION_SET:
      return { ...state, reputation: action.reputation }

    case types.FOLLOW_COUNT_SET:
      return { ...state, followCount: action.followCount }

    case types.DELEGATIONS_SET:
      return { ...state, delegations: action.delegations }

    case types.DYNAMIC_GLOBAL_PROPERTIES_SET:
      return { ...state, dynamicGlobalProperties: action.dynamicGlobalProperties }

    case types.ERROR_CLEARED:
    case types.ERROR_OCCURRED:
      return { ...state, errorMessage: action.errorMessage }

    default:
      return state
  }
}
