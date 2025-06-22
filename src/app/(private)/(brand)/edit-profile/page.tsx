'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { CityCombobox } from '@/components/shared/city-combobox'

// Mock categories - replace with your actual categories
const categories = [
  'Fashion',
  'Beauty',
  'Technology',
  'Food',
  'Travel',
  'Lifestyle',
  'Gaming',
  'Fitness',
  'Education',
  'Entertainment'
]

// Define form schema
const formSchema = z.object({
  location: z.string().min(1, 'Please select a location'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  categories: z.array(z.string()).min(1, 'Please select at least one category')
})

export default function DetailsPage () {
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      description: '',
      categories: []
    }
  })

  const { watch, setValue } = form
  const selectedCategories = watch('categories')

  const handleCategoryToggle = (category: string) => {
    const current = [...selectedCategories]
    if (current.includes(category)) {
      setValue(
        'categories',
        current.filter(c => c !== category)
      )
    } else {
      setValue('categories', [...current, category])
    }
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    // Submit the form data to your API
  }

  return (
    <div className='space-y-6 mt-6'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 max-w-2xl'
        >
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <CityCombobox
                value={field.value}
                onChange={field.onChange}
                error={form.formState.errors.location?.message}
              />
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel className='text-sm text-[#e9e9e9]'>
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='What do you sell?'
                    className='bg-transparent border-[0.5px] border-[#CDCDCD] text-white min-h-[120px] placeholder:text-[#e9e9e9]/80'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='space-y-2'>
            <Label className='text-sm text-[#e9e9e9]'>Categories</Label>
            <div className='flex flex-wrap gap-2'>
              {categories.map(category => (
                <button
                  type='button'
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={cn(
                    'px-2 py-1 rounded-sm text-sm transition-colors',
                    selectedCategories.includes(category)
                      ? 'bg-primary/90 text-black'
                      : 'border border-[#CDCDCD] text-[#e9e9e9]  bg-secondary hover:border-primary'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
            {form.formState.errors.categories && (
              <p className='text-red-500 text-sm mt-1'>
                {form.formState.errors.categories.message}
              </p>
            )}
          </div>

          <Button type='submit' className='mt-5 rounded-full w-full sm:w-36 h-10'>
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  )
}
