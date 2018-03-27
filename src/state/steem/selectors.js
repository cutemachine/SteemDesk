export default {
  selectUsername: state => state.steem,
  selectUsernameStatus: state => state.steem.usernameStatus,
  selectReputation: state => state.steem.reputation,
  selectErrorMessage: state => state.steem.errorMessage
}
