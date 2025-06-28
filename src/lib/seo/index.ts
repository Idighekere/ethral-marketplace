import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  image?: string
  noindex?: boolean
  type?: 'website' | 'article' | 'profile'
}

export const DEFAULT_SEO: SEOConfig = {
  title: 'Ethral - Connect Brands with Top Influencers',
  description: 'Ethral is the premier platform connecting brands with authentic influencers. Find, collaborate, and track campaigns with verified content creators worldwide.',
  keywords: [
    'influencer marketing',
    'brand collaboration',
    'content creators',
    'social media marketing',
    'influencer platform',
    'brand partnerships',
    'marketing campaigns',
    'influencer discovery'
  ],
  type: 'website'
}

export const SITE_CONFIG = {
  name: 'Ethral',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ethral.com',
  description: DEFAULT_SEO.description,
  creator: '@ethral',
  keywords: DEFAULT_SEO.keywords,
  social: {
    twitter: '@ethral',
    instagram: '@ethral',
    linkedin: 'company/ethral'
  }
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    image = '/og-image.png',
    noindex = false,
    type = 'website'
  } = config

  const url = canonical ? `${SITE_CONFIG.url}${canonical}` : SITE_CONFIG.url
  const fullTitle = title.includes('Ethral') ? title : `${title} | ${SITE_CONFIG.name}`

  return {
    title: fullTitle,
    description,
    keywords: [...DEFAULT_SEO.keywords!, ...keywords].join(', '),
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.creator,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: url,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_CONFIG.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: SITE_CONFIG.creator,
      images: [image],
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
    },
  }
}
