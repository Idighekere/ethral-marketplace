import { generateMetadata } from '@/lib/seo'
import { JOIN_BRAND_SEO } from '@/lib/seo/pages'

export const metadata = generateMetadata(JOIN_BRAND_SEO)

export default function BrandJoinLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
