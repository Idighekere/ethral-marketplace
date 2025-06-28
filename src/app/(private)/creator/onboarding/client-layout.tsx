'use client'

import { CreatorOnboardingProvider } from '@/store/creatorOnboardingContext'
import { OnboardingHeader } from '@/components/creator/onboarding'
import { ReactNode, Suspense } from 'react'

// Loading component for the Suspense boundary
const OnboardingLoading = () => {
  return (
    <div className='w-full h-[80vh] flex items-center justify-center'>
      <div className='text-white text-xl'>Loading onboarding steps...</div>
    </div>
  )
}

export default function CreatorOnboardingClientLayout ({
  children
}: {
  children: ReactNode
}) {
  return (
    <CreatorOnboardingProvider>
      <div className='min-h-screen flex flex-col bg-black'>
        <OnboardingHeader />
        <main className='flex-1'>
          <Suspense fallback={<OnboardingLoading />}>{children}</Suspense>
        </main>
      </div>
    </CreatorOnboardingProvider>
  )
}
