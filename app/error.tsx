"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center h-full gap-6 py-10">
        <h2>{error.message}</h2>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => reset()}>
            Try again
          </Button>
          <Button variant="default" onClick={() => router.push("/")}>
            Back Home
          </Button>
        </div>
      </div>
    </div>
  )
}
