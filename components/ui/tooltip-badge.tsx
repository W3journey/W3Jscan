import { VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

import { Badge, badgeVariants } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TooltipBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  text: string
  tooltip: string
}

const TooltipBadge = ({
  className,
  variant = "secondary",
  text,
  tooltip,
}: TooltipBadgeProps) => {
  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant={variant}
            className={cn("hover:cursor-default", className)}
          >
            {text}
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="bg-foreground text-background">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default TooltipBadge
