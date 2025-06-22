export interface BaseProfile {
  id: string
  name: string
  username: string
  avatar?: string
  coverImage?: string
  bio?: string
  location?: {
    city: string
    country: string
  }
  isComplete: boolean
}

export interface BrandProfile extends BaseProfile {
  type: 'brand'
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
}

export interface Review {
  id: string
  name: string
  avatar: string
  title: string
  review: string
  rating: number
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface Package {
  id: string
  title: string
  price: number
  description: string
}

export interface InfluencerProfile extends BaseProfile {
  type: 'influencer'
  title: string
  followers: number
  price: number
  photos: string[]
  packages: Package[]
  pows: string[]
  reviews: Review[]
  faqs: FAQ[]
  relatedCategories: string[]
}
