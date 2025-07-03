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
import {GoogleLogo} from "@/components/icons"
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({

  email: z.string().email('Please enter a valid email'),
  password: z
    .string()

})

type LoginForm = z.infer<typeof loginSchema>

const LoginPage = () => {
  const router = useRouter()


  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
    email:'',
      password: ''
    }
  })
  const onSubmit = async (data: LoginForm) => {
    try {
      console.log(data)
      // In a real app, you would make an API call to create the user
      // For now, we'll just redirect to the onboarding flow
      router.replace('/home')
    } catch (error) {
      console.error(error)
    }
  }



  return (
    <div className='mx-auto px-4 py-8 max-w-xl'>
      <h1 className='text-3xl font-bold text-center mb-8 text-white'>
        Login to <span className="text-primary">Ethral</span>
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <div className='flex flex-col gap-6'>


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
            Login
          </Button>
          <div className="flex items-center w-full my-4">
            <div className="flex-grow h-[1px] bg-[#6c6c6c]"></div>
            <span className="px-4 text-[#98989A]">OR</span>
            <div className="flex-grow h-[1px] bg-[#6c6c6c]"></div>
          </div>

          <Button type='button' variant="outline" className='w-full  mt-5 h-10 border-[0.5px]  text-[#E5E7EB] border-[#6C6C6C]'>
            <GoogleLogo className='mr-2 size-5'/> Login with Google
          </Button>

          <p className='text-center text-sm text-[#F3F4F6]/70 mt-8'>
            Don&apos;t have an account yet?{' '}
            <Link href='/join/brand' className='text-primary/70 underline'>
              Sign up as Brand
            </Link>{' '} or <Link href='/join/creator' className='text-primary/70 underline'>
              Sign up as Creator
            </Link>
          </p>
        </form>
      </Form>
    </div>
  )
}

export default LoginPage
