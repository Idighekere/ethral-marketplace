import React from 'react'
import Image from 'next/image'

interface ClientReview {
  id: number
  company: string
  companyLogo: string
  testimonial: string
  clientName: string
  clientRole: string
  clientAvatar: string
}

const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 1,
    company: 'Airtable',
    companyLogo: '/airtable.svg',
    testimonial:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco',
    clientName: 'Adam Smith',
    clientRole: 'Web Designer at Airtable',
    clientAvatar: '/adam-smith.png'
  },
  {
    id: 2,
    company: 'Webflow',
    companyLogo: '/webflow.svg',
    testimonial:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco',
    clientName: 'Sophie Moore',
    clientRole: 'Product Developer at Webflow',
    clientAvatar: '/sophie-moore.png'
  },
  {
    id: 3,
    company: 'Zapier',
    companyLogo: '/zapier.svg',
    testimonial:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco',
    clientName: 'Mike Warren',
    clientRole: 'Product Manager at Zapier',
    clientAvatar: '/mike-warren.png'
  }
]

export const ClientReviewsSection = () => {
  return (
    <section className='w-full py-16 px-5 sm:px-10 lg:px-20 xl:px-36 '>
      <div className=' mx-auto'>
        <div className='grid gap-8 md:grid-cols-2 max-w-7xl mx-auto items-start h-[60%]' >
          <div className='text-left /h-auto mb-auto md:-mb-20'>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-4 '>
              Hear what our clients say
            </h2>
            <p className='text-white text-lg max-w-lg'>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim.
            </p>
          </div>
          {CLIENT_REVIEWS.map(review => (
            <div
              key={review.id}
              className={`bg-[#1D232C] rounded-lg p-6 space-y-6 h-fit self-start  mb-auto ${review.id==1 ?"md:mt-15":"m-0"}`}
            >
              {/* Company Logo */}
              <div className='relative w-20 h-10 aspect-auto '>
                <Image
                  src={review.companyLogo}
                  alt={review.company}
                  fill
                  className='object-contain'
                />
              </div>

              {/* Testimonial */}
              <p className='text-white text-base leading-relaxed'>
                {review.testimonial}
              </p>

              {/* Client Info */}
              <div className='flex items-center space-x-3'>
                <div className='relative w-12 h-12 rounded-full overflow-hidden'>
                  <Image
                    src={review.clientAvatar}
                    alt={review.clientName}
                    fill
                    className='object-cover'
                  />
                </div>
                <div>
                  <h4 className='text-white font-semibold text-sm'>
                    {review.clientName}
                  </h4>
                  <p className='text-white text-sm'>{review.clientRole}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
