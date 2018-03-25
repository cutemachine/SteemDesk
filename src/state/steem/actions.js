import types from './types'

const usernameStatusChanged = (usernameStatus) => ({
  type: types.USERNAME_STATUS_CHANGED,
  usernameStatus
})

const usernameChanged = (username) => ({
  type: types.USERNAME_CHANGED,
  username
})

const usernameSubmitted = () => ({
  type: types.USERNAME_SUBMITTED
})

export default {
  usernameStatusChanged,
  usernameChanged,
  usernameSubmitted
}
