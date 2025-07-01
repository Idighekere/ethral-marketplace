'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

const POPULAR_CATEGORIES = [
  'Lifestyle',
  'Beauty',
  'Fashion',
  'Travel',
  'Health & Fitness',
  'Food & Drink',
  'Family & Children',
  'Comedy & Entertainment',
  'Art & Photography',
  'Music & Dance',
  'Model',
  'Animals & Pets',
  'Adventure & Outdoors',
  'Education',
  'Entrepreneur & Business',
  'Athlete & Sports',
  'Gaming',
  'Technology',
  'LGBTQ+',
  'Healthcare',
  'Vegan',
  'Automotive',
  'Actor',
  'Skilled Trades',
  'Celebrity & Public Figure',
  'Cannabis'
]

interface CategoryPopupProps {
  isOpen: boolean
  onClose: () => void
  onCategorySelect: (category: string) => void
  inputRef: React.RefObject<HTMLInputElement | null>
}

const CategoryPopup = ({
  isOpen,
  onClose,
  onCategorySelect,
  inputRef
}: CategoryPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose, inputRef])

  if (!isOpen) return null

  return (
    <div
      ref={popupRef}
      className='absolute top-full left-0 right-0 mt-2 p-4 bg-[#1D232C] border border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto'
    >
      <h4 className='text-sm font-semibold text-white mb-3'>
        Popular Categories
      </h4>
      <div className='flex flex-wrap gap-2'>
        {POPULAR_CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => {
              onCategorySelect(category)
              // Don't close the popup to allow multiple selections
            }}
            className={cn(
              'px-3 py-1 text-sm rounded-md transition-colors duration-200 border border-gray-600',
              'hover:bg-gray-700 text-white hover:text-white hover:border-gray-500'
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryPopup
