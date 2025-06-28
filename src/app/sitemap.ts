import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/join/creator`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/join/brand`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/stars`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/influencers`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  // You can add dynamic routes here
  // const dynamicRoutes = await getDynamicRoutes()

  return staticRoutes
}

// Example function to get dynamic routes
// async function getDynamicRoutes() {
//   // Fetch profiles from your database
//   // const profiles = await getPublicProfiles()
//
//   // return profiles.map(profile => ({
//   //   url: `${SITE_CONFIG.url}/${profile.username}`,
//   //   lastModified: new Date(profile.updatedAt),
//   //   changeFrequency: 'weekly' as const,
//   //   priority: 0.6,
//   // }))
// }
