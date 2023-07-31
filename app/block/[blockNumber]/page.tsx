import Link from "next/link"
import { notFound } from "next/navigation"
import { Utils } from "alchemy-sdk"
import { Clock, Flame } from "lucide-react"

import { formatTimestamp, timeFromNow } from "@/lib/utils"
import { getBlock } from "@/action/get-block"
import { Card } from "@/components/ui/card"
import CopyButton from "@/components/ui/copy-button"
import { getLatestBlock } from "@/action/get-lates-block"

const Page = async ({ params }: { params: { blockNumber: string } }) => {
  const blockNumber = params.blockNumber

  const latestBlock = await getLatestBlock()

  if (Number(blockNumber) > latestBlock) {
    throw new Error("Block does not exist yet")
  }

  const block = await getBlock(Number(params.blockNumber))

  if (!block) {
    notFound()
  }

  const gasLimit = Utils.formatUnits(block.gasLimit, "wei")
  const gasUsed = Utils.formatUnits(block.gasUsed, "wei")
  const percentageUsed = ((Number(gasUsed) / Number(gasLimit)) * 100).toFixed(2)
  const burntFee = block.baseFeePerGas
    ? Number(Utils.formatEther(block.baseFeePerGas)) * Number(gasUsed)
    : 0

  return (
    <div className="container mx-auto mt-6 space-y-12">
      <h4 className="text-xl font-semibold tracking-tight">
        Block{" "}
        <span className="font-normal text-muted-foreground">
          #{blockNumber}
        </span>
      </h4>
      <Card className="p-5 space-y-5 text-sm font-medium leading-none break-all">
        {/* Block Height */}
        <div className="flex-row items-center md:flex">
          <div className="basis-1/4 text-muted-foreground">Block Height:</div>
          <div className="flex items-center space-x-2">
            <div>{blockNumber}</div>
          </div>
        </div>

        {/* Timestamp */}
        <div className="flex-row items-center md:flex">
          <p className="basis-1/4 text-muted-foreground">Timestamp:</p>
          <div className="flex items-center space-x-1">
            <div className="flex flex-col items-center justify-end w-4 h-4">
              <Clock />
            </div>
            <div>
              {timeFromNow(block.timestamp)} ({formatTimestamp(block.timestamp)}
              )
            </div>
          </div>
        </div>

        {/* Transaction */}
        <div className="flex-row items-center md:flex">
          <div className="basis-1/4 text-muted-foreground">Transaction:</div>
          <div className="flex items-center space-x-2">
            <div>{block.transactions.length} transactions in this block</div>
          </div>
        </div>

        {/* Fee recipient */}
        <div className="flex-row items-center md:flex">
          <div className="basis-1/4 text-muted-foreground">Fee recipient:</div>
          <div className="flex items-center space-x-2">
            <Link href={`/address/${block.miner}`} className="text-sky-400">
              {block.miner}
            </Link>
            <CopyButton value={block.miner} tooltipText="Copy Address" />
          </div>
        </div>

        {/* Gas Used */}
        <div className="flex-row items-center md:flex">
          <div className="basis-1/4 text-muted-foreground">Gas Used:</div>
          <div className="flex items-center space-x-2">
            <div>
              {Number(gasUsed).toLocaleString("en-US")}{" "}
              <span className="text-muted-foreground">({percentageUsed}%)</span>
            </div>
          </div>
        </div>

        {/* Gas Limit */}
        <div className="flex-row items-center md:flex">
          <div className="basis-1/4 text-muted-foreground">Gas Limit:</div>
          <div className="flex items-center space-x-2">
            <div>{Number(gasLimit).toLocaleString("en-US")}</div>
          </div>
        </div>

        {/* Base Fee Per Gas */}
        {block.baseFeePerGas && (
          <div className="flex-row items-center md:flex">
            <div className="basis-1/4 text-muted-foreground">
              Base Fee Per Gas:
            </div>
            <div className="flex items-center space-x-2">
              <div className="space-x-1">
                <span>{Utils.formatEther(block.baseFeePerGas!)} ETH</span>
                <span className="text-muted-foreground">
                  ({Utils.formatUnits(block.baseFeePerGas!, "gwei")} Gwei)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Burnt Fees */}
        {burntFee > 0 && (
          <div className="flex-row items-center md:flex">
            <div className="basis-1/4 text-muted-foreground">Burnt Fees:</div>
            <div className="flex items-center space-x-2">
              <div className="flex flex-col items-center justify-end w-4 h-4 text-orange-400">
                <Flame strokeWidth={3} />
              </div>
              {burntFee} ETH
            </div>
          </div>
        )}

        {/* Extra Data */}
        <div className="flex-row items-center md:flex">
          <div className="basis-1/4 text-muted-foreground">Extra Data:</div>
          <div className="flex items-center space-x-2">
            <div>{block.extraData}</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
export default Page
