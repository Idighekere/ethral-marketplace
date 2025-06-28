'use client'

import { useState, useEffect } from 'react'

export const useChatNavigation = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setShowSidebar(window.innerWidth >= 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const toggleSidebar = () => setShowSidebar(!showSidebar)
  const closeSidebar = () => setShowSidebar(false)

  return {
    isMobile,
    showSidebar,
    toggleSidebar,
    closeSidebar
  }
}
