'use client'

import {
  CampaignTargeting,
  CampaignPricing,
  CampaignDetails
} from '@/components/campaign'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import React from 'react'

const CampaignLaunchPage = ({ params }: { params: Promise<{ id: string }> }) => {
  // Unwrap params using React.use()
  const resolvedParams = React.use(params)
  const { id } = resolvedParams

  const router = useRouter()
  const searchParams = useSearchParams()
  const step = searchParams.get('t') ? parseInt(searchParams.get('t') as string) : 1

  // Redirect to step 1 if no step parameter is provided
  useEffect(() => {
    if (!searchParams.get('t')) {
      router.replace(`/campaigns/${id}/launch?t=1`)
    }
  }, [searchParams, router, id])
  // Navigate to the next step
  const goToNextStep = () => {
    if (step < 3) {
      router.push(`/campaigns/${id}/launch?t=${step + 1}`)
    } else {
      // Final step completed, redirect to creator dashboard or profile
      router.push('/campaigns') //TODO: Create a Campaign list page or a page to route to on form submission
    }
  }

  // Navigate to the previous step
  const goToPreviousStep = () => {
    if (step > 1) {
      router.push(`/campaigns/${id}/launch?t=${step - 1}`)
    }
  }    // Render the appropriate step component based on the current step
    const renderStep = () => {
      switch(step) {
        case 1:
          return <CampaignTargeting onContinue={goToNextStep}/>
        case 2:
          return <CampaignPricing onContinue={goToNextStep} />
        case 3:
          return <CampaignDetails onContinue={goToNextStep} onBack={goToPreviousStep} campaignId={id}/>
        default:
          return <CampaignTargeting onContinue={goToNextStep}/>
      }
    }

    return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-20">
      <div className="w-full">
       {renderStep()}
      </div>
    </div>
  )
}

export default CampaignLaunchPage
