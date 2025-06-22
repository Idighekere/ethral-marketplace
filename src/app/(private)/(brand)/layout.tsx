import { BrandHeader } from "@/components/brand"

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BrandHeader />
      <main className="mx-auto p-5 pb-10 sm:p-10 lg:p-16 ">
        {children}
      </main>
    </>
  )
}
