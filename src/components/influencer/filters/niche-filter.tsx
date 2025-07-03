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

const NICHE_OPTIONS = [
  { id: 'fashion', label: 'Fashion & Style', icon: '👗' },
  { id: 'beauty', label: 'Beauty & Makeup', icon: '💄' },
  { id: 'fitness', label: 'Fitness & Health', icon: '💪' },
  { id: 'food', label: 'Food & Cooking', icon: '🍳' },
  { id: 'travel', label: 'Travel & Adventure', icon: '✈️' },
  { id: 'tech', label: 'Technology & Gadgets', icon: '📱' },
  { id: 'gaming', label: 'Gaming & Esports', icon: '🎮' },
  { id: 'music', label: 'Music & Entertainment', icon: '🎵' },
  { id: 'sports', label: 'Sports & Athletics', icon: '⚽' },
  { id: 'lifestyle', label: 'Lifestyle & Wellness', icon: '🧘' },
  { id: 'finance', label: 'Finance & Investing', icon: '💰' },
  { id: 'business', label: 'Business & Entrepreneurship', icon: '💼' },
  { id: 'education', label: 'Education & Learning', icon: '📚' },
  { id: 'art', label: 'Art & Design', icon: '🎨' },
  { id: 'comedy', label: 'Comedy & Entertainment', icon: '😂' },
  { id: 'family', label: 'Family & Parenting', icon: '👨‍👩‍👧‍👦' },
  { id: 'diy', label: 'DIY & Crafts', icon: '🛠️' },
  { id: 'automotive', label: 'Automotive & Cars', icon: '🚗' },
  { id: 'pets', label: 'Pets & Animals', icon: '🐕' },
  { id: 'photography', label: 'Photography', icon: '📸' },
  { id: 'crypto', label: 'Cryptocurrency & Web3', icon: '₿' },
  { id: 'nft', label: 'NFT & Digital Art', icon: '🖼️' }
]

interface NicheFilterProps {
  isOpen: boolean
  onClose: () => void
}

const NicheFilter = ({ isOpen, onClose }: NicheFilterProps) => {
  const { searchState, updateFilter } = useSearchStore()
  const [selectedNiches, setSelectedNiches] = useState<string[]>(
    searchState.filters.niche
  )

  const handleNicheToggle = (nicheId: string) => {
    setSelectedNiches(prev =>
      prev.includes(nicheId)
        ? prev.filter(id => id !== nicheId)
        : [...prev, nicheId]
    )
  }

  const handleClear = () => {
    setSelectedNiches([])
  }

  const handleSave = () => {
    updateFilter('niche', selectedNiches)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1D232C] border-gray-700 text-white sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Content Niches
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-400">
            Select the content niches and topics the influencer creates about
          </p>

          <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto">
            {NICHE_OPTIONS.map(niche => (
              <div key={niche.id} className="flex items-center space-x-3">
                <Checkbox
                  id={niche.id}
                  checked={selectedNiches.includes(niche.id)}
                  onCheckedChange={() => handleNicheToggle(niche.id)}
                  className="border-gray-600 "
                />
                <Label
                  htmlFor={niche.id}
                  className="flex items-center gap-2 text-sm font-medium text-white cursor-pointer flex-1"
                >
                  {/* <span className="text-lg">{niche.icon}</span> */}
                  {niche.label}
                </Label>
              </div>
            ))}
          </div>

          {selectedNiches.length > 0 && (
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-400 mb-2">
                Selected ({selectedNiches.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedNiches.map(id => {
                  const niche = NICHE_OPTIONS.find(n => n.id === id)
                  return niche ? (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1 px-2 py-1  rounded-md text-xs bg-primary/5 border-[0.1px] border-primary"
                    >
                      {/* <span>{niche.icon}</span> */}
                      {niche.label}
                    </span>
                  ) : null
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-700">
          <Button
            variant="outline"
            onClick={handleClear}
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            disabled={selectedNiches.length === 0}
          >
            Clear All
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 "
          >
            Save ({selectedNiches.length})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NicheFilter
