import { formatPrice } from '../utils/format'

export default function ProductCard({ product, onAdd }) {
  const soldOut = product.stock === 0
  const hasPromo = product.promoPrice != null

  return (
    <article className="card">
      <div className="card-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        {soldOut && <span className="badge">Esgotado</span>}
      </div>
      <div className="card-body">
        <span className="category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="price">
          {hasPromo && <s className="old-price">{formatPrice(product.price)}</s>}
          <strong>{formatPrice(hasPromo ? product.promoPrice : product.price)}</strong>
        </p>
        <button disabled={soldOut} onClick={() => onAdd?.(product)}>
          {soldOut ? 'Indisponível' : 'Comprar'}
        </button>
      </div>
    </article>
  )
}
