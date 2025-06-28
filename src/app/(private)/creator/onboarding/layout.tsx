import { generateMetadata } from '@/lib/seo'
import { CREATOR_ONBOARDING_SEO } from '@/lib/seo/pages'
import CreatorOnboardingClientLayout from './client-layout'

export const metadata = generateMetadata(CREATOR_ONBOARDING_SEO)

export default function CreatorOnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen">
      <CreatorOnboardingClientLayout>
      {children}
      </CreatorOnboardingClientLayout>
    </main>
  )
}
