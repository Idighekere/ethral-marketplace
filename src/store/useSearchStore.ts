import { create } from "zustand"
import type { InfluencerSearchFormData } from "@/schemas"

interface SearchStore {
  isLoading: boolean
lastSearchData:InfluencerSearchFormData
  searchResults: InfluencerSearchFormData[]
  setLoading: (loading: boolean) => void
  setLastSearchData: (data: InfluencerSearchFormData) => void
  setSearchResults: (results: InfluencerSearchFormData[]) => void
  performSearch: (data: InfluencerSearchFormData) => Promise<void>
  clearResults: () => void
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  isLoading: false,
  lastSearchData: null,
  searchResults: [],

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  setLastSearchData: (data: InfluencerSearchFormData) => set({ lastSearchData: data }),

  setSearchResults: (results: InfluencerSearchFormData[]) => set({ searchResults: results }),

  clearResults: () => set({ searchResults: [] }),

  performSearch: async (data: InfluencerSearchFormData) => {
    const { setLoading, setLastSearchData, setSearchResults } = get()

    setLoading(true)
    setLastSearchData(data)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock search results
      const mockResults = [
        { id: 1, name: `${data.influencers} Influencer 1`, category: data.category },
        { id: 2, name: `${data.influencers} Influencer 2`, category: data.category },
      ]

      setSearchResults(mockResults)
      console.log("Search completed:", data, mockResults)

      // Here you would make your actual API call
      // const response = await fetch('/api/search', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // })
      // const results = await response.json()
      // setSearchResults(results)
    } catch (error) {
      console.error("Search failed:", error)
      throw new Error("Search failed. Please try again.")
    } finally {
      setLoading(false)
    }
  },
}))
