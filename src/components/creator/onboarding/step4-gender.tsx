'use client'

import { useState } from 'react'
import { StepLayout } from './step-layout'
import { useCreatorOnboarding } from '@/store/creatorOnboardingContext'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface Step4GenderProps {
  onContinue: () => void
  onBack: () => void
}

export function Step4Gender ({ onContinue, onBack }: Step4GenderProps) {
  const { state, updateGender } = useCreatorOnboarding()
  const [error, setError] = useState<string | null>(null)

  const handleContinue = () => {
    if (!state.gender) {
      setError('Please select your gender')
      return
    }

    onContinue()
  }

  return (
    <StepLayout
      currentStep={4}
      totalSteps={11}
      onContinue={handleContinue}
      onBack={onBack}
      showBackButton={true}
      title="What's your gender?"
    >
      <div className='space-y-6'>
        <RadioGroup
          value={state.gender || ''}
          onValueChange={value => {
            updateGender(value as 'Male' | 'Female' | 'Other')
            setError(null)
          }}
          className='grid grid-cols-1 gap-4 md:grid-cols-3'
        >
          <div
            className={`
            border rounded-md p-4 flex items-center space-x-3 cursor-pointer
            ${state.gender === 'Male' ? 'border-primary' : 'border-[#CDCDCD]'}
            hover:border-primary/70 transition-colors
          `}
          >
            <RadioGroupItem value='Male' id='male' />
            <Label htmlFor='male' className='cursor-pointer'>
              Male
            </Label>
          </div>

          <div
            className={`
            border rounded-md p-4 flex items-center space-x-3 cursor-pointer
            ${state.gender === 'Female' ? 'border-primary' : 'border-[#CDCDCD]'}
            hover:border-primary/70 transition-colors
          `}
          >
            <RadioGroupItem value='Female' id='female' />
            <Label htmlFor='female' className='cursor-pointer'>
              Female
            </Label>
          </div>

          <div
            className={`
            border rounded-md p-4 flex items-center space-x-3 cursor-pointer
            ${state.gender === 'Other' ? 'border-primary' : 'border-[#CDCDCD]'}
            hover:border-primary/70 transition-colors
          `}
          >
            <RadioGroupItem value='Other' id='other' />
            <Label htmlFor='other' className='cursor-pointer'>
              Other
            </Label>
          </div>
        </RadioGroup>

        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </div>
    </StepLayout>
  )
}
