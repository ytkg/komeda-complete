import useSWRImmutable from 'swr/immutable'
import 'beercss'
import 'material-dynamic-colors'

interface Item {
  id: string
  name: string
  large_type: string
  photo_url: string
  completed_at: string | null
}

function MenuList() {
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data: items, isLoading } = useSWRImmutable<Item[]>('https://komeda-api-20241013-d054cdaa7331.herokuapp.com/', fetcher)

  if (isLoading || !items) {
    return <progress className="circle"></progress>
  }

  return(
    <div className="grid">
      {items.map((item: Item) => {
        return <MenuCard item={item} key={item.id}/>
      })}
    </div>
  )
}

function MenuCard({ item }: { item: Item}) {
  return (
    <div className="s6 m4 l2">
      <article className="no-padding">
        <img className="responsive large" src={item.photo_url} />
        <div className="padding">
          <h6>{item.name}</h6>
          <nav>
            {item.completed_at ? (<><i>check_box</i>2025-04-05</>) : <i>check_box_outline_blank</i>}
          </nav>
        </div>
      </article>
    </div>
  )
}

function App() {
  return (
    <>
      <header>
        <nav>
          <h5 className="max center-align">コメダ珈琲全メニュー制覇プロジェクト</h5>
        </nav>
      </header>
      <main className="responsive">
        <MenuList />
      </main>
    </>
  )
}

export default App
