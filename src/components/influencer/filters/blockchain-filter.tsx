'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { useSearchStore } from '@/store'
import { Label } from '@/components/ui/label'

const BLOCKCHAIN_OPTIONS = [
  { id: 'ethereum', label: 'Ethereum', icon: '⟠' },
  { id: 'bitcoin', label: 'Bitcoin', icon: '₿' },
  { id: 'solana', label: 'Solana', icon: '◎' },
  { id: 'polygon', label: 'Polygon', icon: '⬢' },
  { id: 'arbitrum', label: 'Arbitrum', icon: '🔹' },
  { id: 'optimism', label: 'Optimism', icon: '🔴' },
  { id: 'avalanche', label: 'Avalanche', icon: '🔺' },
  { id: 'binance', label: 'Binance Smart Chain', icon: '🟡' },
  { id: 'cardano', label: 'Cardano', icon: '🔵' },
  { id: 'polkadot', label: 'Polkadot', icon: '⚫' },
  { id: 'chainlink', label: 'Chainlink', icon: '🔗' },
  { id: 'cosmos', label: 'Cosmos', icon: '⚛️' }
]

interface BlockchainFilterProps {
  isOpen: boolean
  onClose: () => void
}

const BlockchainFilter = ({ isOpen, onClose }: BlockchainFilterProps) => {
  const { searchState, updateFilter } = useSearchStore()
  const [selectedBlockchains, setSelectedBlockchains] = useState<string[]>(
    searchState.filters.blockchain
  )

  const handleBlockchainToggle = (blockchainId: string) => {
    setSelectedBlockchains(prev =>
      prev.includes(blockchainId)
        ? prev.filter(id => id !== blockchainId)
        : [...prev, blockchainId]
    )
  }

  const handleClear = () => {
    setSelectedBlockchains([])
  }

  const handleSave = () => {
    updateFilter('blockchain', selectedBlockchains)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1D232C] border-gray-700 text-white sm:max-w-md max-h-[80vh]  ">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Blockchain Networks
          </DialogTitle>
        </DialogHeader>

<div className="/overflow-y-auto  h-auto /max-h-[50vh]">
        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-400">
            Select the blockchain networks the influencer is active on
          </p>

          <div className="space-y-3 flex flex-wrap gap-3 items-center">
            {BLOCKCHAIN_OPTIONS.map(blockchain => (
              <div key={blockchain.id} className="flex items-center  space-x-1">
                <Checkbox
                  id={blockchain.id}
                  checked={selectedBlockchains.includes(blockchain.id)}
                  onCheckedChange={() => handleBlockchainToggle(blockchain.id)}
                  className="border-gray-600 "
                />
                <Label
                  htmlFor={blockchain.id}
                  className="flex items-center gap-2 text-sm font-medium text-white cursor-pointer pb-0 flex-1"
                >

                  {blockchain.label}
                </Label>
              </div>
            ))}
          </div>

          {selectedBlockchains.length > 0 && (
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-400 mb-2">
                Selected ({selectedBlockchains.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedBlockchains.map(id => {
                  const blockchain = BLOCKCHAIN_OPTIONS.find(b => b.id === id)
                  return blockchain ? (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-white text-xs rounded-full"
                    >
                      {/* <span>{blockchain.icon}</span> */}
                      {blockchain.label}
                    </span>
                  ) : null
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleClear}
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Clear
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1"
          >
            Save ({selectedBlockchains.length})
          </Button>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BlockchainFilter
