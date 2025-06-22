'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { Cart } from '../shared/cart'
import { BrandMobileMenu } from './brand-mobile-menu'
import { BrandDropDown } from './brand-dropdown-menu'
import { BRAND_DROPDOWN_MENU } from '@/constants'

const navigationLinks = [
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



const BrandHeader = () => {
  const pathname = usePathname()
  return (
    <>
      <header className='sticky top-0 left-0 right-0 z-50 bg-background border-b border-white/10 text-white'>
        <nav className='  px-5 h-20 flex items-center justify-between sm:px-10 lg:px-16 w-full'>
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
          <div className={` items-center gap-8 ${pathname.startsWith("/campaigns/new")?"hidden":"hidden md:flex"}`}>
            {navigationLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  pathname == link.href
                    ? 'text-primary hover:text-primary/80'
                    : 'text-neutral-white hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className='flex items-center gap-4 '>

            <Button variant='secondary' asChild className={`rounded-full ${pathname.startsWith("/campaigns/new")?"hidden":"hidden md:flex"}  `}>
              <Link href='/campaigns/new'>Post a campaign</Link>
            </Button>


            <Cart iconClassName='size-5 mr-auto' />

            <BrandDropDown menuList={BRAND_DROPDOWN_MENU} />



          </div>

          {/* Mobile Menu Button */}
            <BrandMobileMenu />

        </nav>
      </header>
    </>
  )
}

export default BrandHeader
