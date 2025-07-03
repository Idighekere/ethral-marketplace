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
interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];



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
  const handleOptionClick=(optionValue: 'Male' | 'Female' | 'Other')=>{
    updateGender(optionValue )
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
          {
            options.map(option=>(<div
              className={`
              border rounded-md p-4 flex items-center space-x-3 cursor-pointer
              ${state.gender === option.value ? 'border-primary text-primary' : 'border-[#CDCDCD] text-white'}
              hover:border-primary/70 transition-colors
            `}
            key={option.label}
            role="presentation"
            onClick={()=>handleOptionClick(option.value as 'Male'| 'Female'|'Other')}
            >
              <RadioGroupItem value={option.value} id={option.value.toLowerCase()} className={`${state.gender==option.value?'border-primary':'border-input'}`} />
              <Label htmlFor={option.value.toLowerCase()} className={`cursor-pointer pb-0 ${state.gender==option.value?'text-primary':'text-white'}`}>
                {option.label}
              </Label>
            </div>))
          }



        </RadioGroup>

        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </div>
    </StepLayout>
  )
}
