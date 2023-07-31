import { Card, CardContent } from "@/components/ui/card"
import { BsInboxes } from "react-icons/bs"

const NoMatch = () => {
  return (
    <div className="space-y-12 ">
      <Card>
        <CardContent className="flex flex-col items-center justify-center space-y-2 pt-28">
          <div className="flex items-center justify-center w-16 h-16 border-2 border-yellow-200 rounded-full bg-yellow-50">
            <BsInboxes className="text-yellow-600" />
          </div>
          <h5 className="text-xl font-semibold tracking-tight">
            There are no matching entries
          </h5>
          <p className="text-sm break-all text-muted-foreground">
            Please try again later
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
export default NoMatch
