'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { useSearchStore } from '@/store'
import { Label } from '@/components/ui/label'
const CONTENT_TYPES = [
  { id: 'tweet', label: 'Tweet' },
  { id: 'thread', label: 'Thread' },
  { id: 'retweet', label: 'Retweet' },
  { id: 'reply', label: 'Reply' },
  { id: 'quote', label: 'Quote Tweet' },
  { id: 'space', label: 'Space' },
  { id: 'livestream', label: 'Live Stream' }
]

interface ContentTypeFilterProps {
  isOpen: boolean
  onClose: () => void
}

const ContentTypeFilter = ({ isOpen, onClose }: ContentTypeFilterProps) => {
  const { searchState, updateFilter } = useSearchStore()
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    searchState.filters.contentType
  )

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    )
  }

  const handleClear = () => {
    setSelectedTypes([])
  }

  const handleSave = () => {
    updateFilter('contentType', selectedTypes)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle></DialogTitle>
      </DialogHeader>
      <DialogContent className=' max-w-sm p-4'>
        <div className='space-y-4'>
          {CONTENT_TYPES.map(type => (
            <div key={type.id} className='flex items-center space-x-3'>
              <Checkbox
                id={type.id}
                checked={selectedTypes.includes(type.id)}
                onCheckedChange={() => handleTypeToggle(type.id)}
                className=''
              />
              <Label
                htmlFor={type.id}
                className='text-sm font-medium cursor-pointer'
              >
                {type.label}
              </Label>
            </div>
          ))}
        </div>

        <div className='flex justify-between items-center pt-4 border-t border-gray-200'>
          <Button variant='ghost' onClick={handleClear} className=''>
            Clear
          </Button>
          <Button onClick={handleSave} className=' px-6'>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ContentTypeFilter
