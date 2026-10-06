import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

vi.mock('../api/products', () => ({
  getProduct: vi.fn(),
  getProducts: vi.fn().mockResolvedValue([
    { id: 1, name: 'Sabonete de Lavanda', category: 'Sabonetes', price: 1890, stock: 25, image: 'x.jpg' },
    { id: 3, name: 'Sabonete de Aveia e Mel', category: 'Sabonetes', price: 1750, stock: 0, image: 'y.jpg' },
  ]),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
}))

describe('App', () => {
  it('adiciona um produto ao carrinho e atualiza o contador', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    // 'find' espera o aparecimento (a API é assíncrona)
    expect(await screen.findByText('Sabonete de Lavanda')).toBeInTheDocument()
    expect(screen.getByLabelText('Carrinho: 0 itens')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Comprar' }))

    expect(screen.getByLabelText('Carrinho: 1 itens')).toBeInTheDocument()
  })
})
