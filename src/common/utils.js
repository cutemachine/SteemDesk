// helper function to filter a given accountHistory array for given transactionType
// returns a new, filter array with transactions
export const filterForTransactionType = (accountHistory, transactionType) => {
  return accountHistory.filter((tx) => {
    const txType = tx[1].op[0]
    return txType === transactionType
  })
}

// Formats a reputation score from a Steem accounts object to human readable score.
export const formatReputation = (reputation, digits = 6) => {
  const isNegative = (reputation < 0)
  let formattedReputation = Math.log10(Math.abs(reputation))
  formattedReputation = Math.max(formattedReputation - 9, 0)
  formattedReputation *= isNegative ? -9 : 9
  formattedReputation += 25
  return formattedReputation.toFixed(digits)
}

export const unitString2Number = (stringWithUnit) => Number(stringWithUnit.split(' ')[0])

// vesting_shares is a string with the unit ' VESTS' appended
// delegateVestingShares only accepts 6 decimal digits, therefore we use toFixed(6) for return
export const vests2Steem = (vestingShares, dynamicGlobalProperties) => {
  const { total_vesting_fund_steem, total_vesting_shares } = dynamicGlobalProperties
  const totalVestingFundSteemNumber = unitString2Number(total_vesting_fund_steem)
  const totalVestingSharesNumber = unitString2Number(total_vesting_shares)
  const vestingSharesNumber = unitString2Number(vestingShares)

  return (totalVestingFundSteemNumber * (vestingSharesNumber / totalVestingSharesNumber)).toFixed(6)
}
