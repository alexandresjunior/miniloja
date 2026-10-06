import { effectivePrice } from './format'

// item do carrinho: { product, quantity }

export function addItem(items, product) {
  if (product.stock === 0) return items
  const found = items.find((i) => i.product.id === product.id)
  if (!found) return [...items, { product, quantity: 1 }]
  if (found.quantity >= product.stock) return items
  return items.map((i) =>
    i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
  )
}

export function changeQuantity(items, productId, delta) {
  return items.map((i) => {
    if (i.product.id !== productId) return i
    const next = Math.min(Math.max(i.quantity + delta, 1), i.product.stock)
    return { ...i, quantity: next }
  })
}

export function removeItem(items, productId) {
  return items.filter((i) => i.product.id !== productId)
}

export function itemsCount(items) {
  return items.reduce((sum, i) => sum + i.quantity, 0)
}

export function lineTotal(item) {
  return effectivePrice(item.product) * item.quantity
}

export function cartTotal(items) {
  return items.reduce((sum, i) => sum + lineTotal(i), 0)
}
