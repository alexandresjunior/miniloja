import ProductGrid from '../components/ProductGrid'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

export default function Home({ catalog, onAdd }) {
  const { products, status, error, retry } = catalog
  return (
    <section>
      <h2>Produtos</h2>
      {status === 'loading' && <Loading />}
      {status === 'error' && <ErrorMessage message={error} onRetry={retry} />}
      {status === 'success' && <ProductGrid products={products} onAdd={onAdd} />}
    </section>
  )
}
