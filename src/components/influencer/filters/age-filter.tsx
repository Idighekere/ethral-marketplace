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

interface AgeFilterProps {
  isOpen: boolean
  onClose: () => void
}

const AgeFilter = ({ isOpen, onClose }: AgeFilterProps) => {
  const { searchState, updateFilter } = useSearchStore()
  const [ageRange, setAgeRange] = useState([
    searchState.filters.age.min,
    searchState.filters.age.max
  ])

  const handleAgeChange = (newRange: number[]) => {
    setAgeRange(newRange)
  }

  const handleClear = () => {
    setAgeRange([18, 65])
  }

  const handleSave = () => {
    updateFilter('age', { min: ageRange[0], max: ageRange[1] })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1D232C] border-gray-700 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Age Range
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-white/80 mb-1">Min Age</div>
              <div className="text-xl font-semibold text-white">{ageRange[0]} years</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/80 mb-1">Max Age</div>
              <div className="text-xl font-semibold text-white">{ageRange[1]} years</div>
            </div>
          </div>

          <div className="px-2">
            <Slider
              value={ageRange}
              onValueChange={handleAgeChange}
              min={18}
              max={65}
              step={1}
              className="w-full"
              minStepsBetweenThumbs={1}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleClear}
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Clear
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 "
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AgeFilter
