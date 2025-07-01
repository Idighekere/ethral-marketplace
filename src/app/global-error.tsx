'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {useEffect} from "react"

export default function GlobalError ({
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
  return (
    <html>
      <body>
        <div className='min-h-screen flex flex-col items-center justify-center text-center px-6 bg-background'>
          <div className='mb-8'>
            <h1 className='text-5xl md:text-7xl font-bold text-primary mb-4'>
              Error
            </h1>
            <h2 className='text-2xl md:text-3xl font-semibold text-white mb-6'>
              Something went wrong
            </h2>
            <p className='text-gray-300 max-w-md mx-auto mb-8'>
              A critical error has occurred. We&apos;re working to fix the issue.
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4'>
            <Button onClick={() => reset()} variant='outline' className='px-6'>
              Try Again
            </Button>
            <Button asChild className='px-6'>
              <Link href='/'>Return Home</Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
