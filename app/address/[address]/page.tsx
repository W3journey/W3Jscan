import { isAddress } from "ethers"
import {
  AssetTransfersWithMetadataResponse,
  AssetTransfersWithMetadataResult,
} from "alchemy-sdk"

import { isContractAddress } from "@/action/is-contract-address"
import { getAssetTransfers } from "@/action/get-asset-transfers"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./components/columns"
import MoreInfoAddress from "./components/more-info-address"
import MoreInfoContract from "./components/more-info-contract"
import NoMatch from "./components/no-match"
import OverviewCard from "./components/overview-card"
import CopyButton from "@/components/ui/copy-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const revalidate = 3600 * 60

async function fetchIsContract(address: string) {
  const isContractData = await isContractAddress(address)
  return isContractData
}

async function fetchAssetTransfers(address: string, isContract: boolean) {
  const assetTransfersData = await getAssetTransfers(address, isContract)
  return assetTransfersData
}

const Page = async ({ params }: { params: { address: string } }) => {
  const isValidAddress = isAddress(params.address)

  let isContract = false
  let assetTransfers: AssetTransfersWithMetadataResult[] = []

  if (isValidAddress) {
    isContract = await fetchIsContract(params.address)
    const assetTransfersData = (await fetchAssetTransfers(
      params.address,
      isContract
    )) as AssetTransfersWithMetadataResponse
    if (assetTransfersData?.transfers) {
      assetTransfers = assetTransfersData.transfers
    }
  }

  return (
    <div className="container px-2 mx-auto my-6 space-y-12">
      <div className="flex-row items-center justify-center gap-2 sm:flex">
        <h1 className="text-xl font-semibold tracking-tight">
          {isContract ? "Contract" : "Address"}
        </h1>
        <span className="text-sm font-medium leading-none break-all">
          {params.address}
        </span>
        <CopyButton value={params.address} tooltipText="Copy Address" />
      </div>

      <div className="grid w-full grid-cols-1 gap-x-16 sm:gap-16 sm:grid-cols-2">
        <OverviewCard address={params.address} />
        {isValidAddress ? (
          isContract ? (
            <MoreInfoContract address={params.address} />
          ) : (
            <MoreInfoAddress address={params.address} />
          )
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium leading-none">
                More Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-sm font-medium">
              <div className="space-y-1">
                <div className="text-sm font-medium leading-none text-destructive">
                  INVALID ADDRESS
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="py-10">
        {assetTransfers.length > 0 ? (
          <DataTable columns={columns} data={assetTransfers} />
        ) : (
          <NoMatch />
        )}
      </div>
    </div>
  )
}
export default Page
