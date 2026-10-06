import { Link } from 'react-router-dom'
import CartList from '../components/CartList'
import { buildWhatsAppUrl } from '../utils/checkout'

export default function Cart({ items, onChange, onRemove }) {
  return (
    <section>
      <h2>Seu carrinho</h2>
      <CartList items={items} onChange={onChange} onRemove={onRemove} />
      {items.length === 0 ? (
        <Link to="/">Continuar comprando</Link>
      ) : (
        <a className="btn" href={buildWhatsAppUrl(items)} target="_blank" rel="noopener noreferrer">
          Finalizar pelo WhatsApp
        </a>
      )}
    </section>
  )
}
