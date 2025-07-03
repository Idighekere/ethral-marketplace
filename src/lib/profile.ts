import { INFLUENCER_DETAILS } from "@/constants/influencer-data"

export const getProfileType = async (username: string): Promise<'brand' | 'influencer' | null> => {
  // TODO: Replace with actual API call to check user type
  // For now, return influencer if it matches INFLUENCER_DETAILS id, otherwise brand
  if (INFLUENCER_DETAILS.username === username) {
    return 'influencer'
  }
  return 'brand'
}

interface BrandProfile {
  type: 'brand'
  id: string
  name: string
  username: string
  bio?: string
  avatar?: string
  coverImage?: string
  location?: {
    city: string
    country: string
  }
  campaigns?: Array<{
    id: string
    title: string
    status: string
    price: number
  }>
  reviews?: Array<{
    id: string
    author: string
    rating: number
    content: string
    date: string
  }>
  isComplete: boolean
}

export const getProfile = async (username: string): Promise<typeof INFLUENCER_DETAILS | BrandProfile | null> => {
  // TODO: Replace with actual API call to fetch profile data
  const type = await getProfileType(username)

  if (type === 'brand') {
    return {
      type: 'brand',
      id: '1',
      name: 'Sample Brand',
      username: username,
      isComplete: false,
      bio: 'Sample brand description',
      location: {
        city: 'New York',
        country: 'USA'
      }
    }
  }

  if (type === 'influencer') {
    if (username === INFLUENCER_DETAILS.username) {
      return {
        ...INFLUENCER_DETAILS,
      }
    }

    // Return empty influencer profile for unknown usernames
    return {
      id: username,
      name: "Sample Influencer",
      title: "Content Creator",
      location: {
        city: "New York",
        country: "USA"
      },
      followers: 0,
      price: 0,
      bio: "",
      avatar: "",
      photos: [],
      packages: [],
      pows: [],
      reviews: [],
      faqs: [],
      relatedCategories: []
    }
  }

  return null
}
