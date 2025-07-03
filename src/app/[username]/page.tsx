'use client'

import React,{useEffect} from 'react'
import { useParams,useRouter } from 'next/navigation'
import { useProfile } from '@/hooks/useProfile'
import {
  BrandProfile,
  InfluencerProfile
} from '@/components/features/profile'
import { BrandProfileType, InfluencerProfileType } from '@/types/profile'

const LoadingProfile = () => (
  <div className='w-full flex flex-col gap-6 animate-pulse'>
    <div className='w-full h-[200px] bg-gray-400 rounded-xl '></div>
    <div className='flex items-center gap-4'>
      <div className='w-24 h-24 rounded-full bg-gray-400'></div>
      <div className='flex flex-col gap-2'>
        <div className='h-8 w-48 bg-gray-400 rounded'></div>
        <div className='h-4 w-32 bg-gray-400 rounded'></div>
      </div>
    </div>
    <div className='w-full h-32 bg-gray-400 rounded-lg'></div>
    <div className='grid grid-cols-2 gap-4'>
      <div className='h-40 bg-gray-400 rounded-lg'></div>
      <div className='h-40 bg-gray-400 rounded-lg'></div>
    </div>
  </div>
)

export default function ProfilePage () {
  const params = useParams()
  const router = useRouter()
  const username = params?.username as string
  const { profile, profileType, loading, error } = useProfile(username)

  useEffect(() => {
    // Only redirect after loading is complete and no profile found
    if (!loading && !profile && !error) {
      router.replace('/')
    }
  }, [loading, profile, error, router])


  if (loading) {
    return <LoadingProfile />
  }

  if (error) {
    return (
      <div className='text-center py-20'>
        <h2 className='text-2xl font-semibold'>Error loading profile</h2>
        <p className='text-muted-foreground mt-2'>{error}</p>
      </div>
    )
  }

  if (!profile) {
     return <LoadingProfile/>
  }

  if (profileType === 'brand') {
    return <BrandProfile brand={profile as BrandProfileType} />
  }

  if (profileType === 'influencer') {
    return (
      <InfluencerProfile
        influencer={profile as InfluencerProfileType}
        isAuthenticated={true}
      />
    )
  }

  return null
}
