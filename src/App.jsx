import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Admin from './pages/Admin'
import ProductEdit from './pages/ProductEdit'
import NotFound from './pages/NotFound'
import { getProducts, createProduct, updateProduct, deleteProduct } from './api/products'
import { addItem, changeQuantity, removeItem, itemsCount } from './utils/cart'

export default function App() {
  // catálogo (igual ao módulo 4)
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let ignore = false
    setStatus('loading')
    getProducts()
      .then((data) => { if (!ignore) { setProducts(data); setStatus('success') } })
      .catch((err) => { if (!ignore) { setError(err.message); setStatus('error') } })
    return () => { ignore = true }
  }, [reloadKey])

  // carrinho (igual ao módulo 3)
  const [items, setItems] = useState([])
  const handleAdd = (product) => setItems((cur) => addItem(cur, product))
  const handleChange = (id, delta) => setItems((cur) => changeQuantity(cur, id, delta))
  const handleRemove = (id) => setItems((cur) => removeItem(cur, id))

  // mutações do catálogo (igual ao módulo 4)
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

  const catalog = { products, status, error, retry: () => setReloadKey((k) => k + 1) }

  return (
    <>
      <Header count={itemsCount(items)} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home catalog={catalog} onAdd={handleAdd} />} />
          <Route path="/produtos/:id" element={<ProductDetail catalog={catalog} onAdd={handleAdd} />} />
          <Route path="/carrinho" element={<Cart items={items} onChange={handleChange} onRemove={handleRemove} />} />
          <Route path="/admin" element={<Admin catalog={catalog} onDelete={handleDelete} />} />
          <Route path="/admin/novo" element={<ProductEdit catalog={catalog} onCreate={handleCreate} />} />
          <Route path="/admin/:id/editar" element={<ProductEdit catalog={catalog} onUpdate={handleUpdate} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}
