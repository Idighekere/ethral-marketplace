'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useChatStore } from '@/store/useChatStore'
import { groupMessagesByDate } from '@/utils/date-utils'
import { ArrowLeft, MoreVertical } from 'lucide-react'
import { Send, Paperclip, ImageFolder, LinkIcon } from '@/components/icons'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect, useRef, useMemo } from 'react'
import { MessageBubble, DateSeparator, EmptyState } from '@/components/chat'
import { ChatSidebar } from '@/components/chat/ChatSidebar'
import { useChatNavigation } from '@/hooks/useChatNavigation'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const ChatPage = () => {
  const params = useParams()
  const conversationId = params.conversationId as string
  const { isMobile } = useChatNavigation()

  const {
    conversations,
    messages,
    addMessage,
    markMessagesAsRead,
    setActiveConversation
  } = useChatStore()

  const [messageText, setMessageText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const conversation = conversations.find(conv => conv.id === conversationId)
  const conversationMessages = useMemo(() => messages[conversationId] || [], [messages, conversationId])

  useEffect(() => {
    if (conversationId) {
      setActiveConversation(conversationId)
      markMessagesAsRead(conversationId)
    }

    return () => setActiveConversation(null)
  }, [conversationId, setActiveConversation, markMessagesAsRead])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversationMessages])

  if (!conversation) {
    return (
      <div className='min-h-screen bg-background text-white flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Conversation not found</h1>
          <Link href='/messages'>
            <Button variant='outline'>Back to Messages</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSendMessage = async () => {
    if (!messageText.trim() || isSending) return

    setIsSending(true)
    const text = messageText.trim()
    setMessageText('')

    try {
      addMessage(conversationId, {
        senderId: 'current-user',
        receiverId: conversation.participantId,
        content: text,
        read: false,
        type: 'text'
      })

      // Simulate response (in real app, this would come from websocket/API)
      setTimeout(() => {
        addMessage(conversationId, {
          senderId: conversation.participantId,
          receiverId: 'current-user',
          content: `Thanks for your message: "${text}"`,
          read: false,
          type: 'text'
        })
      }, 2000)
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // const formatMessageTime = (timestamp: Date) => {
  //   return formatTime(timestamp)
  // }

  const messageGroups = groupMessagesByDate(conversationMessages)

  return (
    <div className='h-screen bg-background flex'>
      {/* Sidebar - only show on desktop or when mobile sidebar is open */}
      {!isMobile && <ChatSidebar />}

      {/* Chat content */}
      <div className='flex-1 flex flex-col'>
        {/* Chat header */}
        <div className='border-b-[0.2px] border-[#CDCDCD] px-4 py-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Link href='/messages'>
                <button className='text-white md:hidden'>
                  <ArrowLeft className='h-5 w-5' />
                </button>
              </Link>

              <div className='flex items-center gap-3'>
                <Avatar className='w-12 h-12   '>
                  <AvatarImage
                    src={conversation.participantAvatar}
                    alt={conversation.participantName}
                  />
                  <AvatarFallback>
                    {conversation.participantName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className='font-semibold text-white'>
                    {conversation.participantName}
                  </h1>
                  {/* <p className='text-xs text-muted-foreground'>
                    {conversation.participantType === 'brand' ? 'Brand' : 'Creator'}
                  </p> */}
                </div>
              </div>
            </div>

            <Button
              variant='ghost'
              size='icon'
              className='text-white hover:bg-secondary/20'
            >
              <MoreVertical className='h-5 w-5' />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className='flex-1 overflow-y-auto px-4 py-6'>
          {Object.entries(messageGroups).map(([date, messages]) => (
            <div key={date} className='mb-6'>
              <DateSeparator date={new Date(date)} />

              <div className='space-y-4'>
                {messages.map(message => (
                  <MessageBubble
                    key={message.id}
                    content={message.content}
                    timestamp={message.timestamp}
                    isCurrentUser={message.senderId === 'current-user'}
                  />
                ))}
              </div>
            </div>
          ))}

          {conversationMessages.length === 0 && (
            <EmptyState
              icon={
                <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <span className='text-xl font-bold text-white'>
                    {conversation.participantName.charAt(0)}
                  </span>
                </div>
              }
              title={`Start your conversation with ${conversation.participantName}`}
              description='Send a message to get the conversation started.'
            />
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className='bg-secondary rounded-md p-4'>
          <div className='flex items-end gap-3'>
            <div className='flex gap-2 items-center self-center'>
              <button className=''>
                <ImageFolder className='h-5 w-5' />
              </button>
              <button className=''>
                <Paperclip className='h-5 w-5' />
              </button>
              <button className=''>
                <LinkIcon className='h-5 w-5' />
              </button>
            </div>

            <div className='flex-1 relative'>
              <Input
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Send a message'
                className='border-0  text-white placeholder:text-[#A3A3A8] pr-12 rounded-lg bg-secondary'
                disabled={isSending}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageText.trim() || isSending}
                size='icon'
                variant='ghost'
                className='absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-primary '
              >
                <Send className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
