import { z } from "zod"

export const influencerSearchFormSchema = z.object({
  influencers: z
    .string()
    .min(1, "Please enter influencer search terms")
    .min(2, "Search term must be at least 2 characters")
    .max(100, "Search term must be less than 100 characters")
    .trim(),
  category: z
    .string()
    .min(1, "Please enter a category")
    .min(2, "Category must be at least 2 characters")
    .max(50, "Category must be less than 50 characters")
    .trim(),
})

export type InfluencerSearchFormData = z.infer<typeof influencerSearchFormSchema>
