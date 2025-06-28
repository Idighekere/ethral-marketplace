import { useState, useEffect } from 'react'
import { Profile, ProfileType, BrandProfile, InfluencerProfile } from '@/types/profile'
import { getProfileType } from '@/lib/profile'
import { INFLUENCER_DETAILS } from '@/constants'

export function useProfile(username: string) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [profileType, setProfileType] = useState<ProfileType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true)
        setError(null)

        // Get profile type first
        const type = await getProfileType(username)
        setProfileType(type)

        // Fetch profile data based on type
        if (type === 'brand') {
          // Mock brand data - replace with actual API call
          const brandData: BrandProfile = {
            username,
            name: 'Brand Name',
            avatar: '/creator-1.png',
            coverImage: '/creator-1.png',
            bio: 'This is a brand bio description that would typically describe what the brand does, its mission, and other relevant information.',
            location: 'San Francisco, CA',
            type: 'brand',
            industry: 'Technology',
            website: 'https://example.com',
            founded: '2015',
            campaigns: [
              {
                id: '1',
                title: 'Summer Campaign',
                image: '/creator-2.png',
                budget: 5000,
                status: 'Active'
              },
              {
                id: '2',
                title: 'Holiday Special',
                image: '/placeholder-list.png',
                budget: 7500,
                status: 'Upcoming'
              }
            ],
            reviews: [],
            isVerified: true,
            createdAt: '2015-01-01',
            updatedAt: new Date().toISOString()
          }
          setProfile(brandData)
        } else if (type === 'influencer') {
          // Mock influencer data - replace with actual API call
          const influencerData: InfluencerProfile = {
            username,
            name: INFLUENCER_DETAILS.name,
            avatar: INFLUENCER_DETAILS.avatar,
            coverImage: INFLUENCER_DETAILS.photos[0],
            bio: INFLUENCER_DETAILS.bio,
            location: `${INFLUENCER_DETAILS.location.city}, ${INFLUENCER_DETAILS.location.country}`,
            type: 'influencer',
            title: INFLUENCER_DETAILS.title,
            followers: INFLUENCER_DETAILS.followers,
            price: INFLUENCER_DETAILS.price,
            packages: INFLUENCER_DETAILS.packages,
            photos: INFLUENCER_DETAILS.photos,
            pows: INFLUENCER_DETAILS.pows,
            reviews: INFLUENCER_DETAILS.reviews,
            faqs: INFLUENCER_DETAILS.faqs || [],
            relatedCategories: INFLUENCER_DETAILS.relatedCategories,
            isVerified: true,
            createdAt: '2020-01-01',
            updatedAt: new Date().toISOString()
          }
          setProfile(influencerData)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch profile')
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      fetchProfile()
    }
  }, [username])

  return {
    profile,
    profileType,
    loading,
    error,
    isBrand: profileType === 'brand',
    isInfluencer: profileType === 'influencer'
  }
}
