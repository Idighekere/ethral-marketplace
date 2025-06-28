import { BlogCard } from '@/components/blog'
import { SAMPLE_BLOG } from '@/constants'
import Image from "next/image"
import Link from "next/link"
// import {cn} from "@/lib/utils"
const BlogPage = () => {
  return (
    <>
      <main className='flex flex-col items-center justify-center    mx-auto max-w-4xl md:py-15'>
        <div className='space-y-5 '>
          <h2 className='text-white text-2xl   md:text-[2.5rem]  text-center font-medium my-10 '>
            Find and hire<span className='text-primary'> web3 KOLs</span> to
            create or post
            <br />
            Unique content for your brand
          </h2>
        </div>
      </main>

      <div className='w-full group' >
        <div className='relative w-full h-64 md:h-96 aspect-auto overflow-hidden rounded-lg my-8'>
          <Image
            src={'/blog-thumbnail.png'}
            alt={'post.title'}
            fill
            className='object-cover opacity-30'
          />

          <div className='absolute bottom-3 left-2 space-y-2 px-2'>
            <span className='inline-block bg-primary/90 text-[#1D232C] px-4 py-1 rounded-sm text-sm font-medium '>
              Technology
            </span>
            <Link href="/blog/blog-1" className="group-hover:underline transition-colors ">
            <h3 className='text-xl md:text-2xl font-medium text-white group-hover:text-primary/90'>
              The Impact of Technology on the Workplace: How Technology is
              Changing
            </h3>
            </Link>
            <p className='text-white font-normal'>August 20, 2022</p>
          </div>
        </div>
      </div>

      <section className={'space-y-6 '}>
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
            {/* {blogs.map(blog => (
        <BlogCard key={blog.id} {...blog} variant='column' />
      ))} */}
            {Array.from({ length: 12 }, (_, index) => (
              <BlogCard {...SAMPLE_BLOG[0]} variant='column' key={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogPage
