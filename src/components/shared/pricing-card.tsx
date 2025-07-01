import { Check } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { IPricingPlans } from '@/constants'

interface PricingCardProps{
    plan:IPricingPlans;
    billingCycle?: 'quaterly' | 'yearly';
    page?:string; //The page that the component is used in
    ctaButton?: () => void; // Optional click handler

}
export const PricingCard = ({plan,billingCycle="quaterly",page="",ctaButton}:PricingCardProps) => {
  return (

  <div key={plan.id} className='relative h-full bg-[#1D232C] rounded-lg p-6 flex flex-col'>
    {/* Badge */}
    <div className='absolute -top-3 right-0 transform rotate-6'>
      <span className='bg-[#FEF3C7] text-[#92400E] text-xs font-medium px-3 py-1 rounded-full'>
        {page=="campaign" ? "Early Bird Price" :plan.badge}
      </span>
    </div>

    {/* Card Content */}
    <div className='flex-grow'>
      <div className='mb-6'>
        <h3 className='text-white text-lg mb-4 border-b inline'>{plan.name}</h3>
        {/* <p className='text-[#e9e9e9] text-sm mt-2'>{plan.description}</p> */}
        <div className='flex items-baseline gap-1 border-b border-white/60 py-2'>
          <p className='text-white text-5xl font-extrabold'><span className="text-lg">$</span>{billingCycle=="quaterly"?plan.monthlyPrice.quaterly:plan.monthlyPrice.yearly}</p>
          {plan.period && (
              <span className='text-[#6B7280] text-sm'>
              {plan.name.toLowerCase() === 'free' ? '' : billingCycle === "quaterly" ? "/month" : "/month"}
              </span>
          )}
        </div>
        <p className='text-[#e9e9e9] text-sm mt-2 capitalize'>Billed {billingCycle} ${billingCycle === "quaterly" ? plan.totalPrice.quaterly : plan.totalPrice.yearly}</p>
      </div>

      <div className='space-y-3 mb-8'>
        {plan.features.map((feature, index) => (
          <div key={index} className='flex items-start gap-3'>
            <Check className='h-4 w-4 text-green-400 mt-0.5 flex-shrink-0' />
            <span className='text-slate-300 text-sm'>{feature}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Button - always at bottom */}
    <div className='mt-auto'>
      <Button
        className='w-full font-medium bg-primary text-base'
        size='lg'
        disabled={plan.name.toLowerCase() === 'free' && page=="campaign"}
        onClick={ctaButton}
      >
        {plan.buttonText}
      </Button>
    </div>
  </div>

  )
}
