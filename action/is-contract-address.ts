import { alchemyClient } from "@/lib/alchemyClient"
import { isAddress } from "ethers"

export const isContractAddress = async (address: string) => {
  if (!address || typeof address !== "string") {
    throw new Error("Address must be a non-empty string")
  }

  if (!isAddress(address)) {
    throw new Error("Invalid Ethereum address")
  }
  try {
    const isContract = await alchemyClient.core.isContractAddress(address)

    return isContract
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(`Error in isContractAddress: ${error}`)
  }
}
