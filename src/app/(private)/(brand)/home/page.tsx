import { InfluencerCard } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { sampleInfluencers } from '@/constants'
import React from 'react'
import { generateMetadata } from '@/lib/seo'
import { BRAND_HOME_SEO } from '@/lib/seo/pages'

export const metadata = generateMetadata(BRAND_HOME_SEO)

const BrandHomePage = () => {
  return (
    <div className=' mx-auto text-neutral-white'>
      <div className='flex flex-col justify-center text-center mb-10 max-w-2xl mx-auto'>
        <h2 className='text-2xl font-medium mb-4'>
          Your first influencer is out there—go find them and make magic happen!
        </h2>

        <Button className='rounded-full font-semibold'>Find Influencers</Button>
      </div>

      <section>
        <div className='flex items-center justify-between mb-6'>
          <div className='space-y-0'>
            <h2 className='text-xl font-bold text-white'>
              Explore Top Creators for You
            </h2>
            <p className='text-sm text-gray-400 w-[95%] truncate'>
              Hire influencers in seconds
            </p>
          </div>

          <a href={'/influencers'} className='text-sm text-[#e9e9e9]'>
            See All
          </a>
        </div>

        {/* Cards Grid */}

        <div className='flex gap-4 flex-col md:flex-row'>
          {sampleInfluencers.map(influencer => (
            <InfluencerCard key={influencer.id} {...influencer} variant="column" imageSize="large" />
          ))}
        </div>
      </section>
    </div>
  )
}

export default BrandHomePage
