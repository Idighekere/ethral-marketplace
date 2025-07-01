"use client"

import { useSearchStore } from "@/store"
import NoResults from "./no-results"

interface SearchResultsProps {
  className?: string
}

const SearchResults = ({ className = "" }: SearchResultsProps) => {
  const { searchResults, isLoading, getSearchTitle } = useSearchStore()
  const searchTitle = getSearchTitle()

  if (isLoading) {
    return (
      <div className={`${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-6"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      {/* Search Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          {searchTitle || "Influencers"}
        </h1>
        {searchResults.length > 0 && (
          <p className="text-gray-400">
            {searchResults.length} influencer{searchResults.length !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      {/* Results */}
      {searchResults.length === 0 ? (
        <NoResults searchTitle={searchTitle} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((influencer, index) => (
            <div
              key={index}
              className="bg-[#1D232C] border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {influencer.name?.charAt(0) || 'I'}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    {influencer.name || 'Influencer'}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {influencer.category || 'Category'}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Followers:</span>
                  <span className="text-white">
                    {Math.floor(Math.random() * 900000 + 100000).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Engagement:</span>
                  <span className="text-white">
                    {(Math.random() * 5 + 1).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="text-white">
                    ${Math.floor(Math.random() * 2000 + 500)}
                  </span>
                </div>
              </div>

              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchResults
