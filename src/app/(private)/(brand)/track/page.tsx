'use client'
import { BrandHeader } from '@/components/brand'
import { FeaturePoint } from '@/components/shared'
import { FEATURES_DATA } from '@/constants'
import React from 'react'

const TrackPage = () => {
  const trackData = FEATURES_DATA.find(feature => feature.id === 'star')

  return (
    <>
      <BrandHeader />
      <div className=' mx-auto p-5 pb-16 sm:p-10 lg:p-16 flex flex-col md:flex-row gap-10 md:gap-20'>
        <div className='space-y-5'>
          {/* <Link href=""></Link> */}
          <span className='bg-[#FEF3C7] text-[#92400E] text-xs font-medium px-3 py-1 rounded-full mb-5'>
            Coming Soon
          </span>

          <h3 className='text-2xl md:text-3xl font-bold text-white leading-tight mt-5'>
            {trackData?.title}
          </h3>

          <div className='space-y-6'>
            {trackData?.points.map((point, pointIndex) => (
              <FeaturePoint
                key={pointIndex}
                title={point.title}
                description={point.description}
              />
            ))}
          </div>
        </div>

        <div className='bg-[#1E242D] p-3 rounded-xl overflow-hidden shadow-2xl'>
          <img
            src={'/track-section-image.png'}
            alt={'ampaign Image'}
            className='w-full h-auto object-cover'
            loading='lazy'
          />
        </div>
      </div>
    </>
  )
}

export default TrackPage
