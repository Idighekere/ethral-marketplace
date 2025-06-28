import { Metadata } from 'next'
import { getProfileType } from '@/lib/profile'

interface Props {
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = params

  try {
    const profileType = await getProfileType(username)

    const title = profileType === 'brand'
      ? `${username} - Brand Profile | Ethral`
      : `${username} - Influencer Profile | Ethral`

    const description = profileType === 'brand'
      ? `Discover ${username}'s brand profile, campaigns, and collaborations on Ethral.`
      : `View ${username}'s influencer profile, packages, and proof of work on Ethral.`

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'profile',
        url: `https://ethral.com/${username}`,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    }
  } catch {
    return {
      title: `${username} | Ethral`,
      description: `View ${username}'s profile on Ethral`,
    }
  }
}
