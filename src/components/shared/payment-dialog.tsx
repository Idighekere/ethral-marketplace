'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/utils'
import { useState } from 'react'

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  planName: string
  planImage: string
  price: number
  onConnectWallet: (walletAddress: string, amount: string) => void
}

export function PaymentDialog ({
  open,
  onOpenChange,
  planName,
  planImage,
  price,
  onConnectWallet
}: PaymentDialogProps) {
  const [walletAddress, setWalletAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleConnectWallet = async () => {
    if (!walletAddress || !amount) return

    try {
      setIsLoading(true)
      await onConnectWallet(walletAddress, amount)
      // Reset form after successful connection
      setWalletAddress('')
      setAmount('')
      onOpenChange(false)
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='text-neutral-white bg-[#2F353E]'>
        <DialogHeader>
          <DialogTitle className='font-medium'>
            Upgrade to {planName}
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Plan Info */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Avatar className='h-16 w-16 rounded-sm'>
                <AvatarImage src={planImage} alt={planName} />
                <AvatarFallback className='rounded-sm'>
                  {planName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className='font-medium'>{planName}</h3>
                <p className='text-lg text-white'>{formatPrice(price)}</p>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className='space-y-3'>
            <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>{formatPrice(price)}</p>
            </div>
            <Separator className='bg-[#939191]' />
            <div className='flex justify-between font-medium'>
              <p>Monthly Total</p>
              <p>{formatPrice(price)}</p>
            </div>
          </div>

          {/* Payment Details */}
          <div className='grid grid-cols-6 gap-4'>
            <Input
              placeholder='Wallet Address'
              className='col-span-4'
              value={walletAddress}
              onChange={e => setWalletAddress(e.target.value)}
              required
            />
            <Input
              type='number'
              placeholder='Amount'
              className='col-span-2'
              value={amount}
              onChange={e => setAmount(e.target.value)}
              min={price}
              required
            />
          </div>

          <Button
            className='w-full'
            variant='default'
            onClick={handleConnectWallet}
            disabled={!walletAddress || !amount || isLoading}
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
