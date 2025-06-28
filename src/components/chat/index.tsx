'use client'
import { useParams } from 'next/navigation'

import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import type { Conversation, MessageRequest } from '@/store/useChatStore'
import {
  formatDate,
  formatDateTime,
  formatDistanceToNow
} from '@/utils/date-utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useChatStore } from '@/store/useChatStore'
import { Message } from '../icons'
import {ChevronDown} from "lucide-react"
// Export sidebar components
export { ChatSidebar, ChatMobileHeader } from './ChatSidebar'

interface MessageRequestItemProps {
  request: MessageRequest
}

export const MessageRequestItem = ({ request }: MessageRequestItemProps) => {
  return (
    <Link href={`/messages/requests/${request.id}`} className='block'>
     
    </Link>
  )
}

interface ConversationItemProps {
  conversation: Conversation
}

export const ConversationItem = ({ conversation }: ConversationItemProps) => {
  return (
    <Link href={`/messages/${conversation.id}`} className='block'>
      <div className='  rounded-lg py-2 px-1 hover:bg-secondary/20 transition-colors'>
        <div className='flex items-center gap-3'>
          <div className=''>
            <Avatar className='w-12 h-12   '>
              <AvatarImage
                src={conversation.participantAvatar}
                alt={conversation.participantName}
              />
              <AvatarFallback>
                {conversation.participantName.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            {conversation.unreadCount > 0 && (
              <span className='w-2 h-2 rounded-full bg-primary'></span>
            )}
          </div>

          <div className='flex-1 min-w-0'>
            <div className='flex items-center justify-between mb-1'>
              <h3
                className={`font-normal truncate ${
                  conversation.unreadCount > 0 ? 'text-white' : 'text-[#cdcdcd]'
                }`}
              >
                {conversation.participantName}
              </h3>
              <span className='text-xs text-[#979797] self-center'>
                {conversation.lastMessage &&
                  formatDistanceToNow(conversation.lastMessage.timestamp)}
              </span>
            </div>

            {conversation.lastMessage && (
              <p
                className={`text-sm font-light truncate ${
                  conversation.unreadCount > 0 ? 'text-white' : 'text-[#979797]'
                }`}
              >
                {conversation.lastMessage.senderId === 'current-user'
                  ? 'You: '
                  : ''}
                {conversation.lastMessage.content}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
}

export const EmptyState = ({
  icon = (
    <MessageCircle className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
  ),
  title,
  description
}: EmptyStateProps) => {
  return (
    <div className='text-center py-12'>
      {icon}
      <h3 className='text-lg font-medium text-muted-foreground mb-2'>
        {title}
      </h3>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
  )
}

interface MessageBubbleProps {
  content: string
  timestamp: Date
  isCurrentUser: boolean
  senderName?: string
}

export const MessageBubble = ({
  content,
  timestamp,
  isCurrentUser
}: // senderName
MessageBubbleProps) => {
  const formatMessageTime = (timestamp: Date) => {
    return formatDateTime(timestamp)
  }

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] ${isCurrentUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-sm px-4 py-2 relative ${
            isCurrentUser
              ? 'bg-primary text-black rounded-tr-none'
              : 'bg-secondary text-white rounded-bl-none'
          }`}
        >
          <p className='text-sm leading-relaxed '>{content}</p>
          <p
            className={`text-xs text-right /absolute bottom-1 right-1 mt-1 ${
              isCurrentUser ? ' text-black' : ' text-white'
            }`}
          >
            {formatMessageTime(timestamp)}
          </p>
        </div>
      </div>
    </div>
  )
}

interface DateSeparatorProps {
  date: Date
}

export const DateSeparator = ({ date }: DateSeparatorProps) => {
  return (
    <div className='text-center mb-4'>
      <span className='bg-secondary/30 text-xs text-muted-foreground px-3 py-1 rounded-full'>
        {formatDate(date)}
      </span>
    </div>
  )
}

interface ChatListProp {
handleConversationClick?: (conversationId: string) => void
}
export const ChatList = ({
  handleConversationClick
}: ChatListProp) => {
  const { conversations, messageRequests } = useChatStore()
  const params = useParams()

  const activeConversationId = params.conversationId as string

  const pendingRequests = messageRequests.filter(
    req => req.status === 'pending'
  )

  return (
    <div className='flex flex-col h-full'>
      {/* Header */}
      <div className='p-4 border-b-[0.2px] border-[#CDCDCD]'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-normal text-[#E9E9E9]'>Messages</h1>
          <button><ChevronDown className="size-5 text-white"/>
            </button>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto p-4'>
        {/* Message Requests Section */}
        {pendingRequests.length > 0 && (
          <div className='mb-6'>
            <div className='flex items-center justify-between mb-4'>
              <div className='space-x-2 flex '>
                <div className='bg-secondary rounded-full w-12 h-12 flex items-center justify-center'>
                  <Message className='size-6 text-primary' />
                </div>
                <div className=' text-xs font-normal px-2 py-1'>
                  <h2 className='text-sm  flex items-center gap-2 text-[#E9E9E9]'>
                    Message requests
                  </h2>
                  <p className='text-[#979797]'>
                    {pendingRequests.length} pending request
                  </p>
                </div>
              </div>

              <span className='w-2 h-2 rounded-full bg-primary'></span>
            </div>
          </div>
        )}

        {/* Conversations List */}
        <div>
          {conversations.length === 0 ? (
            <EmptyState
              title='No conversations'
              description='Your conversations will appear here.'
            />
          ) : (
            <div className='space-y-3'>
              {conversations.map(conversation => (
                <div
                  key={conversation.id}
                  className={`rounded-lg transition-colors ${
                    activeConversationId === conversation.id
                      ? 'bg-secondary/10'
                      : ''
                  }`}
                  onClick={() => handleConversationClick!(conversation.id)}
                >
                  <ConversationItem conversation={conversation} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
