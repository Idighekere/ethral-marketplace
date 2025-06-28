import { generateMetadata } from '@/lib/seo'
import { ACCOUNT_SETTINGS_SEO } from '@/lib/seo/pages'

export const metadata = generateMetadata(ACCOUNT_SETTINGS_SEO)

export default function AccountSettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
