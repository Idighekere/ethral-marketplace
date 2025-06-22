export interface List {
  id: string
  name: string
  influencers: {
    id: string
    username: string
    image?: string
  }[]
}

export interface ListContextType {
  lists: List[]
  currentInfluencer?: string
  createList: (name: string) => void
  addToList: (listId: string, influencerId: string) => void
  removeFromList: (listId: string, influencerId: string) => void
  isInfluencerInAnyList: (influencerId: string) => boolean
}
