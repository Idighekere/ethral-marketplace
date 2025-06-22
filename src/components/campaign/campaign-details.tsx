'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CustomSelect, CustomMultiSelect } from '@/components/ui/custom-select'
import { Textarea } from '@/components/ui/textarea'
import { useCampaignStore } from '@/store/useCampaignStore'
import { ArrowLeft, CheckCircle, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'

interface CampaignDetailsProps {
  campaignId: string
}

const CampaignDetails = ({ campaignId }: CampaignDetailsProps) => {
  const router = useRouter()
  const { campaignData, updateCampaignData,setStep } = useCampaignStore()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Card className='mx-auto max-w-2xl p-8 text-center'>
          <div className='mb-6 flex justify-center'>
            <CheckCircle className='h-16 w-16 text-green-500' />
          </div>
          <h1 className='mb-4 text-3xl font-bold'>
            Campaign Created Successfully!
          </h1>
          <p className='mb-8 text-gray-600'>
            Your campaign &quot;{campaignData.campaignDetails?.campaignName}&quot; has
            been created and is now ready for launch.
          </p>
          <div className='flex justify-center gap-4'>
            <Button variant='outline' onClick={() => router.push('/campaigns')}>
              Back to Dashboard
            </Button>
            <Button onClick={() => router.push(`/campaigns/${campaignId}`)}>
              View Campaign
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className='text-neutral-white'>
      <Button
        variant='outline'
        className='mb-8 flex items-center gap-2'
        onClick={() =>setStep(2)}
      >
        <ArrowLeft className='h-4 w-4' />
        <span className='hidden md:inline'>Back</span>
      </Button>

      <div className='mb-8 flex gap-2'>
        <div className='flex flex-col'>
        <p className='text-neutral-white hidden md:inline'>
            (1) Set Campaign Targeting
          </p>
          <div className='h-2 w-full rounded-full bg-gray-200 flex'>
            <div className='h-2 w-full rounded-full bg-primary'></div>
          </div>
        </div>
        <div className='flex flex-col'>
          <p className='text-neutral-white /hidden md:inline'>
            (2) Enter Campaign Details
          </p>
          <div className='h-2 w-full rounded-full bg-[#2F353E]'>
            <div className='h-2 w-full rounded-full bg-primary'></div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-8'>
        {/* Section 1: Campaign Details */}
        <div className='space-y-6'>
          <h3 className='text-xl font-bold'>Campaign Details</h3>
          <div className='grid gap-4 md:grid-cols-2'>
            <div>
              <Label>Campaign Name</Label>
              <Input
                required
                placeholder='Enter campaign name'
                onChange={e =>
                  updateCampaignData({
                    campaignDetails: {
                      ...campaignData.campaignDetails,
                      campaignName: e.target.value
                    }
                  })
                }
              />
            </div>
            <div>
              <Label>Project/Brand Name</Label>
              <Input
                required
                placeholder='Enter project/brand name'
                onChange={e =>
                  updateCampaignData({
                    campaignDetails: {
                      ...campaignData.campaignDetails,
                      projectName: e.target.value
                    }
                  })
                }
              />
            </div>
            <div>
              <Label>Campaign Duration</Label>
              <CustomSelect
                required
                value={campaignData.campaignDetails?.campaignDuration}
                onChange={value =>
                  updateCampaignData({
                    campaignDetails: {
                      ...campaignData.campaignDetails,
                      campaignDuration: value
                    }
                  })
                }
                options={[
                  { value: '1-week', label: '1 Week' },
                  { value: '2-weeks', label: '2 Weeks' },
                  { value: '1-month', label: '1 Month' },
                  { value: '3-months', label: '3 Months' }
                ]}
                placeholder='Select campaign duration'
              />
            </div>
            <div>
              <Label>Primary Objective</Label>
              <CustomSelect
                required
                value={campaignData.campaignDetails?.primaryObjective}
                onChange={value =>
                  updateCampaignData({
                    campaignDetails: {
                      ...campaignData.campaignDetails,
                      primaryObjective: value
                    }
                  })
                }
                options={[
                  { value: 'awareness', label: 'Brand Awareness' },
                  { value: 'sales', label: 'Drive Sales' },
                  { value: 'engagement', label: 'Increase Engagement' },
                  { value: 'leads', label: 'Generate Leads' }
                ]}
                placeholder='Select primary objective'
              />
            </div>
          </div>
        </div>

        <Separator className='my-8' />

        {/* Section 2: Goals and KPIs */}
        <div className='space-y-6'>
          <h3 className='text-xl font-bold'>Goals and KPIs</h3>
          <div className='space-y-4'>
            <div>
              <Label>Key Goals</Label>
              <Textarea
                required
                placeholder='What are your main campaign goals?'
                onChange={e =>
                  updateCampaignData({
                    goalsAndKPIs: {
                      ...campaignData.goalsAndKPIs,
                      keyGoals: e.target.value
                    }
                  })
                }
              />
            </div>
            <div>
              <Label>Success Metrics</Label>
              <Textarea
                required
                placeholder='How will you measure success?'
                onChange={e =>
                  updateCampaignData({
                    goalsAndKPIs: {
                      ...campaignData.goalsAndKPIs,
                      successMetrics: e.target.value
                    }
                  })
                }
              />
            </div>
          </div>
        </div>

        <Separator className='my-8' />

        {/* Section 3: Target Audience */}
        <div className='space-y-6'>
          <h3 className='text-xl font-bold'>Target Audience</h3>
          <div className='space-y-4'>
            <div>
              <Label>Who should the content appeal to?</Label>
              <Textarea
                required
                placeholder='Describe your target audience'
                onChange={e =>
                  updateCampaignData({
                    targetAudience: {
                      ...campaignData.targetAudience,
                      contentAppealTo: e.target.value
                    }
                  })
                }
              />
            </div>
            <div>
              <Label>Preferred Regions/Nationalities (if any)</Label>
              <CustomMultiSelect
                value={campaignData.targetAudience?.preferredRegions}
                onChange={value =>
                  updateCampaignData({
                    targetAudience: {
                      ...campaignData.targetAudience,
                      preferredRegions: value
                    }
                  })
                }
                options={[
                  { value: 'global', label: 'Global' },
                  { value: 'north-america', label: 'North America' },
                  { value: 'europe', label: 'Europe' },
                  { value: 'asia', label: 'Asia' },
                  { value: 'africa', label: 'Africa' }
                ]}
                placeholder='Select target regions'
              />
            </div>
          </div>
        </div>

        <Separator className='my-8' />

        {/* Section 4: Content Deliverables */}
        <div className='space-y-6'>
          <h3 className='text-xl font-bold'>Content Deliverables</h3>
          <div className='space-y-4'>
            <div>
              <Label>Select the content type(s) you want KOLs to produce</Label>
              <CustomMultiSelect
                value={campaignData.contentDeliverables?.contentTypes}
                onChange={value =>
                  updateCampaignData({
                    contentDeliverables: {
                      ...campaignData.contentDeliverables,
                      contentTypes: value
                    }
                  })
                }
                options={[
                  { value: 'photos', label: 'Photos' },
                  { value: 'videos', label: 'Videos' },
                  { value: 'stories', label: 'Stories' },
                  { value: 'reels', label: 'Reels' },
                  { value: 'blogs', label: 'Blog Posts' }
                ]}
                placeholder='Select content types'
              />
            </div>
          </div>
        </div>

        <Separator className='my-8' />

        {/* Section 5: Talking Points */}
        <div className='space-y-6'>
          <h3 className='text-xl font-bold'>Talking Points (Optional)</h3>
          <div>
            <Textarea
              placeholder='Add key messages or talking points for creators...'
              onChange={e =>
                updateCampaignData({ talkingPoints: e.target.value })
              }
            />
          </div>
        </div>

        <Separator className='my-8' />

        {/* Section 6: Budget & Compensation */}
        <div className='space-y-6'>
          <h3 className='text-xl font-bold'>Budget & Compensation</h3>
          <div className='grid gap-4 md:grid-cols-2'>
            <div>
              <Label>Total Budget per KOL</Label>
              <Input
                type='number'
                required
                placeholder='Enter budget amount'
                onChange={e =>
                  updateCampaignData({
                    budgetAndCompensation: {
                      ...campaignData.budgetAndCompensation,
                      totalBudgetPerKOL: e.target.value
                    }
                  })
                }
              />
            </div>
            <div>
              <Label>Payment Method</Label>
              <CustomSelect
                required
                value={campaignData.budgetAndCompensation?.paymentMethod}
                onChange={value =>
                  updateCampaignData({
                    budgetAndCompensation: {
                      ...campaignData.budgetAndCompensation,
                      paymentMethod: value
                    }
                  })
                }
                options={[
                  { value: 'bank', label: 'Bank Transfer' },
                  { value: 'paypal', label: 'PayPal' },
                  { value: 'crypto', label: 'Cryptocurrency' }
                ]}
                placeholder='Select payment method'
              />
            </div>
            <div className='md:col-span-2'>
              <Label>Payout Conditions</Label>
              <Textarea
                required
                placeholder='Specify any conditions for payment...'
                onChange={e =>
                  updateCampaignData({
                    budgetAndCompensation: {
                      ...campaignData.budgetAndCompensation,
                      payoutConditions: e.target.value
                    }
                  })
                }
              />
            </div>
          </div>
        </div>

        <Separator className='my-8' />

        {/* Section 7: Approval & Delivery Process */}
        <div className='space-y-6'>
          <h3 className='text-xl font-bold'>Approval & Delivery Process</h3>
          <div className='space-y-4'>
            <div>
              <Label>Content Review Required?</Label>
              <CustomSelect
                required
                value={campaignData.approvalAndDelivery?.contentReviewRequired?.toString()}
                onChange={value =>
                  updateCampaignData({
                    approvalAndDelivery: {
                      ...campaignData.approvalAndDelivery,
                      contentReviewRequired: value === 'true'
                    }
                  })
                }
                options={[
                  { value: 'true', label: 'Yes' },
                  { value: 'false', label: 'No' }
                ]}
                placeholder='Select review requirement'
              />
            </div>
            <div>
              <Label>Content should be submitted by</Label>
              <Input
                type='date'
                required
                onChange={e =>
                  updateCampaignData({
                    approvalAndDelivery: {
                      ...campaignData.approvalAndDelivery,
                      submissionDeadline: e.target.value
                    }
                  })
                }
              />
            </div>
            <div>
              <Label>Deliverables to be submitted to</Label>
              <Input
                type='email'
                required
                placeholder='Enter email address'
                onChange={e =>
                  updateCampaignData({
                    approvalAndDelivery: {
                      ...campaignData.approvalAndDelivery,
                      deliverableSubmissionTo: e.target.value
                    }
                  })
                }
              />
            </div>
            <div>
              <Label>Upload Reference Materials (Optional)</Label>
              <Card className='mt-2 p-6'>
                <div className='flex flex-col items-center justify-center'>
                  <Upload className='mb-4 h-12 w-12 text-gray-400' />
                  <p className='mb-4 text-center text-sm text-gray-600'>
                    Drag and drop files here, or click to browse
                  </p>
                  <input
                    type='file'
                    className='hidden'
                    multiple
                    onChange={e =>
                      updateCampaignData({
                        approvalAndDelivery: {
                          ...campaignData.approvalAndDelivery,
                          contentFiles: Array.from(e.target.files || [])
                        }
                      })
                    }
                  />
                  <div className='flex gap-2'>
                    <Button type='button' variant='outline'>
                      Cancel
                    </Button>
                    <Button type='button'>Upload</Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <Button type='submit' className='w-full'>
          Publish Campaign
        </Button>
      </form>
    </div>
  )
}

export default CampaignDetails
