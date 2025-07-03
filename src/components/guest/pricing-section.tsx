"use client"

import { PRICING_PLANS } from '@/constants'
import React from 'react'
import { PricingCard } from '../shared'
import { Button } from '../ui/button'
import Link from 'next/link'
import {useState} from "react"

export const PricingSection = () => {

  const [billingCycle, setBillingCycle] = useState<'quaterly' | 'yearly'>(
    'quaterly'
  )
  return (
    <section className='w-full py-16 px-5 sm:px-10 lg:px-20 xl:p-36'>
      <div className=' px-4 md:px-6'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-primary mb-4 font-epilogue'>
            Pricing Plans
          </h2>
          <p className='text-slate-300 text-lg'>
            Our pricing is simple, transparent and adapts to the size of your
            brand.
          </p>
        </div>
      </div>

      <div className='mt-4 flex justify-between gap-1 bg-secondary rounded-full p-1.5 w-fit mx-auto mb-6 md:mb-12'>
          <Button
            variant={billingCycle === 'quaterly' ? 'default' : 'ghost'}
            onClick={() => setBillingCycle('quaterly')}
            className={`rounded-full text-regular ${
              billingCycle === 'quaterly'
                ? 'bg-primary text-black'
                : 'text-white'
            }`}
          >
            Bill Quaterly
          </Button>
          <div className="relative">
          <Button
            variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
            onClick={() => setBillingCycle('yearly')}
            className={`rounded-full text-normal relative  ${
              billingCycle === 'yearly' ? 'bg-primary text-black' : 'text-white'
            }`}
          >
            Bill Yearly
          <span className="absolut/e px-2  text-sm bg-[#1D232C] text-white rounded-full right-0">Save 20%</span>
          </Button>
            </div>
        </div>


      <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl  mx-auto'>
        {PRICING_PLANS.map(plan => (
          <PricingCard plan={plan} key={plan.id} billingCycle={billingCycle}/>
        ))}
      </div>

      <div className='bg-secondary p-4 md:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 mb-8 rounded-md'>
        <div className='flex flex-col gap-2'>
          <h3 className="text-xl sm:text-2xl font-medium text-white">Still on the Fence? Book a Demo</h3>
          <p className="text-white/80"> Interested in our monthly plans? Speak to an expert</p>
        </div>
        <div className=' w-full sm:w-fit mt-6 sm:mt-0'>
          <Button className='bg-white hover:bg-white/90 w-full sm:w-fit' asChild>
            <Link href='mailto:contact@ethral.com'>Book Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
