
import type { Feature } from "@/types"
import { FeatureItem } from "../shared"

interface FeaturesSectionProps {
  title?: string
  subtitle?: string
  features: Feature[]
  className?: string
}

export function FeaturesSection({
  title = "How Ethral Marketplace Helps You Win",
  subtitle = "We make influencer marketing effortless. No more endless back-and-forth emails and time wasted.",
  features,
  className = "",
}: FeaturesSectionProps) {
  return (
    <section className={` text-white py-16 md:py-24 px-4 sm:px-10 lg:px-16 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">{title}</h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
        </div>

        {/* Features */}
        <div className="space-y-20 md:space-y-32">
          {features.map((feature, index) => (
            <FeatureItem key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
