import { BrandHeader } from "@/components/brand"
import { generateMetadata } from '@/lib/seo'
import { INFLUENCERS_SEO } from '@/lib/seo/pages'

export const metadata = generateMetadata(INFLUENCERS_SEO)

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
