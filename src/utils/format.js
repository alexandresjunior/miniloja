const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function formatPrice(cents) {
  return brl.format(cents / 100)
}

export function effectivePrice(product) {
  return product.promoPrice ?? product.price
}
