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
    <section className={cn('space-y-6 px-5 sm:px-10 lg:px-16', className)}>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-xl font-bold text-white'>{title}</h2>
          <p className='text-sm text-gray-400 w-[95%] truncate'>{subtitle}</p>
        </div>

          <a
            href={"/influencers"}
            className='text-sm text-[#e9e9e9]'
          >
            See All
          </a>

      </div>

      {/* Cards Grid */}
    <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar">
      <div className="flex gap-4 min-w-max">
        {influencers.map((influencer) => (
        <InfluencerCard key={influencer.id} {...influencer} />
        ))}
      </div>
    </div>
    </section>
  )
}
