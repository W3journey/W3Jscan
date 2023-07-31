import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto bg-right bg-local bg-[url(/404.svg)] bg-no-repeat min-h-screen flex flex-col items-start justify-center">
      <div className="flex flex-col space-y-4 text-left">
        <h2 className="text-3xl font-semibold tracking-tight text-muted-foreground">
          Sorry! the page you are looking for was not found.
        </h2>
        <p className="pb-6 text-sm text-muted-foreground">
          Could not find requested resource
        </p>
        <Link
          href={"/"}
          className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md bg-cyan-500 text-primary-foreground hover:bg-cyan-500/90 w-fit"
        >
          Back Home
        </Link>
      </div>
      <Link
        href={"https://storyset.com/web"}
        target="_blank"
        rel="noreferrer"
        className="fixed right-2 bottom-2"
      >
        Web illustrations by Storyset
      </Link>
    </div>
  )
}
