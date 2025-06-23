'use client'

import { useState } from 'react'
import { StepLayout } from './step-layout'
import { useCreatorOnboarding } from '@/store/creatorOnboardingContext'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface Step9MobileProps {
  onContinue: () => void
  onBack: () => void
}

// Mock country codes - in a real app, you'd have a complete list
const countryCodes = [
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+91', country: 'India' },
  { code: '+61', country: 'Australia' },
  { code: '+234', country: 'Nigeria' },
  { code: '+27', country: 'South Africa' },
  { code: '+81', country: 'Japan' },
  { code: '+86', country: 'China' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' }
]

export function Step9Mobile ({ onContinue, onBack }: Step9MobileProps) {
  const {  updatePhoneNumber } = useCreatorOnboarding()
  const [error, setError] = useState<string | null>(null)
  const [countryCode, setCountryCode] = useState('+1')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleContinue = () => {
    if (!phoneNumber) {
      setError('Please enter your mobile number')
      return
    }

    // Basic phone number validation
    if (!/^[0-9]{6,14}$/.test(phoneNumber)) {
      setError('Please enter a valid phone number')
      return
    }

    // Store full phone with country code
    updatePhoneNumber(`${countryCode}${phoneNumber}`)

    // In a real app, you would send a verification code here
    // For this demo, we'll just proceed to the next step
    onContinue()
  }

  return (
    <StepLayout
      currentStep={9}
      totalSteps={11}
      onContinue={handleContinue}
      onBack={onBack}
      showBackButton={true}
      title='Add your mobile number to be notified when you receive an order'
    >
      <div className='space-y-6'>
        <div className='space-y-2'>
          {/* <Label htmlFor='phone'>Mobile Number</Label> */}
          <div className='flex space-x-2'>
            <Select value={countryCode} onValueChange={setCountryCode}>
              <SelectTrigger className='bg-transparent border-[0.5px] border-[#CDCDCD] w-[120px] data-[size=default]:h-10'>
                <SelectValue placeholder='Code' />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map(country => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.code} {country.country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              id='phone'
              type='tel'
              value={phoneNumber}
              onChange={e => {
                const value = e.target.value.replace(/[^0-9]/g, '')
                setPhoneNumber(value)
                setError(null)
              }}
              placeholder='Enter your phone number'
              className='bg-transparent border-[0.5px] border-[#CDCDCD] flex-1 placeholder:text-white/60'
            />
          </div>
          {error && <p className='text-red-500 text-sm'>{error}</p>}
        </div>

        <p className='text-sm text-gray-400'>
          We&apos;ll send you a verification code to confirm your number. Standard
          message rates may apply.
        </p>
      </div>
    </StepLayout>
  )
}
