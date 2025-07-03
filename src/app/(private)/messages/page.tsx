'use client'

import { useChatNavigation } from '@/hooks/useChatNavigation'
import { ChatList, ChatSidebar } from '@/components/chat/index'
import { Message } from '@/components/icons'

const MessagesPage = () => {
  const { isMobile } = useChatNavigation()
  if (isMobile) {
    return <ChatList />
  }
  return (
    <div className='h-screen bg-background flex'>
      <ChatSidebar />

      {/* Main content area for desktop */}
      <div className='hidden md:flex flex-1 items-center justify-center w-full'>
        <div className='text-center'>
          <div className='bg-secondary rounded-full w-12 h-12 flex items-center justify-center'>
            <Message className='size-6 text-primary' />
          </div>
          <h3 className='text-lg font-medium text-white mb-2'>
            Select a conversation
          </h3>
          <p className='text-sm text-muted-foreground'>
            Choose a conversation from the sidebar to start messaging.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MessagesPage
