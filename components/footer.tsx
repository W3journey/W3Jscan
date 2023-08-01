import Image from "next/image"
import Link from "next/link"
import { SiGithub, SiTwitter } from "react-icons/si"

const Footer = () => {
  return (
    <footer className="container flex-row items-center justify-between gap-1 pt-3 mx-auto mb-6 border-t md:flex">
      <div className="text-xs break-words md:text-sm text-muted-foreground">
        &copy; 2023 Web3Journey
      </div>

      <div className="flex items-center space-x-2 space-y-1 md:inline-block md:space-x-0">
        <h1 className="text-xs md:text-sm text-muted-foreground">Powered by</h1>
        <div className="flex items-center justify-between">
          <Link
            href={"https://www.alchemy.com/"}
            rel="noreferrer"
            target="_blank"
            className="relative w-6 h-6 md:w-8 md:h-8"
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
            className="relative w-6 h-6 md:w-8 md:h-8"
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

      <div className="flex items-center justify-start space-x-2 md:justify-between">
        <Link
          href={"https://github.com/W3journey"}
          rel="noreferrer"
          target="_blank"
        >
          <SiGithub className="w-4 h-4 md:w-6 md:h-6 text-muted-foreground opacity-60" />
        </Link>
        <Link
          href={"https://twitter.com/w3journey"}
          rel="noreferrer"
          target="_blank"
        >
          <div className="w-6 h-6 dark:opacity-60 group">
            <SiTwitter className="w-5 h-5 md:w-6 md:h-6 text-[#1D9BF0]  group-hover:hidden" />
            <div className="hidden w-5 h-5 pt-1 pl-0.5 group-hover:inline-block">
              <svg
                viewBox="0 0 1200 1227"
                xmlns="http://www.w3.org/2000/svg"
                role="none"
                fill="var(--svg-fill-color)"
              >
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </footer>
  )
}
export default Footer
