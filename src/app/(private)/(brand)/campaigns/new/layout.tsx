import { generateMetadata } from '@/lib/seo'
import { CAMPAIGN_NEW_SEO } from '@/lib/seo/pages'

export const metadata = generateMetadata(CAMPAIGN_NEW_SEO)

export default function CampaignNewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
