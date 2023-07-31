import { alchemyClient } from "@/lib/alchemyClient"
import { isAddress } from "ethers"

export const getTokenMetadata = async (address: string) => {
  if (!address || typeof address !== "string") {
    throw new Error("Address must be a non-empty string")
  }

  if (!isAddress(address)) {
    throw new Error("Invalid Ethereum address")
  }

  try {
    const tokenMetaData = await alchemyClient.core.getTokenMetadata(address)

    if (!tokenMetaData) {
      throw new Error(`Failed to retrieve token metadata for: ${address}`)
    }

    return tokenMetaData
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(`Error in getTokenMetadata: ${error}`)
  }
}
