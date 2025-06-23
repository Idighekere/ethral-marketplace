import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FAQSection } from '@/components/shared'
import { sampleFAQs } from '@/constants/faq-data'

interface Props {
  id: string
}

const BrandProfilePage = ({ id }: Props) => {
  console.log('Rendering brand profile for', id)

  // This should be fetched based on id
  const brand = {
    name: 'Brand Name',
    logo: '/placeholder-list.png',
    coverImage: '/placeholder-list.png',
    bio: 'This is a brand bio description that would typically describe what the brand does, its mission, and other relevant information.',
    website: 'https://example.com',
    industry: 'Technology',
    location: 'San Francisco, CA',
    founded: '2015',
    campaigns: [
      {
        id: '1',
        title: 'Summer Campaign',
        image: '/placeholder-list.png',
        budget: 5000,
        status: 'Active'
      },
      {
        id: '2',
        title: 'Holiday Special',
        image: '/placeholder-list.png',
        budget: 7500,
        status: 'Upcoming'
      }
    ]
  }

  return (
    <div className='flex flex-col gap-8 w-full'>
      {/* Cover Image */}
      <div className='relative w-full h-[200px] rounded-xl overflow-hidden'>
        <Image
          src={brand.coverImage}
          alt={`${brand.name} cover`}
          fill
          className='object-cover'
        />
      </div>
      {/* Profile Header */}
      <div className='flex flex-col md:flex-row gap-6 items-start md:items-center'>
        <Avatar className='w-24 h-24 border-4 border-white -mt-12 z-10 relative'>
          <AvatarImage src={brand.logo} alt={brand.name} />
          <AvatarFallback>{brand.name.substring(0, 2)}</AvatarFallback>
        </Avatar>

        <div className='flex-1'>
          <h1 className='text-2xl font-bold'>{brand.name}</h1>
          <p className='text-muted-foreground'>
            {brand.industry} • {brand.location}
          </p>
        </div>

        <div className='flex gap-4'>
          <Button variant='outline'>Message</Button>
          <Button>Follow</Button>
        </div>
      </div>
      {/* Brand Info */}
      <Card>
        <CardHeader>
          <h2 className='text-xl font-semibold'>About</h2>
        </CardHeader>
        <CardContent>
          <p>{brand.bio}</p>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-6'>
            <div>
              <p className='text-sm text-muted-foreground'>Website</p>
              <p className='font-medium'>{brand.website}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Founded</p>
              <p className='font-medium'>{brand.founded}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Location</p>
              <p className='font-medium'>{brand.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Campaigns */}
      <div>
        <h2 className='text-xl font-semibold mb-4'>Active Campaigns</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {brand.campaigns.map(campaign => (
            <Card key={campaign.id}>
              <div className='relative w-full h-[160px]'>
                <Image
                  src={campaign.image}
                  alt={campaign.title}
                  fill
                  className='object-cover rounded-t-lg'
                />
              </div>
              <CardContent className='p-4'>
                <h3 className='font-semibold'>{campaign.title}</h3>
                <div className='flex justify-between mt-2'>
                  <span className='text-sm text-muted-foreground'>
                    Budget: ${campaign.budget}
                  </span>
                  <span
                    className={`text-sm ${
                      campaign.status === 'Active'
                        ? 'text-green-500'
                        : 'text-amber-500'
                    }`}
                  >
                    {campaign.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>{' '}
      {/* FAQ Section */}
      <FAQSection faqs={sampleFAQs} />
    </div>
  )
}

export default BrandProfilePage
