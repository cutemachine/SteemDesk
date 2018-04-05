import actions from './actions'

const {
  showModal,
  addFlag,
  deleteFlag
} = actions

let nextFlagID = 0
const showFlag = (title, description, milliseconds = 0) => async (dispatch, getState) => {
  const id = ++nextFlagID
  dispatch(addFlag(id, title, description))
  if (milliseconds > 0) {
    window.setTimeout(() => {
      dispatch(deleteFlag(id))
    }, milliseconds)
  }
}

export default {
  showModal,
  showFlag,
  addFlag,
  deleteFlag
}
