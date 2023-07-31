import SearchBar from "@/components/search-bar"

export default function TxLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="flex justify-center py-4 mx-auto md:container">
        <SearchBar />
      </div>
      {children}
    </section>
  )
}
