import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import { mockProducts } from './data/mockProducts'

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <h2>Produtos</h2>
        <ProductGrid products={mockProducts} />
      </main>
    </>
  )
}
