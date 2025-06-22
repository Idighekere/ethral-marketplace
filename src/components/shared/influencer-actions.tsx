'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart, HeartFilled } from '@/components/icons'
import { Cart } from '@/components/shared/cart'
import { ListsDialog } from '@/components/shared/lists-dialog'
import { CampaignDialog } from '@/components/shared/campaign-dialog'
import { useCartStore } from '@/store/useCartStore'
import { useInfluencer } from '@/hooks/useInfluencer'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useLists } from '@/store/listContext'
import { LucideShare, PlusCircle, ShoppingCart } from 'lucide-react'

interface InfluencerActionsProps {
  influencerId: string
  isAuthenticated?: boolean
  variant?: 'header' | 'page'
  className?: string
}

export const InfluencerActions = ({
  influencerId,
  isAuthenticated = false,
  variant = 'page',
  className = ''
}: InfluencerActionsProps) => {
  const [isListsDialogOpen, setIsListsDialogOpen] = useState(false)
  const [isCampaignDialogOpen, setIsCampaignDialogOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const { isInfluencerInAnyList } = useLists()
  const isSaved = isInfluencerInAnyList(influencerId)
  const { setOpen,addItem } = useCartStore()
  const profileUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/${influencerId}`
      : ''
  const handleSaveClick = () => {
    setIsListsDialogOpen(true)
  }

  const influencer = useInfluencer(influencerId);
  const handleAddToCart = () => {
    // Use our custom hook to get influencer data

    // If the influencer has packages, add the first one to the cart
    if (influencer.packages && influencer.packages.length > 0) {
      const defaultPackage = influencer.packages[0];

      addItem({
        id: `${influencerId}-${defaultPackage.id}`,
        name: influencer.name,
        avatar: influencer.avatar,
        type: defaultPackage.title,
        price: defaultPackage.price,
        influencerId: influencerId,
        packageId: defaultPackage.id
      });
    } else {
      // If no packages, add the influencer with their base price
      addItem({
        id: influencerId,
        name: influencer.name,
        avatar: influencer.avatar,
        type: influencer.title || "Content Creator",
        price: influencer.price,
        influencerId: influencerId
      });
    }

    setOpen(true); // Open the cart
  }

  if (variant === 'header') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {/* Share Dialog */}
        <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
          <Button
            variant='ghost'
            size='icon'
            className='hover:bg-transparent'
            onClick={() => setIsShareOpen(true)}
          >
            <LucideShare />
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Profile</DialogTitle>
            </DialogHeader>
            <div className='flex flex-col gap-4'>
              <input
                type='text'
                value={profileUrl}
                readOnly
                className='w-full p-2 border rounded'
              />
              <Button
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      profileUrl
                    )}`,
                    '_blank'
                  )
                }
              >
                Share on Twitter
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Save/List Dialog */}
        <Dialog open={isListsDialogOpen} onOpenChange={setIsListsDialogOpen}>
          <Button
            variant='ghost'
            size='icon'
            className='hover:bg-transparent'
            onClick={handleSaveClick}
          >
            {isAuthenticated ? (
              isSaved ? (
                <HeartFilled fillColor='#D9E915' />
              ) : (
                <Heart />
              )
            ) : (
              <Image src='/love-icon.svg' alt='Love' width={24} height={24} />
            )}
          </Button>
          <DialogContent>
            {isAuthenticated ? (
              <ListsDialog
                isOpen={isListsDialogOpen}
                onClose={() => setIsListsDialogOpen(false)}
                influencerId={influencerId}
              />
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Join Ethral</DialogTitle>
                </DialogHeader>
                <div className='space-y-4 py-4'>
                  <p className='text-muted-foreground'>
                    Sign up as a brand to save influencers to your lists and
                    start collaborating.
                  </p>
                  <div className='flex flex-col gap-3'>
                    <Button asChild className='w-full font-semibold text-base'>
                      <Link href='/join/brand'>Join as Brand</Link>
                    </Button>
                    <div className='text-center'>
                      <Button variant='link' asChild>
                        <Link href='/login'>
                          Already have an account? Log in
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {isAuthenticated && (
          <>
            <Cart />
            <Button
              variant='secondary'
              size='sm'
              className='rounded-full'
              onClick={() => setIsCampaignDialogOpen(true)}
            >
              Invite
            </Button>

            <CampaignDialog
              isOpen={isCampaignDialogOpen}
              onClose={() => setIsCampaignDialogOpen(false)}
            />
          </>
        )}
      </div>
    )
  }

  // Page variant (default)
  return (
    <div className={`flex gap-3 ${className}`}>
      {isAuthenticated && (
        <Button
          variant='secondary'
          className='flex items-center rounded-full h-11 gap-2'
          onClick={() => setIsCampaignDialogOpen(true)}
        >
          <PlusCircle />
          Invite to Campaign
        </Button>
      )}

      <Button
        className='flex items-center border-[0.4px] border-[#cdcdcd]/60 rounded-full h-11 gap-2 px-2 py-2'
        variant="outline"
        onClick={() => handleAddToCart()}
      >
        <ShoppingCart className='text-primary' />
                <span className='text-neutral-white text-sm'>Add to cart</span>
      </Button>

      <Dialog open={isListsDialogOpen} onOpenChange={setIsListsDialogOpen}>
        <Button
          variant='outline'
          className='flex items-center border-[0.4px] border-[#cdcdcd]/60 rounded-full h-11'
          onClick={handleSaveClick}
        >
          {isAuthenticated ? (
            isSaved ? (
              <HeartFilled fillColor='hsl(var(--primary))' className='mr-2' />
            ) : (
              <Heart className='mr-2' />
            )
          ) : (
            <Heart className='mr-2' />
          )}
          {isSaved ? 'Saved' : 'Save'}
        </Button>
        <DialogContent>
          {isAuthenticated ? (
            <ListsDialog
              isOpen={isListsDialogOpen}
              onClose={() => setIsListsDialogOpen(false)}
              influencerId={influencerId}
            />
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Join Ethral</DialogTitle>
              </DialogHeader>
              <div className='space-y-4 py-4'>
                <p className='text-muted-foreground'>
                  Sign up as a brand to save influencers to your lists and start
                  collaborating.
                </p>
                <div className='flex flex-col gap-3'>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href='/join/creator'>Join as Creator</Link>
                  </Button>
                  <Button asChild className='w-full'>
                    <Link href='/join/brand'>Join as Brand</Link>
                  </Button>
                  <div className='text-center'>
                    <Button variant='link' asChild>
                      <Link href='/login'>Already have an account? Log in</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <CampaignDialog
        isOpen={isCampaignDialogOpen}
        onClose={() => setIsCampaignDialogOpen(false)}
      />
    </div>
  )
}
