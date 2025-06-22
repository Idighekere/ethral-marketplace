'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string | number
  name: string
  avatar: string
  type: string
  price: number
  influencerId: string // To link back to the influencer
  packageId?: string // Reference to the specific package if applicable
}

interface CartState {
  items: CartItem[]
  isOpen: boolean

  // Actions
  addItem: (item: CartItem) => void
  removeItem: (itemId: string | number) => void
  clearCart: () => void
  setOpen: (open: boolean) => void
  toggleOpen: () => void

  // Derived data
  subtotal: () => number
  projectedSpend: () => number
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // Actions
      addItem: (item) => {
        const items = get().items
        const existingItem = items.find(i =>
          i.id === item.id &&
          i.influencerId === item.influencerId &&
          i.packageId === item.packageId
        )

        if (!existingItem) {
          set({ items: [...items, item] })
          // Open cart when adding new item
          set({ isOpen: true })
        }
      },

      removeItem: (itemId) => {
        set({ items: get().items.filter(item => item.id !== itemId) })
      },

      clearCart: () => set({ items: [] }),

      setOpen: (open) => set({ isOpen: open }),

      toggleOpen: () => set({ isOpen: !get().isOpen }),

      // Derived data
      subtotal: () => {
        return get().items.reduce((total, item) => total + item.price, 0)
      },

      projectedSpend: () => {
        // This could include additional fees, discounts, etc.
        // For now, just return the subtotal
        return get().subtotal()
      },

      total: () => {
        // For now, this is the same as projected spend
        // but could include taxes, etc. in the future
        return get().projectedSpend()
      },

      itemCount: () => get().items.length
    }),
    {
      name: 'ethral-cart-storage',
      // Optional: Customize how data is stored and rehydrated
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
)
