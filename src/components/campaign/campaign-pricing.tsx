import { Button } from '@/components/ui/button'
import { useCampaignStore } from '@/store/useCampaignStore'
import { useState } from 'react'
import { PRICING_PLANS } from '@/constants'
import { PricingCard } from '../shared'

interface Props {
  onContinue: () => void
  onBack?: () => void
}

const CampaignPricing = ({ onContinue }: Props) => {
  const { updateCampaignData, setStep } = useCampaignStore()
  const [billingCycle, setBillingCycle] = useState<'quaterly' | 'yearly'>(
    'quaterly'
  )

  const handlePlanSelection = (plan: string) => {
    updateCampaignData({ selectedPlan: plan, billingCycle })
    setStep(3)
    onContinue()
  }

  return (
    <div className='mx-auto py-8'>
      <div className='mb-8 text-center'>
        <h2 className='text-3xl  font-bold text-primary'>Pricing Plan</h2>
        <p className='text-lg  mt-2 text-light text-neutral-white/80 mb-4'>
          Upgrade now to Post your Campaign
        </p>

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
      </div>

      <div className='grid gap-6 md:grid-cols-3 h-auto'>
        {PRICING_PLANS.map(plan => (
          <PricingCard
            plan={plan}
            key={plan.id}
            billingCycle={billingCycle}
            page='campaign'
            ctaButton={()=>handlePlanSelection(plan.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default CampaignPricing
