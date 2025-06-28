import { generateMetadata } from '@/lib/seo'
import { TRACK_SEO } from '@/lib/seo/pages'

export const metadata = generateMetadata(TRACK_SEO)

export default function TrackLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
