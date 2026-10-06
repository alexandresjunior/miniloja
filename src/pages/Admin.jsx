import { useState } from 'react'
import ProductForm from '../components/ProductForm'
import { formatPrice } from '../utils/format'

export default function Admin({ products, onCreate, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null) // null | 'new' | objeto do produto
  const [error, setError] = useState('')

  async function handleSubmit(data) {
    try {
      setError('')
      if (editing === 'new') await onCreate(data)
      else await onUpdate(editing.id, data)
      setEditing(null)
    } catch (e) {
      setError(e.message)
    }
  }

  async function handleDelete(product) {
    if (!window.confirm(`Excluir "${product.name}"? Esta ação não pode ser desfeita.`)) return
    try {
      setError('')
      await onDelete(product.id)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <section>
      <h2>Painel do lojista</h2>
      {error && <p className="status error" role="alert">{error}</p>}
      {editing ? (
        <ProductForm
          initial={editing === 'new' ? null : editing}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
        />
      ) : (
        <>
          <button onClick={() => setEditing('new')}>Novo produto</button>
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
                    <button className="secondary" onClick={() => setEditing(p)}>Editar</button>{' '}
                    <button className="danger" onClick={() => handleDelete(p)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  )
}
