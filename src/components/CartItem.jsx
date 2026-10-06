import { formatPrice, effectivePrice } from '../utils/format'
import { lineTotal } from '../utils/cart'

export default function CartItem({ item, onChange, onRemove }) {
  const { product, quantity } = item
  return (
    <li className="cart-item">
      <img src={product.image} alt="" width="56" height="56" />
      <div className="cart-info">
        <strong>{product.name}</strong>
        <small>{formatPrice(effectivePrice(product))} cada</small>
      </div>
      <div className="qty">
        <button
          aria-label={`Diminuir quantidade de ${product.name}`}
          onClick={() => onChange(product.id, -1)}
          disabled={quantity <= 1}
        >−</button>
        <span>{quantity}</span>
        <button
          aria-label={`Aumentar quantidade de ${product.name}`}
          onClick={() => onChange(product.id, 1)}
          disabled={quantity >= product.stock}
        >+</button>
      </div>
      <strong>{formatPrice(lineTotal(item))}</strong>
      <button className="link" onClick={() => onRemove(product.id)}>Remover</button>
    </li>
  )
}
