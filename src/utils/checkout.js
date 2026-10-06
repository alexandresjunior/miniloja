import { formatPrice, effectivePrice } from './format'
import { cartTotal, lineTotal } from './cart'
import { WHATSAPP_NUMBER } from '../config'

export function buildOrderMessage(items) {
  const lines = items.map(
    (i) => `• ${i.quantity}x ${i.product.name} — ${formatPrice(effectivePrice(i.product))} cada = ${formatPrice(lineTotal(i))}`
  )
  return [
    'Olá! Gostaria de fazer o seguinte pedido na Casa Nativa:',
    '',
    ...lines,
    '',
    `Total: ${formatPrice(cartTotal(items))}`,
  ].join('\n')
}

export function buildWhatsAppUrl(items) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage(items))}`
}
