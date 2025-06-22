'use client'

import { useState } from 'react'
import { Camera } from 'lucide-react'
import Image from 'next/image'

export default function ImagesPage () {
  const [coverImage, setCoverImage] = useState<string>('')
  const [profileImage, setProfileImage] = useState<string>('')

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'cover' | 'profile'
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      if (type === 'cover') setCoverImage(imageUrl)
      else setProfileImage(imageUrl)
    }
  }

  return (
    <div className='mt-6'>
      <div className='max-w-3xl space-y-6'>
        <div className='relative w-full'>          <div className='aspect-[3/1] relative overflow-hidden rounded-lg bg-secondary'>
            {coverImage ? (
              <>
                <Image
                  src={coverImage}
                  alt='Cover'
                  fill
                  className='object-cover'
                />
                <div className='absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200'>
                  <Camera className='h-8 w-8 text-white' />
                </div>
              </>
            ) : (
              <div className='absolute inset-0 flex items-center justify-center'>
                <Camera className='h-8 w-8 text-[#e9e9e9]' />
              </div>
            )}
            <input
              type='file'
              accept='image/*'
              onChange={e => handleImageUpload(e, 'cover')}
              className='absolute inset-0 opacity-0 cursor-pointer z-10'
            />
          </div>          <div className='absolute -bottom-16 left-1/2 -translate-x-1/2 w-full max-w-xl'>
            <div className='bg-transparent sm:bg-neutral-white/80 backdrop-blur-sm rounded-lg p-3 '>
              <div className='relative w-25 h-25 md:w-32 md:h-32 mx-auto -mt-20 mb-4'>                <div className='w-full h-full rounded-full border border-[#CDCDCD] overflow-hidden relative bg-neutral-900'>
                  {profileImage ? (
                    <>
                      <Image
                        src={profileImage}
                        alt='Profile'
                        fill
                        className='object-cover'
                      />
                      <div className='absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200'>
                        <Camera className='h-6 w-6 text-white' />
                      </div>
                    </>
                  ) : (
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <Camera className='h-6 w-6 text-[#e9e9e9]' />
                    </div>
                  )}
                  <input
                    type='file'
                    accept='image/*'
                    onChange={e => handleImageUpload(e, 'profile')}
                    className='absolute inset-0 opacity-0 cursor-pointer z-10'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
