'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useCampaignStore } from '@/store/useCampaignStore'

const PostCampaignPage = () => {
  const router = useRouter()
  const { resetCampaignData } = useCampaignStore()

  useEffect(() => {
    // Reset the campaign store and redirect to launch page with a new ID
    resetCampaignData()
    router.push(`/campaigns/${Math.random().toString(36).slice(2)}/launch`)
  }, [router, resetCampaignData])

  return null
}

export default PostCampaignPage
