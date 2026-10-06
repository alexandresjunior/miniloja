import { useEffect, useState } from 'react'
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import CartList from './components/CartList'
import Loading from './components/Loading'
import ErrorMessage from './components/ErrorMessage'
import Admin from './pages/Admin'
import { getProducts, createProduct, updateProduct, deleteProduct } from './api/products'
import { addItem, changeQuantity, removeItem, itemsCount } from './utils/cart'

export default function App() {
  // alternância provisória loja/admin (as rotas chegam no módulo 5)
  const [view, setView] = useState('store') // 'store' | 'admin'

  // catálogo vindo da API
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'error' | 'success'
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let ignore = false
    setStatus('loading')
    getProducts()
      .then((data) => {
        if (ignore) return
        setProducts(data)
        setStatus('success')
      })
      .catch((err) => {
        if (ignore) return
        setError(err.message)
        setStatus('error')
      })
    return () => { ignore = true }
  }, [reloadKey])

  const retry = () => setReloadKey((k) => k + 1)

  // mutações do catálogo
  const handleCreate = async (data) => {
    const created = await createProduct(data)
    setProducts((cur) => [...cur, created])
  }
  const handleUpdate = async (id, data) => {
    const updated = await updateProduct(id, data)
    setProducts((cur) => cur.map((p) => (p.id === id ? updated : p)))
  }
  const handleDelete = async (id) => {
    await deleteProduct(id)
    setProducts((cur) => cur.filter((p) => p.id !== id))
  }

  // carrinho
  const [items, setItems] = useState([])
  const handleAdd = (product) => setItems((current) => addItem(current, product))
  const handleChange = (id, delta) => setItems((current) => changeQuantity(current, id, delta))
  const handleRemove = (id) => setItems((current) => removeItem(current, id))

  return (
    <>
      <Header count={itemsCount(items)} />
      <main className="container">
        <nav className="tabs">
          <button onClick={() => setView('store')} disabled={view === 'store'}>Loja</button>
          <button onClick={() => setView('admin')} disabled={view === 'admin'}>Painel do lojista</button>
        </nav>

        {status === 'loading' && <Loading />}
        {status === 'error' && <ErrorMessage message={error} onRetry={retry} />}

        {status === 'success' && view === 'store' && (
          <div className="layout">
            <section>
              <h2>Produtos</h2>
              <ProductGrid products={products} onAdd={handleAdd} />
            </section>
            <aside>
              <h2>Carrinho</h2>
              <CartList items={items} onChange={handleChange} onRemove={handleRemove} />
            </aside>
          </div>
        )}

        {status === 'success' && view === 'admin' && (
          <Admin
            products={products}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </main>
    </>
  )
}
