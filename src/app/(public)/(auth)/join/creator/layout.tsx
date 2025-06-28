import { generateMetadata } from '@/lib/seo'
import { JOIN_CREATOR_SEO } from '@/lib/seo/pages'

export const metadata = generateMetadata(JOIN_CREATOR_SEO)

export default function CreatorJoinLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
