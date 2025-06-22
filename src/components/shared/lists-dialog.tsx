'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLists } from '@/store/listContext'
import {Plus} from "lucide-react"

interface ListsDialogProps {
  isOpen: boolean
  onClose: () => void
  influencerId: string
}

export const ListsDialog = ({
  isOpen,
  onClose,
  influencerId
}: ListsDialogProps) => {
  const [isCreating, setIsCreating] = useState(false)
  const [newListName, setNewListName] = useState('')
  const { lists, createList, addToList } = useLists()

  const handleCreateList = () => {
    if (newListName.trim()) {
      const listId = createList?.(newListName?.trim())
      addToList(listId!, influencerId)
      setNewListName('')
      setIsCreating(false)
      onClose()
    }
  }

  const handleAddToList = (listId: string) => {
    addToList(listId, influencerId)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className='sm:max-w-[425px] bg-[#171C22] '>
        <DialogHeader>
          <DialogTitle>
            {isCreating ? 'Name Your List' : 'Add to List'}
          </DialogTitle>
        </DialogHeader>

        {isCreating ? (
          <div className='grid gap-4 py-4 '>
            <div className='space-y-2'>
              <Input
                placeholder='Enter list name'
                value={newListName}
                onChange={e => setNewListName(e.target.value)}
              />
              <Button
                className='w-full font-semibold text-base h-10'
                onClick={handleCreateList}
                disabled={!newListName.trim()}
              >
                Create
              </Button>
            </div>
          </div>
        ) : (
          <div className='grid gap-4 py-4 px-0'>
            <button
              className='justify-start hover:bg-transparent flex gap-2 items-center'
              onClick={() => setIsCreating(true)}
            >
              <span className="  bg-secondary rounded-sm p-4 text-white z-10">

              <Plus className=""/>
              </span>
              <p>

              Create New List
              </p>
            </button>

            <div className='space-y-4'>
              {lists.map(list => (
                <div
                  key={list.id}
                  className='flex items-center gap-4 p-3 border rounded-lg hover:bg-accent cursor-pointer'
                  onClick={() => handleAddToList(list.id)}
                >
                  <div className='relative w-12 h-12'>
                    <Image
                      src='/placeholder-list.png'
                      alt={list.name}
                      fill
                      className='object-cover rounded'
                    />
                  </div>
                  <div>
                    <h3 className='font-medium'>{list.name}</h3>
                    <p className='text-sm text-muted-foreground'>
                      {list.influencers.length} influencer
                      {list.influencers.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
