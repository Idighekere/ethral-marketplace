import React from 'react'
import { Star } from '@/components/icons'
import { POWCard } from '@/components/influencer'
import {
  FAQSection,
  InfluencerActions,
  
  ReviewCard
} from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardAction } from '@/components/ui/card'
import { formatFollowers, formatPrice } from '@/utils'
import { useCartStore } from '@/store/useCartStore'
import { InfluencerProfile } from '@/types/profile'
import Image from 'next/image'

interface InfluencerProfileProps {
  influencer: InfluencerProfile
  isAuthenticated?: boolean
}

export function InfluencerProfile ({
  influencer,
  isAuthenticated = false
}: InfluencerProfileProps) {
  return (
    <div className='space-y-10 md:space-y-14'>
      <div className='flex flex-col md:flex-row gap-10 md:gap-14 items-center justify-between py-10'>
        <div className='relative sm:w-[20rem] h-[20rem] rounded-md mb-5 aspect-square'>
          <Image
            src={influencer.photos[0]}
            alt={influencer.name}
            fill
            className='object-cover rounded-md'
          />
        </div>

        <div className='flex flex-col'>
          <div className='flex gap-2'>
            <div className=''>
              <Avatar className='w-15 h-15 md:w-30 md:h-30 mb-5'>
                <AvatarImage src={influencer.avatar} alt={influencer.name} />
                <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>

            <div className='flex flex-col gap-2'>
              <h2 className='text-lg md:text-2xl  font-semibold text-white whitespace-pre-wrap'>
                {influencer.name} | {influencer.title}
              </h2>
              <p className='text-sm text-neutral-white/80'>
                {influencer.location}
              </p>

              <div className='flex gap-3'>
                <span className='border-[0.3px] border-neutral-white/60 text-primary text-sm px-2 py-1 rounded-md'>
                  {formatFollowers(influencer.followers)} Followers
                </span>
                <span className='border-[0.3px] border-neutral-white/60 text-primary text-sm px-2 py-1 rounded-md'>
                  {formatPrice(influencer.price)}
                </span>
              </div>
            </div>
          </div>
          <div className='space-y-6 mt-3 md:mt-0'>
            <p className='text-neutral-white/90'>{influencer.bio}</p>

            <div className='hidden md:block'>
              <InfluencerActions
                influencerId={influencer.username}
                isAuthenticated={isAuthenticated}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Packages */}
      <div className=''>
        <h3 className='text-white text-2xl  md:text-3xl  font-semibold my-5'>
          Packages
        </h3>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8'>
          {influencer.packages.map(item => (
            <Card
              className='w-full hover:shadow-lg transition-shadow duration-200 bg-[#2F353E] border-0'
              key={item.id}
            >
              <CardHeader className='flex justify-between'>
                <p className='text-xl  text-white font-medium'>{item.title}</p>
                <p className='text-xl  text-white font-medium'>
                  {formatPrice(item.price)}
                </p>
              </CardHeader>
              <CardContent>
                <p className='text-neutral-white/70'>{item.description}</p>
                <CardAction className='flex self-end mt-5'>
                  <Button
                    className='text-base font-semibold'
                    onClick={() => {
                      const { addItem, setOpen } = useCartStore.getState()
                      addItem({
                        id: `${influencer.username}-${item.id}`,
                        name: influencer.name,
                        avatar: influencer.avatar,
                        type: item.title,
                        price: item.price,
                        influencerId: influencer.username,
                        packageId: item.id
                      })
                      setOpen(true)
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardAction>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Proof of Work */}
      <div className=''>
        <h3 className='text-white text-xl  md:text-2xl  font-semibold my-5'>
          Proof of Work (POW)
        </h3>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10'>
          {influencer.pows.map((pow, index) => (
            <POWCard key={index} pow={pow} />
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className=''>
        <div className='flex gap-4 items-center'>
          <h3 className='text-white text-xl  md:text-2xl  font-semibold my-5'>
            {influencer?.reviews?.length} Reviews.
          </h3>

          {influencer.reviews.length > 0 && (
            <span className='text-sm text-neutral-white/80 flex gap-1 items-center'>
              <Star fillColor='#FFD966' className='size-4' />
              {influencer.reviews[0]?.rating}
            </span>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10'>
          {influencer.reviews.map(review => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </div>
      </div>

      {/* FAQ */}
      {influencer.faqs.length > 0 && (
        <div className='space-y-4'>
          <h5 className='text-xl  md:text-2xl  font-medium text-neutral-white'>
            FAQ
          </h5>
          <FAQSection faqs={influencer.faqs} />
        </div>
      )}

      {/* Related Categories */}
      <div className=''>
        <h5 className='text-white text-[1rem] md:text-[1.5rem] font-semibold my-5'>
          Related Categories
        </h5>

        <div className='flex flex-wrap gap-2 md:gap-3'>
          {influencer.relatedCategories.map(category => (
            <span
              className='bg-secondary px-2 py-1 rounded-md text-neutral-white'
              key={category}
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
