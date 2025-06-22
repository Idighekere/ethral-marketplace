interface FeaturePointProps {
  title: string
  description: string
}

export function FeaturePoint({ title, description }: FeaturePointProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-white font-semibold text-lg">{title}</h4>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
