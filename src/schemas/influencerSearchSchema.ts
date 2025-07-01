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
    .max(200, "Categories must be less than 200 characters")
    .trim()
    .optional()
    .or(z.literal("")),
})

export type InfluencerSearchFormData = z.infer<typeof influencerSearchFormSchema>
