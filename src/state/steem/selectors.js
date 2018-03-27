export default {
  selectUsername: state => state.steem,
  selectUsernameStatus: state => state.steem.usernameStatus,
  selectErrorMessage: state => state.steem.errorMessage
}
