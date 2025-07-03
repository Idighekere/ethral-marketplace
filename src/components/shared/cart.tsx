'use client'

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetHeader,
  SheetFooter
} from '../ui/sheet'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Trash } from 'lucide-react'
import {CartIcon} from '@/components/icons'
import { formatPrice } from '@/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { useCartStore } from '@/store/useCartStore'

const FOOTER_TEXTS=[
  {
    id:"1",
    title:"Place Order",
    description:"Submit the details of the collaboration. Influencers have 72 hours to accept your request, otherwise the amount is added to your Collabstr balance, where you can withdraw it or use it on another influencer."
  },
  {
    id:"2",
    title:"Chat with Influencer",
    description:"Chat with the influencer and arrange the collaboration. Your funds are held securely until they complete the work."
  },
  {
    id:"3",
    title:"Receive Content",
    description:"Receive your content from the influencer to review and approve. Once approved, the collaboration is complete and payment is released to the influencer."
  }
]

interface Props {
  iconClassName?: string
  cartOpen?: boolean
}
export const Cart = ({ iconClassName = '', cartOpen = false }: Props) => {
  const { items:cartItems, isOpen, setOpen, subtotal, total, projectedSpend } = useCartStore()

  // Sync initial cart state with props if provided
  useEffect(() => {
    if (cartOpen !== undefined) {
      setOpen(cartOpen)
    }
  }, [cartOpen, setOpen])

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='hover:bg-transparent'>
          <span className="relative">
            <CartIcon className={cn('text-neutral-white', iconClassName)} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-primary text-black text-xs font-bold rounded-full">
                {cartItems.length}
              </span>
            )}
          </span>
        </Button>
      </SheetTrigger>      <SheetContent
        side='right'
        className='w-full md:max-w-3xl  lg:max-w-4xl  text-neutral-white border-none overflow-y-auto p-4 sm:px-10 lg:px-12 h-full'
      >
        <SheetHeader className='p-0 sticky'>
          <SheetTitle className='text-primary font-medium '>
            Your Cart {cartItems.length > 0 && `(${cartItems.length})`}
          </SheetTitle>
        </SheetHeader>
        <div className="h-full w-full overflow-y-auto">
        <div className='h-full w-full flex flex-col lg:flex-row gap-6 lg:items-start '>
          {cartItems.length > 0 ? (
            <>
              <div className='border-[#939191] border-[0.3px] p-2 md:p-5 rounded-md h-auto'>
                {cartItems.map((item) => (
                  <CartItem key={`${item.id}-${item.packageId || ''}`} item={item} />
                ))}
              </div>
              <Card className='bg-secondary border-[#939191] border-[0.3px] h-auto w-full rounded-md'>
                <CardContent className='text-white'>
                  <CardHeader className='px-0 text-white mb-4'>
                    <CardTitle className='font-medium text-white'>
                      Cart Summary
                    </CardTitle>
                  </CardHeader>                  <div className='space-y-3'>
                    <span className='flex justify-between'>
                      <p>Subtotal</p>
                      <p>{formatPrice(subtotal())}</p>
                    </span>
                    <span className='flex justify-between'>
                      <p>ProjectedSpend</p>
                      <p>{formatPrice(projectedSpend())}</p>
                    </span>
                    <Separator className='' />
                    <span className='flex justify-between'>
                      <p>Total</p>
                      <p>{formatPrice(total())}</p>
                    </span>

                    <div className="flex flex-col gap-2">
                      <Button className='rounded-full w-full'>
                        Go to Checkout
                      </Button>
                      <Button
                        variant="outline"
                        className='rounded-full w-full border-[0.4px] border-[#cdcdcd]/60'
                        onClick={() => useCartStore.getState().clearCart()}
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <EmptyCart />
          )}
        </div>        <SheetFooter className='p-0 mt-0'>
        {
          cartItems.length !== 0 ? (
            <div className='mt-6 space-y-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                {FOOTER_TEXTS.map((item) => (
                  <div key={item.id} className='space-y-1'>
                    <h4 className='font-medium'>({item.id}) {item.title}</h4>
                    <p className='text-sm text-white/70'>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        }
        </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}

const CartItem = ({ item }: { item: {id: string | number
name: string
avatar: string
type: string
price: number
} }) => {
  const { removeItem } = useCartStore()

  const handleRemove = () => {
    // Remove the item from the cart
    removeItem(item.id)
  }

  return (
    <div className='flex gap-2 justify-between'>
      <div className='flex gap-2'>
        <Avatar className='w-15 h-15 md:w-30 md:h-30 mb-5 rounded-sm'>
          <AvatarImage src={item.avatar} alt={item.name} />
          <AvatarFallback className='rounded-sm'>
            {item.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className='text-[#CDCDCD]'>
          <p className='truncate font-medium text-base'>{item.name}</p>
          <p className='text-sm font-regular '>{item.type}</p>
          <p className='text-lg text-white'>{formatPrice(item.price)}</p>
        </div>
      </div>
      <div className=''>
        <Button
          variant='ghost'
          className='hover:bg-transparent text-primary flex items-center gap-2 px-0 group hover:text-white'
          onClick={handleRemove}
        >
          <Trash className='text-primary group-hover:text-white' />
          Remove
        </Button>
      </div>
    </div>
  )
}

const EmptyCart = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-5 h-full w-full'>
      <div className="space-y-5 flex flex-col items-center justify-center text-center h-full w-full">

      <CartIcon className='size-14 lg:size-30 font-medium' />
      <h3 className='font-semibold text-xl  md:text-2xl  '>Your Cart is Empty</h3>
      <p className='text-center'>
        Start adding influencers by clicking the button below
      </p>
      </div>
      <Link href='/influencers' className="mt-auto w-full mx-auto md:w-fit">
        <Button className='w-full md:w-fit mt-auto h-10 md:h-11 text-base font-medium' variant='default'>
          Discover Influencers
        </Button>
      </Link>
    </div>
  )
}
