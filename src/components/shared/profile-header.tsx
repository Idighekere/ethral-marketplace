'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { InfluencerActions } from './influencer-actions'
import { BRAND_DROPDOWN_MENU } from '@/constants'
import { Cart } from './cart'
import { BrandDropDown } from '../brand'
const guestNavigationLinks = [
  {
    label: 'How it works',
    href: '/how-it-works'
  },
  {
    label: 'Pricing',
    href: '/pricing'
  },
  {
    label: 'Blog',
    href: '/blog'
  }
]

const brandNavigationLinks = [
  {
    label: 'Stars',
    href: '/stars'
  },
  {
    label: 'Campaigns',
    href: '/campaigns'
  },
  {
    label: 'Track',
    href: '/track'
  },
  {
    label: 'Blog',
    href: '/blog'
  }
]

interface ProfileHeaderProps {
  isAuthenticated?: boolean
  username?: string
  profileType: 'brand' | 'influencer'
}

export const ProfileHeader = ({
  isAuthenticated = false,
  username = ''
}: ProfileHeaderProps) => {
  const pathname = usePathname()
  const navigationLinks = isAuthenticated
    ? brandNavigationLinks
    : guestNavigationLinks

  // Desktop header for authenticated users
  const DesktopAuthHeader = () => (
    <div className='hidden md:flex items-center gap-4'>
      <Button variant='secondary' asChild className='rounded-full'>
        <Link href='/campaigns/new'>Post a campaign</Link>
      </Button>
      <Cart />
      <BrandDropDown menuList={BRAND_DROPDOWN_MENU} />
    </div>
  )

  // Desktop header for guests
  const DesktopGuestHeader = () => (
    <div className='hidden md:flex items-center gap-2'>
      <Button
        variant='link'
        asChild
        className='text-white hover:text-primary px-3'
      >
        <Link href='/join/creator'>Join as Creator</Link>
      </Button>
      <Button
        variant='link'
        asChild
        className='text-white hover:text-primary px-3'
      >
        <Link href='/join/brand'>Join as Brand</Link>
      </Button>
      <Button asChild>
        <Link href='/login'>Login</Link>
      </Button>
    </div>
  )

  return (
    <header className='sticky top-0 left-0 right-0 z-50 bg-background border-b border-white/10 text-white'>
      <nav className='mx-auto px-5 h-20 flex items-center justify-between sm:px-10 lg:px-16'>
        {/* Logo */}
        <Link href='/' className='relative w-32 h-8'>
          <Image
            src='/ethral.svg'
            alt='Ethral Logo'
            fill
            className='object-contain'
          />
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-8'>
          {navigationLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                pathname === link.href
                  ? 'text-primary hover:text-primary/80'
                  : 'text-neutral-white hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        {isAuthenticated ? <DesktopAuthHeader /> : <DesktopGuestHeader />}

        {/* Mobile Actions */}
        <InfluencerActions
          influencerId={username}
          isAuthenticated={isAuthenticated}
          variant='header'
          className='md:hidden'
        />
      </nav>
    </header>
  )
}
