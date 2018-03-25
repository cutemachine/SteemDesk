import actions from './actions'

const {
  usernameStatusChanged,
  usernameChanged
} = actions

// Thunks
const usernameSubmitted = () => (dispatch) => {
  dispatch(usernameStatusChanged('VALIDATING'))
  setTimeout(() => {
    dispatch(usernameStatusChanged('INVALID'))
  }, 3000)
}

export default {
  usernameStatusChanged,
  usernameChanged,
  usernameSubmitted
}
