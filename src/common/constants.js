export const TRANSACTION_TYPES_BASIC = {
  AUTHOR_REWARD: 'author_reward',
  CURATION_REWARD: 'curation_reward',
  VOTE: 'vote',
  TRANSFER: 'transfer',
  COMMENT: 'comment'
}

export const TRANSACTION_TYPES_ADVANCED = {
  ACCOUNT_WITNESS_VOTE: 'account_witness_vote',
  CLAIM_REWARD_BALANCE: 'claim_reward_balance',
  CUSTOM_JSON: 'custom_json',
  COMMENT_OPTIONS: 'comment_options',
  TRANSFER_TO_VESTING: 'transfer_to_vesting',
  DELEGATE_VESTING_SHARES: 'delegate_vesting_shares',
  COMMENT_BENEFACTOR_REWARD: 'comment_benefactor_reward',
  ACCOUNT_CREATE_WITH_DELEGATION: 'account_create_with_delegation',
  FILL_ORDER: 'fill_order',
  LIMIT_ORDER_CANCEL: 'limit_order_cancel',
  LIMIT_ORDER_CREATE: 'limit_order_create',
  RETURN_VESTING_DELEGATION: 'return_vesting_delegation',
  PRODUCER_REWARD: 'producer_reward',
  FEED_PUBLISH: 'feed_publish',
  ACCOUNT_WITNESS_PROXY: 'account_witness_proxy',
  ACCOUNT_UPDATE: 'account_update',
  DELETE_COMMENT: 'delete_comment'
}

export const TRANSACTION_TYPES = {
  ...TRANSACTION_TYPES_BASIC,
  ...TRANSACTION_TYPES_ADVANCED
}

export const CRYPTOS = {
  SBD: {
    name: 'Steem Dollars',
    symbol: 'SBD*'
  },
  STEEM: {
    name: 'Steem',
    symbol: 'STEEM'
  },
  BTC: {
    name: 'Bitcoin',
    symbol: 'BTC'
  }
}
