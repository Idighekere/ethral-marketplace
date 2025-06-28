import Image from 'next/image'
import React from 'react'
import { ContentRenderer, ContentBlock } from './content-renderer'

interface BlogDetailsProps {
  post: {
    title: string
    excerpt: string
    thumbnail: string
    author: {
      name: string
      avatar: string
    }
    category: string
    publishedAt: string
    readingTime: number
    content: ContentBlock[]
  }
}

// Dummy content that matches the design
const DUMMY_CONTENT: ContentBlock[] = [
  {
    type: 'heading',
    level: 2,
    content: 'Research Your Destination'
  },
  {
    type: 'paragraph',
    content: 'Before embarking on any journey, thorough research is essential. This includes understanding the local culture, customs, and laws. Knowing basic phrases in the local language can also be incredibly helpful and shows respect for the local community.'
  },
  {
    type: 'paragraph',
    content: 'Understanding local customs and traditions is crucial for respectful travel. Research weather patterns, seasonal considerations, and local events that might impact your trip. Knowledge of local transportation systems and cultural norms will enhance your experience significantly.'
  },
  {
    type: 'heading',
    level: 2,
    content: 'Plan Your Itinerary'
  },
  {
    type: 'paragraph',
    content: 'While spontaneity can lead to wonderful discoveries, having a rough itinerary ensures you don\'t miss out on must-see attractions. Research opening hours, booking requirements, and seasonal availability. Balance structured activities with free time for exploration.'
  },
  {
    type: 'paragraph',
    content: 'Consider creating a flexible schedule that allows for unexpected discoveries while ensuring you experience the highlights. Book accommodations and transportation in advance, especially during peak seasons.'
  },
  {
    type: 'image',
    src: '/blog-thumbnail.png',

    alt: 'Traveler silhouette against sunset',
    caption: 'Finding peace in nature during travels'
  },
  {
    type: 'quote',
    content: 'Traveling can expose us to new cultures and perspectives we never knew of. It teaches us to be more creative, more adaptable, more humble, and more aware of the world around us.',
    // author: 'Travel Enthusiast'
  },
  {
    type: 'heading',
    level: 2,
    content: 'Pack Lightly and Smartly'
  },
  {
    type: 'paragraph',
    content: 'Overpacking is a common mistake that can weigh you down and create unnecessary stress. Focus on versatile clothing that can be mixed and matched, and choose items that serve multiple purposes. Remember, you can always buy essentials at your destination.'
  },
  {
    type: 'list',
    items: [
      'Roll clothes instead of folding to save space',
      'Use packing cubes for organization',
      'Pack a change of clothes in your carry-on',
      'Choose versatile items that serve multiple purposes'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Stay Safe and Healthy'
  },
  {
    type: 'paragraph',
    content: 'Your health and safety should always be a priority when traveling. Research any required vaccinations, pack a basic first-aid kit, and ensure you have adequate travel insurance. Stay hydrated, get enough rest, and listen to your body.'
  },
  {
    type: 'paragraph',
    content: 'Keep copies of important documents in multiple locations, stay aware of your surroundings, and trust your instincts. Register with your embassy if traveling internationally and keep emergency contacts readily available.'
  },
  {
    type: 'heading',
    level: 2,
    content: 'Immerse Yourself in Local Culture'
  },
  {
    type: 'paragraph',
    content: 'The best travel experiences come from genuine cultural immersion. Try local foods, participate in traditional activities, and engage with local communities. Step outside your comfort zone and embrace new experiences with an open mind.'
  },
  {
    type: 'paragraph',
    content: 'Learn about local history and traditions before you visit. Respect cultural norms and dress codes, especially when visiting religious or sacred sites. Consider staying in locally-owned accommodations to support the community.'
  },
  {
    type: 'heading',
    level: 2,
    content: 'Capture Memories'
  },
  {
    type: 'paragraph',
    content: 'While it\'s important to be present and enjoy the moment, documenting your journey helps preserve precious memories. Take photos, keep a travel journal, or collect small mementos that remind you of special experiences.'
  },
  {
    type: 'paragraph',
    content: 'Don\'t let photography consume your entire experience. Strike a balance between capturing memories and living in the moment. Some of the best memories are the ones etched in your mind rather than on a screen.'
  }
]

export const BlogDetails: React.FC<BlogDetailsProps> = ({ post }) => {
  // Use provided content or fallback to dummy content
  const contentBlocks = post.content && post.content.length > 0 ? post.content : DUMMY_CONTENT
  return (
    <div className="text-white ">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center px-5 sm:px-10 lg:px-20 xl:px-36">


        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block bg-primary/90 text-[#1D232C] px-4 py-2 rounded-sm text-sm font-medium ">
              {post.category}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-3  leading-tight">
            {post.title}
          </h1>

            <p className="text-[#696A75] text-sm">{post.publishedAt}</p>


        </div>
      </section>

      {/* Article Content */}
      <section className="px-5 sm:px-10 lg:px-20 xl:px-36 pb-20 relative">

        {/* Background Image */}
        <div className="relative w-full h-64 md:h-96 aspect-auto overflow-hidden rounded-lg mt-8">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover opacity-30"
          />

        </div>

        <div className="/max-w-5xl mx-auto">

          {/* Article Body */}
          <article className="max-w-none">
            <ContentRenderer blocks={contentBlocks} />
          </article>

        </div>
      </section>
    </div>
  )
}
