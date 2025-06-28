import { InfluencerCard, Footer } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { sampleInfluencers } from '@/constants'
import { InfluencerSearchForm } from '@/components/influencer'
import { ChevronRight } from 'lucide-react'
import React from 'react'
import { generateMetadata } from '@/lib/seo'
import { STARS_SEO } from '@/lib/seo/pages'

export const metadata = generateMetadata(STARS_SEO)

const StarsPage = () => {
  return (
    <>
      <div className=' mx-auto p-5 sm:p-10 lg:p-20 xl:px-36  text-neutral-white'>
        <div className='flex flex-col justify-center text-center mb-20 items-center max-w-2xl mx-auto'>
          <InfluencerSearchForm />
        </div>

        <section>
          <div className='flex items-center justify-between'>
            <div className=''>
              <h2 className='text-xl font-semibold text-white'>Influencer</h2>
              <p className='text-sm text-[#e9e9e9] w-[95%] truncate'>
                Hire top influencers across all platforms
              </p>
            </div>
          </div>

          {/* Cards Grid */}

          <div className='grid grid-cols-1  gap-6 md:grid-cols-3 lg:grid-cols-4  mt-6'>
            {Array.from({ length: 16 }, (_, index) => (
              <InfluencerCard key={index} {...sampleInfluencers[0]} />
            ))}
          </div>

          <div className='flex justify-center items-center my-10'>
            <Button
              className='rounded-full font-medium w-35 text-base bg-transparent hover:bg-gray-800/5 border border-neutral-white/70 text-neutral-white/70 hover:text-neutral-white transition-colors flex items-center gap-2'
              variant='ghost'
            >
              Next Page <ChevronRight className='size-6' />
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default StarsPage
