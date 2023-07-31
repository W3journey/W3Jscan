import { cn } from "@/lib/utils"
import { IPrice } from "@/types/coingecko"

async function getPriceData(): Promise<IPrice> {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true",
    { next: { revalidate: 60 * 15 } }
  )

  if (!res.ok) {
    console.log("[txHash] Failed to fetch Ethereum Price")
    throw new Error("Failed to fetch Ethereum Price")
  }

  return res.json()
}

const PriceDisplay = async () => {
  const priceData = await getPriceData()

  return (
    <div className="hidden gap-1 text-xs font-medium leading-none text-muted-foreground md:flex">
      <div>ETH Price:</div>
      <div className="text-sky-400">${priceData.ethereum.usd}</div>
      <div
        className={cn(
          "",
          priceData.ethereum.usd_24h_change > 0
            ? "text-green-500"
            : "text-red-500"
        )}
      >
        ({priceData.ethereum.usd_24h_change.toFixed(2)}%)
      </div>
    </div>
  )
}
export default PriceDisplay
