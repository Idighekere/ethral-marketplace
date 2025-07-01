'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'

interface PremiumUpgradeDialogProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade?: () => void
}

const PremiumUpgradeDialog = ({
  isOpen,
  onClose,
  onUpgrade
}: PremiumUpgradeDialogProps) => {
  const handleUpgrade = () => {
    onUpgrade?.()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=' border-gray-700 text-white sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold text-center text-white'>
            Upgrade to Unlock Advanced Filters
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6 py-6 text-center'>
          <div className='w-20 h-20 mx-auto rounded-full bg-primary flex items-center justify-center'>
            <Lock className='w-10 h-10 text-black' />
          </div>
          <p className='text-white/90'>
            Upgrade to unlock filters including age, ethnicity, languages, and
            more.
          </p>
        </div>

        <div className='space-y-3'>
          <Button onClick={handleUpgrade} className='w-full font-semibold '>
            Unlock Premium
          </Button>
          <Button
            variant='ghost'
            onClick={onClose}
            className='w-full text-gray-400 hover:text-white hover:bg-gray-700'
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PremiumUpgradeDialog
