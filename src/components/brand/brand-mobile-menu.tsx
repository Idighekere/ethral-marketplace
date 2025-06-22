'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import {
  Star,
  Megaphone,
  LineChart,
  BookOpen,
  MoreHorizontal,
  User,
  List,
  CreditCard,
  Settings,
  
  X
} from 'lucide-react'
import {usePathname} from "next/navigation"

const menuItems = [
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: List, label: 'Lists', href: '/lists' },
  { icon: CreditCard, label: 'Billing', href: '/billing' },
  { icon: Settings, label: 'Account', href: '/account' }
]

const navigationItems = [
  { icon: Star, label: 'Stars', href: '/stars' },
  { icon: Megaphone, label: 'Campaigns', href: '/campaigns' },
  { icon: LineChart, label: 'Track', href: '/track' },
  { icon: BookOpen, label: 'Blog', href: '/blog' },
  { icon: MoreHorizontal, label: 'More', href: '#' }
]

export const BrandMobileMenu = () => {
  const [showMore, setShowMore] = useState(false)

  const pathname=usePathname()
  return (
    <div className='fixed bottom-0 left-0 right-0 bg-background border-t border-white/10 md:hidden text-neutral-white z-40 '>
      <nav className='px-4 py-2'>
        {!showMore ? (
          <div className='flex justify-between items-center'>
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant='ghost'
                className={`flex flex-col items-center gap-1 h-auto py-2 hover:bg-secondary/60 hover:text-neutral-white ${pathname.startsWith(item?.href) ? 'text-primary' : ''}`}
                onClick={() => {
                  if (item.label === 'More') {
                    setShowMore(true)
                  }
                }}
                asChild={item.label !== 'More'}
              >
                {item.label !== 'More' ? (
                  <Link href={item.href}>
                    <item.icon className='size-6' />
                    <span className='text-xs'>{item.label}</span>
                  </Link>
                ) : (
                  <>
                    <item.icon className='size-6' />
                    <span className='text-xs'>{item.label}</span>
                  </>
                )}
              </Button>
            ))}
          </div>
        ) : (
          <div className='space-y-2'>
            <div className='flex items-center justify-between  '>
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant='ghost'
                  className={`flex flex-col items-center gap-1 h-auto py-2 text-xs hover:bg-secondary/60 hover:text-neutral-white ${pathname.startsWith(item?.href)?"text-primary":""}`}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className='size-6' />
                    {item.label}
                  </Link>
                </Button>
              ))}

              <Button
                variant='ghost'
                size='icon'
                onClick={() => setShowMore(false)}
                className='flex flex-col items-center gap-1 h-auto py-2 text-xs hover:bg-secondary/60 hover:text-neutral-white'
              >
                <X className='size-6' />
                Hide
              </Button>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}
