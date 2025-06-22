import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCampaignStore } from '@/store/useCampaignStore'
import { useState } from 'react'

const CampaignPricing = () => {
  const { updateCampaignData, setStep } = useCampaignStore()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly'
  )

  const handlePlanSelection = (plan: string) => {
    updateCampaignData({ selectedPlan: plan, billingCycle })
    setStep(3)
  }

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? 99 : 990,
      features: [
        'Up to 5 influencers',
        'Basic analytics',
        'Email support',
        'Campaign management tools'
      ]
    },
    {
      name: 'Professional',
      price: billingCycle === 'monthly' ? 199 : 1990,
      features: [
        'Up to 20 influencers',
        'Advanced analytics',
        'Priority support',
        'Campaign management tools',
        'Custom reporting'
      ]
    },
    {
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 499 : 4990,
      features: [
        'Unlimited influencers',
        'Enterprise analytics',
        '24/7 dedicated support',
        'Advanced campaign tools',
        'Custom integrations',
        'White-label solutions'
      ]
    }
  ]

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8 text-center'>
        <h2 className='text-3xl font-bold'>Choose Your Plan</h2>
        <div className='mt-4 flex justify-center gap-4'>
          <Button
            variant={billingCycle === 'monthly' ? 'default' : 'outline'}
            onClick={() => setBillingCycle('monthly')}
          >
            Bill Monthly
          </Button>
          <Button
            variant={billingCycle === 'yearly' ? 'default' : 'outline'}
            onClick={() => setBillingCycle('yearly')}
          >
            Bill Yearly
          </Button>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        {plans.map(plan => (
          <Card key={plan.name} className='p-6'>
            <Badge className='mb-2'>Early Bird Price</Badge>
            <h3 className='text-2xl font-bold'>{plan.name}</h3>
            <div className='my-4'>
              <span className='text-4xl font-bold'>${plan.price}</span>
              <span className='text-gray-600'>
                /{billingCycle === 'monthly' ? 'mo' : 'yr'}
              </span>
            </div>
            <ul className='mb-6 space-y-2'>
              {plan.features.map(feature => (
                <li key={feature} className='flex items-center gap-2'>
                  <svg
                    className='h-5 w-5 text-green-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className='w-full'
              onClick={() => handlePlanSelection(plan.name.toLowerCase())}
            >
              Get Started
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CampaignPricing
