export const TRANSACTION_TYPES_BASIC = [
  'author_reward',
  'curation_reward',
  'vote',
  'transfer',
  'comment'
]

export const TRANSACTION_TYPES_ADVANCED = [
  'account_witness_vote',
  'claim_reward_balance',
  'custom_json',
  'comment_options',
  'transfer_to_vesting',
  'delegate_vesting_shares',
  'comment_benefactor_reward',
  'account_create_with_delegation',
  'fill_order',
  'limit_order_cancel',
  'limit_order_create',
  'return_vesting_delegation',
  'producer_reward',
  'feed_publish',
  'account_witness_proxy',
  'account_update',
  'delete_comment'
]

export const TRANSACTION_TYPES = [
  ...TRANSACTION_TYPES_BASIC,
  ...TRANSACTION_TYPES_ADVANCED
]

export const CRYPTOS = {
  SBD: {
    name: 'Steem Dollars',
    symbol: 'SBD'
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
