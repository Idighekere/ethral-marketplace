'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CustomSelect, CustomMultiSelect } from '@/components/ui/custom-select'
import { Textarea } from '@/components/ui/textarea'
import { useCampaignStore } from '@/store/useCampaignStore'
import {  CheckCircle, Upload, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { CampaignStepLayout } from './campaign-step-layout'

interface CampaignDetailsProps {
  campaignId: string
  onContinue?: () => void
  onBack?: () => void
}

const CampaignDetails = ({ campaignId, onBack }: CampaignDetailsProps) => {
  const router = useRouter()
  const { campaignData, updateCampaignData } = useCampaignStore()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    setIsSubmitted(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setSelectedFiles(prev => [...prev, ...newFiles])
      updateCampaignData({
        approvalAndDelivery: {
          ...campaignData.approvalAndDelivery,
          contentFiles: [...selectedFiles, ...newFiles]
        }
      })
    }
  }

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      setSelectedFiles(prev => [...prev, ...newFiles])
      updateCampaignData({
        approvalAndDelivery: {
          ...campaignData.approvalAndDelivery,
          contentFiles: [...selectedFiles, ...newFiles]
        }
      })
    }
  }

  const removeFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index)
    setSelectedFiles(updatedFiles)
    updateCampaignData({
      approvalAndDelivery: {
        ...campaignData.approvalAndDelivery,
        contentFiles: updatedFiles
      }
    })
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
            Your campaign &quot;{campaignData.campaignDetails?.campaignName}
            &quot; has been created and is now ready for launch.
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
    <CampaignStepLayout
      currentStep={3}
      totalSteps={3}
      showBackButton={true}
      onBack={onBack}
      title="Let's enter your Campaign Details"
      description=''
      continueButtonText='Publish Campaign'
      showContinueButton={false}
    >
      <div className='text-neutral-white'>
        <form onSubmit={handleSubmit} className='space-y-8'>
          {/* Section 1: Campaign Details */}
          <div className=''>
            <div className='space-y-6'>
              <div className=''>
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
            <div className='space-y-6'>
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
            <div className='space-y-6'>
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
            <div className='space-y-6'>
              <div>
                <Label>
                  Select the content type(s) you want KOLs to produce
                </Label>
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
            <div className='space-y-6'>
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
            <div className='space-y-6'>
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
              </div>{' '}
              <div>
                <Label>Upload Reference Materials (Optional)</Label>
                <Card className='px-6 bg-secondary w-full sm:w-fit text-white border-0'>
                  {/* Drag and drop area with border */}
                  <div
                    className='border-2 border-dashed border-gray-500 rounded-md p-6 mb-4 flex flex-col items-center justify-center'
                    onDragOver={e => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onDrop={handleFileDrop}
                  >
                    <Upload className='mb-4 h-12 w-12' />
                    <p className='mb-4 text-center text-sm text-white'>
                      Drag and drop files here
                    </p>
                    <p className='text-center text-xs  mb-4'>
                      Supported formats: MP3, WAV, FLAC (max:50MB)
                    </p>
                    <Input
                      id='file-upload'
                      type='file'
                      className='hidden'
                      multiple
                      accept='.mp3,.wav,.flac'
                      onChange={handleFileChange}
                    />
                    <Button
                      type='button'
                      variant='default'
                      onClick={() =>
                        document.getElementById('file-upload')?.click()
                      }
                    >
                      Browse Files
                    </Button>
                  </div>

                  {/* Display selected files */}
                  {selectedFiles.length > 0 && (
                    <div className='mb-4'>
                      <h4 className='text-sm font-medium mb-2'>
                        Selected Files:
                      </h4>
                      <div className='space-y-2 max-h-40 overflow-y-auto p-2 border border-gray-700 rounded'>
                        {selectedFiles.map((file, index) => (
                          <div
                            key={index}
                            className='flex items-center justify-between bg-secondary/50 p-2 rounded'
                          >
                            <span className='text-sm truncate max-w-[70%]'>
                              {file.name}
                            </span>
                            <Button
                              type='button'
                              variant='ghost'
                              size='sm'
                              onClick={() => removeFile(index)}
                              className='h-7 w-7 p-0'
                            >
                              <X className='h-4 w-4' />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Buttons outside the drag area */}
                  <div className='flex gap-2 justify-end'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => {
                        setSelectedFiles([])
                        updateCampaignData({
                          approvalAndDelivery: {
                            ...campaignData.approvalAndDelivery,
                            contentFiles: []
                          }
                        })
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type='button' disabled={selectedFiles.length === 0}>
                      Upload
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <Button type='submit' className='w-full sm:w-fit rounded-full'>
            Publish Campaign
          </Button>
        </form>
      </div>
    </CampaignStepLayout>
  )
}

export default CampaignDetails
