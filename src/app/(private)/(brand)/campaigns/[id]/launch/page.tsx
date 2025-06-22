'use client'

import {
  CampaignTargeting,
  CampaignPricing,
  CampaignDetails
} from '@/components/campaign'
import { useCampaignStore } from '@/store/useCampaignStore'

const CampaignLaunchPage = ({ params }: { params: { id: string } }) => {
  const {  currentStep } = useCampaignStore()

  return (
    <div className="/flex flex-col md:flex-row gap-10 md:gap-20">
      {/* <Card className='mx-auto max-w-2xl p-8 text-center'>
        <div className='mb-6 flex justify-center'>
          <CheckCircle className='h-16 w-16 text-green-500' />
        </div>
        <h1 className='mb-4 text-3xl font-bold'>
          Campaign Created Successfully!
        </h1>
        <p className='mb-8 text-gray-600'>
          Your campaign "{campaignData.campaignDetails?.campaignName}" has been
          created and is now ready for launch.
        </p>
        <div className='flex justify-center gap-4'>
          <Button variant='outline' onClick={() => window.history.back()}>
            Back to Dashboard
          </Button>
          <Button>View Campaign</Button>
        </div>
      </Card> */}
      {/* <div className='md:mt-8 w-full'> */}
        {currentStep === 1 && <CampaignTargeting />}
        {currentStep === 2 && <CampaignPricing />}
        {currentStep === 3 && <CampaignDetails campaignId={params.id} />}
      {/* </div> */}
    </div>
  )
}

export default CampaignLaunchPage
