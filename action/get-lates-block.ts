import { alchemyClient } from "@/lib/alchemyClient"

export const getLatestBlock = async () => {
  try {
    const data = await alchemyClient.core.getBlockNumber()

    if (!data) {
      throw new Error("Failed to retrieve latest block")
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(`Error in getLatestBlock: ${error}`)
  }
}
