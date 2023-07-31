"use client"

import { useEffect, useState } from "react"
import { Files, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface CopyButtonProps {
  value: string
  tooltipText: string
}

const CopyButton: React.FC<CopyButtonProps> = ({ value, tooltipText }) => {
  const [copied, setCopied] = useState(false)

  const onCopy = () => {
    navigator.clipboard.writeText(value).then(() => setCopied(true))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (copied === true) {
        setCopied(false)
      }
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [copied])

  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="w-4 h-4 text-muted-foreground hover:text-cyan-500"
            variant="ghost"
            size="icon"
            onClick={onCopy}
          >
            {copied ? <Check /> : <Files />}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-foreground text-background">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default CopyButton
