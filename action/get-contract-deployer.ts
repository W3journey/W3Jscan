import { alchemyClient } from "@/lib/alchemyClient"
import { isAddress } from "ethers"

export const getContractDeployer = async (address: string) => {
  if (!address || typeof address !== "string") {
    throw new Error("Address must be a non-empty string")
  }

  if (!isAddress(address)) {
    throw new Error("Invalid Ethereum address")
  }

  try {
    const contractDeployer = await alchemyClient.core.findContractDeployer(
      address
    )

    if (!contractDeployer) {
      throw new Error(`Failed to retrieve deployer for: ${address}`)
    }
    return contractDeployer
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(`Error in getContractDeployer: ${error}`)
  }
}
