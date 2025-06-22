"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from "next/navigation"
import { Button } from '../ui/button'
import { IBrandDropDown } from '@/constants'

export const BrandDropDown = ({ menuList }: { menuList: IBrandDropDown[] }) => {
  const pathname=usePathname()
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='hover:bg-transparent hidden sm:inline' size='icon'>
            <Image src='/tabler_menu-3.svg' alt='Menu' width={24} height={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-30 border-0 p-2'>
          {menuList.map(item => (
            <DropdownMenuItem key={item.id} asChild className={`focus:bg-gray-600/60 focus:text-neutral-white ${pathname.startsWith(item?.link) ? 'text-primary' : ''}`}>
              <Link href={item.link}>{item.name}</Link>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator className='opacity-30' />
          <DropdownMenuItem className = 'focus:bg-gray-600/60 focus:text-neutral-white'
>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
