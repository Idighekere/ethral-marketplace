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
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const creatorSignUpSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
})

type CreatorSignUpForm = z.infer<typeof creatorSignUpSchema>

const CreatorSignUpPage = () => {
  const router = useRouter()
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null
  )

  const form = useForm<CreatorSignUpForm>({
    resolver: zodResolver(creatorSignUpSchema),
    defaultValues: {
      username: '',
      fullName: '',
      email: '',
      password: ''
    }
  })
  const onSubmit = async (data: CreatorSignUpForm) => {
    try {
      console.log(data)
      // In a real app, you would make an API call to create the user
      // For now, we'll just redirect to the onboarding flow
      router.replace('/creator/onboarding?t=1')
    } catch (error) {
      console.error(error)
    }
  }

  const checkUsername = async () => {
    const username = form.getValues('username')
    if (!username || username.length < 3) return

    setIsCheckingUsername(true)

    try {
      // This would be a real API call in production
      await new Promise(resolve => setTimeout(resolve, 1000))

      // For demo, we'll just consider usernames with "taken" to be unavailable
      const available = !username.toLowerCase().includes('taken')
      setUsernameAvailable(available)
    } catch (error) {
      console.error('Error checking username:', error)
      setUsernameAvailable(null)
    } finally {
      setIsCheckingUsername(false)
    }
  }

  return (
    <div className='mx-auto px-4 py-8 md:max-w-5xl'>
      <h1 className='text-3xl font-bold text-center mb-8 text-white'>
        Join as a Creator
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <div className='grid md:grid-cols-2 gap-6'>
            {/* Username with claim button */}
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='m'>
                  <FormLabel>
                    ethral.com/<span className='text-[#979797]'>your name</span>
                  </FormLabel>
                  <div className='flex space-x-2'>
                    <FormControl>
                      <div className='relative  w-full flex'>
                        <Input
                          className='h-10 /relative border-0 '
                          placeholder='yourname'
                          {...field}
                          onChange={e => {
                            field.onChange(e)
                            setUsernameAvailable(null)
                          }}
                          onBlur={field.onBlur}
                        />
                        <Button
                          type='button'
                          variant='secondary'
                          onClick={checkUsername}
                          disabled={
                            isCheckingUsername ||
                            !form.getValues('username') ||
                            form.getValues('username').length < 3
                          }
                          className='absolute right-2 px-4 py-0 text-white  hover:bg-secondary/90 hover:text-white rounded-full top-0 bottom-0 text-sm text-normal h-7  self-center'
                        >
                          {isCheckingUsername ? 'Checking...' : 'Claim'}
                        </Button>
                      </div>
                    </FormControl>
                  </div>
                  {usernameAvailable === true && (
                    <p className='text-sm text-green-500'>
                      Username available!
                    </p>
                  )}
                  {usernameAvailable === false && (
                    <p className='text-sm text-red-500'>
                      Username already taken
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Full Name & Email */}
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
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
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className='border-0'
                      placeholder='your@email.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password (spans full width) */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className=''>
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

          <Button type='submit' className='w-full text-base mt-5 h-10'>
            Proceed
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
            Already have an account?{' '}
            <Link href='/login' className='text-primary/70 underline'>
              Login
            </Link>{' '}
          </p>
        </form>
      </Form>
    </div>
  )
}

export default CreatorSignUpPage
