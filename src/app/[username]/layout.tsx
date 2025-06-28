import { ProfileHeader } from '@/components/shared/profile-header'
import { BrandMobileMenu } from '@/components/brand/brand-mobile-menu'
import { ListProvider } from '@/store/listContext'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import { getProfileType } from '@/lib/profile'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { Metadata } from 'next'

export async function generateMetadata ({ params }: { params: { username: string } }): Promise<Metadata> {
  const { username } = await params

  try {
    const profileType = await getProfileType(username)

    const title = username

    const description = profileType === 'brand'
      ? `Discover ${username}'s brand profile, campaigns, and collaborations on Ethral.`
      : `View ${username}'s influencer profile, packages, and proof of work on Ethral.`

    return generateSEOMetadata({
      title,
      description,
      canonical: `/${username}`,
      type: 'profile',
      keywords: profileType === 'brand'
        ? ['brand profile', 'brand campaigns', 'brand collaboration']
        : ['influencer profile', 'content creator', 'influencer packages']
    })
  } catch {
    return generateSEOMetadata({
      title: `${username} Profile`,
      description: `View ${username}'s profile on Ethral`,
      canonical: `/${username}`,
      type: 'profile'
    })
  }
}

interface ProfileLayoutProps {
  children: React.ReactNode
  params: {
    username: string
  }
}

export default async function ProfileLayout ({
  children,
  params
}: ProfileLayoutProps) {
  const { username } = await params

  const isAuthenticated = true // TODO: Replace with your auth logic
  const profileType = await getProfileType(username)

  if (!profileType) {
    notFound()
  }

  return (
    <ListProvider>
      <div className='min-h-screen bg-background pb-16 md:pb-0'>
        <ProfileHeader
          isAuthenticated={isAuthenticated}
          username={username}
          profileType={profileType}
        />
        <main className='mx-auto p-5 sm:p-10 lg:p-20 xl:px-36:p-36 '>
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
