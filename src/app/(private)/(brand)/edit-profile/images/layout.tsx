import { generateMetadata } from '@/lib/seo'
import { EDIT_PROFILE_IMAGES_SEO } from '@/lib/seo/pages'

export const metadata = generateMetadata(EDIT_PROFILE_IMAGES_SEO)

export default function EditProfileImagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
