'use client'

import { Button } from '@/components/ui/button'
import { useChatStore } from '@/store/useChatStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const MessageRequestPage = () => {
  const params = useParams()
  const router = useRouter()
  const requestId = params.requestId as string

  const {
    messageRequests,
    respondToMessageRequest,
    createConversationFromRequest
  } = useChatStore()

  const [isProcessing, setIsProcessing] = useState(false)

  const request = messageRequests.find(req => req.id === requestId)

  if (!request) {
    return (
      <div className='min-h-screen bg-background text-white flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Request not found</h1>
          <Link href='/messages'>
            <Button variant='outline'>Back to Messages</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleResponse = async (response: 'accepted' | 'declined') => {
    setIsProcessing(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      respondToMessageRequest(requestId, response)

      if (response === 'accepted') {
        // Call the function and navigate to messages
        createConversationFromRequest(requestId)
        router.push('/messages')
        return
      }

      router.push('/messages')
    } catch (error) {
      console.error('Error responding to request:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className='min-h-screen text-white'>
      <div className='mx-auto max-w-2xl px-4 py-8'>
        {/* Request Status */}
        {request.status !== 'pending' && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              request.status === 'accepted'
                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}
          >
            <p className='font-medium'>You {request.status} this request</p>
          </div>
        )}

        {/* Order Information */}
        <div className=' rounded-lg p-6 mb-6'>
          <div className='text-center mb-6 flex justify-center items-center flex-col gap-2'>
            <Avatar className='w-30 h-30   '>
              <AvatarImage src={request.from.avatar} alt={request.from.name} />
              <AvatarFallback>
                {request.from.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <h2 className='text-xl sm:text-2xl text-[#E9E9E9] '>
              {request.from.name}
            </h2>
            <p className=' text-[#979797]'>
              {request.from.company && `${request.from.company} `}
              has Ordered {request?.packageDetails?.title}
            </p>
          </div>

          {/* Message */}
          <div className='bg-secondary text-[#979797] rounded-lg p-4'>
            <p className=' '>{request.message}</p>
            <p className='text-xs  mt-2'>2m ago</p>
          </div>
        </div>

        {/* Action Buttons */}
        {request.status === 'pending' && (
          <div className='space-y-3'>
            <Button
              onClick={() => handleResponse('accepted')}
              disabled={isProcessing}
              className='w-full h-12 text-base bg-primary hover:bg-primary/90 text-black font-medium rounded-full'
            >
              {isProcessing ? 'Processing...' : 'Accept'}
            </Button>

            <Button
              onClick={() => handleResponse('declined')}
              disabled={isProcessing}
              variant='outline'
              className='w-full h-12 text-base border-primary hover:bg-primary/20 rounded-full text-primary'
            >
              {isProcessing ? 'Processing...' : 'Decline'}
            </Button>
          </div>
        )}

        {/* Privacy Notice */}
        <div className='mt-6 p-4 '>
          <p className=' text-[#CDCDCD] text-center'>
            Do you want to participate in this group? They won&apos;t know
            you&aposve seen their request until you accept.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MessageRequestPage
