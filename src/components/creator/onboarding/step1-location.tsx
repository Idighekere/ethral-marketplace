'use client'

import { useState } from 'react'
import { StepLayout } from './step-layout'
import { CityCombobox } from '@/components/shared/city-combobox'
import { useCreatorOnboarding } from '@/store/creatorOnboardingContext'
import { Button } from '@/components/ui/button'

interface Step1LocationProps {
  onContinue: () => void
}

export function Step1Location ({ onContinue }: Step1LocationProps) {
  const { state, updateLocation } = useCreatorOnboarding()
  const [error, setError] = useState<string | null>(null)

  const handleContinue = () => {
    if (!state.location) {
      setError('Please select your location')
      return
    }
    onContinue()
  }

  return (
    <StepLayout
      currentStep={1}
      totalSteps={11}
      onContinue={handleContinue}
      title='Where are you located?'
    >
      <div className='space-y-6'>
        <CityCombobox
          value={state.location}
          onChange={value => {
            updateLocation(value)
            setError(null)
          }}
          label=""
          error={error || undefined}
          className='w-full'
        />

        <div className='mt-4'>
          <Button
            variant='ghost'
            className='text-primary text-sm hover:bg-transparent hover:text-primary/80'
          >
            I don't see my city
          </Button>
        </div>
      </div>
    </StepLayout>
  )
}
