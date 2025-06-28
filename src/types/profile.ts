export type ProfileType = 'brand' | 'influencer'

export interface BaseProfile {
  username: string
  name: string
  avatar: string
  coverImage: string
  bio: string
  location: string
  type: ProfileType
  isVerified?: boolean
  createdAt: string
  updatedAt: string
}

export interface BrandProfileType extends BaseProfile {
  type: 'brand'
  industry: string
  website: string
  founded: string
  campaigns: Campaign[]
  reviews: Review[]
}

export interface InfluencerProfileType extends BaseProfile {
  type: 'influencer'
  title: string
  followers: number
  price: number
  packages: Package[]
  photos: string[]
  pows: ProofOfWork[]
  reviews: InfluencerReview[]
  faqs: FAQ[]
  relatedCategories: string[]
}

export interface Campaign {
  id: string
  title: string
  image: string
  budget: number
  status: 'Active' | 'Upcoming' | 'Completed'
}

export interface Package {
  id: string
  title: string
  description: string
  price: number
}

export interface ProofOfWork {
  id: string
  title: string
  image: string
  metrics?: {
    views?: number
    likes?: number
    comments?: number
  }
}

export interface Review {
  id: string
  rating: number
  comment: string
  reviewer: string
  date: string
}

export interface InfluencerReview extends Review {
  campaign?: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

export type Profile = BrandProfileType | InfluencerProfileType
