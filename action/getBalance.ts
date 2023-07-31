import { alchemyClient } from "@/lib/alchemyClient"
import { isAddress } from "ethers"

export const getBalance = async (address: string) => {
  if (!address || typeof address !== "string") {
    throw new Error("Address must be a non-empty string")
  }

  if (!isAddress(address)) {
    throw new Error("Invalid Ethereum address")
  }

  try {
    const data = await alchemyClient.core.getBalance(address)

    if (!data) {
      throw new Error(
        `Failed to retrieve Ethereum balance for address ${address}`
      )
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(`Error in getBalance: ${error}`)
  }
}
