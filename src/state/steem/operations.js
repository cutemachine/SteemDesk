import actions from './actions'
import steem from 'steem'
import last from 'lodash.last'
import { uiOperations } from '../ui'
import { filterForTransactionType, formatReputation, vests2Steem } from '../../common/utils'
import { TRANSACTION_TYPES } from '../../common/constants'

const INITIAL_FETCH_LIMIT = 300

const {
  accountHistorySet,
  accountHistoryStatusSet,
  usernameStatusChanged,
  usernameChanged,
  reputationSet,
  followCountSet,
  delegationsSet,
  dynamicGlobalPropertiesSet,
  errorOccurred,
  errorCleared
} = actions

// Thunks
const buildDelegationHistory = () => async (dispatch, getState) => {
  const accountHistory = getState().steem.accountHistory
  const currentDelegations = getState().steem.delegations

  // delegationKeys is an array with delegation keys
  // delegationKeys = [
  //   'cutemachine_jerrybanfield',
  //   'cutemachine_postpromoter'
  // ]
  const delegationKeys = new Set()
  currentDelegations.forEach((delegation) => {
    delegationKeys.add(`${delegation.delegator}_${delegation.delegatee}`)
  })
  console.log('dkeys', delegationKeys)

  // filter account history for relevant transaction types
  const filteredAccountHistory = accountHistory.filter((tx) => {
    const txType = tx[1].op[0]
    return (txType === 'transfer' || txType === 'delegate_vesting_shares')
  })

  // delegationHistory is an object with delegationKeys pointing to an array with the relevant transactions
  // delegationHistory = {
  //   delegator_delegatee: [ txData1, txData2, … ]
  // }
  const delegationHistory = {}
  delegationKeys.forEach((delegationKey) => {
    delegationHistory[delegationKey] = []
  })

  filteredAccountHistory.forEach((tx) => {
    const txType = tx[1].op[0]
    const txData = tx[1].op[1]
    if (txType === 'transfer') {
      // tx is of type TRANSFER
      const delegationKey = `${txData.to}_${txData.from}`
      if (delegationKeys.has(delegationKey)) {
        console.log('dk', delegationKey)
        delegationHistory[delegationKey].push(tx)
      }
    } else {
      // tx is of type DELEGATE_VESTING_SHARES
      const delegationKey = `${txData.delegator}_${txData.delegatee}`
      // remove delegation key, because it is either unknow or we want to stop recording tx for it
      delegationKeys.delete(delegationKey)
    }
  })
  console.log('dh', delegationHistory)

  return delegationHistory
}

const accountHistoryLoadMore = () => async (dispatch, getState) => {
  let fetchLimit = INITIAL_FETCH_LIMIT

  // Cannor load account history data without a valid username
  if (getState().steem.usernameStatus !== 'VALID') return

  // Loading of account history data already in progress
  if (getState().steem.accountHistoryStatus === 'LOADING') return

  // Account history has been loaded completely, therefore exit
  if (getState().steem.accountHistoryStatus === 'LOADED_COMPLETELY') return

  const nextSequenceIdToLoad = last(getState().steem.accountHistory)[0] - 1
  // If initial load has already loaded the complete history, set status and exit
  if (nextSequenceIdToLoad <= 0) {
    dispatch(accountHistoryStatusSet('LOADED_COMPLETELY'))
    return
  }

  // From must be greater than limit when calling getAccountHistoryAsync(name, from, limit)
  if (nextSequenceIdToLoad <= fetchLimit) {
    fetchLimit = nextSequenceIdToLoad - 1
  }
  dispatch(accountHistoryStatusSet('LOADING'))
  const accountHistoryMoreData = await steem.api.getAccountHistoryAsync(getState().steem.username, nextSequenceIdToLoad, fetchLimit)
  dispatch(accountHistoryStatusSet('LOADED'))
  const accountHistoryMergedData = getState().steem.accountHistory.concat(accountHistoryMoreData.reverse())
  dispatch(accountHistorySet(accountHistoryMergedData))
  if (last(getState().steem.accountHistory)[0] <= 1) {
    dispatch(accountHistoryStatusSet('LOADED_COMPLETELY'))
  }
}

const usernameSubmitted = (name) => async (dispatch, getState) => {
  dispatch(usernameStatusChanged('VALIDATING'))
  dispatch(accountHistoryStatusSet('LOADING'))
  try {
    // Use this server, as it allows to grab the whole account history from blockchain
    // TODO: allow configuration for Steem API server in UI
    steem.api.setOptions({ url: 'wss://rpc.buildteam.io' })
    let [accounts, accountHistory, followCount, delegations, dynamicGlobalProperties] = await Promise.all([
      steem.api.getAccountsAsync([name]),
      steem.api.getAccountHistoryAsync(name, -1, INITIAL_FETCH_LIMIT),
      steem.api.getFollowCountAsync(name),
      steem.api.getVestingDelegationsAsync(name, -1, 100),
      steem.api.getDynamicGlobalPropertiesAsync()
    ])
    if (!accounts[0]) { throw new Error('Sorry, no account found. Minimum 3 chars, no uppercase.') }
    dispatch(usernameChanged(name))
    dispatch(usernameStatusChanged('VALID'))
    dispatch(reputationSet(formatReputation(accounts[0].reputation)))
    dispatch(uiOperations.showFlag(`Welcome ${name}`, 'SteemDesk loves you!', 4000))

    if (!accountHistory) { throw new Error('Sorry, no account history found.') }
    accountHistory = accountHistory.reverse()
    dispatch(accountHistorySet(accountHistory))
    if (last(getState().steem.accountHistory)[0] === 0) {
      dispatch(accountHistoryStatusSet('LOADED_COMPLETELY'))
    } else {
      dispatch(accountHistoryStatusSet('LOADED'))
    }

    if (!followCount) { throw new Error('Sorry, could not get follow count for user.') }
    dispatch(followCountSet(followCount))

    if (!dynamicGlobalProperties) { throw new Error('Sorry, could not get dynamic global properties.') }
    dispatch(dynamicGlobalPropertiesSet(dynamicGlobalProperties))

    if (!delegations) { throw new Error('Sorry, could not get delegations for user.') }
    dispatch(delegationsSet(delegations.map((item) => {
      return {
        delegator: item.delegator,
        delegatee: item.delegatee,
        vesting_shares: item.vesting_shares,
        vesting_shares_sp: `${Number.parseFloat(vests2Steem(item.vesting_shares, dynamicGlobalProperties)).toFixed(0)} SP`,
        min_delegation_time: item.min_delegation_time
      }
    })))
  } catch (error) {
    console.log(error.message)
    dispatch(usernameStatusChanged('INVALID'))
    throw new Error('User is invalid.')
  }
}

export default {
  accountHistorySet,
  accountHistoryStatusSet,
  accountHistoryLoadMore,
  buildDelegationHistory,
  usernameStatusChanged,
  usernameChanged,
  usernameSubmitted,
  reputationSet,
  followCountSet,
  delegationsSet,
  dynamicGlobalPropertiesSet,
  errorOccurred,
  errorCleared
}
