'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Custom404 () {
  const router = useRouter()

  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center text-center px-6'>
      <div className='mb-8'>
        <h1 className='text-4xl md:text-7xl font-bold text-primary mb-4'>
          404
        </h1>
        <h2 className='text-2xl md:text-3xl font-semibold text-white mb-6'>
          Page Not Found
        </h2>
        <p className='text-gray-300 max-w-md mx-auto mb-8'>
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <div className='flex flex-col sm:flex-row gap-4'>
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
