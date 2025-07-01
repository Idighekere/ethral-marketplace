'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'

const brandSignUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  brandName: z.string().min(2, 'Brand name must be at least 2 characters'),
  website: z.string().url('Please enter a valid website URL'),
  brandEmail: z.string().email('Please enter a valid email'),
  xHandle: z.string().optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  marketingGoals: z
    .string()
    .min(10, 'Please provide more detail about your marketing goals')
})

type BrandSignUpForm = z.infer<typeof brandSignUpSchema>

const BrandSignUpPage = () => {
  const router = useRouter()
  const form = useForm<BrandSignUpForm>({
    resolver: zodResolver(brandSignUpSchema),
    defaultValues: {
      name: '',
      brandName: '',
      website: '',
      brandEmail: '',
      xHandle: '',
      password: '',
      marketingGoals: ''
    }
  })

  const onSubmit = async (data: BrandSignUpForm) => {
    try {
      console.log(data)
      router.replace('/home')

      // Add your signup logic here
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className=' mx-auto px-4 py-8 md:max-w-5xl'>
      <h1 className='text-3xl font-bold text-center mb-8 text-white'>
        Join as a Brand
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <div className='grid md:grid-cols-2 gap-6'>
            {/* Name & Brand Name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className='border-0'
                      placeholder='John Doe'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='brandName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input
                      className='border-0'
                      placeholder='Your Brand'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Website & Brand Email */}
            <FormField
              control={form.control}
              name='website'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      className='border-0'
                      placeholder='https://yourbrand.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='brandEmail'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Email</FormLabel>
                  <FormControl>
                    <Input
                      className='border-0'
                      placeholder='contact@yourbrand.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* X Handle & Password */}
            <FormField
              control={form.control}
              name='xHandle'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>X Handle (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      className='border-0'
                      placeholder='@yourbrand'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className='border-0'
                      type='password'
                      placeholder='••••••••'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Marketing Goals */}
          <div className='mt-6'>
            <FormField
              control={form.control}
              name='marketingGoals'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Outline your marketing Goals (Shared with creators)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Tell us about your marketing objectives...'
                      className='min-h-[100px] '
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' className='w-full text-base mt-5 h-10'>
            Sign Up
          </Button>

          <p className='text-center text-sm text-[#F3F4F6]/70 my-4'>
            By signing up you agree to our{' '}
            <Link href='/terms' className='text-primary/70 hover:underline'>
              Terms
            </Link>{' '}
            and{' '}
            <Link href='/privacy' className='text-primary/70 hover:underline'>
              Privacy Policy
            </Link>
          </p>

          <p className='text-center text-sm text-[#F3F4F6]/70'>
            Are you a creator?{' '}
            <Link href='/join/creator' className='text-primary/70 underline'>
              Sign up as Creator
            </Link>
          </p>
        </form>
      </Form>
    </div>
  )
}

export default BrandSignUpPage
