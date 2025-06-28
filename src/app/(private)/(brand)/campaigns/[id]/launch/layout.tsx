import { generateMetadata } from '@/lib/seo'
import { CAMPAIGN_LAUNCH_SEO } from '@/lib/seo/pages'

export const metadata = generateMetadata(CAMPAIGN_LAUNCH_SEO)

export default function CampaignLaunchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
