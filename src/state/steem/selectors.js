export default {
  selectAccountHistory: state => state.steem.accountHistory,
  selectDelegations: state => state.steem.delegations,
  selectErrorMessage: state => state.steem.errorMessage,
  selectFollowCount: state => state.steem.followCount,
  selectReputation: state => state.steem.reputation,
  selectUsername: state => state.steem,
  selectUsernameStatus: state => state.steem.usernameStatus
}
