"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useSearchStore } from "@/store"

const formatPrice = (price: number): string => {
  if (price >= 3000) return "$3,000+"
  return `$${price.toLocaleString()}`
}

interface PriceFilterProps {
  isOpen: boolean
  onClose: () => void
}

const PriceFilter = ({ isOpen, onClose }: PriceFilterProps) => {
  const { searchState, updateFilter } = useSearchStore()
  const [priceRange, setPriceRange] = useState([
    searchState.filters.price.min,
    searchState.filters.price.max
  ])

  const handlePriceChange = (newRange: number[]) => {
    setPriceRange(newRange)
  }

  const handleSave = () => {
    updateFilter("price", { min: priceRange[0], max: priceRange[1] })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="text-white max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between pb-4">
          <DialogTitle className="text-lg font-semibold text-white">
            Price
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm  text-white/80 mb-1">Min Price</div>
              <div className="text-xl font-semibold text-white">{formatPrice(priceRange[0])}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/80 mb-1">Max Price</div>
              <div className="text-xl font-semibold text-white">{formatPrice(priceRange[1])}</div>
            </div>
          </div>

          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              min={50}
              max={3000}
              step={50}
              className="w-full"
              minStepsBetweenThumbs={50}
            />
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="w-full "
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );

};

export default PriceFilter
