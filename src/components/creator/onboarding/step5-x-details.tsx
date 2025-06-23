'use client'

import { useState } from 'react'
import { StepLayout } from './step-layout'
import { useCreatorOnboarding } from '@/store/creatorOnboardingContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface Step5XDetailsProps {
  onContinue: () => void
  onBack: () => void
}

export function Step5XDetails ({ onContinue, onBack }: Step5XDetailsProps) {
  const { state, updateXHandle, updateFollowerRange } = useCreatorOnboarding()
  const [error, setError] = useState<string | null>(null)

  const handleContinue = () => {
    if (!state.xHandle) {
      setError('Please enter your X handle')
      return
    }

    if (!state.followerRange) {
      setError('Please select your follower range')
      return
    }

    onContinue()
  }

  return (
    <StepLayout
      currentStep={5}
      totalSteps={11}
      onContinue={handleContinue}
      onBack={onBack}
      showBackButton={true}
      title='Add your X details'
    >
      <div className='space-y-6'>
        <div className='space-y-2'>
          <Label htmlFor='xHandle'>X Handle</Label>
          <div className='flex items-center'>
            <span className='mr-2 text-gray-400'>@</span>
            <Input
              id='xHandle'
              value={state.xHandle}
              onChange={e => {
                updateXHandle(e.target.value.replace('@', ''))
                setError(null)
              }}
              placeholder='username'
              className='bg-transparent border-[0.5px] border-[#CDCDCD]'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='followerRange'>Follower Range</Label>
          <Select
            value={state.followerRange || ''}
            onValueChange={value => {
              updateFollowerRange(value)
              setError(null)
            }}
          >
            <SelectTrigger
              id='followerRange'
              className='bg-transparent border-[0.5px] border-[#CDCDCD] data-[size=default]:h-10'
            >
              <SelectValue placeholder='Select your follower range' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='1k-10k'>1,000 - 10,000</SelectItem>
              <SelectItem value='10k-50k'>10,000 - 50,000</SelectItem>
              <SelectItem value='50k-100k'>50,000 - 100,000</SelectItem>
              <SelectItem value='100k-500k'>100,000 - 500,000</SelectItem>
              <SelectItem value='500k-1M'>500,000 - 1,000,000</SelectItem>
              <SelectItem value='1M+'>1,000,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </div>
    </StepLayout>
  )
}
