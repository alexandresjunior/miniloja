import { useCallback, useEffect, useState } from 'react'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'error' | 'success'
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

  const retry = useCallback(() => setReloadKey((k) => k + 1), [])

  const create = async (data) => {
    const created = await createProduct(data)
    setProducts((cur) => [...cur, created])
  }
  const update = async (id, data) => {
    const updated = await updateProduct(id, data)
    setProducts((cur) => cur.map((p) => (p.id === id ? updated : p)))
  }
  const remove = async (id) => {
    await deleteProduct(id)
    setProducts((cur) => cur.filter((p) => p.id !== id))
  }

  return { products, status, error, retry, create, update, remove }
}
