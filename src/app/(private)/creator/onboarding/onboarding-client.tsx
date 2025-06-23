'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Step1Location } from '@/components/creator/onboarding/step1-location'
import { Step2Title } from '@/components/creator/onboarding/step2-title'
import { Step3Description } from '@/components/creator/onboarding/step3-description'
import { Step4Gender } from '@/components/creator/onboarding/step4-gender'
import { Step5XDetails } from '@/components/creator/onboarding/step5-x-details'
import { Step6ContentType } from '@/components/creator/onboarding/step6-content-type'
import { Step7Images } from '@/components/creator/onboarding/step7-images'
import { Step8Packages } from '@/components/creator/onboarding/step8-packages'
import { Step9Mobile } from '@/components/creator/onboarding/step9-mobile'
import { Step10Verification } from '@/components/creator/onboarding/step10-verification'
import { Step11Connect } from '@/components/creator/onboarding/step11-connect'

export default function OnboardingClientPage () {
  const router = useRouter()
  const searchParams = useSearchParams()
  const step = searchParams.get('t')
    ? parseInt(searchParams.get('t') as string)
    : 1

  // Redirect to step 1 if no step parameter is provided
  useEffect(() => {
    if (!searchParams.get('t')) {
      router.replace('/creator/onboarding?t=1')
    }
  }, [searchParams, router])

  // Navigate to the next step
  const goToNextStep = () => {
    if (step < 11) {
      router.push(`/creator/onboarding?t=${step + 1}`)
    } else {
      // Final step completed, redirect to creator dashboard or profile
      router.push('/creator/dashboard')
    }
  }

  // Navigate to the previous step
  const goToPreviousStep = () => {
    if (step > 1) {
      router.push(`/creator/onboarding?t=${step - 1}`)
    }
  }

  // Render the appropriate step component based on the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Location onContinue={goToNextStep} />
      case 2:
        return (
          <Step2Title onContinue={goToNextStep} onBack={goToPreviousStep} />
        )
      case 3:
        return (
          <Step3Description
            onContinue={goToNextStep}
            onBack={goToPreviousStep}
          />
        )
      case 4:
        return (
          <Step4Gender onContinue={goToNextStep} onBack={goToPreviousStep} />
        )
      case 5:
        return (
          <Step5XDetails onContinue={goToNextStep} onBack={goToPreviousStep} />
        )
      case 6:
        return (
          <Step6ContentType
            onContinue={goToNextStep}
            onBack={goToPreviousStep}
          />
        )
      case 7:
        return (
          <Step7Images onContinue={goToNextStep} onBack={goToPreviousStep} />
        )
      case 8:
        return (
          <Step8Packages onContinue={goToNextStep} onBack={goToPreviousStep} />
        )
      case 9:
        return (
          <Step9Mobile onContinue={goToNextStep} onBack={goToPreviousStep} />
        )
      case 10:
        return (
          <Step10Verification
            onContinue={goToNextStep}
            onBack={goToPreviousStep}
          />
        )
      case 11:
        return (
          <Step11Connect onContinue={goToNextStep} onBack={goToPreviousStep} />
        )
      default:
        return <Step1Location onContinue={goToNextStep} />
    }
  }

  return <div className='text-white'>{renderStep()}</div>
}
