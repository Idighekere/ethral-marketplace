import { IBlog } from '@/constants'
import { cn } from '@/lib/utils'
import React from 'react'
import { BlogCard } from '../blog'

interface Props {
  blogs: IBlog[]
  className?: string
}
export const BlogSection = ({ blogs, className }: Props) => {
  return (
    <section
      className={cn('space-y-6 px-5 sm:px-10 lg:px-20 xl:px-36', className)}
    >
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-xl font-bold text-white'>Etheral Blog</h2>
          <p className='text-sm text-[#E9E9E9]  md:w-full truncate'>
            Check out our recent Blog Posts
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className='overflow-x-auto pb-4 -mx-4 px-4 scrollbar'>
        <div className='grid gap-6  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
          {blogs.map(blog => (
            <BlogCard key={blog.id} {...blog} variant="column"/>
          ))}
        </div>
      </div>
    </section>
  )
}
