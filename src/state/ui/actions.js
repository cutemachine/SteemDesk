import types from './types'

const showModal = isOpen => ({
  type: types.SHOW_MODAL,
  payload: isOpen
})

const addFlag = (id, title, description) => ({
  type: types.ADD_FLAG,
  id,
  title,
  description
})

const deleteFlag = (id) => ({
  type: types.DELETE_FLAG,
  id
})

export default {
  showModal,
  addFlag,
  deleteFlag
}
