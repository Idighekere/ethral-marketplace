'use client'

import { Button } from '@/components/ui/button'

export default function Error ({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className='text-center py-20'>
      <h2 className='text-2xl:px-36 font-semibold mb-4'>Something went wrong!</h2>
      <p className='text-muted-foreground mb-6'>
        {error.message || 'Failed to load profile'}
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
