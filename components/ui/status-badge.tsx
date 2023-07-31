import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CheckCircle2, XCircle } from "lucide-react"

interface StatusBadgeProps {
  txStatus: number
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ txStatus }) => {
  const status = txStatus === 1 ? "success" : "fail"

  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant={txStatus === 1 ? "success" : "destructive"}
            className="items-center space-x-1 capitalize"
          >
            {status === "success" ? (
              <CheckCircle2 size={14} />
            ) : (
              <XCircle size={14} />
            )}
            <span>{status}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="bg-foreground text-background">
          <p>Only applicable for Post Byzantium blocks</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default StatusBadge
