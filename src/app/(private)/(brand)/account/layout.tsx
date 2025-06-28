import { generateMetadata } from '@/lib/seo'
import { ACCOUNT_SEO } from '@/lib/seo/pages'
import AccountClientLayout from './client-layout'

export const metadata = generateMetadata(ACCOUNT_SEO)

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AccountClientLayout>{children}</AccountClientLayout>
}
