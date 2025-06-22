import { FeaturesSection, GuestHero, PartnersSection, PricingSection,GuestHeader } from '@/components/guest'
import { FEATURES_DATA, sampleInfluencers } from '@/constants'
import { PARTNERS_DATA } from '@/constants/partners-data'
import { FeaturedInfluencers } from '@/components/influencer'
import { Footer } from "@/components/shared";

export default function HomePage () {

  return (
    <>
       <GuestHeader/>
      <GuestHero />
      <FeaturedInfluencers influencers={sampleInfluencers} />
      <FeaturedInfluencers influencers={sampleInfluencers} />

    <FeaturesSection features={FEATURES_DATA}/>

    <PartnersSection partners={PARTNERS_DATA}/>

    <PricingSection />

    <Footer/>
    </>
  )
}
