import { generateMetadata } from '@/lib/seo'
import { CAMPAIGNS_SEO } from '@/lib/seo/pages'

export const metadata = generateMetadata(CAMPAIGNS_SEO)

export default function CampaignsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
