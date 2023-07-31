import SearchBar from "@/components/search-bar"

export default function AddressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="container flex justify-center mx-auto mt-2">
        <SearchBar />
      </div>
      {children}
    </section>
  )
}
