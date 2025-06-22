'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LineChart, PlayCircle, Star } from 'lucide-react'

const navigationItems = [
  {
    label: 'Home',
    href: '/home',
    icon: Home
  },
  {
    label: 'Stars',
    href: '/stars',
    icon: Star
  },
  {
    label: 'Campaigns',
    href: '/campaigns',
    icon: PlayCircle
  },
  {
    label: 'Track',
    href: '/track',
    icon: LineChart
  }
]

export const BrandBottomNav = () => {
  const pathname = usePathname()

  return (
    <nav className='md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-white/10'>
      <div className='grid grid-cols-4 h-16'>
        {navigationItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-1 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className='h-5 w-5' />
              <span className='text-xs'>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
