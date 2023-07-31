import { getTokenMetadata } from "@/action/get-token-metadata"
import { TokenMetadataResponse, TransactionReceipt } from "alchemy-sdk"
import { id, getAddress, formatUnits } from "ethers"

export interface TransferData {
  from: string
  to: string
  metadata: TokenMetadataResponse
  contractAddress: string
  amount: string
}

export const decodeERC20Transfer = async (txReceipt: TransactionReceipt) => {
  if (!txReceipt) {
    throw new Error("txReceipt must be passed in")
  }

  try {
    const transferEvents = txReceipt.logs.filter(
      (log) => log.topics[0] === id("Transfer(address,address,uint256)")
    )

    const transfers = await Promise.all(
      transferEvents.map(async (event) => {
        const metadata = await getTokenMetadata(event.address)

        return {
          from: getAddress("0x" + event.topics[1].slice(26)),
          to: getAddress("0x" + event.topics[2].slice(26)),
          metadata,
          contractAddress: event.address,
          amount: metadata.decimals
            ? formatUnits(event.data, metadata.decimals)
            : "0",
        } as TransferData
      })
    )

    return transfers
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(`Error in decodeERC20Transfer: ${error}`)
  }
}
