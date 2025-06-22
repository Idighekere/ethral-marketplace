'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SettingsPage () {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    // TODO: Implement logout functionality
    router.push('/login')
  }

  const handleDeleteAccount = async () => {
    // TODO: Implement account deletion
    setShowDeleteDialog(false)
    router.push('/login')
  }

  return (
    <div className='max-w-2xl space-y-4 py-6'>
      <h3 className='text-lg font-normal text-white'>Log Out</h3>
      <Button
        variant='default'
        className='w-full md:w-38 text-base rounded-full font-medium h-10 block'
        onClick={handleLogout}
      >
        Sign out
      </Button>

      <Button
        variant='ghost'
        className=' px-0 text-white block text-base hover:font-medium hover:bg-transparent hover:text-white'
        onClick={() => setShowDeleteDialog(true)}
      >
        Delete account
      </Button>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className=' text-white border-[#e9e9e9]/60'>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription className='text-[#e9e9e9]'>
              This action cannot be undone. This will permanently delete your
              account and remove all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='gap-2 '>
            <Button
              variant='ghost'
              onClick={() => setShowDeleteDialog(false)}
              className='text-[#e9e9e9] hover:bg-transparent h-10 hover:text-white'
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={handleDeleteAccount}
              className='bg-red-500 hover:bg-red-600 h-10'
            >
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
