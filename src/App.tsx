import { useState } from 'react'
import { useCheckedItems } from './hooks/useCheckedItems'
import { useItems } from './hooks/useItems'
import type { Item } from './hooks/useItems'
import 'beercss'
import 'material-dynamic-colors'

function MenuList({ items, isLoading }: { items: Item[]; isLoading: boolean }) {
  if (isLoading) {
    return (
      <>
        <div className="padding">
          <progress />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="grid">
        {items.map((item: Item) => {
          return <MenuCard item={item} key={item.id} />
        })}
      </div>
    </>
  )
}

function MenuCard({ item }: { item: Item }) {
  return (
    <div className="s12 m6 l4">
      <article className="no-padding">
        <div className="grid no-space">
          <div className="s3">
            <img className="responsive" style={{ height: '100%' }} src={item.photo_url} alt={item.name} />
          </div>
          <div className="s9">
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
          </div>
        </div>
      </article>
    </div>
  )
}

function App() {
  const { checkedItems, handleChangeCheckedItems } = useCheckedItems()

  const categories = ['すべて', 'スナック', 'ドリンク', 'デザート']
  const [category, setCategory] = useState(categories[0])

  const { items, isLoading } = useItems()
  const [searchText, setSearchText] = useState('')

  const filteredItems = items.filter((item) => {
    return (
      (item.completed_at ? checkedItems.complete : checkedItems.incomplete) &&
      (category === 'すべて' ? true : category === item.category) &&
      item.name.includes(searchText)
    )
  })

  return (
    <>
      <header>
        <nav>
          <h5 className="max center-align">コメダ珈琲全メニュー制覇プロジェクト</h5>
        </nav>
      </header>
      <main className="responsive">
        <div className="padding">
          <nav>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={checkedItems.incomplete}
                onChange={() => handleChangeCheckedItems('incomplete')}
              />
              <span>未</span>
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={checkedItems.complete}
                onChange={() => handleChangeCheckedItems('complete')}
              />
              <span>済</span>
            </label>
            <div className="max" />
            <div className="field label prefix small round border">
              <i>search</i>
              <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              {/* biome-ignore lint/a11y/noLabelWithoutControl:*/}
              <label>検索</label>
            </div>
          </nav>
        </div>
        <div>
          <div className="tabs">
            {categories.map((c) => {
              return (
                // biome-ignore lint/a11y/useValidAnchor:
                <a key={c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>
                  {c}
                </a>
              )
            })}
          </div>
        </div>
        <MenuList items={filteredItems} isLoading={isLoading} />
      </main>
    </>
  )
}

export default App
