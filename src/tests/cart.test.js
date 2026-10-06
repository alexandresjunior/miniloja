import { addItem, cartTotal } from '../utils/cart'

const lavanda = { id: 1, name: 'Sabonete de Lavanda', price: 1890, stock: 2 }
const serum = { id: 7, name: 'Sérum', price: 7990, promoPrice: 6990, stock: 5 }

describe('carrinho', () => {
  it('soma o total usando o preço promocional quando existir', () => {
    const items = [
      { product: lavanda, quantity: 2 }, // 2 x 18,90 = 3780
      { product: serum, quantity: 1 }, // 1 x 69,90 = 6990
    ]
    expect(cartTotal(items)).toBe(10770)
  })

  it('não permite ultrapassar o estoque', () => {
    let items = []
    items = addItem(items, lavanda)
    items = addItem(items, lavanda)
    items = addItem(items, lavanda) // estoque é 2
    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(2)
  })
})
