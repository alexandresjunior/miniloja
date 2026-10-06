const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function formatPrice(cents) {
  return brl.format(cents / 100)
}

export function effectivePrice(product) {
  return product.promoPrice ?? product.price
}

export function toCents(text) {
  const n = Number(String(text).replace(',', '.'))
  return Math.round(n * 100)
}

export function fromCents(cents) {
  return (cents / 100).toFixed(2).replace('.', ',')
}
