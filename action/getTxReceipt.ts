import { alchemyClient } from "@/lib/alchemyClient"

export const getTxReceipt = async (txHash: string) => {
  if (!/^(0x)?[0-9a-fA-F]{64}$/.test(txHash)) {
    throw new Error("Invalid transaction hash")
  }

  try {
    const data = await alchemyClient.core.getTransactionReceipt(txHash)

    if (!data) {
      throw new Error(
        `Failed to retrieve transaction receipt for hash ${txHash}`
      )
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(`Error in getTXReceipt: ${error}`)
  }
}
