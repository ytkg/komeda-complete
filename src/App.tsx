import { useState } from 'react'
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
  const [checkedItems, setCheckedItems] = useState({
    incomplete: true,
    complete: true,
  });

  const handleChange = (key: keyof typeof checkedItems) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const categories = ['All', 'Food', 'Drink', 'Dessert']
  const [category, setCategory] = useState(categories[0])

  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data: items, isLoading } = useSWRImmutable<Item[]>('https://komeda-api-20241013-d054cdaa7331.herokuapp.com/', fetcher)

  if (isLoading || !items) {
    return <progress className="circle"></progress>
  }

  const filteredItems = items.filter((item) => {
    const category_map: { [key: string]: string } = { 'Food': '1-4', 'Drink': '1-2', 'Dessert': '1-3' }
    return (item.completed_at ? checkedItems.complete : checkedItems.incomplete) && (category === 'All' ? true : category_map[category] === item.large_type)
  })

  return(
    <>
      <div className="padding">
        <nav>
          <label className="checkbox">
            <input type="checkbox" checked={checkedItems.incomplete} onChange={() => handleChange('incomplete')} />
            <span>未</span>
          </label>
          <label className="checkbox">
            <input type="checkbox" checked={checkedItems.complete} onChange={() => handleChange('complete')} />
            <span>済</span>
          </label>
        </nav>
      </div>
      <div>
        <div className="tabs">
          {categories.map((c) => {
            return <a className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>{c}</a>
          })}
        </div>
      </div>
      <div className="grid">
        {filteredItems.map((item: Item) => {
          return <MenuCard item={item} key={item.id}/>
        })}
      </div>
  </>
  )
}

function MenuCard({ item }: { item: Item}) {
  return (
    <div className="s6 m4 l2">
      <article className="no-padding">
        <img className="responsive large" src={item.photo_url} />
        <div className="padding">
          <h5 className="small">{item.name}</h5>
          {item.completed_at && (
            <nav className="right-align">
              <div className="chip round">
                <i>check</i>
                <span>{item.completed_at}</span>
              </div>
            </nav>
          )}
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
