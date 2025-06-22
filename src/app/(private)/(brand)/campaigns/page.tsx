'use client'

import { FeaturePoint } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { FEATURES_DATA } from '@/constants'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const CampaignsPage = () => {
    const router=useRouter()
  const campaignData = FEATURES_DATA.find(feature => feature.id === 'campaigns')

  const handlePostCampaigns = () => {
    router.push("/campaigns/new")
  }
  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-20">
        <div className='bg-[#1E242D] p-3 rounded-xl overflow-hidden shadow-2xl'>
          <img
            src={'/campaigns-section-image.png'}
            alt={'ampaign Image'}
            className='w-full h-auto object-cover'
            loading='lazy'
          />
        </div>

        <div className='space-y-5'>
          {/* <Link href=""></Link> */}
          <Button
            className='flex gap-2 items-center rounded-full text-black'
            onClick={handlePostCampaigns}
          >
            <PlusCircle />
            Post Campaigns
          </Button>

          <h3 className='text-2xl md:text-3xl font-bold text-white leading-tight'>
            {campaignData?.title}
          </h3>

          <div className='space-y-6'>
            {campaignData?.points.map((point, pointIndex) => (
              <FeaturePoint
                key={pointIndex}
                title={point.title}
                description={point.description}
              />
            ))}
          </div>
        </div>

    </div>
  )
}

export default CampaignsPage
