import SearchBar from "@/components/search-bar"

export default function BlockLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="container flex justify-center py-4 mx-auto">
        <SearchBar />
      </div>
      {children}
    </section>
  )
}
