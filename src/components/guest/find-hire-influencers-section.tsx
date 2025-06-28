import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'

export const FindAndHireInfluencersSection = () => {
  return (
    <section className="px-5 py-10 sm:p-10 lg:p-20 xl:p-36">
      <div className='bg-[#1D232C] text-white flex flex-col sm:flex-row rounded-lg  '>
        <div className='space-y-4 p-10 w-full sm:w-3/5'>
          <h4 className='font-semibold text-xl sm:text-2xl'>
            Find and Hire Influencers
          </h4>
          <p>Search Instagram, TikTok, and YouTube influencers.</p>
        <Button className='bg-white hover:bg-white/90' asChild>
          <Link href='/influencers'>Search Influencers</Link>
        </Button>
        </div>

      <div className='relative aspect-auto w-full h-auto '>
        <Image
          src='/find-&-hire-influencers-section.png'
          alt='Find and Hire Influencers Section'
        fill
          className='w-full h-auto object-cover'
        />
      </div>
          </div>
    </section>
  )
}
