'use client'

import React, { useEffect, useState } from 'react'
import { getProfileType } from '@/lib/profile'
import BrandProfilePage from './brand-profile'
import InfluencerProfilePage from './influencer-profile'
import { useParams } from 'next/navigation'

const LoadingProfile = () => (
  <div className='w-full flex flex-col gap-6 animate-pulse'>
    <div className='w-full h-[200px] bg-gray-300 rounded-xl'></div>
    <div className='flex items-center gap-4'>
      <div className='w-24 h-24 rounded-full bg-gray-300'></div>
      <div className='flex flex-col gap-2'>
        <div className='h-8 w-48 bg-gray-300 rounded'></div>
        <div className='h-4 w-32 bg-gray-300 rounded'></div>
      </div>
    </div>
    <div className='w-full h-32 bg-gray-300 rounded-lg'></div>
    <div className='grid grid-cols-2 gap-4'>
      <div className='h-40 bg-gray-300 rounded-lg'></div>
      <div className='h-40 bg-gray-300 rounded-lg'></div>
    </div>
  </div>
)

export default function ProfilePage () {
  const params = useParams()
  const id = params?.id as string

  const [profileType, setProfileType] = useState<'brand' | 'influencer' | null>(
    null
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfileType = async () => {
      try {
        const type = await getProfileType(id)
        setProfileType(type)
      } catch (error) {
        console.error('Error fetching profile type:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProfileType()
    }
  }, [id])

  if (loading) {
    return <LoadingProfile />
  }

  if (profileType === 'brand') {
    return <BrandProfilePage id={id} />
  }

  if (profileType === 'influencer') {
    return <InfluencerProfilePage id={id} />
  }

  return (
    <div className='text-center py-20'>
      <h2 className='text-2xl font-semibold'>Profile not found</h2>
      <p className='text-muted-foreground mt-2'>
        The profile you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
    </div>
  )
}
