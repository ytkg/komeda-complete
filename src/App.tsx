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

function MenuList({ isShowIncomplete, isShowComplete }: { isShowIncomplete: boolean, isShowComplete: boolean }) {
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data: items, isLoading } = useSWRImmutable<Item[]>('https://komeda-api-20241013-d054cdaa7331.herokuapp.com/', fetcher)

  if (isLoading || !items) {
    return <progress className="circle"></progress>
  }

  const filteredItems = items.filter((item) => item.completed_at ? isShowComplete : isShowIncomplete)

  return(
    <div className="grid">
      {filteredItems.map((item: Item) => {
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

  return (
    <>
      <header>
        <nav>
          <h5 className="max center-align">コメダ珈琲全メニュー制覇プロジェクト</h5>
        </nav>
      </header>
      <main className="responsive">
        <div className="field middle-align">
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
        <MenuList isShowIncomplete={checkedItems.incomplete} isShowComplete={checkedItems.complete} />
      </main>
    </>
  )
}

export default App
