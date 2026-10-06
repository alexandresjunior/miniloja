import { useState } from 'react'
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import CartList from './components/CartList'
import { mockProducts } from './data/mockProducts'
import { addItem, changeQuantity, removeItem, itemsCount } from './utils/cart'

export default function App() {
  const [items, setItems] = useState([])

  const handleAdd = (product) => setItems((current) => addItem(current, product))
  const handleChange = (id, delta) => setItems((current) => changeQuantity(current, id, delta))
  const handleRemove = (id) => setItems((current) => removeItem(current, id))

  return (
    <>
      <Header count={itemsCount(items)} />
      <main className="container layout">
        <section>
          <h2>Produtos</h2>
          <ProductGrid products={mockProducts} onAdd={handleAdd} />
        </section>
        <aside>
          <h2>Carrinho</h2>
          <CartList items={items} onChange={handleChange} onRemove={handleRemove} />
        </aside>
      </main>
    </>
  )
}
