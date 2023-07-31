import Link from "next/link"

import { getFirstAndLastTxn } from "@/action/get-first-and-last-tx"
import { formatTimestamp, timeFromNow } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TooltipBadge from "@/components/ui/tooltip-badge"

export const revalidate = 60

async function fetchFirstAndLastTransaction(address: string) {
  const transactionData = await getFirstAndLastTxn(address)
  return transactionData
}

interface MoreInfoAddressProps {
  address: string
}

const MoreInfoAddress: React.FC<MoreInfoAddressProps> = async ({ address }) => {
  const txData = await fetchFirstAndLastTransaction(address)
  const firstTimestamp = txData?.first.timestamp
  const lastTimestamp = txData?.last.timestamp

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
            LAST TXN SENT
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/tx/${txData?.last.txHash}`} className="text-sky-400">
              {txData?.last.txHash.slice(0, 15)}...
            </Link>
            <TooltipBadge
              className="text-muted-foreground"
              text={lastTimestamp ? timeFromNow(lastTimestamp) : "Unknown"}
              tooltip={
                lastTimestamp ? formatTimestamp(lastTimestamp) : "Unknown"
              }
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-sm font-medium leading-none text-muted-foreground">
            FIRST TXN SENT
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/tx/${txData?.first.txHash}`} className="text-sky-400">
              {txData?.first.txHash.slice(0, 15)}...
            </Link>
            <TooltipBadge
              className="text-muted-foreground"
              text={firstTimestamp ? timeFromNow(firstTimestamp) : "Unknown"}
              tooltip={
                firstTimestamp ? formatTimestamp(firstTimestamp) : "Unknown"
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default MoreInfoAddress
