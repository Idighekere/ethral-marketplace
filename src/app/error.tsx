'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Error ({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  const router = useRouter()

  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center text-center px-6'>
      <div className='mb-8'>
        <h1 className='text-5xl md:text-7xl font-bold text-primary mb-4'>
          500
        </h1>
        <h2 className='text-2xl md:text-3xl font-semibold text-white mb-6'>
          Something went wrong
        </h2>
        <p className='text-gray-300 max-w-md mx-auto mb-8'>
          We&apos;re sorry, but something went wrong on our end. Please try again or
          return home.
        </p>
      </div>

      <div className='flex flex-col sm:flex-row gap-4'>
        <Button onClick={() => reset()} variant='outline' className='px-6'>
          Try Again
        </Button>
        <Button
          onClick={() => router.back()}
          variant='outline'
          className='px-6'
        >
          Go Back
        </Button>
        <Button asChild className='px-6'>
          <Link href='/'>Return Home</Link>
        </Button>
      </div>
    </div>
  )
}
