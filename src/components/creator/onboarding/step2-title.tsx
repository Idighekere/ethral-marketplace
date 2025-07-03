'use client'

import { useState } from 'react'
import { StepLayout } from './step-layout'
import { useCreatorOnboarding } from '@/store/creatorOnboardingContext'
import { Input } from '@/components/ui/input'

interface Step2TitleProps {
  onContinue: () => void
  onBack: () => void
}

export function Step2Title ({ onContinue, onBack }: Step2TitleProps) {
  const { state, updateTitle } = useCreatorOnboarding()
  const [error, setError] = useState<string | null>(null)

  const handleContinue = () => {
    if (!state.title.trim()) {
      setError('Please enter a title for your profile')
      return
    }

    if (state.title.length > 50) {
      setError('Title should be less than 50 characters')
      return
    }

    onContinue()
  }

  return (
    <StepLayout
      currentStep={2}
      totalSteps={11}
      onContinue={handleContinue}
      onBack={onBack}
      showBackButton={true}
      showViewExampleButton={true}
      title='Summarize yourself, this is your title shown on your profile'
      description=''
    >
      <div className='space-y-4'>
        <div className='space-y-2'>
          {/* <Label htmlFor='title'>Profile Title</Label> */}
          <Input
            id='title'
            value={state.title}
            onChange={e => {
              updateTitle(e.target.value)
              setError(null)
            }}
            placeholder='e.g. Solana Maxi'
            className='bg-transparent border-[0.5px] border-[#CDCDCD]'
          />
          {error && <p className='text-red-500 text-sm'>{error}</p>}
        </div>

        <p className='text-sm text-gray-400'>
          Characters: {state.title.length}/50
        </p>
      </div>
    </StepLayout>
  )
}
