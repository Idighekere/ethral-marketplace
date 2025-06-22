'use client'

import { INFLUENCER_DETAILS, sampleInfluencers } from '@/constants'

/**
 * A custom hook to get influencer data based on ID
 * In a real app, this would fetch data from an API
 */
export function useInfluencer(id: string) {
  // For now, we're just returning static data
  // In a real app, this would fetch from an API based on the ID

  if (id === INFLUENCER_DETAILS.id) {
    return INFLUENCER_DETAILS
  }

  // Look in sample influencers
  const fromSamples = sampleInfluencers.find(inf => inf.id === id)

  if (fromSamples) {
    return {
      ...fromSamples,
      title: fromSamples.title,
      avatar: fromSamples.image,
      // Add default values for properties that might be missing
      location: { city: 'Unknown', country: 'Unknown' },
      bio: '',
      photos: [fromSamples.image],
      packages: [
        {
          id: '1',
          title: 'Basic Package',
          price: fromSamples.price,
          description: 'Standard engagement package'
        }
      ],
      pows: [],
      reviews: [],
      faqs: [],
      relatedCategories: []
    }
  }

  // Return default data if no match found
  return {
    id,
    name: 'Unknown Influencer',
    title: 'Content Creator',
    location: { city: 'Unknown', country: 'Unknown' },
    followers: 0,
    price: 0,
    bio: '',
    avatar: '/creator-1.png',
    photos: ['/creator-1.png'],
    packages: [],
    pows: [],
    reviews: [],
    faqs: [],
    relatedCategories: []
  }
}
