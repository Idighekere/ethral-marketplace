import { generateMetadata } from '@/lib/seo'
import { EDIT_PROFILE_SEO } from '@/lib/seo/pages'
import EditProfileClientLayout from './client-layout'

export const metadata = generateMetadata(EDIT_PROFILE_SEO)

export default function EditProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <EditProfileClientLayout>{children}</EditProfileClientLayout>
}
