import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Admin from './pages/Admin'
import ProductEdit from './pages/ProductEdit'
import NotFound from './pages/NotFound'
import { useProducts } from './hooks/useProducts'
import { useCart } from './hooks/useCart'

export default function App() {
  const catalog = useProducts()
  const cart = useCart()

  return (
    <>
      <Header count={cart.count} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home catalog={catalog} onAdd={cart.add} />} />
          <Route path="/produtos/:id" element={<ProductDetail catalog={catalog} onAdd={cart.add} />} />
          <Route path="/carrinho" element={<Cart items={cart.items} onChange={cart.change} onRemove={cart.remove} />} />
          <Route path="/admin" element={<Admin catalog={catalog} onDelete={catalog.remove} />} />
          <Route path="/admin/novo" element={<ProductEdit catalog={catalog} onCreate={catalog.create} />} />
          <Route path="/admin/:id/editar" element={<ProductEdit catalog={catalog} onUpdate={catalog.update} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}
