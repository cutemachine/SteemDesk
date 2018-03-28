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
  const { totalVestingFundSteem, totalVestingShares } = dynamicGlobalProperties
  const totalVestingFundSteemNumber = unitString2Number(totalVestingFundSteem)
  const totalVestingSharesNumber = unitString2Number(totalVestingShares)
  const vestingSharesNumber = unitString2Number(vestingShares)

  return (totalVestingFundSteemNumber * (vestingSharesNumber / totalVestingSharesNumber)).toFixed(6)
}
