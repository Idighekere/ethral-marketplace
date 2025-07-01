'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'

const navigationLinks = [
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

const GuestHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const pathname = usePathname()
  return (
    <header className='sticky top-0 left-0 right-0 z-50 bg-background '>
      <nav className=' px-5 h-20 /flex items-center justify-between md:px-10 lg:px-20 xl:px-36 grid grid-cols-3 '>
        {/* Logo */}
        <Link href='/' className='relative w-32 h-8 flex items-center'>
          <Image
            src='/ethral.svg'
            alt='Ethral Logo'
            fill
            className='object-contain'
          />
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-8 justify-center mx-auto'>
          {navigationLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className='text-white hover:text-primary transition-colors'
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Buttons */}
        <div className='hidden md:flex items-center gap-3 md:justify-end whitespace-nowrap'>
          <Link
            href='/join/creator'
            className={`${
              pathname == '/join/brand' ? 'text-primary' : 'text-white'
            } hover:text-primary  text-normal`}
          >
            Join as Creator
          </Link>

          <Link
            href='/join/brand'
            className={`${
              pathname == '/join/brand' ? 'text-primary' : 'text-white'
            } hover:text-primary  text-normal`}
          >
            Join as Brand
          </Link>

          <Button asChild className=''>
            <Link href='/login'>Login</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden p-2'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label='Toggle menu'
        >
          <div className='w-6 h-5 relative flex flex-col justify-between'>
            <span
              className={`w-full h-0.5 bg-white transition-transform ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-opacity ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-transform ${
                isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-background transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
        style={{ top: '80px' }}
      >
        <div className='container mx-auto px-4 py-8 flex flex-col gap-6'>
          {/* Mobile Navigation Links */}
          <div className='flex flex-col gap-6'>
            {navigationLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className='text-white hover:text-primary transition-colors text-lg'
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile CTA Buttons */}
          <div className='flex flex-col gap-4 mt-4'>
            <Button
              variant='link'
              className={`w-full justify-center hover:text-primary text-lg ${
                pathname == '/join/creator' ? 'text-primary' : 'text-white'
              }`}
              asChild
            >
              <Link href='/join/creator'>Join as Creator</Link>
            </Button>
            <Button
              variant='link'
              className={`w-full justify-center  hover:text-primary text-lg ${
                pathname == '/join/brand' ? 'text-primary' : 'text-white'
              }`}
              asChild
            >
              <Link href='/join/brand'>Join as Brand</Link>
            </Button>
            <Button
              className='w-full justify-center font-[500] text-lg '
              asChild
            >
              <Link href='/join/creator'>Join as Creator</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default GuestHeader
