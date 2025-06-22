'use client'

import { Button } from '@/components/ui/button'
import { formatPrice } from '@/utils'

export default function PaymentPage () {
  // Mock data - replace with API call
  const subscription = null // or { plan: "Pro", price: 99 }
  const balance = 7500

  return (
    <div className='max-w-2xl space-y-8 py-6'>
      <div className=' space-y-4 bg-transparent'>
        <div className='flex items-center gap-2'>
          <h2 className='text-lg font-medium text-white'>Subscription</h2>
          <Button variant='link' className='text-primary p-0 h-auto'>
            Upgrade
          </Button>
        </div>
        <p className='text-[#e9e9e9]'>
          {subscription
            ? `You are currently on the ${
                subscription?.plan
              } plan at ${formatPrice(subscription?.price)}/month`
            : "You don't have an active subscription. Upgrade to access premium features."}
        </p>
      </div>

      <div className='space-y-3 bg-transparent '>
        <div className='flex items-center gap-2'>
          <h2 className='text-lg font-medium text-white'>Balance</h2>
          <Button variant='link' className='text-primary p-0 h-auto'>
            Add funds
          </Button>
        </div>
        <p className=' text-base text-white'>
          {formatPrice(balance)}
        </p>
      </div>
    </div>
  )
}
