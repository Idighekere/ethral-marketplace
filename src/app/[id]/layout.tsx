import { ProfileHeader } from '@/components/shared/profile-header'
import { BrandMobileMenu } from '@/components/brand/brand-mobile-menu'
import { ListProvider } from '@/store/listContext'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import { getProfileType } from '@/lib/profile'

interface ProfileLayoutProps {
  children: React.ReactNode
  params: {
    id: string
  }
}

export default async function ProfileLayout ({
  children,
  params
}: ProfileLayoutProps) {
  const { id } = params

  const isAuthenticated = true // TODO: Replace with your auth logic
  const profileType = await getProfileType(id)

  if (!profileType) {
    notFound()
  }

  return (
    <ListProvider>
      <div className='min-h-screen bg-background pb-16 md:pb-0'>
        <ProfileHeader
          isAuthenticated={isAuthenticated}
          username={id}
          profileType={profileType}
        />
        <main className='mx-auto p-5 sm:p-10 lg:p-16'>
          <Suspense
            fallback={
              <div className='w-full h-screen flex items-center justify-center'>
                Loading profile...
              </div>
            }
          >
            {children}
          </Suspense>
        </main>
        {isAuthenticated && <BrandMobileMenu />}
      </div>
    </ListProvider>
  )
}
