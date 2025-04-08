import useSWRImmutable from 'swr/immutable'

export interface Item {
  id: string
  name: string
  category: string
  photo_url: string
  completed_at: string | null
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const useItems = () => {
  const { data, isLoading } = useSWRImmutable<Item[]>('https://komeda-api-20241013-d054cdaa7331.herokuapp.com/', fetcher)

  return { items: data || [], isLoading }
}
