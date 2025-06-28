import Head from 'next/head'
import React from 'react'

interface SEOHeadProps {
  additionalMeta?: React.ReactElement[]
}

export function SEOHead({  additionalMeta }: SEOHeadProps) {
  return (
    <Head>

      {additionalMeta?.map((meta, index) => React.cloneElement(meta, { key: index }))}
    </Head>
  )
}

// Predefined structured data for different page types
// export const PROFILE_STRUCTURED_DATA = (profile: Prof) => ({
//   type: profile.type === 'brand' ? 'Organization' : 'Person',
//   data: {
//     name: profile.name,
//     url: `https://ethral.com/${profile.username}`,
//     description: profile.bio,
//     image: profile.avatar,
//     ...(profile.type === 'brand' ? {
//       '@type': 'Organization',
//       foundingDate: profile.founded,
//       industry: profile.industry,
//       website: profile.website
//     } : {
//       '@type': 'Person',
//       jobTitle: profile.title,
//       worksFor: {
//         '@type': 'Organization',
//         name: 'Content Creator'
//       }
//     })
//   }
// })

export const BREADCRUMB_STRUCTURED_DATA = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  type: 'BreadcrumbList',
  data: {
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
})
