import { alchemyClient } from "@/lib/alchemyClient"

export const getBlock = async (blockNumber: number) => {
  try {
    const data = await alchemyClient.core.getBlock(blockNumber)

    if (!data) {
      throw new Error(
        `Failed to retrieve block for block number: ${blockNumber}`
      )
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(`Error in getBlock: ${error}`)
  }
}
