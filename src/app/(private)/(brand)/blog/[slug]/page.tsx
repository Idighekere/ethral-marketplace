import { BlogDetails } from '@/components/blog'
import React from 'react'

const BlogDetailsPage = async({ params }: { params: { slug: string } })=> {
    // const post = await getBlogPost(params.slug)

    const {slug}=await params
    console.log(slug)

    return <BlogDetails
    post={{
      title: "The Impact of Technology on the Workplace",
      excerpt: "Technology is revolutionizing...",
      thumbnail: "/blog-thumbnail.png",
      author: { name: "John Doe", avatar: "/mike-warren.png" },
      category: "Technology",
      publishedAt: "2024-01-15",
      readingTime: 8,
      content: [] // Will use dummy content
    }}
  />
}
export default BlogDetailsPage
