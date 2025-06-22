'use client'

import { StepLayout } from './step-layout'
import { Button } from '@/components/ui/button'
// import { TwitterLogoIcon } from 'lucid-react'

interface Step11ConnectProps {
  onContinue: () => void
  onBack: () => void
}

export function Step11Connect ({ onContinue, onBack }: Step11ConnectProps) {
  const handleConnectX = () => {
    // In a real app, you would initiate OAuth flow with X
    // For this demo, we'll just proceed to the next step
    onContinue()
  }

  return (
    <StepLayout
      currentStep={11}
      totalSteps={11}
      onContinue={onContinue}
      onBack={onBack}
      showBackButton={true}
      title='Last step! Become a Trusted Creator'
      continueButtonText='Skip for now'
      description=" Don't worry, it's free to use Ethral and you won't be charged for
            signing up. &nbsp;   We collect this information to show brands that you are a trusted
            creator, and that you won't steal their products or waste their
            time."
    >
      <div className='space-y-8'>

        <div className='flex justify-center'>
          <Button
            onClick={handleConnectX}
            className='flex items-center space-x-3  h-10 font-medium text-base'
          >
            {/* <TwitterLogoIcon className="w-5 h-5" /> */}
            <span>Connect X Account</span>
          </Button>
        </div>
      </div>
    </StepLayout>
  )
}
