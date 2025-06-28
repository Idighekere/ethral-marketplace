'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export interface BlogCardProps {
  id: string
 slug:string;
  title: string
  thumbnail: string
  excerpt: string
  category: string
  type: string // e.g., 'article', 'guide', 'news'

  className?: string
  variant?: 'scroll' | 'column' // Controls if the image is full width or fixed width
  imageSize?: 'small' | 'medium' | 'large' // Controls image dimensions
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

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  slug,
  thumbnail,
  excerpt,
  category,
  type,
  className,
  variant = 'column',
}) => {
  const variantStyles = variantConfig[variant]
  // const imageSizeStyle = imageSizeConfig[imageSize]

  const router = useRouter()
  return (
    <Card
      className={cn(
        'group relative overflow-hidden border-0  p-0 transition-all duration-300  hover:shadow-2xl cursor-pointer bg-background rounded-md space-y-0 gap-2 shadow-none',
        variantStyles.card,
        className
      )}
      onClick={() => router.push(`/blog/${slug}`)}
    >
      <Link className='gap-2' href={`blog/${slug}`}>
        <div className={cn('relative z-10  ', variantStyles.wrapper)}>
          <div
            className={cn(
              'relative aspect-square rounded-md',
            //   imageSizeStyle,
            //   variantStyles.imageWrapper
            )}
          >
            <Image
              src={thumbnail}
              alt={title}
              fill
              className='rounded-md object-cover shadow-lg transition-transform duration-300
             group-hover:scale-102 aspect-square'
            />
          </div>
        </div>

        {/* Content */}
        <div className='relative z-10 mt-2   '>
          {/* Name and Title */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between  text-[#e9e9e9] '>
              <p className=' text-[#e9e9e9] leading-tight truncate w-27 md:w-30'>
                {title}
              </p>
              <div className='flex items-center gap-4'>
                <span>{category}</span>
                <span className=''>{type}</span>
              </div>
            </div>
            <p className=' text-[#C0C5D0] leading-tight overflow '>
              {excerpt}
            </p>
          </div>
        </div>
      </Link>
    </Card>
  )
}
