'use client'

import { InfluencerCard, InfluencerCardProps } from '@/components/shared'
import { cn } from '@/lib/utils'

export interface FeaturedInfluencersProps {
  title?: string
  subtitle?: string
  influencers: InfluencerCardProps[]

  className?: string
}

export const FeaturedInfluencers: React.FC<FeaturedInfluencersProps> = ({
  title = 'Featured by Ethral',
  subtitle = 'Hire top influencers across all platforms',
  influencers,

  className
}) => {
  return (
    <section
      className={cn('space-y-6 px-5 sm:px-10 lg:px-20 xl:px-36', className)}
    >
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-xl font-bold text-white'>{title}</h2>
          <p className='text-sm text-[#E9E9E9] w-[85%] md:w-full truncate'>{subtitle}</p>
        </div>

        <a href={'/influencers'} className='text-sm text-[#e9e9e9] self-end hover:underline'>
          See All
        </a>
      </div>

      {/* Cards Grid */}
      <div className=''>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 '>
          {influencers.map(influencer => (
            <InfluencerCard key={influencer.id} {...influencer} variant="column" data-aos="fade-up" data-aos-anchor-placement="center-bottom"/>
          ))}
        </div>
      </div>
    </section>
  )
}
