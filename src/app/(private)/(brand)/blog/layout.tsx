import React from 'react'
import {Footer} from "@/components/shared"
const BlogLayout = ({
    children,
  }: {
    children: React.ReactNode
  }) =>{
    return <>{children}
    <Footer/>
    </>
  }


export default BlogLayout
