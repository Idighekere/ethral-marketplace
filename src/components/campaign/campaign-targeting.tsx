'use client'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCampaignStore } from '@/store/useCampaignStore'
import { CampaignStepLayout } from './campaign-step-layout'
import {useRouter} from "next/navigation"

interface Props {
  onContinue: () => void
  onBack?: () => void
}

const REGIONS=[
  { value: 'global', label: 'Global' },
  { value: 'north-america', label: 'North America' },
  { value: 'europe', label: 'Europe' },
  { value: 'asia', label: 'Asia' },
  { value: 'africa', label: 'Africa' },
]

const INFLUENCER_COUNT=[
  { value: '1-5', label: '1-5 Influencers' },
  { value: '6-10', label: '6-10 Influencers' },
  { value: '11-20', label: '11-20 Influencers' },
  { value: '20+', label: '20+ Influencers' },
]
const CAMPAIGN_TYPES=[
  { value: 'influencer', label: 'Influencer Marketing' },
  { value: 'content', label: 'Content Creation' },
  { value: 'affiliate', label: 'Affiliate Marketing' },
]

const NICHES=[
  { value: 'fashion', label: 'Fashion' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'tech', label: 'Technology' },
  { value: 'gaming', label: 'Gaming' },
]
const CampaignTargeting = ({onContinue}:Props) => {
  const { updateCampaignData,  campaignData } = useCampaignStore()

  const router=useRouter()
  const handleNext = () => {

    onContinue()
  }

  const handleGoBack=()=>{
    router.back()
  }
  return (
    <CampaignStepLayout currentStep={1} totalSteps={3} onContinue={handleNext} onBack={handleGoBack} showBackButton={true} title="Let&apos;s see your targeting details.">
      <form className='space-y-6'>
        <div>
          <Label>What type of campaign do you want?</Label>
          <Select
        value={campaignData.campaignType}
        onValueChange={value => updateCampaignData({ campaignType: value })}
          >
        <SelectTrigger className="border-[#CDCDCD] border text-white" >
          <SelectValue placeholder='Select campaign type' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
          {CAMPAIGN_TYPES.map(type => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
          </SelectGroup>
        </SelectContent>
          </Select>
        </div>

        <div>
          <Label>How many influencers do you want to hire?</Label>
          <Select
        value={campaignData.influencerCount}
        onValueChange={value => updateCampaignData({ influencerCount: value })}
          >
        <SelectTrigger className="border-[#CDCDCD] border text-white" >
          <SelectValue placeholder='Select number of influencers' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {INFLUENCER_COUNT.map(count => (
              <SelectItem key={count.value} value={count.value}>
                {count.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Target Niches (Optional)</Label>
          <Select
        value={campaignData.targetNiches?.[0]}
        onValueChange={value => updateCampaignData({ targetNiches: [value] })}
          >
        <SelectTrigger className="border-[#CDCDCD] border text-white" >
          <SelectValue placeholder='Select target niche' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
        {NICHES.map(niche => (
            <SelectItem key={niche.value} value={niche.value}>
              {niche.label}
            </SelectItem>
          ))}
          </SelectGroup>
        </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Target Regions</Label>
          <Select
        value={campaignData.targetRegions?.[0]}
        onValueChange={value => updateCampaignData({ targetRegions: [value] })}
          >
        <SelectTrigger className="border-[#CDCDCD] border text-white" >
          <SelectValue placeholder='Select target region' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
           {REGIONS.map(region => (
            <SelectItem key={region.value} value={region.value}>
              {region.label}
            </SelectItem>
          ))}
          </SelectGroup>
        </SelectContent>
          </Select>
        </div>

      </form>
   </CampaignStepLayout>
  )
}

export default CampaignTargeting
