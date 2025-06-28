import { InfluencerSearchForm } from '@/components/influencer'
import React from 'react'

const GuestHero = () => {
  return (
    <main className='flex flex-col items-center justify-center    p-5 py-8  mx-auto max-w-4xl md:py-15'>
      <div className='space-y-5 '>
        <h2 className='text-white text-2xl   md:text-[2.5rem]  text-center font-medium my-10 '>
          Find and hire<span className='text-primary'> web3 KOLs</span> to create or post<br />Unique content for your brand
        </h2>
        <InfluencerSearchForm />
      </div>
    </main>
  )
}

export default GuestHero
