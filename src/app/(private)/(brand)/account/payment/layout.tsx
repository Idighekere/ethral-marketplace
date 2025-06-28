import { generateMetadata } from '@/lib/seo'
import { ACCOUNT_PAYMENT_SEO } from '@/lib/seo/pages'

export const metadata = generateMetadata(ACCOUNT_PAYMENT_SEO)

export default function AccountPaymentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
