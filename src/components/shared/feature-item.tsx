import { FeaturePoint } from "./feature-point"
import type { Feature } from "@/types"
import Image from "next/image"

interface FeatureItemProps {
  feature: Feature
  index: number
}

export function FeatureItem({ feature, index }: FeatureItemProps) {
  const isEven = index % 2 === 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Content */}
      <div className={`space-y-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
      <p className="capitalize bg-[#1E242D] px-4 rounded-full py-1 w-30 flex justify-center ">{feature.id}</p>
        <div className="space-y-4">
          <h3 className="text-xl md:text-2xl text-white leading-tight font-semibold">{feature.title}</h3>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">{feature.description}</p>
        </div>

        <div className="space-y-6">
          {feature.points.map((point, pointIndex) => (
            <FeaturePoint key={pointIndex} title={point.title} description={point.description} />
          ))}
        </div>
      </div>

      {/* Image */}
      <div className={`${isEven ? "md:order-2" : "md:order-1"}`}>

            <div className="bg-[#1E242D] p-3 rounded-md overflow-hidden shadow-2xl w-full  relative rounded-2xl  ">
            <div className="relative w-full aspect-square  ">
              <Image
                src={feature.image }
                alt={feature.imageAlt}
                className="object-cover"
                fill
                loading="lazy"
              />


          </div>

        </div>
      </div>
    </div>
  )
}
