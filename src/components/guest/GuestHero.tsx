import { InfluencerSearchForm } from '@/components/influencer'
import React from 'react'

const GuestHero = () => {
  return (
    <main className='flex flex-col items-center justify-center    p-5 py-8  mx-auto max-w-4xl md:py-15'>
      <div className='space-y-5 '>
        <h2 className='text-white text-2xl   md:text-[2.5rem]  text-center font-medium my-10 ' data-aos="fade-up" data-aos-anchor-placement="top-bottom" >
          The On-Chain <span className='text-primary'>KOL Marketplace</span>.<br />Hire Vetted <span className='text-primary'>Web3 Influencers</span>, Risk-Free
        </h2>
        <InfluencerSearchForm data-aos="fade-up" data-aos-anchor-placement="center-bottom"/>
      </div>
    </main>
  )
}

export default GuestHero
