'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: Date
  read: boolean
  type: 'text' | 'image' | 'file'
}

export interface MessageRequest {
  id: string
  from: {
    id: string
    name: string
    avatar: string
    company?: string
    type: 'brand' | 'creator'
  }
  to: {
    id: string
    name: string
    avatar: string
    type: 'brand' | 'creator'
  }
  message: string
  packageDetails?: {
    title: string
    price: number
    description: string
  }
  timestamp: Date
  status: 'pending' | 'accepted' | 'declined'
}

export interface Conversation {
  id: string
  participantId: string
  participantName: string
  participantAvatar: string
  participantType: 'brand' | 'creator'
  lastMessage?: Message
  unreadCount: number
  updatedAt: Date
}

interface ChatState {
  conversations: Conversation[]
  messageRequests: MessageRequest[]
  messages: { [conversationId: string]: Message[] }
  activeConversation: string | null

  // Actions
  setActiveConversation: (conversationId: string | null) => void
  addMessage: (conversationId: string, message: Omit<Message, 'id' | 'timestamp'>) => void
  markMessagesAsRead: (conversationId: string) => void
  addMessageRequest: (request: Omit<MessageRequest, 'id' | 'timestamp'>) => void
  respondToMessageRequest: (requestId: string, response: 'accepted' | 'declined') => void
  createConversationFromRequest: (requestId: string) => void
  updateConversation: (conversationId: string, updates: Partial<Conversation>) => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [
        {
          id: 'conv-1',
          participantId: 'ope-1',
          participantName: 'Ope Odunlami',
          participantAvatar: '/creator-1.png',
          participantType: 'creator',
          lastMessage: {
            id: 'msg-1',
            senderId: 'ope-1',
            receiverId: 'current-user',
            content: 'Hello Mfoniso',
            timestamp: new Date('2024-05-16T10:30:00'),
            read: false,
            type: 'text'
          },
          unreadCount: 1,
          updatedAt: new Date('2024-05-16T10:30:00')
        },
        {
          id: 'conv-2',
          participantId: 'sonic-nigeria',
          participantName: 'Sonic Nigeria',
          participantAvatar: '/creator-2.png',
          participantType: 'brand',
          lastMessage: {
            id: 'msg-2',
            senderId: 'current-user',
            receiverId: 'sonic-nigeria',
            content: "I'm available for the work",
            timestamp: new Date('2024-08-20T11:31:00'),
            read: true,
            type: 'text'
          },
          unreadCount: 0,
          updatedAt: new Date('2024-08-20T11:31:00')
        }
      ],
      messageRequests: [
        {
          id: 'req-1',
          from: {
            id: 'sonic-nigeria',
            name: 'Sonic Nigeria',
            avatar: '/creator-2.png',
            company: 'Sonic Nigeria',
            type: 'brand'
          },
          to: {
            id: 'current-user',
            name: 'Current User',
            avatar: '/creator-1.png',
            type: 'creator'
          },
          message: "Hi! I'd love to collaborate on your next project...",
          packageDetails: {
            title: 'Package of 1 post a day',
            price: 500,
            description: 'Daily social media posts for brand promotion'
          },
          timestamp: new Date('2024-08-20T09:00:00'),
          status: 'pending'
        }
      ],
      messages: {
        'conv-2': [
          {
            id: 'msg-3',
            senderId: 'sonic-nigeria',
            receiverId: 'current-user',
            content: 'Hello, Sonic Nigeria here. we are interested in working with you.',
            timestamp: new Date('2024-08-20T11:35:00'),
            read: true,
            type: 'text'
          },
          {
            id: 'msg-4',
            senderId: 'current-user',
            receiverId: 'sonic-nigeria',
            content: 'Hello Sonic 👋',
            timestamp: new Date('2024-08-20T11:31:00'),
            read: true,
            type: 'text'
          },
          {
            id: 'msg-5',
            senderId: 'current-user',
            receiverId: 'sonic-nigeria',
            content: "I'm available for the work",
            timestamp: new Date('2024-08-20T11:31:00'),
            read: true,
            type: 'text'
          }
        ]
      },
      activeConversation: null,

      setActiveConversation: (conversationId) =>
        set({ activeConversation: conversationId }),

      addMessage: (conversationId, messageData) => {
        const message: Message = {
          ...messageData,
          id: `msg-${Date.now()}`,
          timestamp: new Date()
        }

        set((state) => ({
          messages: {
            ...state.messages,
            [conversationId]: [...(state.messages[conversationId] || []), message]
          },
          conversations: state.conversations.map(conv =>
            conv.id === conversationId
              ? {
                  ...conv,
                  lastMessage: message,
                  updatedAt: new Date(),
                  unreadCount: message.senderId !== 'current-user' ? conv.unreadCount + 1 : conv.unreadCount
                }
              : conv
          )
        }))
      },

      markMessagesAsRead: (conversationId) => {
        set((state) => ({
          messages: {
            ...state.messages,
            [conversationId]: state.messages[conversationId]?.map(msg =>
              msg.receiverId === 'current-user' ? { ...msg, read: true } : msg
            ) || []
          },
          conversations: state.conversations.map(conv =>
            conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
          )
        }))
      },

      addMessageRequest: (requestData) => {
        const request: MessageRequest = {
          ...requestData,
          id: `req-${Date.now()}`,
          timestamp: new Date()
        }

        set((state) => ({
          messageRequests: [request, ...state.messageRequests]
        }))
      },

      respondToMessageRequest: (requestId, response) => {
        set((state) => ({
          messageRequests: state.messageRequests.map(req =>
            req.id === requestId ? { ...req, status: response } : req
          )
        }))
      },

      createConversationFromRequest: (requestId) => {
        const { messageRequests } = get()
        const request = messageRequests.find(req => req.id === requestId)

        if (!request) return

        const newConversation: Conversation = {
          id: `conv-${Date.now()}`,
          participantId: request.from.id,
          participantName: request.from.name,
          participantAvatar: request.from.avatar,
          participantType: request.from.type,
          unreadCount: 0,
          updatedAt: new Date()
        }

        set((state) => ({
          conversations: [newConversation, ...state.conversations]
        }))

        return newConversation.id
      },

      updateConversation: (conversationId, updates) => {
        set((state) => ({
          conversations: state.conversations.map(conv =>
            conv.id === conversationId ? { ...conv, ...updates } : conv
          )
        }))
      }
    }),
    {
      name: 'ethral-chat-storage',
      partialize: (state) => ({
        conversations: state.conversations,
        messageRequests: state.messageRequests,
        messages: state.messages
      })
    }
  )
)
