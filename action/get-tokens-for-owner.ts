import { alchemyClient } from "@/lib/alchemyClient"
import { isAddress } from "ethers"

export const getTokensForOwner = async (address: string) => {
  if (!address || typeof address !== "string") {
    throw new Error("Address must be a non-empty string")
  }

  if (!isAddress(address)) {
    throw new Error("Invalid Ethereum address")
  }

  try {
    const tokens = await alchemyClient.core.getTokensForOwner(address)

    if (!tokens) {
      throw new Error(`Failed to retrieve tokens for ${address}`)
    }

    return tokens
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(`Error in getTokensForOwner: ${error}`)
  }
}
