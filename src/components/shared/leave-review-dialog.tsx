'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'
import { formatPrice } from '@/utils'
import { cn } from '@/lib/utils'

interface LeaveReviewDialogProps {
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  item: {
    id: number | string
    name: string
    avatar: string
    type: string
    price: number
  }
  onSubmit?: (review: {
    title: string
    rating: number
    review: string
    itemId: number | string
  }) => void
}

export function LeaveReviewDialog ({
  trigger,
  open,
  onOpenChange,
  item,
  onSubmit
}: LeaveReviewDialogProps) {
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState('')

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit({
        title,
        rating,
        review,
        itemId: item.id
      })
    }

    // Reset form
    setTitle('')
    setRating(0)
    setReview('')

    // Close dialog
    if (onOpenChange) {
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className='sm:max-w-[500px] bg-secondary border-[#939191] border-[0.3px] text-white'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold text-primary'>
            Leave a Review
          </DialogTitle>
          <DialogDescription className='text-[#CDCDCD]'>
            Share your experience with this product
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Item details */}
          <div className='flex items-center gap-3 p-3 bg-neutral-900/50 rounded-lg'>
            <Avatar className='h-14 w-14 rounded-sm'>
              <AvatarImage src={item.avatar} alt={item.name} />
              <AvatarFallback className='rounded-sm'>
                {item.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <h4 className='font-medium text-white'>{item.name}</h4>
              <p className='text-sm text-[#CDCDCD]'>{item.type}</p>
              <p className='text-white'>{formatPrice(item.price)}</p>
            </div>
          </div>

          {/* Review title */}
          <div className='space-y-2'>
            <Label
              htmlFor='review-title'
              className='text-sm font-medium text-white'
            >
              Review Title
            </Label>
            <Input
              id='review-title'
              className='bg-transparent border-[0.5px] border-[#CDCDCD] text-white'
              placeholder='Summarize your experience'
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Rating */}
          <div className='space-y-2'>
            <p className='text-sm font-medium text-white'>
              Your overall rating
            </p>
            <div className='flex gap-1'>
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={cn(
                    'h-8 w-8 cursor-pointer transition-colors',
                    hoveredRating >= star || rating >= star
                      ? 'fill-primary text-primary'
                      : 'text-[#CDCDCD]'
                  )}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                />
              ))}
            </div>
          </div>

          {/* Detailed review */}
          <div className='space-y-2'>
            <Label
              htmlFor='detailed-review'
              className='text-sm font-medium text-white'
            >
              Add Detailed Review
            </Label>
            <Textarea
              id='detailed-review'
              className='bg-transparent border-[0.5px] border-[#CDCDCD] text-white min-h-[120px] placeholder:text-[#e9e9e9]/50'
              placeholder='Enter here...'
              value={review}
              onChange={e => setReview(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type='submit'
              className='w-full rounded-full'
              disabled={rating === 0 || !title.trim() || !review.trim()}
            >
              Submit Review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
