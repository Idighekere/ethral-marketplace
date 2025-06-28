import { generateMetadata } from '@/lib/seo'
import { BILLING_SEO } from '@/lib/seo/pages'

export const metadata = generateMetadata(BILLING_SEO)

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
