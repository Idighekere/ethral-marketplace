import { create } from "zustand"
import type { InfluencerSearchFormData } from "@/schemas"
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface SearchFilters {
  contentType: string[]
  followers: { min: number; max: number }
  location: {
    country: string
    region: string
    city: string
  }
  price: { min: number; max: number }
  gender: string
  age: { min: number; max: number }
  blockchain: string[]
  niche: string[]
}

export interface SearchState {
  query: string
  categories: string[]
  filters: SearchFilters
}

// Define proper types for search results
export interface SearchResult {
  id: string | number
  name: string
  category?: string
  [key: string]: unknown
}

interface SearchStore {
  isLoading: boolean
  lastSearchData: InfluencerSearchFormData | null
  searchResults: SearchResult[]
  searchState: SearchState

  // Actions
  setLoading: (loading: boolean) => void
  setLastSearchData: (data: InfluencerSearchFormData) => void
  setSearchResults: (results: SearchResult[]) => void
  updateSearchState: (query: string, categories: string[]) => void
  updateFilter: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void
  clearFilter: (key: keyof SearchFilters) => void
  clearAllFilters: () => void
  performSearch: (data: InfluencerSearchFormData) => Promise<void>
  clearResults: () => void

  // Computed
  hasActiveFilters: () => boolean
  getActiveFilterCount: () => number
  getSearchTitle: () => string

  // URL Management
  getQueryParams: () => string
  loadFromQueryParams: (searchParams: URLSearchParams) => void
  updateURL: (router: AppRouterInstance, pathname: string) => void
}

const initialFilters: SearchFilters = {
  contentType: [],
  followers: { min: 1000, max: 1000000000 },
  location: { country: "", region: "", city: "" },
  price: { min: 50, max: 3000 },
  gender: "",
  age: { min: 18, max: 65 },
  blockchain: [],
  niche: []
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  isLoading: false,
  lastSearchData: null,
  searchResults: [],
  searchState: {
    query: "",
    categories: [],
    filters: initialFilters
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  setLastSearchData: (data: InfluencerSearchFormData) => set({ lastSearchData: data }),

  setSearchResults: (results: SearchResult[]) => set({ searchResults: results }),

  updateSearchState: (query: string, categories: string[]) =>
    set((state) => ({
      searchState: { ...state.searchState, query, categories }
    })),

  updateFilter: (key, value) =>
    set((state) => ({
      searchState: {
        ...state.searchState,
        filters: { ...state.searchState.filters, [key]: value }
      }
    })),

  clearFilter: (key) =>
    set((state) => ({
      searchState: {
        ...state.searchState,
        filters: { ...state.searchState.filters, [key]: initialFilters[key] }
      }
    })),

  clearAllFilters: () =>
    set((state) => ({
      searchState: { ...state.searchState, filters: initialFilters }
    })),

  hasActiveFilters: () => {
    const { searchState } = get()
    const { filters } = searchState

    return (
      filters.contentType.length > 0 ||
      filters.gender !== "" ||
      filters.location.country !== "" ||
      filters.location.region !== "" ||
      filters.location.city !== "" ||
      filters.followers.min > 1000 ||
      filters.followers.max < 1000000000 ||
      filters.price.min > 50 ||
      filters.price.max < 3000 ||
      filters.age.min > 18 ||
      filters.age.max < 65 ||
      filters.blockchain.length > 0 ||
      filters.niche.length > 0
    )
  },

  getActiveFilterCount: () => {
    const { searchState } = get()
    const { filters } = searchState
    let count = 0

    if (filters.contentType.length > 0) count++
    if (filters.gender !== "") count++
    if (filters.location.country !== "" || filters.location.region !== "" || filters.location.city !== "") count++
    if (filters.followers.min > 1000 || filters.followers.max < 1000000000) count++
    if (filters.price.min > 50 || filters.price.max < 3000) count++
    if (filters.age.min > 18 || filters.age.max < 65) count++
    if (filters.blockchain.length > 0) count++
    if (filters.niche.length > 0) count++

    return count
  },

  getSearchTitle: () => {
    const { searchState } = get()
    const { categories, filters } = searchState

    let title = ""

    // Add gender
    if (filters.gender) {
      title += filters.gender + " "
    }

    // Add categories
    if (categories.length > 0) {
      title += categories.join(" ") + " "
    }

    title += "Influencers"

    // Add location
    const locationParts = []
    if (filters.location.city) locationParts.push(filters.location.city)
    if (filters.location.region) locationParts.push(filters.location.region)
    if (filters.location.country) locationParts.push(filters.location.country)

    if (locationParts.length > 0) {
      title += " in " + locationParts.join(", ")
    }

    return title
  },

  // URL Query Parameter Management
  getQueryParams: () => {
    const { searchState } = get()
    const params = new URLSearchParams()

    if (searchState.query) params.set("q", searchState.query)
    if (searchState.categories.length > 0) params.set("c", searchState.categories.join(" "))

    const { filters } = searchState
    if (filters.contentType.length > 0) params.set("t", filters.contentType.join(","))
    if (filters.followers.min > 1000) params.set("fmi", filters.followers.min.toString())
    if (filters.followers.max < 1000000000) params.set("fmx", filters.followers.max.toString())
    if (filters.location.country) params.set("ct", filters.location.country)
    if (filters.location.region) params.set("r", filters.location.region)
    if (filters.location.city) params.set("l", filters.location.city)
    if (filters.price.min > 50) params.set("pmi", filters.price.min.toString())
    if (filters.price.max < 3000) params.set("pmx", filters.price.max.toString())
    if (filters.gender) params.set("g", filters.gender)
    if (filters.age.min > 18) params.set("ami", filters.age.min.toString())
    if (filters.age.max < 65) params.set("amx", filters.age.max.toString())
    if (filters.blockchain.length > 0) params.set("b", filters.blockchain.join(","))
    if (filters.niche.length > 0) params.set("n", filters.niche.join(","))

    return params.toString()
  },

  loadFromQueryParams: (searchParams: URLSearchParams) => {
    const query = searchParams.get("q") || ""
    const categories = searchParams.get("c")?.split(" ").filter(Boolean) || []

    const filters: SearchFilters = {
      contentType: searchParams.get("t")?.split(",").filter(Boolean) || [],
      followers: {
        min: parseInt(searchParams.get("fmi") || "1000"),
        max: parseInt(searchParams.get("fmx") || "1000000000")
      },
      location: {
        country: searchParams.get("ct") || "",
        region: searchParams.get("r") || "",
        city: searchParams.get("l") || ""
      },
      price: {
        min: parseInt(searchParams.get("pmi") || "50"),
        max: parseInt(searchParams.get("pmx") || "3000")
      },
      gender: searchParams.get("g") || "",
      age: {
        min: parseInt(searchParams.get("ami") || "18"),
        max: parseInt(searchParams.get("amx") || "65")
      },
      blockchain: searchParams.get("b")?.split(",").filter(Boolean) || [],
      niche: searchParams.get("n")?.split(",").filter(Boolean) || []
    }

    set({ searchState: { query, categories, filters } })
  },

  updateURL: (router:AppRouterInstance , pathname: string) => {
    const queryString = get().getQueryParams()
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname

    // Use replace to avoid adding to browser history for filter changes
    router.replace(newUrl)
  },

  clearResults: () => set({ searchResults: [] }),

  performSearch: async (data: InfluencerSearchFormData) => {
    const { setLoading, setLastSearchData, setSearchResults } = get()

    setLoading(true)
    setLastSearchData(data)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock search results
      const mockResults: SearchResult[] = [
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
