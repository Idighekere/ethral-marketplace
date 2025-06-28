import { SEOConfig } from './index'

// Homepage SEO
export const HOME_SEO: SEOConfig = {
  title: 'Ethral - Connect Brands with Top Influencers',
  description: 'Ethral is the premier platform connecting brands with authentic influencers. Find, collaborate, and track campaigns with verified content creators worldwide.',
  keywords: [
    'influencer marketing platform',
    'brand influencer collaboration',
    'social media marketing',
    'content creator partnerships',
    'influencer discovery',
    'marketing campaigns'
  ],
  canonical: '/',
  type: 'website'
}

// Auth pages SEO
export const JOIN_CREATOR_SEO: SEOConfig = {
  title: 'Join as Creator - Start Earning with Brands',
  description: 'Join Ethral as a content creator and connect with top brands. Monetize your content, grow your audience, and build lasting partnerships.',
  keywords: [
    'become influencer',
    'creator signup',
    'influencer registration',
    'content creator platform',
    'earn money content creation'
  ],
  canonical: '/join/creator',
  type: 'website'
}

export const JOIN_BRAND_SEO: SEOConfig = {
  title: 'Join as Brand - Find Perfect Influencers',
  description: 'Join Ethral as a brand and discover authentic influencers for your campaigns. Scale your marketing with verified content creators.',
  keywords: [
    'brand signup',
    'influencer marketing',
    'brand registration',
    'find influencers',
    'marketing platform'
  ],
  canonical: '/join/brand',
  type: 'website'
}

// Brand dashboard pages SEO
export const BRAND_HOME_SEO: SEOConfig = {
  title: 'Brand Dashboard - Manage Your Campaigns',
  description: 'Manage your influencer marketing campaigns, track performance, and discover new creators from your brand dashboard.',
  canonical: '/home',
  noindex: true // Private page
}

export const STARS_SEO: SEOConfig = {
  title: 'Discover Top Influencers - Find Your Perfect Match',
  description: 'Browse through thousands of verified influencers across all niches. Find the perfect content creators for your brand campaigns.',
  keywords: [
    'find influencers',
    'discover creators',
    'influencer directory',
    'content creators',
    'verified influencers'
  ],
  canonical: '/stars',
  noindex: true // Private page
}

export const CAMPAIGNS_SEO: SEOConfig = {
  title: 'Campaign Management - Track Your Success',
  description: 'Manage all your influencer marketing campaigns in one place. Track performance, manage collaborations, and optimize results.',
  canonical: '/campaigns',
  noindex: true // Private page
}

export const TRACK_SEO: SEOConfig = {
  title: 'Campaign Analytics - Measure Your Impact',
  description: 'Track the performance of your influencer campaigns with detailed analytics and insights. Measure ROI and optimize your strategy.',
  canonical: '/track',
  noindex: true // Private page
}

// Creator pages SEO
export const INFLUENCERS_SEO: SEOConfig = {
  title: 'Browse Influencers - Find Content Creators',
  description: 'Discover talented influencers and content creators. Browse by category, engagement rates, and audience demographics.',
  keywords: [
    'browse influencers',
    'find content creators',
    'influencer search',
    'creator discovery'
  ],
  canonical: '/influencers',
  noindex: true // Private page
}

export const CREATOR_ONBOARDING_SEO: SEOConfig = {
  title: 'Complete Your Creator Profile',
  description: 'Complete your creator profile to start receiving collaboration opportunities from top brands.',
  canonical: '/creator/onboarding',
  noindex: true // Private page
}

// Account pages SEO
export const ACCOUNT_SEO: SEOConfig = {
  title: 'Account Settings - Manage Your Profile',
  description: 'Manage your account settings, profile information, and preferences.',
  canonical: '/account',
  noindex: true // Private page
}

export const BILLING_SEO: SEOConfig = {
  title: 'Billing & Payments - Manage Your Subscription',
  description: 'Manage your billing information, view payment history, and update your subscription.',
  canonical: '/billing',
  noindex: true // Private page
}

export const ACCOUNT_SETTINGS_SEO: SEOConfig = {
  title: 'Account Settings - Manage Your Preferences',
  description: 'Manage your account settings, privacy preferences, and notification settings.',
  canonical: '/account/settings',
  noindex: true // Private page
}

export const ACCOUNT_PAYMENT_SEO: SEOConfig = {
  title: 'Payment Settings - Manage Payment Methods',
  description: 'Manage your payment methods, billing information, and transaction history.',
  canonical: '/account/payment',
  noindex: true // Private page
}

export const EDIT_PROFILE_SEO: SEOConfig = {
  title: 'Edit Profile - Update Your Information',
  description: 'Update your profile information, bio, and settings.',
  canonical: '/edit-profile',
  noindex: true // Private page
}

export const EDIT_PROFILE_IMAGES_SEO: SEOConfig = {
  title: 'Edit Profile Images - Update Your Photos',
  description: 'Upload and manage your profile images and cover photos.',
  canonical: '/edit-profile/images',
  noindex: true // Private page
}

export const CAMPAIGN_NEW_SEO: SEOConfig = {
  title: 'Create New Campaign - Launch Your Marketing',
  description: 'Create and configure a new influencer marketing campaign.',
  canonical: '/campaigns/new',
  noindex: true // Private page
}

export const CAMPAIGN_LAUNCH_SEO: SEOConfig = {
  title: 'Launch Campaign - Go Live with Your Marketing',
  description: 'Review and launch your influencer marketing campaign.',
  noindex: true // Private page, no canonical as it's dynamic
}
