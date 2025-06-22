'use client'

import { useState, useEffect } from 'react'
import { StepLayout } from './step-layout'
import { useCreatorOnboarding } from '@/store/creatorOnboardingContext'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Step10VerificationProps {
  onContinue: () => void
  onBack: () => void
}

export function Step10Verification ({
  onContinue,
  onBack
}: Step10VerificationProps) {
  const { state, updateVerificationCode } = useCreatorOnboarding()
  const [error, setError] = useState<string | null>(null)
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)

  // Setup countdown timer for code resend
  useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1)
      }, 1000)

      return () => clearInterval(interval)
    } else if (timer === 0 && !canResend) {
      setCanResend(true)
    }
  }, [timer, canResend])

  const handleResendCode = () => {
    // In a real app, you would make an API call to resend the code
    setCanResend(false)
    setTimer(60)
    // Show success message
    setError(null)
  }

  const handleContinue = () => {
    if (!state.verificationCode) {
      setError('Please enter the verification code')
      return
    }

    // Basic code validation
    if (!/^\d{6}$/.test(state.verificationCode)) {
      setError('Please enter a valid 6-digit code')
      return
    }

    // In a real app, you would verify the code with your API
    // For this demo, we'll just proceed to the next step
    onContinue()
  }

  return (
    <StepLayout
      currentStep={10}
      totalSteps={11}
      onContinue={handleContinue}
      onBack={onBack}
      showBackButton={true}
      title='Enter the 6-digit code sent to your mobile number'
    >
      <div className='space-y-6'>
        <div className='space-y-4'>
          <Input
            value={state.verificationCode}
            onChange={e => {
              const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6)
              updateVerificationCode(value)
              setError(null)
            }}
            placeholder='Enter 6-digit code'
            className='bg-transparent border-[0.5px] border-[#CDCDCD] text-center text-xl tracking-wider py-6'
          />

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <div className='flex justify-between items-center'>
            <p className='text-sm text-gray-400'>
              Code sent to {state.phoneNumber}
            </p>

            {canResend ? (
              <Button
                variant='ghost'
                type='button'
                onClick={handleResendCode}
                className='text-primary hover:bg-transparent p-0 h-auto'
              >
                Resend Code
              </Button>
            ) : (
              <p className='text-sm text-gray-400'>Resend in {timer}s</p>
            )}
          </div>
        </div>
      </div>
    </StepLayout>
  )
}
