import { Suspense } from 'react'
import OnboardingClientPage from './onboarding-client'

export default function CreatorOnboardingPage() {
  return (
   <Suspense fallback={<div className="text-white text-center p-10">Loading...</div>}>
      <OnboardingClientPage />
    </Suspense>
  )
}
