'use client'

import { useState, useRef } from 'react'
import { StepLayout } from './step-layout'
import { useCreatorOnboarding } from '@/store/creatorOnboardingContext'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { CameraIcon, Upload } from 'lucide-react'

interface Step7ImagesProps {
  onContinue: () => void
  onBack: () => void
}

export function Step7Images ({ onContinue, onBack }: Step7ImagesProps) {
  const { state, updateProfileImage, addContentImage, removeContentImage } =
    useCreatorOnboarding()
  const [error, setError] = useState<string | null>(null)
  const profileInputRef = useRef<HTMLInputElement>(null)
  const contentInputRef = useRef<HTMLInputElement>(null)

  const handleContinue = () => {
    if (!state.profileImage) {
      setError('Please upload a profile image')
      return
    }

    onContinue()
  }

  const handleProfileImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (file.size > 5 * 1024 * 1024) {
        setError('Profile image must be less than 5MB')
        return
      }

      updateProfileImage(file)
      setError(null)
    }
  }

  const handleContentImagesSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)

      // Check if adding these files would exceed the limit
      if (state.contentImages.length + files.length > 10) {
        setError('You can upload a maximum of 10 content images')
        return
      }

      files.forEach(file => {
        if (file.size <= 5 * 1024 * 1024) {
          addContentImage(file)
        } else {
          setError('Each image must be less than 5MB')
        }
      })
    }
  }

  return (
    <StepLayout
      currentStep={7}
      totalSteps={11}
      onContinue={handleContinue}
      onBack={onBack}
      showBackButton={false}
      showViewExampleButton={true}
      title='Add up to 10 images of you and your content'
    >
      <div className='space-y-8'>
        <div className='flex flex-col items-center'>
          <div
            onClick={() => profileInputRef.current?.click()}
            className={cn(
              'w-32 h-32 rounded-full bg-secondary border-dashed flex items-center justify-center cursor-pointer',
              state.profileImage ? 'border-primary' : ''
            )}
          >
            {state.profileImage ? (
              <div className='relative w-full h-full rounded-full overflow-hidden'>
                <Image
                  src={URL.createObjectURL(state.profileImage)}
                  alt='Profile'
                  fill
                  className='object-cover'
                />
              </div>
            ) : (
              <div className='text-center'>
                <span className='block text-sm text-gray-400'>
                  <CameraIcon className="mx-auto"/>
                </span>
                <span className='block text-xs text-gray-500'>
                  Add Profile Photo
                </span>
              </div>
            )}
          </div>
          <input
            type='file'
            ref={profileInputRef}
            onChange={handleProfileImageSelect}
            accept='image/*'
            className='hidden'
          />
        </div>

        <div className='space-y-4'>
          <div
            onClick={() => contentInputRef.current?.click()}
            className={cn(
              'border border-dashed rounded-md p-8 flex flex-col items-center justify-center cursor-pointer bg-secondary h-40 sm:h-50',
              state.contentImages.length > 0
                ? 'border-primary/50'
                : 'border-[#CDCDCD]/60'
            )}
          >
         <Button className="font-medium">

            <span className='block text-sm '>
                <Upload/>
                </span>
                Upload Photos
         </Button>

          </div>
          <input
            type='file'
            ref={contentInputRef}
            onChange={handleContentImagesSelect}
            accept='image/*'
            multiple
            className='hidden'
          />

          {state.contentImages.length > 0 && (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
              {state.contentImages.map((image, index) => (
                <div
                  key={index}
                  className='relative aspect-square rounded-md overflow-hidden group'
                >
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Content ${index + 1}`}
                    fill
                    className='object-cover'
                  />
                  <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={e => {
                        e.stopPropagation()
                        removeContentImage(index)
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className='text-sm text-gray-400'>
            {state.contentImages.length} / 10 images uploaded
          </p>
        </div>

        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </div>
    </StepLayout>
  )
}
