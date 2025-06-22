'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface CampaignDialogProps {
  isOpen: boolean
  onClose: () => void
}

export const CampaignDialog = ({ isOpen, onClose }: CampaignDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Post a Campaign</DialogTitle>
        </DialogHeader>
        <div className='grid gap-6 py-4'>
          <div className='relative w-full h-48'>
            <Image
              src='/campaigns-section-image.png'
              alt='Campaign'
              fill
              className='object-cover rounded-lg'
            />
          </div>
          <div className='space-y-4'>
            <p className='text-neutral-white/80'>
              Create a campaign to collaborate with this influencer and reach
              their engaged audience. Set your goals, budget, and requirements
              to find the perfect match for your brand.
            </p>
            <Button className='w-full font-semibold' asChild>
              <Link href='/campaigns/new'>Post Campaign</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
