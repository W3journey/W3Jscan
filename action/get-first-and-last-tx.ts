import { getBlock } from "@/action/get-block"
import { alchemyClient } from "@/lib/alchemyClient"
import { AssetTransfersCategory, SortingOrder } from "alchemy-sdk"
import { isAddress } from "ethers"

export const getFirstAndLastTxn = async (address: string) => {
  if (!address || typeof address !== "string") {
    throw new Error("Address must be a non-empty string")
  }

  if (!isAddress(address)) {
    throw new Error("Invalid Ethereum address")
  }

  if (!alchemyClient) {
    throw new Error("Alchemy client not properly initialized")
  }

  try {
    const firstTxn = await alchemyClient.core.getAssetTransfers({
      fromAddress: address,
      order: SortingOrder.ASCENDING,
      category: [
        AssetTransfersCategory.EXTERNAL,
        AssetTransfersCategory.ERC20,
        AssetTransfersCategory.ERC721,
        AssetTransfersCategory.ERC1155,
        AssetTransfersCategory.SPECIALNFT,
      ],
      maxCount: 1,
    })

    const lastTxn = await alchemyClient.core.getAssetTransfers({
      fromAddress: address,
      order: SortingOrder.DESCENDING,
      category: [
        AssetTransfersCategory.EXTERNAL,
        AssetTransfersCategory.ERC20,
        AssetTransfersCategory.ERC721,
        AssetTransfersCategory.ERC1155,
        AssetTransfersCategory.SPECIALNFT,
      ],
      maxCount: 1,
    })

    const firstBlockData = getBlock(Number(firstTxn.transfers[0].blockNum))
    const lastBlockData = getBlock(Number(lastTxn.transfers[0].blockNum))

    const [firstBlock, lastBlock] = await Promise.all([
      firstBlockData,
      lastBlockData,
    ])

    return {
      first: {
        txHash: firstTxn.transfers[0].hash,
        timestamp: firstBlock.timestamp,
      },
      last: {
        txHash: lastTxn.transfers[0].hash,
        timestamp: lastBlock.timestamp,
      },
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(`Error in getFirstAndLastTxn: ${error}`)
  }
}
