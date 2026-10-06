import { useState } from 'react'
import { CATEGORIES } from '../config'
import { toCents, fromCents } from '../utils/format'
import { validateProduct } from '../utils/validation'

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

function Field({ label, name, error, children }) {
  return (
    <label>{label}
      {children}
      {error && <span id={`err-${name}`} className="field-error">{error}</span>}
    </label>
  )
}

export default function ProductForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial ? toForm(initial) : empty)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validateProduct(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return // impede o envio
    onSubmit(toProduct(form))
  }

  // atributos comuns de acessibilidade para cada campo
  const a11y = (name) => ({
    name,
    value: form[name],
    onChange: handleChange,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `err-${name}` : undefined,
  })

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <Field label="Nome" name="name" error={errors.name}>
        <input {...a11y('name')} />
      </Field>
      <Field label="Categoria" name="category" error={errors.category}>
        <select {...a11y('category')}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>
      <Field label="Descrição" name="description" error={errors.description}>
        <textarea {...a11y('description')} rows="3" />
      </Field>
      <Field label="Preço (R$)" name="price" error={errors.price}>
        <input {...a11y('price')} inputMode="decimal" />
      </Field>
      <Field label="Preço promocional (R$, opcional)" name="promoPrice" error={errors.promoPrice}>
        <input {...a11y('promoPrice')} inputMode="decimal" />
      </Field>
      <Field label="Estoque" name="stock" error={errors.stock}>
        <input {...a11y('stock')} type="number" min="0" />
      </Field>
      <Field label="URL da imagem" name="image" error={errors.image}>
        <input {...a11y('image')} />
      </Field>
      <div className="form-actions">
        <button type="submit">Salvar</button>
        <button type="button" className="secondary" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  )
}
