'use client'

import Image from 'next/image'
import Link from 'next/link'

const DISCOVER_LINKS = [
  {
    text: 'Find Influencers',
    link: '/find-influencers'
  },
  {
    text: 'Top Influencers',
    link: '/top-influencers'
  },
  {
    text: 'Search Influencers',
    link: '/search-influencers'
  }
]

const SUPPORT_LINKS = [
  {
    text: 'How it Works',
    link: '/how-it-works'
  },
  {
    text: 'Frequently Asked Questions',
    link: '/faq'
  },
  {
    text: 'Pricing',
    link: '/pricing'
  }
]

const RESOURCES_LINK = [
  {
    text: 'Become an Affiliate',
    link: '/become-an-affiliate'
  },
  {
    text: 'Terms of Service',
    link: '/terms-of-service'
  },
  {
    text: 'Privacy Policy',
    link: '/privacy-policy'
  }
]

const CONTACT_LINKS = [
  // {
  //     text:"contact@ethral.com",
  //     link:"mailto:contact@ethral.com",
  //     icon:""
  // },
  {
    text: 'LinkedIn',
    link: '/top-influencers',
    icon: '/linkedin.svg'
  },
  {
    text: 'X/Twitter',
    link: '/search-influencers',
    icon: '/twitter.svg'
  }
]
const Footer = () => {
  return (
    <footer className='text-white  px-5 md:px-10 lg:px-16 flex flex-col md:flex-row space-y-3 md:gap-10 '>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 border-t border-neutral-white/20 py-10'>
        <div className='flex flex-col '>
          <Link href='/' className='relative w-32 h-8'>
            <Image
              src='/ethral.svg'
              alt='Ethral Logo'
              fill
              className='object-contain'
            />
          </Link>

          <p>© Ethral - All rights reserved.</p>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-2 text-primary'>Discover</h3>
          <ul>
            {DISCOVER_LINKS.map(link => (
              <li key={link.text}>
                <a href={link.link} className='text-gray-400 hover:text-white'>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-2 text-primary'>Support</h3>
          <ul>
            {SUPPORT_LINKS.map(link => (
              <li key={link.text}>
                <a href={link.link} className='text-gray-400 hover:text-white'>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-2 text-primary'>Resources</h3>
          <ul>
            {RESOURCES_LINK.map(link => (
              <li key={link.text}>
                <a href={link.link} className='text-gray-400 hover:text-white'>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-2 text-primary'>Contact</h3>
          <ul>
            {CONTACT_LINKS.map(link => (
              <li key={link.text}>
                <Link
                  href={link.link}
                  className='text-gray-400 hover:text-white relative w-6 h-6'
                >
                  <Image
                    src={link.icon}
                    alt={link.text}
                    fill
                    className='object-contain'
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
