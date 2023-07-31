import { Utils } from "alchemy-sdk"
import { FaEthereum } from "react-icons/fa"
import { IPrice } from "@/types/coingecko"

import { getBalance } from "@/action/getBalance"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TokenSelect from "./token-select"
import { isAddress } from "ethers"
import { getTokensForOwner } from "@/action/get-tokens-for-owner"

export const revalidate = 60

async function getPriceData(): Promise<IPrice> {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true",
    { next: { revalidate: 60 * 15 } }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch Ethereum Price")
  }

  return res.json()
}

async function getBalanceData(address: string) {
  const accountBalance = await getBalance(address)

  if (!accountBalance) {
    throw new Error("Failed to get Account Balance")
  }

  return accountBalance
}

async function fetchTokensForOwner(address: string) {
  const tokenData = await getTokensForOwner(address)
  return tokenData
}

interface OverviewCardProps {
  address: string
}

const OverviewCard: React.FC<OverviewCardProps> = async ({ address }) => {
  const isValidAddress = isAddress(address)

  const balanceData = isValidAddress && getBalanceData(address)
  const tokensData = fetchTokensForOwner(address)
  const priceData = getPriceData()

  const [_balance, price, tokens] = await Promise.all([
    balanceData,
    priceData,
    tokensData,
  ])

  const balance = _balance ? Utils.formatEther(_balance) : "0"

  const accountEthValue =
    _balance && price ? (Number(balance) * price.ethereum.usd).toFixed(2) : "0"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium leading-none">
          Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 text-sm font-medium">
        <div className="space-y-1">
          <div className="text-sm font-medium leading-none text-muted-foreground">
            ETH BALANCE
          </div>
          <div className="flex items-center">
            <FaEthereum className="text-muted-foreground" />
            <span>{balance} ETH</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-sm font-medium leading-none text-muted-foreground">
            ETH VALUE
          </div>
          <div className="space-x-1">
            <span>${accountEthValue}</span>
            <span className="text-muted-foreground">
              (@ ${price.ethereum.usd}/ETH)
            </span>
          </div>
        </div>

        {tokens ? (
          <div className="space-y-1">
            <div className="text-sm font-medium leading-none text-muted-foreground">
              TOKEN HOLDINGS
            </div>
            {/* TOKEN DROPDOWN */}
            <TokenSelect data={tokens.tokens} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
export default OverviewCard
