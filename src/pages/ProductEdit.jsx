import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import ProductForm from '../components/ProductForm'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

export default function ProductEdit({ catalog, onCreate, onUpdate }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { products, status } = catalog
  const editing = Boolean(id)
  const product = editing ? products.find((p) => String(p.id) === id) : null

  if (editing && status === 'loading') return <Loading />
  if (editing && status === 'error') return <ErrorMessage message={catalog.error} onRetry={catalog.retry} />

  if (editing && !product) {
    return (
      <section>
        <h2>Produto não encontrado</h2>
        <Link to="/admin">Voltar ao painel</Link>
      </section>
    )
  }

  async function handleSubmit(data) {
    try {
      setError('')
      if (editing) await onUpdate(product.id, data)
      else await onCreate(data)
      navigate('/admin')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <section>
      <h2>{editing ? 'Editar produto' : 'Novo produto'}</h2>
      {error && <p className="status error" role="alert">{error}</p>}
      <ProductForm initial={product} onSubmit={handleSubmit} onCancel={() => navigate('/admin')} />
    </section>
  )
}
