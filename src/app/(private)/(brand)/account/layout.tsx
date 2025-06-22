'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Footer } from '@/components/shared'
const tabs = [
  { label: 'Details', href: '/account' },
  { label: 'Payment', href: '/account/payment' },
  { label: 'Settings', href: '/account/settings' }
]

export default function AccountLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <>
      <div className='container py-8 space-y-8'>
        <h1 className='text-2xl font-semibold text-white'>Account</h1>

        <div className='flex gap-6 sm:gap-10 /border-b border-[#e9e9e9]/10'>
          {tabs.map(tab => (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'pb-2 font-medium text-lg md:text-xl -mb-[1px]',
                pathname === tab.href ||
                  (pathname === '/account' && tab.href === '/account')
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
      <Footer />
    </>
  )
}
