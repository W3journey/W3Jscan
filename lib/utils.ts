import { spamNames, spamSymbols } from "@/constants/spam-tokens"
import { OwnedToken } from "alchemy-sdk"
import { type ClassValue, clsx } from "clsx"
import { formatDistanceToNow, format } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTimestamp = (timestamp: number) => {
  return format(timestamp * 1000, "PPpppp")
}

export const timeFromNow = (timestamp: number) => {
  const date = new Date(timestamp * 1000)

  return formatDistanceToNow(date, { addSuffix: true })
}

export const truncateAddress = (address: string) => {
  return `${address.slice(0, 8)}...${address.slice(
    address.length - 8,
    address.length
  )}`
}

export const shortenHash = (txHash: string) => {
  return `${txHash.slice(0, 19)}...`
}

export const isSpamToken = (token: OwnedToken) => {
  const nameInSpamTokens = spamNames.some((spamName) =>
    token.name?.toLowerCase().includes(spamName)
  )
  const symbolInSpamSymbols = spamSymbols.some((spamSymbol) =>
    token.symbol?.toLowerCase().includes(spamSymbol)
  )

  if (nameInSpamTokens || symbolInSpamSymbols) {
    return true
  }
  return false
}

export const isBlockNumber = (input: string) => {
  if (!input) return false

  const blockNumber = typeof input === "string" ? Number(input) : NaN
  return (
    Number.isInteger(blockNumber) &&
    blockNumber >= 0 &&
    blockNumber.toString() === input.toString()
  )
}
