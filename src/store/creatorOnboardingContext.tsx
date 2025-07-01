'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Gender = 'Male' | 'Female' | 'Other'
type FollowerRange = '1k-10k' | '10k-50k' | '50k-100k' | '100k-500k' | '500k-1M' | '1M+'
type PostType = 'X Post' | 'Thread post' | 'Space speaking' | 'X Live AMA' | 'Retweet' | 'Quote'

interface ContentPackage {
  postType: PostType
  quantity: number
  price: number
  description: string
}

interface CreatorOnboardingState {
  location: string
  title: string
  description: string
  gender: Gender | null
  xHandle: string
  followerRange: FollowerRange | null
  contentTypes: string[]
  profileImage: File | null
  contentImages: File[]
  contentPackages: ContentPackage[]
  phoneNumber: string
  verificationCode: string
}

interface CreatorOnboardingContextType {
  state: CreatorOnboardingState
  updateLocation: (location: string) => void
  updateTitle: (title: string) => void
  updateDescription: (description: string) => void
  updateGender: (gender: Gender) => void
  updateXHandle: (handle: string) => void
  updateFollowerRange: (range: FollowerRange) => void
  toggleContentType: (type: ContentType) => void
  updateProfileImage: (file: File | null) => void
  addContentImage: (file: File) => void
  removeContentImage: (index: number) => void
  updateContentPackage: (index: number, packageData: Partial<ContentPackage>) => void
  addContentPackage: () => void
  removeContentPackage: (index: number) => void
  updatePhoneNumber: (phone: string) => void
  updateVerificationCode: (code: string) => void
}

const initialState: CreatorOnboardingState = {
  location: '',
  title: '',
  description: '',
  gender: null,
  xHandle: '',
  followerRange: null,
  contentTypes: [],
  profileImage: null,
  contentImages: [],
  contentPackages: [
    {
      postType: 'X Post',
      quantity: 1,
      price: 0,
      description: ''
    }
  ],
  phoneNumber: '',
  verificationCode: ''
}

const CreatorOnboardingContext = createContext<CreatorOnboardingContextType | undefined>(undefined)

export function CreatorOnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CreatorOnboardingState>(initialState)

  const updateLocation = (location: string) => {
    setState(prev => ({ ...prev, location }))
  }

  const updateTitle = (title: string) => {
    setState(prev => ({ ...prev, title }))
  }

  const updateDescription = (description: string) => {
    setState(prev => ({ ...prev, description }))
  }

  const updateGender = (gender: Gender) => {
    setState(prev => ({ ...prev, gender }))
  }

  const updateXHandle = (xHandle: string) => {
    setState(prev => ({ ...prev, xHandle }))
  }

  const updateFollowerRange = (followerRange: FollowerRange) => {
    setState(prev => ({ ...prev, followerRange }))
  }

  const toggleContentType = (type: ContentType) => {
    setState(prev => {
      if (prev.contentTypes.includes(type)) {
        return {
          ...prev,
          contentTypes: prev.contentTypes.filter(t => t !== type)
        }
      } else {
        return {
          ...prev,
          contentTypes: [...prev.contentTypes, type]
        }
      }
    })
  }

  const updateProfileImage = (file: File | null) => {
    setState(prev => ({ ...prev, profileImage: file }))
  }

  const addContentImage = (file: File) => {
    setState(prev => {
      // Limit to 10 images total
      if (prev.contentImages.length < 10) {
        return { ...prev, contentImages: [...prev.contentImages, file] }
      }
      return prev
    })
  }

  const removeContentImage = (index: number) => {
    setState(prev => ({
      ...prev,
      contentImages: prev.contentImages.filter((_, i) => i !== index)
    }))
  }

  const updateContentPackage = (index: number, packageData: Partial<ContentPackage>) => {
    setState(prev => {
      const updatedPackages = [...prev.contentPackages]
      updatedPackages[index] = { ...updatedPackages[index], ...packageData }
      return { ...prev, contentPackages: updatedPackages }
    })
  }

  const addContentPackage = () => {
    setState(prev => ({
      ...prev,
      contentPackages: [
        ...prev.contentPackages,
        {
          postType: 'X Post',
          quantity: 1,
          price: 0,
          description: ''
        }
      ]
    }))
  }

  const removeContentPackage = (index: number) => {
    setState(prev => ({
      ...prev,
      contentPackages: prev.contentPackages.filter((_, i) => i !== index)
    }))
  }

  const updatePhoneNumber = (phoneNumber: string) => {
    setState(prev => ({ ...prev, phoneNumber }))
  }

  const updateVerificationCode = (verificationCode: string) => {
    setState(prev => ({ ...prev, verificationCode }))
  }

  const value = {
    state,
    updateLocation,
    updateTitle,
    updateDescription,
    updateGender,
    updateXHandle,
    updateFollowerRange,
    toggleContentType,
    updateProfileImage,
    addContentImage,
    removeContentImage,
    updateContentPackage,
    addContentPackage,
    removeContentPackage,
    updatePhoneNumber,
    updateVerificationCode
  }

  return (
    <CreatorOnboardingContext.Provider value={value}>
      {children}
    </CreatorOnboardingContext.Provider>
  )
}

export function useCreatorOnboarding() {
  const context = useContext(CreatorOnboardingContext)
  if (context === undefined) {
    throw new Error('useCreatorOnboarding must be used within a CreatorOnboardingProvider')
  }
  return context
}
