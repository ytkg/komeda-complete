import { useState } from 'react'
import { useCheckedItems } from './hooks/useCheckedItems'
import { useItems } from './hooks/useItems'
import type { Item } from './hooks/useItems'
import 'beercss'
import 'material-dynamic-colors'

function MenuList({ items, isLoading, isViewModule }: { items: Item[], isLoading: boolean, isViewModule: boolean }) {
  if (isLoading) {
    return (
      <>
        <div className="padding">
          <progress></progress>
        </div>
      </>
    )
  }

  return(
    <>
      <div className="grid">
        {items.map((item: Item) => {
          return isViewModule ? <MenuViewModuleCard item={item} key={item.id}/> : <MenuViewListCard item={item} key={item.id}/>
        })}
      </div>
    </>
  )
}

function MenuViewModuleCard({ item }: { item: Item}) {
  return (
    <div className="s6 m4 l2">
      <article className="no-padding">
        <img className="responsive large" style={{ height: '100%' }} src={item.photo_url} />
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

function MenuViewListCard({ item }: { item: Item }) {
  return (
    <div className="s12">
    <article className="no-padding">
      <div className="grid no-space">
        <div className="s3 l1">
          <img className="responsive" style={{ height: '100%' }} src={item.photo_url} />
        </div>
        <div className="s9 l11">
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
  const [isViewModule, setIsViewModule] = useState(true)

  const handleChangeViewMode = (isViewModule: boolean) => {
    setIsViewModule(isViewModule)
  }

  const categories = ['すべて', 'スナック', 'ドリンク', 'デザート']
  const [category, setCategory] = useState(categories[0])

  const { items, isLoading } = useItems()

  const filteredItems = items.filter((item) => {
    return (item.completed_at ? checkedItems.complete : checkedItems.incomplete) && (category === 'すべて' ? true : category === item.category)
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
              <input type="checkbox" checked={checkedItems.incomplete} onChange={() => handleChangeCheckedItems('incomplete')} />
              <span>未</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" checked={checkedItems.complete} onChange={() => handleChangeCheckedItems('complete')} />
              <span>済</span>
            </label>
            <div className="max"></div>
            <nav className="no-space">
              <button className={`border left-round small ${isViewModule && 'fill'}`} onClick={() => handleChangeViewMode(true)}>
                <i>view_module</i>
              </button>
              <button className={`border right-round small ${!isViewModule && 'fill'}`} onClick={() => handleChangeViewMode(false)}>
                <i>view_list</i>
              </button>
            </nav>
          </nav>
        </div>
        <div>
          <div className="tabs">
            {categories.map((c) => {
              return <a className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>{c}</a>
            })}
          </div>
        </div>
        <MenuList items={filteredItems} isLoading={isLoading} isViewModule={isViewModule} />
      </main>
    </>
  )
}

export default App
