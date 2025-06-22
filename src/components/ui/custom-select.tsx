import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface CustomSelectProps {
  label?: string
  options: { value: string; label: string }[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
}

export function CustomSelect ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  required = false
}: CustomSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} required={required}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

interface CustomMultiSelectProps {
  label?: string
  options: { value: string; label: string }[]
  value?: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

export function CustomMultiSelect ({
  label,
  options,
  value = [],
  onChange,
  placeholder = 'Select options'
}: CustomMultiSelectProps) {
  // For now, we'll simulate multi-select with a single select
  // You might want to use a different component for true multi-select functionality
  return (
    <Select
      value={value[0]}
      onValueChange={newValue => {
        const newValues = value.includes(newValue)
          ? value.filter(v => v !== newValue)
          : [...value, newValue]
        onChange(newValues)
      }}
    >
      <SelectTrigger>
        <SelectValue
          placeholder={
            value.length
              ? `${value.length} option${value.length > 1 ? 's' : ''} selected`
              : placeholder
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
