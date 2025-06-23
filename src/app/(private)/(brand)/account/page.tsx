'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useState } from 'react'

// Mock data - replace with API call
const countries = [
  { value: 'usa', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'can', label: 'Canada' }
]

const cities = [
  { value: 'nyc', label: 'New York City' },
  { value: 'lon', label: 'London' },
  { value: 'tor', label: 'Toronto' }
]

export default function AccountPage () {
  const [formData, setFormData] = useState({
    email: 'user@example.com',
    password: '••••••••',
    companyName: '',
    taxId: '',
    country: '',
    streetAddress: '',
    city: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement save functionality
    console.log('Form data:', formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-2xl space-y-6 md:space-y-8 py-4 md:py-6'
    >
      <div className='space-y-4'>
        <div className=' '>
          <Label className='text-sm text-[#e9e9e9]'>Email</Label>
          <Input
            type='email'
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className='bg-transparent border-[0.5px] border-[#CDCDCD] text-white placeholder:text-[#e9e9e9]/90'
            placeholder='user@example.com'
          />
        </div>

        <div className=' '>
          <Label className='text-sm text-[#e9e9e9]'>Password</Label>
          <Input
            type='password'
            value={formData.password}
            onChange={e =>
              setFormData({ ...formData, password: e.target.value })
            }
            className='bg-transparent border-[0.5px] border-[#CDCDCD] text-white placeholder:text-[#e9e9e9]/90'
            placeholder='••••••••'
            aria-placeholder='••••••••'
          />
        </div>

        <div className=' '>
          <Label className='text-sm text-[#e9e9e9]'>Legal Company Name</Label>
          <Input
            value={formData.companyName}
            onChange={e =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            className='bg-transparent border-[0.5px] border-[#CDCDCD] text-white placeholder:text-[#e9e9e9]/90'
            placeholder='Company Ltd.'
            aria-placeholder='Company Ltd.'
          />
        </div>

        <div className=' '>
          <Label className='text-sm text-[#e9e9e9]'>VAT/Tax ID</Label>
          <Input
            value={formData.taxId}
            onChange={e => setFormData({ ...formData, taxId: e.target.value })}
            className='bg-transparent border-[0.5px] border-[#CDCDCD] text-white placeholder:text-[#e9e9e9]/90'
            placeholder='123456789'
            aria-placeholder='123456789'
          />
        </div>

        <div className='  mt-6'>
          <Label className='text-sm text-[#e9e9e9]'>Billing Address</Label>
          <div className='grid gap-4'>
            <Select
              value={formData.country}
              onValueChange={value =>
                setFormData({ ...formData, country: value })
              }
            >
              <SelectTrigger className='bg-transparent border-[0.5px] border-[#CDCDCD] text-[#e9e9e9]  data-[size=default]:h-10  placeholder:text-[#e9e9e9]/90'>
                <SelectValue placeholder='Select country' />
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={formData.city}
              onValueChange={value => setFormData({ ...formData, city: value })}
            >
              <SelectTrigger className='bg-transparent border-[0.5px] border-[#CDCDCD] text-[#e9e9e9] data-[size=default]:h-10'>
                <SelectValue placeholder='Select city' />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => (
                  <SelectItem key={city.value} value={city.value}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder='Street address'
              value={formData.streetAddress}
              onChange={e =>
                setFormData({ ...formData, streetAddress: e.target.value })
              }
              className='bg-transparent border-[0.5px] border-[#CDCDCD] text-white placeholder:text-[#e9e9e9]/90'
            />
          </div>
        </div>
      </div>

      <Button
        type='submit'
        className='mt-4 rounded-full w-full md:w-36 text-lg font-medium h-10'
      >
        Save
      </Button>
    </form>
  )
}
