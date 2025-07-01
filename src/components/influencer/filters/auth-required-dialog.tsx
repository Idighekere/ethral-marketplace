"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AuthRequiredDialogProps {
  isOpen: boolean
  onClose: () => void
  onLogin?: () => void
}

const AuthRequiredDialog = ({ isOpen, onClose }: AuthRequiredDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1D232C] border-gray-700 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center text-white">
            Sign Up to Continue
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4 text-center">
          <p className="text-white/80">
            Please sign up to access advanced search filters and find the perfect influencers for your campaigns.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/join/brand">
            <Button className="w-full ">

              Sign Up as Brand
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              className="w-full "
            >

              Login
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthRequiredDialog
