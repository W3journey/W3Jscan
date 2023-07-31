import { alchemyClient } from "@/lib/alchemyClient"

export const getBlockWithTxs = async (blockNumber: number) => {
  try {
    const data = await alchemyClient.core.getBlockWithTransactions(blockNumber)

    if (!data) {
      throw new Error(
        `Failed to retrieve block with transactions for block number: ${blockNumber}`
      )
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(`Error in getBlockWithTxs: ${error}`)
  }
}
