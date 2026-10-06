import { useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { formatPrice } from '../utils/format'

export default function Admin({ catalog, onDelete }) {
  const { products, status, error: loadError, retry } = catalog
  const [error, setError] = useState('')

  async function handleDelete(product) {
    if (!window.confirm(`Excluir "${product.name}"? Esta ação não pode ser desfeita.`)) return
    try {
      setError('')
      await onDelete(product.id)
    } catch (e) {
      setError(e.message)
    }
  }

  if (status === 'loading') return <Loading />
  if (status === 'error') return <ErrorMessage message={loadError} onRetry={retry} />

  return (
    <section>
      <h2>Painel do lojista</h2>
      {error && <p className="status error" role="alert">{error}</p>}
      <Link className="btn" to="/admin/novo">Novo produto</Link>
      <table className="admin-table">
        <thead>
          <tr><th>ID</th><th>Nome</th><th>Preço</th><th>Estoque</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{formatPrice(p.price)}</td>
              <td>{p.stock}</td>
              <td>
                <Link className="btn secondary" to={`/admin/${p.id}/editar`}>Editar</Link>{' '}
                <button className="danger" onClick={() => handleDelete(p)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
