"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { HelpCircle } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { OwnedToken } from "alchemy-sdk"
import { isSpamToken } from "@/lib/utils"

interface TokenSelectProps {
  data: OwnedToken[]
}

const TokenSelect: React.FC<TokenSelectProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <Skeleton className="w-full h-10 border rounded-md border-input animate-pulse" />
    )
  }

  const filteredTokens = data.filter((token) => {
    return !isSpamToken(token)
  })

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={`(${filteredTokens.length} Tokens)`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="space-y-2">
          <SelectLabel>
            <Input placeholder="Search for Token Name" />
          </SelectLabel>
          <ScrollArea className="h-96">
            <div className="mb-2 space-y-2">
              {filteredTokens.map((token) => {
                return (
                  <div
                    key={token.contractAddress}
                    className="px-2 mx-5 border-b rounded-md hover:bg-accent hover:cursor-pointer"
                    onClick={() =>
                      router.push(`/address/${token.contractAddress}`)
                    }
                  >
                    <div className="flex items-center gap-1">
                      <div className="relative w-4 h-4">
                        {token.logo ? (
                          <Image
                            className="object-cover"
                            src={token.logo}
                            alt={`${token.symbol} logo`}
                            fill
                          />
                        ) : (
                          <HelpCircle className="w-4 h-4" />
                        )}
                      </div>
                      <span>{token.name}</span>
                      <span>({token.symbol})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{token.balance}</span>
                      <span>{token.symbol}</span>
                    </div>
                  </div>
                )
              })}
              <p className="text-sm text-center text-muted-foreground">
                Tokens considered spam are automatically filtered out
              </p>
            </div>
          </ScrollArea>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
export default TokenSelect
