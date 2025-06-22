import { ProfileHeader } from '@/components/shared/profile-header'
import { BrandMobileMenu } from '@/components/brand/brand-mobile-menu'
import { ListProvider } from '@/store/listContext'
import { notFound } from 'next/navigation'

interface ProfileLayoutProps {
  children: React.ReactNode
  params: {
    id: string
  }
}

// Mock function - replace with actual API call
const getProfileType = async (username: string) => {
  // TODO: Check if username exists in brands or influencers collection
  console.log(username)
  return 'influencer' // or 'brand'
}

export default async function ProfileLayout ({
  children,
  params
}: ProfileLayoutProps) {
  const isAuthenticated = true // TODO: Replace with your auth logic
  const profileType = await getProfileType(params?.id)

  if (!profileType) {
    notFound()
  }

  return (
    <ListProvider>
      <div className='min-h-screen bg-background pb-16 md:pb-0'>
        <ProfileHeader
          isAuthenticated={isAuthenticated}
          username={params.id}
          profileType={profileType}
        />
        <main className='container mx-auto p-5 sm:p-10 lg:p-16'>
          {children}
        </main>
        {isAuthenticated && <BrandMobileMenu />}
      </div>
    </ListProvider>
  )
}
