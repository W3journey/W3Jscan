"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { isAddress, isHexString } from "ethers"
import { Search } from "lucide-react"

import { isBlockNumber } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("")
  const router = useRouter()
  const { toast } = useToast()
  const searchInputRef = useRef(null)

  const onSearch = () => {
    const trimmedInput = searchInput.trim()
    const isValidAddress = isAddress(trimmedInput)
    const isValidTxHash = isHexString(trimmedInput, 32)
    const isValidBlockNumber = isBlockNumber(trimmedInput)

    try {
      if (isValidAddress) {
        router.push(`/address/${trimmedInput}`)
      }

      if (isValidTxHash) {
        router.push(`/tx/${trimmedInput}`)
      }

      if (isValidBlockNumber) {
        router.push(`/block/${trimmedInput}`)
      }

      if (!isValidAddress && !isValidTxHash && !isValidBlockNumber) {
        throw new Error(
          "Please enter a valid address, transaction hash or  block number."
        )
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Invalid Input",
          description: error.message,
          variant: "destructive",
        })
      }
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onSearch()
    }
  }

  return (
    <div className="relative flex items-center justify-center w-full max-w-3xl">
      <Input
        placeholder="Search by Address / Txn Hash / Block"
        className="mx-4"
        ref={searchInputRef}
        onKeyUp={handleKeyPress}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-0 rounded-l-none right-4 bg-cyan-500 text-neutral-100 hover:bg-cyan-600 hover:text-neutral-100"
        onClick={onSearch}
      >
        <Search />
      </Button>
    </div>
  )
}
export default SearchBar
