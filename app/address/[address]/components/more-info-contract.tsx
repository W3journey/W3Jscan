import Image from "next/image"
import Link from "next/link"
import { HelpCircle } from "lucide-react"

import { getContractDeployer } from "@/action/get-contract-deployer"
import { getTokenMetadata } from "@/action/get-token-metadata"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const revalidate = 3600 * 60

async function fetchDeployer(address: string) {
  const deployerData = await getContractDeployer(address)
  return deployerData
}

async function fetchTokenMetaData(address: string) {
  const tokenMetaData = await getTokenMetadata(address)
  return tokenMetaData
}

interface MorInfoContractProps {
  address: string
}

const MoreInfoContract: React.FC<MorInfoContractProps> = async ({
  address,
}) => {
  const deployerData = fetchDeployer(address)
  const tokenMetaData = fetchTokenMetaData(address)

  const [deployer, tokenInfo] = await Promise.all([deployerData, tokenMetaData])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium leading-none">
          More Info
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 text-sm font-medium">
        <div className="space-y-1">
          <div className="text-sm font-medium leading-none text-muted-foreground">
            CONTRACT CREATOR
          </div>
          <div className="flex items-center gap-2">
            {deployer.deployerAddress ? (
              <Link
                href={`/address/${deployer.deployerAddress}`}
                className="text-sky-400"
              >
                {deployer.deployerAddress?.slice(0, 15)}...
              </Link>
            ) : (
              <span className="text-muted-foreground">Unknown</span>
            )}
            at block #
            <Link
              href={`/block/${deployer.blockNumber}`}
              className="text-sky-400"
            >
              {deployer.blockNumber}
            </Link>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-sm font-medium leading-none text-muted-foreground">
            TOKEN TRACKER
          </div>
          <div className="flex items-center gap-1">
            {/* Token Logo */}
            <div className="relative flex items-center w-6 h-6">
              {tokenInfo.logo ? (
                <Image
                  src={tokenInfo.logo}
                  alt={`${tokenInfo.name} logo`}
                  fill
                  className="object-cover"
                />
              ) : (
                <HelpCircle className="w-4 h-4" />
              )}
            </div>
            <span>
              {tokenInfo.name} ({tokenInfo.symbol})
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default MoreInfoContract
