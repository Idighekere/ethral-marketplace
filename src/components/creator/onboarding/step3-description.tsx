'use client'

import { useState } from 'react'
import { StepLayout } from './step-layout'
import { useCreatorOnboarding } from '@/store/creatorOnboardingContext'
import { Textarea } from '@/components/ui/textarea'


interface Step3DescriptionProps {
  onContinue: () => void
  onBack: () => void
}

export function Step3Description ({
  onContinue,
  onBack
}: Step3DescriptionProps) {
  const { state, updateDescription } = useCreatorOnboarding()
  const [error, setError] = useState<string | null>(null)

  const handleContinue = () => {
    if (!state.description.trim()) {
      setError('Please enter a description about yourself and your content')
      return
    }

    if (state.description.length > 500) {
      setError('Description should be less than 500 characters')
      return
    }

    onContinue()
  }

  return (
    <StepLayout
      currentStep={3}
      totalSteps={11}
      onContinue={handleContinue}
      onBack={onBack}
      showBackButton={true}
      showViewExampleButton={true}
      title='Describe yourself and your content'
    >
      <div className='space-y-4'>
        <div className='space-y-2'>
          {/* <Label htmlFor='description'>About Me</Label> */}
          <Textarea
            id='description'
            value={state.description}
            onChange={e => {
              updateDescription(e.target.value)
              setError(null)
            }}
            placeholder='Who are you and what type of content do your create? who is your audience? Be specific as this will help you show up in searches.'
            className='bg-transparent border-[0.5px] border-[#CDCDCD] min-h-[150px] placeholder:text-white/60'
          />
          {error && <p className='text-red-500 text-sm'>{error}</p>}
        </div>

        <p className='text-sm text-gray-400'>
          Characters: {state.description.length}/500
        </p>
      </div>
    </StepLayout>
  )
}
