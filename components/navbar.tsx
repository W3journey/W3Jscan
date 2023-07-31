import PriceDisplay from "@/components/price-display"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="border-b">
      <div className="container flex items-center justify-between mx-auto">
        <Link
          className="flex items-center text-2xl font-semibold tracking-tight transition-colors"
          href={"/"}
        >
          <div className="relative w-16 h-16">
            <Image
              fill
              src={"/Web3Journey.ico"}
              alt="Web3Journey Logo"
              className="object-contain"
            />
          </div>
          W3Jscan
        </Link>
        <PriceDisplay />
        <ThemeToggle />
      </div>
    </div>
  )
}
export default Navbar
