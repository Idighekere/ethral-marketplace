import {
  FeaturesSection,
  GuestHero,
  PartnersSection,
  PricingSection,
  GuestHeader,
  FindAndHireInfluencersSection,
  BlogSection,
  ClientReviewsSection
} from '@/components/guest'
import { FEATURES_DATA, sampleInfluencers } from '@/constants'
import { PARTNERS_DATA } from '@/constants/partners-data'
import { FeaturedInfluencers } from '@/components/influencer'
import { FAQSection, Footer } from '@/components/shared'
import { generateMetadata } from '@/lib/seo'
import { HOME_SEO } from '@/lib/seo/pages'
import { sampleFAQs } from '@/constants/faq-data'
import { SAMPLE_BLOG } from '@/constants/blogs-data'
import {AOSProvider} from '@/contexts';

export const metadata = generateMetadata(HOME_SEO)

export default function HomePage () {

  return (
    <AOSProvider>

      <GuestHeader />
      <GuestHero />
      <div className='space-y-10'>
        <FeaturedInfluencers influencers={sampleInfluencers.slice(0,4)} />
        <FeaturedInfluencers influencers={sampleInfluencers.slice(5,9)} />
      </div>

      <FeaturesSection features={FEATURES_DATA} />

      <PartnersSection partners={PARTNERS_DATA} />

      <PricingSection />

      <ClientReviewsSection />
      <BlogSection blogs={SAMPLE_BLOG} />
      <section className='bg-transparent  mx-auto flex flex-col justify-center items-center p-5 sm:p-16 md:p-20'>
        <div className='max-w-3xl text-center space-y-1'>
          <p className='text-primary text-medium'>FAQs</p>
          <h2 className='text-white font-semibold text-2xl md:text-4xl'>
            Frequently Asked Questions
          </h2>
          <p className='text-[#F3F4F6]'>
            We&apos;re are happy to answer your questions
          </p>
          <div className='mt-10'>
            <FAQSection withCard faqs={sampleFAQs} />
          </div>
        </div>
      </section>

      <FindAndHireInfluencersSection />
      <Footer />
    </AOSProvider
>
  )
}
