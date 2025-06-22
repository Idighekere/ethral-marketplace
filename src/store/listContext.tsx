'use client'

import { createContext, useContext, useState } from 'react'
import { List, ListContextType } from '@/types/lists'

const ListContext = createContext<ListContextType | undefined>(undefined)

export function ListProvider ({ children }: { children: React.ReactNode }) {
  const [lists, setLists] = useState<List[]>([])

  const createList = (name: string) => {
    const newList: List = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      influencers: []
    }
    setLists([...lists, newList])
    return newList.id
  }

  const addToList = (listId: string, influencerId: string) => {
    setLists(
      lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            influencers: [
              ...list.influencers,
              { id: influencerId, username: influencerId }
            ]
          }
        }
        return list
      })
    )
  }

  const removeFromList = (listId: string, influencerId: string) => {
    setLists(
      lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            influencers: list.influencers.filter(inf => inf.id !== influencerId)
          }
        }
        return list
      })
    )
  }

  const isInfluencerInAnyList = (influencerId: string) => {
    return lists.some(list =>
      list.influencers.some(inf => inf.id === influencerId)
    )
  }

  return (
    <ListContext.Provider
      value={{
        lists,
        createList,
        addToList,
        removeFromList,
        isInfluencerInAnyList
      }}
    >
      {children}
    </ListContext.Provider>
  )
}

export const useLists = () => {
  const context = useContext(ListContext)
  if (context === undefined) {
    throw new Error('useLists must be used within a ListProvider')
  }
  return context
}
