"use client"
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

interface FAQItem {
  question: string
  answer: string
}

interface FAQItemProps {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
  withCard?: boolean
}

interface FAQSectionProps {
  faqs: FAQItem[]
  withCard?: boolean
}

const FAQItem: React.FC<FAQItemProps> = ({
  item,
  isOpen,
  onToggle,
  // withCard = false
}) => {
  return (
    <div
      className={cn(
        'w-full border-b border-[#757575] ',
      )}
    >
      <button
        className='w-full py-3 flex justify-between items-center text-left cursor-pointer group '
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className='font-medium text-base md:text-lg text-neutral-white'>
          {item.question}
        </span>
        <span className='text-2xl font-medium text-primary group-hover:text-white transition-colors'>
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div
        className={cn(
          'grid overflow-hidden transition-all',
          isOpen
            ? 'grid-rows-[1fr] opacity-100 pb-4'
            : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className='overflow-hidden'>
          <p className='text-neutral-white/80 text-left '>{item.answer}</p>
        </div>
      </div>
    </div>
  )
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs, withCard = false }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqContent = (
    <div className='w-full space-y-1'>
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          item={faq}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
          withCard={withCard}
        />
      ))}
    </div>
  )

  if (withCard) {
    return (
      <Card className='  bg-[#1D232C] border-0 p-2 md:p-10 rounded-md'>
        <CardContent className='py-6'>{faqContent}</CardContent>
      </Card>
    )
  }

  return faqContent
}
