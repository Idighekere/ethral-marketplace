'use client'
import { FeaturePoint } from '@/components/shared'
import { FEATURES_DATA } from '@/constants'
import Image from 'next/image'
import React from 'react'

const TrackPage = () => {
  const trackData = FEATURES_DATA.find(feature => feature.id === 'star')

  return (
    <>
      <div className=' flex flex-col md:flex-row gap-10 md:gap-20'>
        <div className='space-y-5'>
          {/* <Link href=""></Link> */}
          <span className='bg-[#FEF3C7] text-[#92400E] text-xs font-medium px-6 py-1 rounded-full mb-5'>
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

        <div className='bg-[#1E242D] p-3 rounded-xl overflow-hidden shadow-2xl w-full md:w-1/2 relative'>
          <div className='relative aspect-square w-full'>
            <Image
              src={'/track-section-image.png'}
              alt={'Track Page Image'}
              fill
              className=' object-cover'
              loading='lazy'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default TrackPage
