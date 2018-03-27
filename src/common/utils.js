// Formats a reputation score from a Steem accounts object to human readable score.
export const formatReputation = (reputation, digits = 6) => {
  const isNegative = (reputation < 0)
  let formattedReputation = Math.log10(Math.abs(reputation))
  formattedReputation = Math.max(formattedReputation - 9, 0)
  formattedReputation *= isNegative ? -9 : 9
  formattedReputation += 25
  return formattedReputation.toFixed(digits)
}
