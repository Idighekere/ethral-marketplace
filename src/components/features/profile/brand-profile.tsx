import React from 'react'
import Image from 'next/image'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent  } from '@/components/ui/card'
import { BrandProfileType } from '@/types/profile'

interface BrandProfileProps {
  brand: BrandProfileType
}

export function BrandProfile({ brand }: BrandProfileProps) {
  return (
    <div className='flex flex-col gap-8 w-full'>
      {/* Cover Image */}
      <div className='relative w-full h-[200px] rounded-xl  overflow-hidden'>
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
          <AvatarImage src={brand.avatar} alt={brand.name} />
          <AvatarFallback>{brand.name.substring(0, 2)}</AvatarFallback>
        </Avatar>

        <div className='flex-1'>
          <h1 className='text-2xl  font-bold text-white'>{brand.name}</h1>
          <p className='text-neutral-white/80'>
            {brand.industry} • {brand.location}
          </p>
          {brand.bio && (
            <p className='text-neutral-white/90 mt-2'>{brand.bio}</p>
          )}
        </div>
      </div>

      {/* Campaigns */}
      <div>
        <h2 className='text-xl  font-semibold mb-4 text-white'>Campaigns</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {brand.campaigns.map(campaign => (
            <Card key={campaign.id} className="py-0 gap-0 bg-secondary rounded-lg">
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
      </div>

      {/* Reviews Section */}
      {brand.reviews.length > 0 && (
        <div>
          <h2 className='text-xl  font-semibold mb-4 text-white'>Reviews</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-white'>
            {brand.reviews.map(review => (
              <Card key={review.id} className='p-4'>
                <div className='flex justify-between items-start mb-2'>
                  <span className='font-medium'>{review.reviewer}</span>
                  <span className='text-sm '>
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <div className='flex items-center mb-2'>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className='text-sm '>{review.comment}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
