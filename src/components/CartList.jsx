import CartItem from './CartItem'
import { formatPrice } from '../utils/format'
import { cartTotal, itemsCount } from '../utils/cart'

export default function CartList({ items, onChange, onRemove }) {
  if (items.length === 0) {
    return <p className="empty">Seu carrinho está vazio.</p>
  }
  return (
    <>
      <ul className="cart-list">
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} onChange={onChange} onRemove={onRemove} />
        ))}
      </ul>
      <div className="cart-totals">
        <span>{itemsCount(items)} item(ns)</span>
        <strong>Total: {formatPrice(cartTotal(items))}</strong>
      </div>
    </>
  )
}
