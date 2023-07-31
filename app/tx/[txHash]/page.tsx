import Link from "next/link"
import { notFound } from "next/navigation"
import { BigNumber, Utils } from "alchemy-sdk"
import { Hourglass, Clock } from "lucide-react"
import { FaEthereum } from "react-icons/fa"

import { getTxReceipt } from "@/action/getTxReceipt"
import { getTx } from "@/action/get-transaction"
import { getBlock } from "@/action/get-block"
import { formatTimestamp, timeFromNow } from "@/lib/utils"
import {
  TransferData,
  decodeERC20Transfer,
} from "@/action/decode-erc20-transfer"
import { IPrice } from "@/types/coingecko"
import StatusBadge from "@/components/ui/status-badge"
import TooltipBadge from "@/components/ui/tooltip-badge"
import { Card } from "@/components/ui/card"
import CopyButton from "@/components/ui/copy-button"
import TokensTransfer from "./components/tokens-transfer"

async function getPriceData(): Promise<IPrice> {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true",
    { next: { revalidate: 60 } }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch Ethereum Price")
  }

  return res.json()
}

const Page = async ({ params }: { params: { txHash: string } }) => {
  const priceData = getPriceData()

  const txData = getTx(params.txHash)
  const txReceiptData = getTxReceipt(params.txHash)

  const [price, tx, txReceipt] = await Promise.all([
    priceData,
    txData,
    txReceiptData,
  ])
  const block =
    txReceipt?.blockNumber && (await getBlock(txReceipt.blockNumber))

  if (!txReceipt || !tx || !block) {
    notFound()
  }

  const nativeTx = tx.data === "0x" ? true : false

  let transfersData: TransferData[] = []
  if (!nativeTx) {
    transfersData = await decodeERC20Transfer(txReceipt)
  }

  const { timestamp } = block

  const transactionFee = Utils.formatEther(
    BigNumber.from(txReceipt.effectiveGasPrice).mul(
      BigNumber.from(txReceipt.gasUsed)
    )
  )

  const transactionValue = Utils.formatEther(tx.value)

  return (
    <div className="px-2 mx-auto my-6 space-y-12 sm:container">
      <h4 className="text-xl font-semibold tracking-tight">
        Transaction Details
      </h4>
      <Card className="p-5 space-y-5 text-sm font-medium leading-none break-all">
        {/* Transaction Hash */}
        <div className="flex-row items-center md:flex">
          <div className="basis-1/4 text-muted-foreground">
            Transaction Hash:
          </div>
          <div className="flex items-center space-x-2">
            <div className="break-all">{txReceipt?.transactionHash}</div>
            <CopyButton
              value={txReceipt?.transactionHash}
              tooltipText="Copy TxHash"
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex-row items-center md:flex">
          <p className="basis-1/4 text-muted-foreground">Status:</p>
          <StatusBadge txStatus={txReceipt.status!} />
        </div>

        {/* Block */}
        <div className="flex-row items-center md:flex">
          <p className="basis-1/4 text-muted-foreground">Block:</p>
          <div className="flex items-center gap-1">
            <Hourglass size={14} className="text-muted-foreground" />
            <Link
              href={`/block/${txReceipt.blockNumber}`}
              className="text-sky-400"
            >
              {txReceipt.blockNumber}
            </Link>
            <TooltipBadge
              text={`${txReceipt.confirmations} Block Confirmations`}
              tooltip="Number of blocks produced since"
            />
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
              {timeFromNow(timestamp)} ({formatTimestamp(timestamp)})
            </div>
          </div>
        </div>

        {/* From */}
        <div className="flex-row items-center md:flex">
          <p className="basis-1/4 text-muted-foreground">From:</p>
          <div className="flex items-center space-x-2">
            <Link href={`/address/${txReceipt.from}`} className="text-sky-400">
              {txReceipt.from}
            </Link>
            <CopyButton value={txReceipt.from} tooltipText="Copy Address" />
          </div>
        </div>

        {/* To */}
        <div className="flex-row items-center md:flex">
          <p className="basis-1/4 text-muted-foreground">
            {nativeTx ? "To:" : "Interacted With (To):"}
          </p>
          <div className="flex items-center space-x-2">
            <Link href={`/address/${txReceipt.to}`} className="text-sky-400">
              {txReceipt.to}{" "}
            </Link>
            {!nativeTx && (
              <span>
                ({transfersData[0].metadata.symbol}:{" "}
                {transfersData[0].metadata.name})
              </span>
            )}
            <CopyButton value={txReceipt.to} tooltipText="Copy Address" />
          </div>
        </div>

        {/* ERC-20 Tokens Transferred */}
        {!nativeTx && <TokensTransfer transfersData={transfersData} />}

        {/* Value */}
        <div className="flex-row items-center md:flex">
          <p className="basis-1/4 text-muted-foreground">Value:</p>
          <div className="flex items-center space-x-1">
            <FaEthereum className="text-muted-foreground" />
            <span>{transactionValue} ETH</span>
            <TooltipBadge
              text={`$${(Number(transactionValue) * price.ethereum.usd).toFixed(
                2
              )}`}
              tooltip="Estimated value in todays value"
            />
          </div>
        </div>

        {/* Transaction Fee */}
        <div className="flex-row items-center md:flex">
          <p className="basis-1/4 text-muted-foreground">Transaction Fee:</p>
          <div className="flex items-center space-x-1">
            <div>{transactionFee} ETH</div>
            <TooltipBadge
              text={`$${(Number(transactionFee) * price.ethereum.usd).toFixed(
                2
              )}`}
              tooltip="Estimated txn fee in todays value"
            />
          </div>
        </div>

        {/* Gas Price */}
        <div className="flex-row items-center md:flex">
          <p className="basis-1/4 text-muted-foreground">Gas Price:</p>
          <div className="flex space-x-1">
            <p>{Utils.formatUnits(txReceipt.effectiveGasPrice, "gwei")} Gwei</p>
            <p className="text-muted-foreground">
              ({Utils.formatEther(txReceipt.effectiveGasPrice)} ETH)
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
export default Page
