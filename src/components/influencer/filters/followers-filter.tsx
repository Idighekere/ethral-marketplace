'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useSearchStore } from '@/store'

const FOLLOWER_STEPS = [1000, 5000, 10000, 50000, 100000, 500000, 1000000]

const getStepIndex = (value: number): number => {
  return FOLLOWER_STEPS.findIndex(step => step >= value) || 0
}

const getValueFromIndex = (index: number): number => {
  return FOLLOWER_STEPS[index] || FOLLOWER_STEPS[0]
}

interface FollowersFilterProps {
  isOpen: boolean
  onClose: () => void
}

const FollowersFilter = ({ isOpen, onClose }: FollowersFilterProps) => {
  const { searchState, updateFilter } = useSearchStore()
  const [range, setRange] = useState([
    getStepIndex(searchState.filters.followers.min),
    getStepIndex(searchState.filters.followers.max)
  ])

  const handleRangeChange = (newRange: number[]) => {
    setRange(newRange)
  }

  const formatFollowers = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(count % 1000000 === 0 ? 0 : 1)}M+`
    if (count >= 1000) return `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}K`
    return count.toString()
  }

  const handleSave = () => {
    const minValue = getValueFromIndex(range[0])
    const maxValue = getValueFromIndex(range[1])

    updateFilter('followers', { min: minValue, max: maxValue })
    onClose()
  }

  const minFollowers = getValueFromIndex(range[0])
  const maxFollowers = getValueFromIndex(range[1])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=' max-w-md text-white'>
        <DialogHeader className='flex flex-row items-center justify-between pb-4'>
          <DialogTitle className='text-lg font-semibold '>
            Followers
          </DialogTitle>

        </DialogHeader>

        <div className='space-y-6 py-4'>
          <div className='flex justify-between items-center'>
            <div>
              <div className='text-sm text-white/80 mb-1'>Min Followers</div>
              <div className='text-xl font-semibold text-white'>
                {formatFollowers(minFollowers)}
              </div>
            </div>
            <div className='text-right'>
              <div className='text-sm text-white/80 mb-1'>Max Followers</div>
              <div className='text-xl font-semibold text-white'>
                {formatFollowers(maxFollowers)}
              </div>
            </div>
          </div>

          <div className='px-2'>
            <Slider
              value={range}
              onValueChange={handleRangeChange}
              min={0}
              max={FOLLOWER_STEPS.length - 1}
              step={1}
              className='w-full'
              minStepsBetweenThumbs={0}
            />
          </div>
        </div>

        <Button onClick={handleSave} className='w-full '>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default FollowersFilter
