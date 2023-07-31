import { AssetTransfersCategory, SortingOrder } from "alchemy-sdk"
import { isAddress } from "ethers"

import { alchemyClient } from "@/lib/alchemyClient"

export const getAssetTransfers = async (
  fromAddress: string,
  isContract: boolean = false
) => {
  if (!fromAddress || typeof fromAddress !== "string") {
    throw new Error("Address must be a non-empty string")
  }

  if (!isAddress(fromAddress)) {
    throw new Error("Invalid Ethereum address")
  }

  const options = {
    fromAddress,
    order: SortingOrder.DESCENDING,
    category: [
      isContract
        ? AssetTransfersCategory.INTERNAL
        : AssetTransfersCategory.EXTERNAL,
      AssetTransfersCategory.ERC20,
      AssetTransfersCategory.ERC721,
      AssetTransfersCategory.ERC1155,
      AssetTransfersCategory.SPECIALNFT,
    ],
    maxCount: 25,
    withMetadata: true,
  }

  try {
    const data = await alchemyClient.core.getAssetTransfers(options)

    if (!data) {
      throw new Error(
        `Failed to retrieve asset transfers for address: ${fromAddress}`
      )
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error(`Error in getAssetTransfers: ${error}`)
  }
}
