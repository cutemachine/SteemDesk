import types from './types'

const INITIAL_STATE = {
  username: 'cutemachine',
  // VALID, INVALID, VALIDATING, UNCHECKED
  usernameStatus: 'UNCHECKED'
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USERNAME_STATUS_CHANGED:
      return { ...state, usernameStatus: action.usernameStatus }

    case types.USERNAME_CHANGED:
      return { ...state, username: action.username, usernameStatus: 'UNCHECKED' }

    default:
      return state
  }
}
