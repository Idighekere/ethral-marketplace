"use client"

import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearchStore } from "@/store"

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" }
]

interface GenderFilterProps {
  isOpen: boolean
  onClose: () => void
}

const GenderFilter = ({ isOpen, onClose }: GenderFilterProps) => {
  const { searchState, updateFilter } = useSearchStore()
  const [selectedGender, setSelectedGender] = useState(searchState.filters.gender)

  const handleClear = () => {
    setSelectedGender("")
  }

  const handleSave = () => {
    updateFilter("gender", selectedGender)
    onClose()
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={onClose}>
      <DropdownMenuTrigger asChild>
        <div className="absolute"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-white border-0 p-4 w-64" align="start">
        <div className="space-y-4">
          <Select value={selectedGender} onValueChange={setSelectedGender}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a gender" />
            </SelectTrigger>
            <SelectContent>
              {GENDER_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={handleClear}
              className=""
            >
              Clear
            </Button>
            <Button
              onClick={handleSave}
              className=""
            >
              Save
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GenderFilter;
