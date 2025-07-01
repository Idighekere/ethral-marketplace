'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { CityCombobox } from '@/components/shared/city-combobox'
import {  Globe, MapPin, } from 'lucide-react'
import { useSearchStore } from '@/store'
// import { cn } from '@/lib/utils'

// Mock data - replace with actual data from your API or constants
const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'BR', name: 'Brazil' }
]

const REGIONS: Record<string, { code: string; name: string }[]> = {
  US: [
    { code: 'CA', name: 'California' },
    { code: 'NY', name: 'New York' },
    { code: 'TX', name: 'Texas' },
    { code: 'FL', name: 'Florida' }
  ],
  CA: [
    { code: 'ON', name: 'Ontario' },
    { code: 'BC', name: 'British Columbia' },
    { code: 'AB', name: 'Alberta' }
  ],
  GB: [
    { code: 'ENG', name: 'England' },
    { code: 'SCO', name: 'Scotland' },
    { code: 'WAL', name: 'Wales' }
  ]
}



interface LocationFilterProps {
  isOpen: boolean
  onClose: () => void
}

const LocationFilter = ({ isOpen, onClose }: LocationFilterProps) => {
  const { searchState, updateFilter } = useSearchStore()
  const [location, setLocation] = useState(searchState.filters.location)
  // const [error, setError] = useState<string | null>(null)

  const handleCountryChange = (countryCode: string) => {
    const country = COUNTRIES.find(c => c.code === countryCode)?.name || ''
    setLocation(prev => ({
      ...prev,
      country,
      region: '', // Reset region when country changes
      city: '' // Reset city when country changes
    }))
  }

  const handleRegionChange = (regionCode: string) => {
    const countryCode = COUNTRIES.find(c => c.name === location.country)?.code
    const region = countryCode
      ? REGIONS[countryCode]?.find(r => r.code === regionCode)?.name || ''
      : ''
    setLocation(prev => ({
      ...prev,
      region,
      city: '' // Reset city when region changes
    }))
  }

  const handleCityChange = (city: string) => {
    setLocation(prev => ({ ...prev, city }))

  }

  const handleClearRegion = () => {
    setLocation(prev => ({ ...prev, region: '', city: '' }))
  }

  const handleSave = () => {
    updateFilter('location', location)
    onClose()
  }

  const selectedCountryCode = COUNTRIES.find(
    c => c.name === location.country
  )?.code

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='text-white max-w-md'>
        <DialogHeader className='flex flex-row items-center justify-between pb-4'>
          <DialogTitle className='text-lg font-semibold text-gray-900'>
            Location
          </DialogTitle>

        </DialogHeader>

        <div className='space-y-4'>
          <Accordion type='single' collapsible className='w-full'>
            {/* Filter by Country */}
            <AccordionItem value='country' className='border-gray-200/70'>
              <AccordionTrigger className='text-sm font-medium text-white hover:no-underline'>
                <div className='flex items-center gap-2'>
                  <Globe className='w-4 h-4' />
                  Filter by Country
                </div>
              </AccordionTrigger>
              <AccordionContent className='pt-3'>
                <Select
                  value={selectedCountryCode || ''}
                  onValueChange={handleCountryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select a country' />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map(country => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>

            {/* Filter by Region */}
            <AccordionItem value='region' className='border-gray-200/70'>
              <AccordionTrigger className='text-sm font-medium text-white hover:no-underline'>
                <div className='flex items-center gap-2'>
                  <MapPin className='w-4 h-4' />
                  Filter by Region
                </div>
              </AccordionTrigger>
              <AccordionContent className='pt-3 space-y-3'>
                <Select
                  value={selectedCountryCode || ''}
                  onValueChange={handleCountryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='1. Select a Country' />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map(country => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={
                    (selectedCountryCode &&
                      REGIONS[selectedCountryCode]?.find(
                        r => r.name === location.region
                      )?.code) ||
                    ''
                  }
                  onValueChange={handleRegionChange}
                  disabled={!selectedCountryCode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='2. Select a Region' />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCountryCode &&
                      REGIONS[selectedCountryCode]?.map(region => (
                        <SelectItem key={region.code} value={region.code}>
                          {region.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <Button
                  variant='ghost'
                  onClick={handleClearRegion}
                  className=' text-sm'
                >
                  Clear
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Filter by City */}
            <AccordionItem value='city' className='border-gray-200/70'>
              <AccordionTrigger className='text-sm font-medium text-white hover:no-underline'>
                <div className='flex items-center gap-2'>
                  <MapPin className='w-4 h-4' />
                  Filter by City
                </div>
              </AccordionTrigger>
              <AccordionContent className='pt-3'>
                <CityCombobox
                  value={location.city}
                  onChange={value => {
                    handleCityChange(value)
                    // setError(null)
                  }}
                  label=''
                  // error={error || undefined}
                  className='w-full'
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Button onClick={handleSave} className='w-full  mt-6'>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  )
}
export default LocationFilter
