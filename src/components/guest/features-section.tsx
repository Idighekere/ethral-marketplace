import type { Feature } from '@/types'
import { FeatureItem } from '../shared'

interface FeaturesSectionProps {

  subtitle?: string
  features: Feature[]
  className?: string
}

export function FeaturesSection ({

  subtitle = 'Forget Engagements, we have the most high quality kols in each major web3 region to get you increased wallet transactions by borrowing important voices to speak to your desired audience.',
  features,
  className = ''
}: FeaturesSectionProps) {
  return (
    <section
      className={` text-white py-16 md:py-24 px-4 sm:px-10 lg:px-20 xl:px-36 ${className}`}
    >
      <div className='max-w-7xl  mx-auto'>
        {/* Header */}
        <div className='text-center mb-16 md:mb-20'>
          <h2 className='text-3xl md:text-4xl lg:text-4xl font-semibold mb-4'>
          How <span className="text-primary">Ethral</span> Marketplace Helps You Win
          </h2>
          <p className='text-[#F3F4F6]  text-base  mx-auto leading-relaxed max-w-3xl'>
            {subtitle}
          </p>
        </div>

        {/* Features */}
        <div className='space-y-20 md:space-y-32'>
          {features.map((feature, index) => (
            <FeatureItem key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
