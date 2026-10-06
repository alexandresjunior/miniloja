import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'

const products = [
  { id: 1, name: 'Sabonete de Lavanda', category: 'Sabonetes', price: 1890, stock: 25, image: 'x.jpg' },
  { id: 3, name: 'Sabonete de Aveia e Mel', category: 'Sabonetes', price: 1750, stock: 0, image: 'y.jpg' },
]

describe('ProductGrid', () => {
  it('mostra os produtos, o preço formatado e o selo de esgotado', () => {
    render(
      <MemoryRouter>
        <ProductGrid products={products} />
      </MemoryRouter>
    )
    expect(screen.getByText('Sabonete de Lavanda')).toBeInTheDocument()
    expect(screen.getByText(/18,90/)).toBeInTheDocument()
    expect(screen.getByText('Esgotado')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Indisponível' })).toBeDisabled()
  })
})
