'use client'

import { cn } from '@/lib/utils'
import { ChevronLeftArrow } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useRouter, useParams } from 'next/navigation'
import { ReactNode } from 'react'

interface StepLayoutProps {
  children: ReactNode
  currentStep: number
  totalSteps: number
  onContinue?: () => void
  onBack?: () => void
  showBackButton?: boolean
  title?: string
  description?: string
  continueButtonText?: string
  stepTitles?: string[]
  disableNextStepsNavigation?: boolean
  skipStep?: number
  showContinueButton?: boolean
}

export function CampaignStepLayout ({
  children,
  currentStep,
  totalSteps,
  onContinue,
  onBack,
  showBackButton = false,
  title,
  description,
  continueButtonText = 'Continue',
  showContinueButton = true,
  stepTitles = [
    'Set Campaign Targeting',
    'Campaign Pricing',
    'Enter Campaign Details'
  ],
  disableNextStepsNavigation = true,
  skipStep = 2 // Skip the pricing step by default in campaign flow
}: StepLayoutProps) {
  return (
    <div className='w-full max-w-3xl mx-auto py-8 '>
      {/* Back Button or View Example Profile Button */}
      <div className='mb-6 space-y-3'>
        {showBackButton && (
          <Button
            variant='outline'
            onClick={onBack}
            className='flex items-center rounded-full border-[#2F353E]'
          >
            <ChevronLeftArrow className='mr-1' />
            Back
          </Button>
        )}
      </div>

      {/* Progress Bar */}
      <StepProgressBar
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepTitles={stepTitles}
        disableNextStepsNavigation={disableNextStepsNavigation}
        skipStep={skipStep}
      />

      {/* Title and Description */}
      {title && (
        <h1 className='text-lg font-semibold mb-4 text-white'>{title}</h1>
      )}
      {description && <p className='text-gray-300 mb-6'>{description}</p>}

      {/* Content */}
      <div className='mb-8'>{children}</div>

      {/* Continue Button */}
      {showContinueButton ? (
        <Button
          className='w-full text-base font-medium h-10'
          onClick={onContinue}
        >
          {continueButtonText}
        </Button>
      ) : null}
    </div>
  )
}

interface StepProgressBarProps {
  currentStep: number
  totalSteps: number
  stepTitles: string[]
  onStepClick?: (step: number) => void
  disableNextStepsNavigation?: boolean
  skipStep?: number
}

export function StepProgressBar ({
  currentStep,
  totalSteps,
  stepTitles,
  disableNextStepsNavigation = true,
  skipStep
}: StepProgressBarProps) {
  const router = useRouter()
  const params = useParams()

  const onStepClick = (step: number) => {
    // Navigate to the step URL or perform any action
    router.push(`/campaigns/${params.id}t=/${step}`)
  }
  // Calculate total visible steps (excluding the skip step)
  // const visibleSteps = skipStep ? totalSteps - 1 : totalSteps

  // Adjust current step index for progress calculation if we're past the skip step
  // const adjustedCurrentStep =
  //   skipStep && currentStep > skipStep ? currentStep - 1 : currentStep

  // Calculate progress percentage for the bar (not needed for the two-bar design)
  // const progressPercentage = ((adjustedCurrentStep - 1) / (visibleSteps - 1)) * 100

  const handleStepClick = (step: number) => {
    // if (!onStepClick) return

    // Prevent clicking to future steps if disableNextStepsNavigation is true
    if (disableNextStepsNavigation && step > currentStep) return

    // Skip the skip step
    if (skipStep && step > skipStep) {
      onStepClick(step)
    } else {
      onStepClick(step)
    }
  }

  return (
    <div className='w-full mb-8 space-y-3'>
      {/* Step Titles */}
      <div className='flex justify-between'>
        {stepTitles.map((title, index) => {
          // Skip the skipStep in UI
          if (skipStep === index + 1) return null

          const stepNumber = index + 1
          const isCurrentStep = currentStep === stepNumber
          const isPastStep = currentStep > stepNumber
          const isFutureStep = currentStep < stepNumber

          const isClickable =
            !disableNextStepsNavigation || !isFutureStep || isPastStep

          return (
            <Button
              key={`step-${index}`}
              variant='ghost'
              className={cn(
                'p-0 h-auto hover:bg-transparent hover:text-white text-center',
                isClickable ? 'cursor-pointer' : 'cursor-not-allowed',
                {
                  'text-white': isCurrentStep || isPastStep,
                  'text-[#757575]': isFutureStep
                }
              )}
              onClick={() => isClickable && handleStepClick(stepNumber)}
              disabled={!isClickable}
            >
              <span className='text-[13px] md:text-lg font-normal whitespace-normal break-words'>
                ({stepNumber == 3 ? '2' : stepNumber}) {title}
              </span>
            </Button>
          )
        })}
      </div>
      {/* Progress Bars - Two separate bars with gap */}
      <div className='flex w-full gap-4'>
        {/* First progress bar */}
        <div className='flex-1 bg-secondary rounded-full h-2'>
          <div
            className='bg-primary h-2 rounded-full transition-all duration-300 ease-in-out'
            style={{
              width: currentStep >= 1 ? '100%' : '0%'
            }}
          />
        </div>

        {/* Second progress bar - only show if we're on the last step */}
        <div className='flex-1 bg-secondary rounded-full h-2'>
          <div
            className='bg-primary h-2 rounded-full transition-all duration-300 ease-in-out'
            style={{
              width: currentStep === totalSteps ? '100%' : '0%'
            }}
          />
        </div>
      </div>
    </div>
  )
}
