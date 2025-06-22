"use client"

import React from 'react'
import Image from 'next/image'
import {useRouter} from "next/navigation"
import { Card } from '@/components/ui/card'

import { Star, Crown, Zap  } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { formatFollowers, formatPrice } from '@/utils'
export interface InfluencerCardProps {
  id: string
  name: string
  title: string
  image: string
  rating: number
  followers: number
  price: number
  badges: Array<{
    type: 'top-creator' | 'responds-fast'
    label: string
  }>
  className?: string;
  variant?: 'scroll' | 'column'  // Controls if the image is full width or fixed width
  imageSize?: 'small' | 'medium' | 'large'  // Controls image dimensions
}

const badgeConfig = {
  'top-creator': {
    icon: Crown,
    className: ''
  },
  'responds-fast': {
    icon: Zap,
    className: ''
  }
}

const imageSizeConfig = {
  small: 'h-[200px] w-[200px]',
  medium: 'h-[250px] w-[250px]',
  large: 'h-[300px] w-[300px]'
}

const variantConfig = {
  scroll: {
    card: 'flex-shrink-0 w-auto',
    wrapper: 'flex flex-col',
    imageWrapper: 'w-auto',
    content: 'p-4'
  },
  column: {
    card: 'w-full',
    wrapper: 'flex flex-col',
    imageWrapper: 'w-full',
    content: 'p-4'
  }
}


export const InfluencerCard: React.FC<InfluencerCardProps> = ({
  id,
  name,
  title,
  image,
  rating,
  followers,
  price,
  badges,
  className,
    variant = 'column',
  imageSize = 'large'
}) => {

  const variantStyles = variantConfig[variant]
  const imageSizeStyle = imageSizeConfig[imageSize]

  const router=useRouter()
  return (
    <Card
      className={cn(
        'group relative overflow-hidden border-0  p-0 transition-all duration-300  hover:shadow-2xl cursor-pointer bg-background rounded-md space-y-0 gap-2',variantStyles.card,
        className
      )}
      onClick={()=>router.push(`/${id}`)}
    >
      <Link className="gap-2" href={`/${id}`}>
      <div className={cn('relative z-10  ',variantStyles.wrapper)}>
        {/* Badges */}
        <div className='absolute top-3 left-2 z-10 flex flex-wrap gap-1 '>
          {badges.map((badge, index) => {
            const BadgeIcon = badgeConfig[badge.type]?.icon || Star
            const badgeClassName =
              badgeConfig[badge.type]?.className || 'bg-black/70 text-white'

            return (
              <span
                key={`${id}-badge-${index}`}
                className={cn(
                  'flex items-center gap-1 px-2 py-1 text-xs font-medium border-white border  rounded-sm',
                  badgeClassName
                )}
              >
                <BadgeIcon className='h-3 w-3' />
                {badge.label}
              </span>
            )
          })}
        </div>

        <div className={cn(
            'relative aspect-square rounded-md',
            imageSizeStyle,
            variantStyles.imageWrapper
          )}>
          <Image
            src={image}
            alt={name}
            fill
            className='rounded-md object-cover shadow-lg transition-transform duration-300
             group-hover:scale-102 aspect-square'
          />
        </div>

        {/* Rating */}
        <div className='absolute bottom-1 left-2 flex items-center gap-1'>
          <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
          <span className='text-sm font-medium text-white'>{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className='relative z-10 mt-2   '>
        {/* Name and Title */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between text-xs text-[#e9e9e9] '>
            <p className='text-xs leading-tight truncate w-27 md:w-30'>
              {name}
            </p>
            <div className='flex items-center gap-3'>
              <span>{formatFollowers(followers)} Followers</span>
              <span className=''>{formatPrice(price)}</span>
            </div>
          </div>
          <h3 className='text-sm font-medium text-white leading-tight truncate w-[85%]'>
            {title}
          </h3>
        </div>
      </div>
      </Link>
    </Card>
  )
}
