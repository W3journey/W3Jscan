import Image from "next/image"
import Link from "next/link"
import { SiGithub, SiTwitter } from "react-icons/si"

const Footer = () => {
  return (
    <footer className="container flex items-center justify-between pt-3 mx-auto mb-6 border-t">
      <div className="text-sm text-muted-foreground">
        &copy; 2023 Web3Journey
      </div>

      <div className="space-y-1">
        <h1 className="text-sm text-muted-foreground">Powered by</h1>
        <div className="flex items-center justify-between">
          <Link
            href={"https://www.alchemy.com/"}
            className="relative w-8 h-8"
            rel="noreferrer"
            target="_blank"
          >
            <Image
              src={"/alchemy-mark-blue-gradient.svg"}
              alt="Alchemy Logo"
              className="dark:opacity-70"
              fill
            />
          </Link>
          <Link
            href={"https://www.coingecko.com/"}
            rel="noreferrer"
            target="_blank"
            className="relative w-8 h-8"
          >
            <Image
              src={"/CoinGecko-Logo.svg"}
              alt="CoinGecko Logo"
              fill
              className="object-cover dark:opacity-70"
            />
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between space-x-2">
        <Link
          href={"https://github.com/W3journey"}
          rel="noreferrer"
          target="_blank"
        >
          <SiGithub className="w-6 h-6 text-muted-foreground opacity-60" />
        </Link>
        <Link
          href={"https://twitter.com/w3journey"}
          rel="noreferrer"
          target="_blank"
        >
          <SiTwitter className="w-6 h-6 text-muted-foreground opacity-60" />
        </Link>
      </div>
    </footer>
  )
}
export default Footer
