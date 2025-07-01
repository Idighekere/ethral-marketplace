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

  // Regular expression to match paths like /campaigns/new or /campaigns/:id/launch
  const shouldHide = (path: string) => {
    const campaignRegex = /^\/campaigns\/(new|[^/]+\/launch)$/
    return campaignRegex.test(path)
  }

  const isHidden = shouldHide(pathname)

  return (
    <>
      <header className='sticky top-0 left-0 right-0 z-50 bg-background  text-white'>
        <nav className='  px-5 h-20 /flex items-center justify-between sm:px-10 lg:px-20 xl:px-36 w-full grid grid-cols-3'>
          {/* Logo */}
          <Link href='/' className='relative w-32 h-8 flex justify-center'>
            <Image
              src='/ethral.svg'
              alt='Ethral Logo'
              fill
              className='object-contain'
            />
          </Link>

          {/* Desktop Navigation */}
          <div
            className={` items-center  gap-8 ${
              isHidden ? 'hidden' : 'hidden md:flex md:justify-center'
            }`}
          >
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
          <div className='flex items-center gap-4 justify-end '>
            <Button
              variant='secondary'
              asChild
              className={`rounded-full ${
                isHidden ? 'hidden' : 'hidden md:flex'
              }  `}
            >
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
