'use client'

import { Button } from '@/components/ui/button'
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
import { ArrowLeft } from 'lucide-react'

const CampaignTargeting = () => {
  const { updateCampaignData, setStep, campaignData } = useCampaignStore()

  const handleNext = () => {
    setStep(2)
  }

  return (
    <div className=''>
      <Button
        variant='outline'
        className='mb-8 flex items-center gap-2'
        onClick={() => window.history.back()}
      >
        <ArrowLeft className='h-4 w-4' />
        <span className='hidden md:inline'>Back</span>
      </Button>

      <div className='mb-8'>
        <div className='h-2 w-full rounded-full bg-gray-200'>
          <div className='h-2 w-1/2 rounded-full bg-primary'></div>
        </div>
      </div>

      <form className='space-y-6'>
        <div>
          <Label>What type of campaign do you want?</Label>
          <Select
        value={campaignData.campaignType}
        onValueChange={value => updateCampaignData({ campaignType: value })}
          >
        <SelectTrigger>
          <SelectValue placeholder='Select campaign type' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='influencer'>Influencer Marketing</SelectItem>
            <SelectItem value='content'>Content Creation</SelectItem>
            <SelectItem value='affiliate'>Affiliate Marketing</SelectItem>
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
        <SelectTrigger>
          <SelectValue placeholder='Select number of influencers' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='1-5'>1-5 Influencers</SelectItem>
            <SelectItem value='6-10'>6-10 Influencers</SelectItem>
            <SelectItem value='11-20'>11-20 Influencers</SelectItem>
            <SelectItem value='20+'>20+ Influencers</SelectItem>
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
        <SelectTrigger>
          <SelectValue placeholder='Select target niche' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='fashion'>Fashion</SelectItem>
            <SelectItem value='beauty'>Beauty</SelectItem>
            <SelectItem value='lifestyle'>Lifestyle</SelectItem>
            <SelectItem value='tech'>Technology</SelectItem>
            <SelectItem value='gaming'>Gaming</SelectItem>
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
        <SelectTrigger>
          <SelectValue placeholder='Select target region' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='global'>Global</SelectItem>
            <SelectItem value='north-america'>North America</SelectItem>
            <SelectItem value='europe'>Europe</SelectItem>
            <SelectItem value='asia'>Asia</SelectItem>
            <SelectItem value='africa'>Africa</SelectItem>
          </SelectGroup>
        </SelectContent>
          </Select>
        </div>

        <Button type='button' className='w-full' onClick={handleNext}>
          Proceed <ArrowLeft className='ml-2 h-4 w-4 rotate-180' />
        </Button>
      </form>
    </div>
  )
}

export default CampaignTargeting
