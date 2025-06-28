import Image from 'next/image'
import React, { JSX } from 'react'

export type ContentBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; level: 1 | 2 | 3 | 4 | 5 | 6; content: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'quote'; content: string; author?: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'code'; content: string; language?: string }
  | { type: 'html'; content: string }

interface ContentRendererProps {
  blocks: ContentBlock[]
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({ blocks }) => {
  const renderBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className="text-neutral-white leading-relaxed mb-6">
            {block.content}
          </p>
        )

      case 'heading':
        const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements
        const headingClasses = {
          1: 'text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-8 mt-12 ',
          2: 'text-2xl md:text-3xl font-semibold text-white mb-6 mt-12 ',
          3: 'text-xl md:text-2xl font-semibold text-white mb-4 mt-8 ',
          4: 'text-lg md:text-xl font-semibold text-white mb-3 mt-6 ',
          5: 'text-base md:text-lg font-semibold text-white mb-3 mt-4 ',
          6: 'text-sm md:text-base font-semibold text-white mb-2 mt-3 '
        }

        return (
          <HeadingTag key={index} className={headingClasses[block.level]}>
            {block.content}
          </HeadingTag>
        )

      case 'image':
        return (
          <figure key={index} className="my-12">
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={block.src}
                alt={block.alt}
                fill
                className="object-cover"
              />
            </div>
            {block.caption && (
              <figcaption className="text-sm text-gray-400 text-center mt-4">
                {block.caption}
              </figcaption>
            )}
          </figure>
        )

      case 'quote':
        return (
          <section key={index} className="my-16">
            <blockquote className="text-center p-4 border-l-4 border-[#E8E8EA] rounded-md bg-[#242535] font-medium">
              <p className="text-lg md:text-xl font-medium text-white italic mb-4">
              &ldquo;{block.content}&rdquo;
              </p>
              {block.author && (
                <cite className="text-neutral-white/70 text-sm">— {block.author}</cite>
              )}
            </blockquote>
          </section>
        )

      case 'list':
        const ListTag = block.ordered ? 'ol' : 'ul'
        return (
          <ListTag key={index} className={`mb-6 ${block.ordered ? 'list-decimal' : 'list-disc'} list-inside space-y-2`}>
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex} className="">{item}</li>
            ))}
          </ListTag>
        )

      case 'code':
        return (
          <pre key={index} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6 border border-gray-700">
            <code className={block.language ? `language-${block.language}` : ''}>
              {block.content}
            </code>
          </pre>
        )

      case 'html':
        return (
          <div
            key={index}
            className="my-6"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-none">
      {blocks.map(renderBlock)}
    </div>
  )
}
