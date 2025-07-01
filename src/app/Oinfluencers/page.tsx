"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import InfluencerSearchForm from "@/components/influencer/InfluencerSearchForm"
import SearchResults from "@/components/influencer/search-results"
import { useSearchStore } from "@/store"

const InfluencersPage = () => {
  // Mock authentication and premium status
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const searchParams = useSearchParams()
  const { loadFromQueryParams } = useSearchStore()

  // Load query params on mount
  useEffect(() => {
    if (searchParams) {
      loadFromQueryParams(searchParams)
    }
  }, [searchParams, loadFromQueryParams])

  const handleLogin = () => {
    setIsAuthenticated(true)
    // In a real app, redirect to login page or open auth modal
    console.log("Redirecting to login...")
  }

  const handleUpgrade = () => {
    setIsPremium(true)
    // In a real app, redirect to pricing page or open upgrade modal
    console.log("Redirecting to upgrade...")
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Search Form */}
        <div className="mb-8">
          <InfluencerSearchForm
            showFilters={true}
            isAuthenticated={isAuthenticated}
            isPremium={isPremium}
            onLogin={handleLogin}
            onUpgrade={handleUpgrade}
            className="mx-auto"
          />
        </div>

        {/* Mock Auth Controls for Testing */}
        <div className="mb-6 flex gap-4 justify-center">
          <button
            onClick={() => setIsAuthenticated(!isAuthenticated)}
            className={`px-4 py-2 rounded ${
              isAuthenticated 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-600 text-white'
            }`}
          >
            {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
          </button>
          <button
            onClick={() => setIsPremium(!isPremium)}
            className={`px-4 py-2 rounded ${
              isPremium 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-600 text-white'
            }`}
            disabled={!isAuthenticated}
          >
            {isPremium ? 'Premium' : 'Basic'}
          </button>
        </div>

        {/* Search Results */}
        <SearchResults />
      </div>
    </div>
  )
}

export default InfluencersPage
