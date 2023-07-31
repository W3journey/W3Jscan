import Link from "next/link"

import { truncateAddress } from "@/lib/utils"
import { TransferData } from "@/action/decode-erc20-transfer"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { HelpCircle } from "lucide-react"

interface TokensTransferProps {
  transfersData: TransferData[]
}

const TokensTransfer: React.FC<TokensTransferProps> = ({ transfersData }) => {
  return (
    <div className="flex-row items-center md:flex">
      <div className="basis-1/4 text-muted-foreground">
        ERC-20 Tokens Transferred:
        {transfersData.length > 1 && (
          <Badge variant="secondary">{transfersData.length}</Badge>
        )}
      </div>
      <div className="space-y-1">
        {transfersData.map((transfer) => (
          <div key={transfer.amount} className="flex items-center space-x-1">
            <span className="font-bold">From</span>
            <Link href={`/address/${transfer.from}`} className="text-sky-400">
              {truncateAddress(transfer.from)}
            </Link>
            <span className="font-bold">To</span>
            <Link href={`/address/${transfer.to}`} className="text-sky-400">
              {truncateAddress(transfer.to)}
            </Link>
            <span className="font-bold">For</span>
            <span>{transfer.amount}</span>
            <div className="relative w-5 h-5">
              {transfer.metadata.logo ? (
                <Image
                  src={transfer.metadata.logo}
                  alt={`${transfer.metadata.symbol} logo`}
                  fill
                  className="object-cover"
                />
              ) : (
                <HelpCircle className="w-4 h-4" />
              )}
            </div>
            <Link
              href={`/address/${transfer.contractAddress}`}
              className="text-sky-400"
            >
              {transfer.metadata.name}
            </Link>
            <span className="text-muted-foreground">
              {transfer.metadata.symbol}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
export default TokensTransfer
