import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Messages - Ethral',
  description: 'Manage your conversations and message requests'
}

export default function MessagesLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return <div className='min-h-screen bg-background'>{children}</div>
}
