import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/account/',
        '/billing/',
        '/edit-profile/',
        '/campaigns/',
        '/track/',
        '/creator/onboarding/',
        '/api/',
        '/_next/',
      ],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  }
}
