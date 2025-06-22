import React from 'react'
import Image from 'next/image'
import { Review } from '@/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Star } from '../icons'

export const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const { name, avatar, title, review: reviewText, rating } = review

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`size-4 ${index < Math.round(rating) ? 'text-primary' : 'text-gray-300'}
        `}
        fillColor={index < Math.round(rating) ? '#D9E915' : '#E0E0E0'}
      />

    ))
  }

  return (
    <Card className='w-full hover:shadow-lg transition-shadow duration-200 bg-secondary border-0 space-y-0 gap-2'>
      <CardHeader className='pb-1 mb-0 '>
        <div className='flex items-center space-x-4'>
          <div className='relative h-14 w-14 rounded-full overflow-hidden'>
            <Image
              src={avatar}
              alt={`${name}'s avatar`}
              fill
              className='object-cover'
            />
          </div>
          <div className='space-y-0'>
            <h3 className='font-semibold text-lg leading-none text-neutral-white'>{name}</h3>
            <p className="text-neutral-white/80">{title}</p>
            <div className='flex space-x-1'>{renderStars(rating)}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className='pt-0 '>

        <p className='text-neutral-white/80 leading-relaxed'>{reviewText}</p>
      </CardContent>
    </Card>
  )
}
