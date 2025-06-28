import { PRICING_PLANS } from '@/constants'
import React from 'react'
import { PricingCard } from '../shared'

export const PricingSection = () => {
  return (
    <section className='w-full py-16 px-5 sm:px-10 lg:px-20 xl:p-36'>
      <div className='container px-4 md:px-6'>
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

      <div className='grid gap-8 md:grid-cols-3 max-w-6xl  mx-auto'>
        {PRICING_PLANS.map(plan => (
          <PricingCard plan={plan} key={plan.id} />
        ))}
      </div>
    </section>
  )
}
