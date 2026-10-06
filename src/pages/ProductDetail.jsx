import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { formatPrice } from '../utils/format'

export default function ProductDetail({ catalog, onAdd }) {
  const { id } = useParams() // sempre string!
  const { products, status, error, retry } = catalog

  if (status === 'loading') return <Loading />
  if (status === 'error') return <ErrorMessage message={error} onRetry={retry} />

  const product = products.find((p) => String(p.id) === id)
  if (!product) {
    return (
      <section>
        <h2>Produto não encontrado</h2>
        <Link to="/">Voltar para a loja</Link>
      </section>
    )
  }

  const soldOut = product.stock === 0
  const hasPromo = product.promoPrice != null

  return (
    <article className="detail">
      <Link to="/">← Voltar</Link>
      <div className="detail-body">
        <img src={product.image} alt={product.name} />
        <div>
          <span className="category">{product.category}</span>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="price">
            {hasPromo && <s className="old-price">{formatPrice(product.price)}</s>}
            <strong>{formatPrice(hasPromo ? product.promoPrice : product.price)}</strong>
          </p>
          <p>{soldOut ? 'Produto esgotado' : `${product.stock} unidades em estoque`}</p>
          <button disabled={soldOut} onClick={() => onAdd(product)}>
            {soldOut ? 'Indisponível' : 'Adicionar ao carrinho'}
          </button>
        </div>
      </div>
    </article>
  )
}
