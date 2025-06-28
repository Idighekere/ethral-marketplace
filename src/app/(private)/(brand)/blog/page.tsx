import { Footer } from '@/components/shared'
import { BlogCard } from '@/components/blog'
import { BrandHeader } from '@/components/brand'
import { SAMPLE_BLOG } from '@/constants'
// import {cn} from "@/lib/utils"
const BlogPage = () => {
  return (
    <>
      <BrandHeader />

      <main className='flex flex-col items-center justify-center    p-5 py-8  mx-auto max-w-4xl md:py-15'>
        <div className='space-y-5 '>
          <h2 className='text-white text-2xl   md:text-[2.5rem]  text-center font-medium my-10 '>
            Find and hire<span className='text-primary'> web3 KOLs</span> to
            create or post
            <br />
            Unique content for your brand
          </h2>
        </div>
      </main>

      <section className={'space-y-6 px-5 sm:px-10 lg:px-20 xl:px-36'}>
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
            {Array.from({ length: 20 }, (_, index) => (
              <BlogCard {...SAMPLE_BLOG[0]} variant='column' key={index} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default BlogPage
