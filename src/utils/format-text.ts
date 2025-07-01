
export const formatFollowers = (count: number): string => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(count % 1000000 === 0 ? 0 : 1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}K`
  return count.toString()
}

export const formatPrice = (price: number): string => {
  return `$${price}`
}
