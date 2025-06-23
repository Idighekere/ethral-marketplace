'use client'

import { useState } from 'react'
import { StepLayout } from './step-layout'
import { useCreatorOnboarding } from '@/store/creatorOnboardingContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent,  CardHeader } from '@/components/ui/card'
import { PlusIcon, TrashIcon } from 'lucide-react'

interface Step8PackagesProps {
  onContinue: () => void
  onBack: () => void
}

type PostType =
  | 'X Post'
  | 'Thread post'
  | 'Space speaking'
  | 'X Live AMA'
  | 'Retweet'
  | 'Quote'

export function Step8Packages ({ onContinue, onBack }: Step8PackagesProps) {
  const {
    state,
    updateContentPackage,
    addContentPackage,
    removeContentPackage
  } = useCreatorOnboarding()

  const [error, setError] = useState<string | null>(null)
  const [showDescriptions, setShowDescriptions] = useState<
    Record<number, boolean>
  >({})

  const toggleDescription = (index: number) => {
    setShowDescriptions(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const handleContinue = () => {
    // Check if at least one package is valid
    const hasValidPackage = state.contentPackages.some(
      pkg => pkg.postType && pkg.quantity > 0 && pkg.price > 0
    )

    if (!hasValidPackage) {
      setError('Please set up at least one valid content package')
      return
    }

    onContinue()
  }

  return (
    <StepLayout
      currentStep={8}
      totalSteps={11}
      onContinue={handleContinue}
      onBack={onBack}
      showBackButton={true}
      showViewExampleButton={true}
      title='Add your content packages'
    >
      <div className='space-y-6'>
        <p className='text-gray-300'>
          Content packages are listed on your profile and can be purchased by
          brands. Unsure what to charge? Use our rate calculator. Ethral takes a
          15% fee.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {state.contentPackages.map((pkg, index) => (
            <Card
              key={index}
              className='bg-transparent border-[0.5px] border-[#CDCDCD]'
            >
              <CardHeader className='p-4 flex flex-row justify-between items-center'>
                <Select
                  value={pkg.postType}
                  onValueChange={value =>
                    updateContentPackage(index, { postType: value as PostType })
                  }
                >
                  <SelectTrigger className='bg-transparent border-[0.5px] border-[#CDCDCD] w-44 text-white'>
                    <SelectValue placeholder='Select post type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='X Post'>X Post</SelectItem>
                    <SelectItem value='Thread post'>Thread post</SelectItem>
                    <SelectItem value='Space speaking'>
                      Space speaking
                    </SelectItem>
                    <SelectItem value='X Live AMA'>X Live AMA</SelectItem>
                    <SelectItem value='Retweet'>Retweet</SelectItem>
                    <SelectItem value='Quote'>Quote</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => removeContentPackage(index)}
                  className='text-red-500'
                >
                  <TrashIcon />
                </Button>
              </CardHeader>

              <CardContent className='p-4 space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                    <Input
                      id={`quantity-${index}`}
                      type='number'
                      min='1'
                      value={pkg.quantity}
                      onChange={e =>
                        updateContentPackage(index, {
                          quantity: parseInt(e.target.value) || 1
                        })
                      }
                      className='bg-transparent border-[0.5px] border-[#CDCDCD]'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor={`price-${index}`}>Price (USD)</Label>
                    <Input
                      id={`price-${index}`}
                      type='number'
                      min='0'
                      step='0.01'
                      value={pkg.price}
                      onChange={e =>
                        updateContentPackage(index, {
                          price: parseFloat(e.target.value) || 0
                        })
                      }
                      className='bg-transparent border-[0.5px] border-[#CDCDCD]'
                    />
                  </div>
                </div>

                <Button
                  variant='ghost'
                  type='button'
                  onClick={() => toggleDescription(index)}
                  className='w-full justify-start p-0 h-auto text-sm underline hover:bg-transparent text-white/60'
                >
                  {showDescriptions[index]
                    ? 'Hide description'
                    : 'Add description'}
                </Button>

                {showDescriptions[index] && (
                  <div className='space-y-2'>
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      value={pkg.description}
                      onChange={e =>
                        updateContentPackage(index, {
                          description: e.target.value
                        })
                      }
                      placeholder="Describe what's included in this package..."
                      className='bg-transparent border-[0.5px] border-[#CDCDCD] min-h-[100px]'
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {state.contentPackages.length < 6 && (
            <div
              onClick={addContentPackage}
              className='border-[0.5px] border-dashed border-[#CDCDCD] rounded-md p-6 flex flex-col items-center justify-center cursor-pointer min-h-[200px] hover:border-primary/70 transition-colors'
            >
              <PlusIcon className='w-8 h-8 mb-2' />
              <span>Add Package</span>
            </div>
          )}
        </div>

        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </div>
    </StepLayout>
  )
}
