'use client'

import { Button } from '@/components/ui/button'

import { useChatNavigation } from '@/hooks/useChatNavigation'
import { Menu } from 'lucide-react'
import { ChatList } from '.'

interface ChatSidebarProps {
  onConversationSelect?: (conversationId: string) => void
}

export const ChatSidebar = ({ onConversationSelect }: ChatSidebarProps) => {
  const { isMobile, showSidebar, toggleSidebar } = useChatNavigation()

  const handleConversationClick = (conversationId: string) => {
    onConversationSelect?.(conversationId)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && showSidebar && (
        <div
          className='fixed inset-0 bg-black/50 z-40 md:hidden'
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed md:relative inset-y-0 left-0 z-50 w-80
        bg-background border-r border-border/20
        transform transition-transform duration-300 ease-in-out
        ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isMobile ? 'md:relative md:translate-x-0' : ''}
      `}
      >
        <ChatList handleConversationClick={handleConversationClick} />
      </div>
    </>
  )
}

export const ChatMobileHeader = () => {
  const { toggleSidebar } = useChatNavigation()

  return (
    <div className='md:hidden bg-card/30 border-b border-border/20 px-4 py-3'>
      <div className='flex items-center gap-3'>
        <Button
          variant='ghost'
          size='icon'
          onClick={toggleSidebar}
          className='text-white hover:bg-secondary/20'
        >
          <Menu className='h-5 w-5' />
        </Button>
        <h1 className='text-lg font-semibold text-white'>Messages</h1>
      </div>
    </div>
  )
}
