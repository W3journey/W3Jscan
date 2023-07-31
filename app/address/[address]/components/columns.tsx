"use client"

import Link from "next/link"
import { AssetTransfersWithMetadataResult } from "alchemy-sdk"
import { getNumber } from "ethers"
import { formatDistanceToNow } from "date-fns"
import { ChevronDown, ChevronUp } from "lucide-react"

import { ColumnDef } from "@tanstack/react-table"
import { shortenHash, truncateAddress } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export const columns: ColumnDef<AssetTransfersWithMetadataResult>[] = [
  {
    accessorKey: "hash",
    header: "Transaction Hash",
    cell: ({ row }) => (
      <Link href={`/tx/${row.getValue("hash")}`} className="text-sky-400">
        {shortenHash(row.getValue("hash"))}
      </Link>
    ),
  },
  {
    accessorKey: "blockNum",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Block
          {{
            asc: <ChevronUp className="ml-2" size={18} />,
            desc: <ChevronDown className="ml-2" size={18} />,
          }[column.getIsSorted() as string] ?? null}
        </Button>
      )
    },
    cell: ({ row }) => (
      <Link
        href={`/block/${getNumber(row.getValue("blockNum"))}`}
        className="text-sky-400"
      >
        {getNumber(row.getValue("blockNum"))}
      </Link>
    ),
  },
  {
    accessorKey: "metadata.blockTimestamp",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Age
          {{
            asc: <ChevronUp className="ml-2" size={18} />,
            desc: <ChevronDown className="ml-2" size={18} />,
          }[column.getIsSorted() as string] ?? null}
        </Button>
      )
    },
    cell: ({ row }) => {
      const age = new Date(row.original.metadata.blockTimestamp)
      const formattedAge = formatDistanceToNow(age)
      return <div>{formattedAge}</div>
    },
  },
  {
    accessorKey: "from",
    header: "From",
    cell: ({ row }) => (
      <Link href={`/address/${row.getValue("from")}`} className="text-sky-500">
        {truncateAddress(row.getValue("from"))}
      </Link>
    ),
  },
  {
    accessorKey: "to",
    header: "To",
    cell: ({ row }) => (
      <div>
        {row.getValue("to") ? (
          <Link
            href={`/address/${row.getValue("to")}`}
            className="text-sky-500"
          >
            {truncateAddress(row.getValue("to"))}
          </Link>
        ) : (
          <span>Unknown</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          {{
            asc: <ChevronUp className="ml-2" size={18} />,
            desc: <ChevronDown className="ml-2" size={18} />,
          }[column.getIsSorted() as string] ?? null}
        </Button>
      )
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value
          {{
            asc: <ChevronUp className="ml-2" size={18} />,
            desc: <ChevronDown className="ml-2" size={18} />,
          }[column.getIsSorted() as string] ?? null}
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex gap-1">
        <span>{Number(row.getValue("value")).toFixed(8)}</span>
        <span>{row.original.asset ? row.original.asset : "Unknown"}</span>
      </div>
    ),
  },
]
