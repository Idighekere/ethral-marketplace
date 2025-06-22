import { InfluencerSearchForm } from '@/components/influencer'
import React from 'react'

const GuestHero = () => {
  return (
    <main className='flex flex-col items-center justify-center md:min-h-screen space-y-5  p-4  mx-auto'>
      <div className='md:max-w-lg '>
        <h2 className='text-white text-3xl md:text-4xl lg:text-5xl text-center font-[600] '>
          Find and hire top <span className='text-primary'>X</span> influencers
          to create <br /> Unique content for your brand
        </h2>
        <InfluencerSearchForm />
      </div>
    </main>
  )
}

export default GuestHero
