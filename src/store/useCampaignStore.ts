import { create } from 'zustand'
import { z } from 'zod'

export const campaignSchema = z.object({
  // Step 1
  campaignType: z.string(),
  influencerCount: z.string(),
  targetNiches: z.array(z.string()).optional(),
  targetRegions: z.array(z.string()),

  // Step 2 - Pricing plan selection
  selectedPlan: z.string(),
  billingCycle: z.enum(['monthly', 'yearly']),

  // Step 3
  campaignDetails: z.object({
    campaignName: z.string().min(3),
    projectName: z.string().min(3),
    campaignDuration: z.string(),
    primaryObjective: z.string()
  }),
  goalsAndKPIs: z.object({
    keyGoals: z.string(),
    successMetrics: z.string()
  }),
  targetAudience: z.object({
    contentAppealTo: z.string(),
    preferredRegions: z.array(z.string()).optional()
  }),
  contentDeliverables: z.object({
    contentTypes: z.array(z.string()),
    preferredRegions: z.array(z.string()).optional()
  }),
  talkingPoints: z.string().optional(),
  budgetAndCompensation: z.object({
    totalBudgetPerKOL: z.string(),
    paymentMethod: z.string(),
    payoutConditions: z.string()
  }),
  approvalAndDelivery: z.object({
    contentReviewRequired: z.boolean(),
    submissionDeadline: z.string(),
    deliverableSubmissionTo: z.string(),
    contentFiles: z.array(z.any()).optional()
  })
})

type CampaignState = z.infer<typeof campaignSchema>

interface CampaignStore {
  currentStep: number
  campaignData: Partial<CampaignState>
  setStep: (step: number) => void
  updateCampaignData: (data: Partial<CampaignState>) => void
  resetCampaignData: () => void
}

const initialCampaignData: CampaignState = {
  // Step 1
  campaignType: 'influencer',
  influencerCount: '1-5',
  targetNiches: ['fashion'],
  targetRegions: ['global'],

  // Step 2
  selectedPlan: 'starter',
  billingCycle: 'monthly',

  // Step 3
  campaignDetails: {
    campaignName: '',
    projectName: '',
    campaignDuration: '1-week',
    primaryObjective: 'awareness'
  },
  goalsAndKPIs: {
    keyGoals: '',
    successMetrics: ''
  },
  targetAudience: {
    contentAppealTo: '',
    preferredRegions: ['global']
  },
  contentDeliverables: {
    contentTypes: ['photos'],
    preferredRegions: ['global']
  },
  talkingPoints: '',
  budgetAndCompensation: {
    totalBudgetPerKOL: '',
    paymentMethod: 'bank',
    payoutConditions: ''
  },
  approvalAndDelivery: {
    contentReviewRequired: true,
    submissionDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week from now
    deliverableSubmissionTo: '',
    contentFiles: []
  }
}

export const useCampaignStore = create<CampaignStore>((set) => ({
  currentStep: 1,
  campaignData: initialCampaignData,
  setStep: (step) => set({ currentStep: step }),
  updateCampaignData: (data) =>
    set((state) => ({
      campaignData: { ...state.campaignData, ...data }
    })),
  resetCampaignData: () =>
    set({ currentStep: 1, campaignData: initialCampaignData })
}))
