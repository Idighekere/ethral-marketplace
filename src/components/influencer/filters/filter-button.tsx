"use client"

import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface FilterButtonProps {
  label: string
  isActive?: boolean
  isPremium?: boolean
  onClick: () => void
  className?: string
}

const FilterButton = ({
  label,
  isActive = false,
  isPremium = false,
  onClick,
  className
}: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2 px-3 py-1 text-sm font-normal rounded-full border-[0.2px] transition-all duration-200 hover:shadow-sm bg-transparent ",
        isActive
          ? "border-1 border-white bg-[#1D232C] text-white"
          : "border-[0.2px] border-white/60",
        className
      )}
    >
      <span className="whitespace-nowrap">{label}</span>
      <ChevronDown className="w-3 h-3" />

      {isPremium && (
        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-medium text-primary bg-[#2F353E] rounded-full">
          Premium
        </span>
      )}
    </button>
  )
}

export default FilterButton
