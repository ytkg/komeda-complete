import { useState } from 'react'

export const useCheckedItems = () => {
  const [checkedItems, setCheckedItems] = useState({
    incomplete: true,
    complete: true,
  })

  const handleChange = (key: keyof typeof checkedItems) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return { checkedItems, handleChangeCheckedItems: handleChange }
}
