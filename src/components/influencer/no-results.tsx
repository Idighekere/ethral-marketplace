"use client"

import { Button } from "@/components/ui/button"
import { useSearchStore } from "@/store"

interface NoResultsProps {
  searchTitle?: string
}

const NoResults = ({  }: NoResultsProps) => {
  const { searchState, clearFilter, clearAllFilters } = useSearchStore()
  const { filters } = searchState

  const getActiveFilters = () => {
    const activeFilters = []

    if (filters.contentType.length > 0) {
      activeFilters.push({ key: "contentType", label: "Content Type Filter" })
    }
    if (filters.followers.min > 1000 || filters.followers.max < 1000000000) {
      activeFilters.push({ key: "followers", label: "Followers Filter" })
    }
    if (filters.location.country || filters.location.region || filters.location.city) {
      activeFilters.push({ key: "location", label: "Location Filter" })
    }
    if (filters.price.min > 50 || filters.price.max < 3000) {
      activeFilters.push({ key: "price", label: "Price Filter" })
    }
    if (filters.gender) {
      activeFilters.push({ key: "gender", label: "Gender Filter" })
    }
    if (filters.age.min > 18 || filters.age.max < 65) {
      activeFilters.push({ key: "age", label: "Age Filter" })
    }
    if (filters.blockchain.length > 0) {
      activeFilters.push({ key: "blockchain", label: "Blockchain Filter" })
    }
    if (filters.niche.length > 0) {
      activeFilters.push({ key: "niche", label: "Niche Filter" })
    }

    return activeFilters
  }

  const activeFilters = getActiveFilters()

  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-white mb-2">No Exact Matches</h2>
      <p className="text-gray-400 mb-8">
        Try changing or adjusting some of your search filters.
      </p>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {activeFilters.map(({ key, label }) => (
            <Button
              key={key}
              variant="outline"
              size="sm"
              onClick={() => clearFilter(label)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Remove {label}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="border-red-600 text-red-400 hover:bg-red-900/20"
          >
            Remove All Filters
          </Button>
        </div>
      )}
    </div>
  )
}

export default NoResults
