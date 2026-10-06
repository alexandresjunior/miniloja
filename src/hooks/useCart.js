import { useCallback, useState } from 'react'
import { addItem, changeQuantity, removeItem, itemsCount, cartTotal } from '../utils/cart'

export function useCart() {
  const [items, setItems] = useState([])

  const add = useCallback((product) => setItems((cur) => addItem(cur, product)), [])
  const change = useCallback((id, delta) => setItems((cur) => changeQuantity(cur, id, delta)), [])
  const remove = useCallback((id) => setItems((cur) => removeItem(cur, id)), [])
  const clear = useCallback(() => setItems([]), [])

  return { items, count: itemsCount(items), total: cartTotal(items), add, change, remove, clear }
}
