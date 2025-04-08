import useSWRImmutable from 'swr/immutable'

export interface Item {
  id: string
  name: string
  category: string
  photo_url: string
  completed_at: string | null
}

const isEmpty = (items: Item[]) => {
  return items.length === 0
}

const getCachedItems = () => {
  const sessionData = sessionStorage.getItem('items')

  return sessionData ? JSON.parse(sessionData) as Item[] : []
}

const setCachedItems = (items: Item[]) => {
  if (isEmpty(items)) {
    return
  }

  sessionStorage.setItem('items', JSON.stringify(items))
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const useItems = () => {
  const cashedItems = getCachedItems()

  const key = isEmpty(cashedItems) ? 'https://komeda-api-20241013-d054cdaa7331.herokuapp.com/' : null
  const { data, isLoading } = useSWRImmutable<Item[]>(key, fetcher)
  const items = data || cashedItems

  setCachedItems(items)

  return { items, isLoading }
}
