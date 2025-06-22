'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { label: 'Details', href: '/edit-profile' },
  { label: 'Images', href: '/edit-profile/images' }
]

export default function EditProfileLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className='container py-8 space-y-6 pb-20 md:pb-10'>
      <div className='flex items-center gap-4'>
        <Button
          variant='secondary'
          className='text-[#e9e9e9] rounded-full'
          onClick={() => router.back()}
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Profile
        </Button>
      </div>

      <h1 className='text-2xl font-semibold text-white'>Edit Profile</h1>

      <div className='flex gap-6 sm:gap-10 /border-b border-[#e9e9e9]/10'>
        {tabs.map(tab => (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              'pb-2 font-medium text-lg md:text-xl -mb-[1px]',
              pathname === tab.href ||
                (pathname === '/edit-profile' && tab.href === '/edit-profile')
                ? '/border-b-2 border-primary text-primary'
                : 'text-[#e9e9e9]'
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {children}
    </div>
  )
}
