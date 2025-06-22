'use client'

import { useState } from 'react'
import { StepLayout } from './step-layout'
import { useCreatorOnboarding } from '@/store/creatorOnboardingContext'
import { cn } from '@/lib/utils'

interface Step6ContentTypeProps {
  onContinue: () => void
  onBack: () => void
}

type ContentType =
  | 'Lifestyle'
  | 'Sport'
  | 'Technology'
  | 'Fashion'
  | 'Beauty'
  | 'Travel'
  | 'Food'
  | 'Gaming'
  | 'Business'
  | 'Education'
  | 'Entertainment'
  | 'Health'
  | 'Fitness'
  | 'Art'
  | 'Music'
  | 'Photography'

const contentTypeOptions: ContentType[] = [
  'Lifestyle',
  'Sport',
  'Technology',
  'Fashion',
  'Beauty',
  'Travel',
  'Food',
  'Gaming',
  'Business',
  'Education',
  'Entertainment',
  'Health',
  'Fitness',
  'Art',
  'Music',
  'Photography'
]

export function Step6ContentType ({
  onContinue,
  onBack
}: Step6ContentTypeProps) {
  const { state, toggleContentType } = useCreatorOnboarding()
  const [error, setError] = useState<string | null>(null)

  const handleContinue = () => {
    if (state.contentTypes.length === 0) {
      setError('Please select at least one content type')
      return
    }

    onContinue()
  }

  return (
    <StepLayout
      currentStep={6}
      totalSteps={11}
      onContinue={handleContinue}
      onBack={onBack}
      showBackButton={true}
      title='What kind of content do you post?'
    >
      <div className='space-y-6'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
          {contentTypeOptions.map(type => (
            <button
              key={type}
              type='button'
              onClick={() => {
                toggleContentType(type)
                setError(null)
              }}
              className={cn(
                'border rounded-md py-2 px-4 text-sm transition-colors',
                state.contentTypes.includes(type)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-[#CDCDCD] bg-transparent hover:border-primary/70'
              )}
            >
              {type}
            </button>
          ))}
        </div>

        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <p className='text-sm text-gray-400'>
          Selected: {state.contentTypes.length} / {contentTypeOptions.length}
        </p>
      </div>
    </StepLayout>
  )
}
