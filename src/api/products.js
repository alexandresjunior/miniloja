import { API_URL } from '../config'

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao acessar a API`)
  }
  return response.status === 204 ? null : response.json()
}

export const getProducts = () => request('/products')
export const getProduct = (id) => request(`/products/${id}`)
export const createProduct = (data) =>
  request('/products', { method: 'POST', body: JSON.stringify(data) })
export const updateProduct = (id, data) =>
  request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteProduct = (id) =>
  request(`/products/${id}`, { method: 'DELETE' })
