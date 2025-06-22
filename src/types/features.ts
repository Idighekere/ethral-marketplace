export interface FeaturePoint {
  title: string
  description: string
}

export interface Feature {
  id: string
  title: string
  description: string
  points: FeaturePoint[]
  image: string
  imageAlt: string
}
