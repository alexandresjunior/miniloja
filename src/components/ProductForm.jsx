import { useState } from 'react'
import { CATEGORIES } from '../config'
import { toCents, fromCents } from '../utils/format'

const empty = { name: '', category: CATEGORIES[0], description: '', price: '', promoPrice: '', stock: '0', image: '' }

function toForm(p) {
  return {
    name: p.name, category: p.category, description: p.description ?? '',
    price: fromCents(p.price), promoPrice: p.promoPrice ? fromCents(p.promoPrice) : '',
    stock: String(p.stock), image: p.image,
  }
}

function toProduct(f) {
  return {
    name: f.name.trim(), category: f.category, description: f.description.trim(),
    price: toCents(f.price), promoPrice: f.promoPrice ? toCents(f.promoPrice) : undefined,
    stock: Number(f.stock), image: f.image.trim(),
  }
}

export default function ProductForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial ? toForm(initial) : empty)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(toProduct(form))
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>Nome
        <input name="name" value={form.name} onChange={handleChange} />
      </label>
      <label>Categoria
        <select name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
      <label>Descrição
        <textarea name="description" value={form.description} onChange={handleChange} rows="3" />
      </label>
      <label>Preço (R$)
        <input name="price" inputMode="decimal" value={form.price} onChange={handleChange} />
      </label>
      <label>Preço promocional (R$, opcional)
        <input name="promoPrice" inputMode="decimal" value={form.promoPrice} onChange={handleChange} />
      </label>
      <label>Estoque
        <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} />
      </label>
      <label>URL da imagem
        <input name="image" value={form.image} onChange={handleChange} />
      </label>
      <div className="form-actions">
        <button type="submit">Salvar</button>
        <button type="button" className="secondary" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  )
}
