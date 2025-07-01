'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search, AlertCircle } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  influencerSearchFormSchema,
  type InfluencerSearchFormData
} from '@/schemas'
import { useSearchStore } from '@/store/'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import {
  FilterButton,
  CategoryPopup,
  ContentTypeFilter,
  FollowersFilter,
  LocationFilter,
  PriceFilter,
  GenderFilter,
  AuthRequiredDialog,
  PremiumUpgradeDialog
} from './filters'

interface SearchFormProps {
  className?: string
  showFilters?: boolean
  isAuthenticated?: boolean
  isPremium?: boolean
  onLogin?: () => void
  onUpgrade?: () => void
}

const InfluencerSearchForm = ({
  className = '',
  showFilters = false,
  isAuthenticated = false,
  isPremium = false,
  onLogin,
  onUpgrade
}: SearchFormProps) => {
  const router = useRouter()
  const pathname = usePathname()
  // const searchParams = useSearchParams()
  const {
    isLoading,
    performSearch,
    searchState,
    // updateSearchState,
    clearAllFilters,
    hasActiveFilters,
    // getActiveFilterCount,
    // getQueryParams,
    // updateURL
  } = useSearchStore()

  // State for popups and dialogs
  const [showCategoryPopup, setShowCategoryPopup] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [showPremiumDialog, setShowPremiumDialog] = useState(false)

  // Refs
  const categoryInputRef = useRef<HTMLInputElement | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    setValue,
    watch
  } = useForm<InfluencerSearchFormData>({
    resolver: zodResolver(influencerSearchFormSchema),
    defaultValues: {
      influencers: searchState.query || '',
      category: searchState.categories.join(' ') || ''
    },
    mode: 'onChange'
  })

  useEffect(()=>{
    // Parse URL search params when component mounts
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('q') || '';
    const categoriesParam = searchParams.get('c') || '';

    // Update form fields with URL values
    if (query) {
      setValue('influencers', query);
      // Update the search state with the query
      // updateSearchState(query,{
      //   ...searchState,
      //   query
      // });
    }

    if (categoriesParam) {
      setValue('category', categoriesParam);
      // Update search state with categories
      // const categoriesArray = categoriesParam.split(' ').filter(Boolean);
      // updateSearchState({
      //   ...searchState,
      //   categories: categoriesArray
      // });
    }

    // Parse other filter parameters and apply them
    // Example: for content type, followers, location, etc.
    const contentTypes = searchParams.getAll('t');
    const minFollowers = searchParams.get('fmi');
    const maxFollowers = searchParams.get('fmx');
    // etc.

    if (contentTypes.length || minFollowers || maxFollowers) {
      const updatedFilters = { ...searchState.filters };

      if (contentTypes.length) {
        updatedFilters.contentType = contentTypes;
      }

      if (minFollowers || maxFollowers) {
        updatedFilters.followers = {
          min: minFollowers ? parseInt(minFollowers) : updatedFilters.followers.min,
          max: maxFollowers ? parseInt(maxFollowers) : updatedFilters.followers.max
        };
      }

      // // Update search state with parsed filters
      // updateFilters({
      //   ...searchState,
      //   filters: updatedFilters
      // });
    }
  })

  const onSubmit = async (data: InfluencerSearchFormData) => {
    try {
      //     updateSearchState(query, categories)

      await performSearch(data)

      // Navigate to results page if not already there, or update URL with search terms
      if (pathname === '/'||pathname === '/influencers') {
        const params = new URLSearchParams()
        params.set('q', data.influencers)
        if (data.category) params.set('categories', data.category)
        router.push(`/influencers?${params.toString()}`)
      } else if ( pathname.includes('/stars')) {
        // // Update the search state with form data and let the effect handle URL update
        // const categories = (data.category || '').split(' ').filter(Boolean)
        // updateSearchState(data.influencers, categories)
        // // Force URL update to include search terms
        // updateURL(router, pathname)

        const params = new URLSearchParams()
        params.set('q', data.influencers)
        if (data.category) params.set('categories', data.category)
        router.push(`/stars?${params.toString()}`)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const handleCategoryFocus = () => {
    setShowCategoryPopup(true)
  }

  const handleCategoryBlur = () => {
    // Only close if the related target is not within the popup
    setTimeout(() => {
      if (
        categoryInputRef.current &&
        !categoryInputRef.current.matches(':focus')
      ) {
        setShowCategoryPopup(false)
      }
    }, 150) // Small delay to allow clicks on category buttons
  }

  const handleCategorySelect = (category: string) => {
    const currentValue = watch('category') || ''
    const categories = currentValue.split(' ').filter(Boolean)

    if (!categories.includes(category)) {
      const newValue = [...categories, category].join(' ')
      setValue('category', newValue)
    }

    // Focus back on the input to allow further typing
    setTimeout(() => {
      if (categoryInputRef.current) {
        categoryInputRef.current.focus()
      }
    }, 0)
  }

  const handleFilterClick = (filterType: string) => {
    if (!isAuthenticated && filterType !== 'clear') {
      setShowAuthDialog(true)
      return
    }

    const premiumFilters = ['age', 'blockchain', 'niche']
    if (!isPremium && premiumFilters.includes(filterType)) {
      setShowPremiumDialog(true)
      return
    }

    if (filterType === 'clear') {
      clearAllFilters()
      return
    }

    setActiveFilter(filterType)
  }

  const closeActiveFilter = () => {
    setActiveFilter(null)
  }

  const hasError = (field: keyof InfluencerSearchFormData) => {
    return touchedFields[field] && errors[field]
  }

  const isFormLoading = isLoading || isSubmitting

  return (
    <div className={`w-full  ${className}`}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div
          className={`flex flex-col sm:flex-row gap-4 rounded-sm sm:rounded-full p-2 sm:px-10 transition-all max-w-5xl duration-200 bg-[#1D232C] ${
            Object.keys(errors).length > 0
              ? 'ring-1 ring-red-200/20'
              : 'hover:shadow-xl'
          }`}
        >
          {/* Influencers Input */}
          <div className='flex-1'>
            <Label
              htmlFor='influencers'
              className='block text-left text-base font-medium text-white mb-0 py-0 px-3'
            >
              Influencers
            </Label>
            <input
              id='influencers'
              type='text'
              {...register('influencers')}
              placeholder='search influencers'
              className={`w-full px-3 py-2 text-white placeholder:text-[#D8D8D8] border-0 focus:outline-none focus:ring-0 transition-colors bg-transparent ${
                hasError('influencers')
                  ? 'text-red-600 placeholder-red-300'
                  : ''
              }`}
              aria-invalid={hasError('influencers') ? 'true' : 'false'}
              aria-describedby={
                hasError('influencers') ? 'influencers-error' : undefined
              }
            />
          </div>

          {/* Divider */}
          <div className='hidden sm:block w-px bg-gray-200 my-2'></div>

          {/* Category Input */}
          <div className='flex-1 relative'>
            <Label
              htmlFor='category'
              className='block text-left text-base font-medium text-white mb-0 py-0 px-3'
            >
              Category
            </Label>
            <input
              id='category'
              type='text'
              {...register('category')}
              ref={e => {
                const { ref } = register('category')
                // Call the original ref from register
                if (typeof ref === 'function') ref(e)
                // Also set our local ref
                categoryInputRef.current = e
              }}
              placeholder='Enter keywords, niches or categories'
              onFocus={handleCategoryFocus}
              onBlur={handleCategoryBlur}
              className={`w-full px-3 py-2 text-white placeholder:text-[#D8D8D8] border-0 focus:outline-none focus:ring-0 transition-colors bg-transparent ${
                hasError('category') ? 'text-red-600 placeholder-red-300' : ''
              }`}
              aria-invalid={hasError('category') ? 'true' : 'false'}
              aria-describedby={
                hasError('category') ? 'category-error' : undefined
              }
            />

            <CategoryPopup
              isOpen={showCategoryPopup}
              onClose={() => setShowCategoryPopup(false)}
              onCategorySelect={handleCategorySelect}
              inputRef={categoryInputRef}
            />
          </div>

          {/* Search Button */}
          <button
            type='submit'
            disabled={isFormLoading}
            className='bg-[#2F353E] disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-md sm:rounded-full transition-all duration-200 flex items-center justify-center sm:h-15 sm:w-15 hover:scale-105 active:scale-95 sm:self-center'
            aria-label='Search'
          >
            {isFormLoading ? (
              <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
            ) : (
              <Search className='size-6' />
            )}
          </button>
        </div>
      </form>

      {/* Error Messages */}
      <div className='mt-2 space-y-1'>
        {errors.influencers && (
          <div
            id='influencers-error'
            className='flex items-center gap-2 text-red-600 text-sm animate-in slide-in-from-top-1 duration-200'
          >
            <AlertCircle className='w-4 h-4 flex-shrink-0' />
            <span>{errors.influencers.message}</span>
          </div>
        )}
        {errors.category && (
          <div
            id='category-error'
            className='flex items-center gap-2 text-red-600 text-sm animate-in slide-in-from-top-1 duration-200'
          >
            <AlertCircle className='w-4 h-4 flex-shrink-0' />
            <span>{errors.category.message}</span>
          </div>
        )}
      </div>

      {/* Filter Buttons */}
      {showFilters && (
        <div className='mt-6 flex overflow-x-auto items-center gap-3 scrollbar max-w-6xl'>
          <FilterButton
            label='Content Type'
            isActive={searchState.filters.contentType.length > 0}
            onClick={() => handleFilterClick('contentType')}
          />
          <FilterButton
            label='Followers'
            isActive={
              searchState.filters.followers.min > 1000 ||
              searchState.filters.followers.max < 1000000000
            }
            onClick={() => handleFilterClick('followers')}
          />
          <FilterButton
            label='Location'
            isActive={
              searchState.filters.location.country !== '' ||
              searchState.filters.location.region !== '' ||
              searchState.filters.location.city !== ''
            }
            onClick={() => handleFilterClick('location')}
          />
          <FilterButton
            label='Price'
            isActive={
              searchState.filters.price.min > 50 ||
              searchState.filters.price.max < 3000
            }
            onClick={() => handleFilterClick('price')}
          />
          <FilterButton
            label='Gender'
            isActive={searchState.filters.gender !== ''}
            onClick={() => handleFilterClick('gender')}
          />
          <FilterButton
            label='Age'
            isPremium={true}
            isActive={
              searchState.filters.age.min > 18 ||
              searchState.filters.age.max < 65
            }
            onClick={() => handleFilterClick('age')}
          />
          <FilterButton
            label='Blockchain'
            isPremium={true}
            isActive={searchState.filters.blockchain.length > 0}
            onClick={() => handleFilterClick('blockchain')}
          />
          <FilterButton
            label='Niche'
            isPremium={true}
            isActive={searchState.filters.niche.length > 0}
            onClick={() => handleFilterClick('niche')}
          />

          {hasActiveFilters() && (
            <Button
              variant='ghost'
              onClick={() => handleFilterClick('clear')}
              className='text-gray-600 hover:text-gray-800'
            >
              Clear All
            </Button>
          )}
        </div>
      )}

      {/* Filter Dialogs */}
      <ContentTypeFilter
        isOpen={activeFilter === 'contentType'}
        onClose={closeActiveFilter}
      />
      <FollowersFilter
        isOpen={activeFilter === 'followers'}
        onClose={closeActiveFilter}
      />
      <LocationFilter
        isOpen={activeFilter === 'location'}
        onClose={closeActiveFilter}
      />
      <PriceFilter
        isOpen={activeFilter === 'price'}
        onClose={closeActiveFilter}
      />
      <GenderFilter
        isOpen={activeFilter === 'gender'}
        onClose={closeActiveFilter}
      />

      {/* Auth and Premium Dialogs */}
      <AuthRequiredDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        onLogin={onLogin}
      />
      <PremiumUpgradeDialog
        isOpen={showPremiumDialog}
        onClose={() => setShowPremiumDialog(false)}
        onUpgrade={onUpgrade}
      />
    </div>
  )
}
export default InfluencerSearchForm
