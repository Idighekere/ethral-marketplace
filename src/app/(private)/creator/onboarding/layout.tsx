'use client'

import { CreatorOnboardingProvider } from '@/store/creatorOnboardingContext'
import { OnboardingHeader } from '@/components/creator/onboarding'
import { ReactNode } from 'react'

export default function CreatorOnboardingLayout ({
  children
}: {
  children: ReactNode
}) {
  return (
    <CreatorOnboardingProvider>
      <div className="min-h-screen flex flex-col bg-black">
        <OnboardingHeader />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </CreatorOnboardingProvider>
  )
}
