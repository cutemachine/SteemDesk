export default {
  selectUsername: state => state.steem,
  selectUsernameStatus: state => state.steem.usernameStatus,
  selectReputation: state => state.steem.reputation,
  selectFollowCount: state => state.steem.followCount,
  selectDelegations: state => state.steem.delegations,
  selectErrorMessage: state => state.steem.errorMessage
}
