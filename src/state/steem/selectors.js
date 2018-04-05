export default {
  selectAccountHistory: state => state.steem.accountHistory,
  selectAccountHistoryStatus: state => state.steem.accountHistoryStatus,
  selectDelegations: state => state.steem.delegations,
  selectErrorMessage: state => state.steem.errorMessage,
  selectFollowCount: state => state.steem.followCount,
  selectReputation: state => state.steem.reputation,
  selectUsername: state => state.steem.username,
  selectUsernameStatus: state => state.steem.usernameStatus
}
