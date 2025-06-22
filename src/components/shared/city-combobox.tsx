'use client'

import React, { useState, useEffect } from 'react'
import { Combobox } from '@/components/ui/combobox'
import { searchCities, type City } from '@/lib/cities'
import { Label } from '@/components/ui/label'
import { useDebounce } from '@/hooks/use-debounce'

interface CityComboboxProps {
  value: string
  onChange: (value: string) => void
  className?: string
  error?: string
  name?: string
  label?: string
}

export function CityCombobox ({
  value,
  onChange,
  className,
  error,
  name,
  label = 'Location'
}: CityComboboxProps) {
  const [cities, setCities] = useState<City[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  // Debounce the search term to avoid too many API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    const fetchCities = async () => {
      if (debouncedSearchTerm.length >= 3) {
        setIsLoading(true)
        try {
          const results = await searchCities(debouncedSearchTerm)
          setCities(results)
        } catch (error) {
          console.error('Error fetching cities:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setCities([])
      }
    }

    fetchCities()
  }, [debouncedSearchTerm])

  // Convert cities to combobox options
  const cityOptions = cities.map(city => ({
    value: city.value,
    label: city.label
  }))
  // Handle input change
  const handleSearch = (input: string) => {
    setSearchTerm(input)
  }

  return (
    <div className='space-y-2'>
      <Label htmlFor={name} className='text-sm text-[#e9e9e9]'>
        {label}
      </Label>
      <div className='relative'>
        <Combobox
          options={cityOptions}
          value={value}
          onChange={onChange}
          onSearch={handleSearch}
          placeholder='City - Enter at least 3 letters to search'
          emptyMessage={
            isLoading
              ? 'Loading...'
              : debouncedSearchTerm.length >= 3
              ? 'No cities found'
              : 'Type at least 3 characters to search'
          }
          className={className}
          triggerClassName='bg-transparent border-[0.5px] border-[#CDCDCD] text-[#e9e9e9] placeholder:text-[#e9e9e9]/80'
        />
        {isLoading && (
          <div className='absolute right-10 top-1/2 transform -translate-y-1/2'>
            <div className='animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full' />
          </div>
        )}
      </div>
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  )
}
