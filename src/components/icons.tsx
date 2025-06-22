import { cn } from '@/lib/utils'

interface IconProp {
  fillColor?: string
  className?: string
  stroke?:string
}

export const Star = ({ fillColor = 'currentColor', className }: IconProp) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill={fillColor}
      className={cn('w-5 h-5', className)}
    >
      <path
        fillRule='evenodd'
        d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
        clipRule='evenodd'
      />
    </svg>
  )
}

export const Heart = ({ fillColor = 'currentColor', className }: IconProp) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke={fillColor}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={cn('w-6 h-6', className)}
    >
      <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
    </svg>
  )
}

export const HeartFilled = ({
  fillColor = 'currentColor',
  className
}: IconProp) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill={fillColor}
      className={cn('w-6 h-6', className)}
    >
      <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
    </svg>
  )
}

export const Eye = ({ fillColor = 'currentColor', className,stroke="currentColor" }: IconProp) => {
  return (
    <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={cn('w-4 h-4', className)}
  >
    <path
      d='M8 3.33334C3.33333 3.33334 1.33333 8.00001 1.33333 8.00001C1.33333 8.00001 3.33333 12.6667 8 12.6667C12.6667 12.6667 14.6667 8.00001 14.6667 8.00001C14.6667 8.00001 12.6667 3.33334 8 3.33334Z'
      stroke={stroke}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z'
      stroke={stroke}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
  )
}
export const ChevronLeftArrow = ({
  fillColor = 'currentColor',
  className,
  stroke="currentColor"
}: IconProp) => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('w-4 h-4', className)}
    >
      <path
        d='M10 12L6 8L10 4'
        stroke={stroke}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
