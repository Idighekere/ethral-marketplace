import { BrandHeader } from "@/components/brand"

export default function InfluencersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BrandHeader />
      <main className="py-5 sm:py-10 lg:py-16">
        {children}
      </main>
    </>
  )
}
