'use client'

import { ChevronLeftArrow, Eye } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'

interface StepLayoutProps {
  children: ReactNode
  currentStep: number
  totalSteps: number
  onContinue: () => void
  onBack?: () => void
  showBackButton?: boolean
  showViewExampleButton?: boolean
  title?: string
  description?: string
  continueButtonText?: string
}

export function StepLayout ({
  children,
  currentStep,
  totalSteps,
  onContinue,
  onBack,
  showBackButton = false,
  showViewExampleButton = false,
  title,
  description,
  continueButtonText = 'Continue'
}: StepLayoutProps) {
  return (
    <div className='w-full max-w-3xl mx-auto py-8 px-4'>
      {/* Progress Bar */}
      <div className='w-full mb-8'>
        <div className='flex justify-between mb-2'>
          <span className='text-sm text-gray-400'>
            Step {currentStep} of {totalSteps}
          </span>
          <span className='text-sm text-gray-400'>
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className='w-full bg-secondary rounded-full h-2'>
          <div
            className='bg-primary h-2 rounded-full transition-all duration-300 ease-in-out'
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Back Button or View Example Profile Button */}
      <div className='mb-6 space-y-3'>
        {showBackButton && (
          <Button
            variant='secondary'
            onClick={onBack}
            className='flex items-center rounded-full'
          >
            <ChevronLeftArrow className='mr-1' />
            Back
          </Button>
        )}

        {showViewExampleButton && (
          <Button
            variant='outline'
            className='flex items-center border-[#cdcdcd]/60 '
          >
            <Eye />
            View Example Profile
          </Button>
        )}
      </div>

      {/* Title and Description */}
      {title && <h1 className='text-lg font-semibold mb-2 text-white'>{title}</h1>}
      {description && <p className='text-gray-300 mb-6'>{description}</p>}

      {/* Content */}
      <div className='mb-8'>{children}</div>

      {/* Continue Button */}
      <Button
        className='w-full text-base font-medium h-10'
        onClick={onContinue}
      >
        {continueButtonText}
      </Button>
    </div>
  )
}
