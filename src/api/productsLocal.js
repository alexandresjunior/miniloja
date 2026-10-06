const KEY = 'miniloja:products'

async function readAll() {
  const saved = localStorage.getItem(KEY)
  if (saved) return JSON.parse(saved)
  const response = await fetch(`${import.meta.env.BASE_URL}products.seed.json`)
  if (!response.ok) throw new Error('Não foi possível carregar o catálogo de demonstração')
  const data = await response.json()
  localStorage.setItem(KEY, JSON.stringify(data))
  return data
}

const save = (list) => localStorage.setItem(KEY, JSON.stringify(list))

export async function getProducts() {
  return readAll()
}

export async function getProduct(id) {
  const all = await readAll()
  const found = all.find((p) => String(p.id) === String(id))
  if (!found) throw new Error('Erro 404 ao acessar a API')
  return found
}

export async function createProduct(data) {
  const all = await readAll()
  const id = Math.max(0, ...all.map((p) => p.id)) + 1
  const created = { ...data, id }
  save([...all, created])
  return created
}

export async function updateProduct(id, data) {
  const all = await readAll()
  const updated = { ...data, id }
  save(all.map((p) => (p.id === id ? updated : p)))
  return updated
}

export async function deleteProduct(id) {
  const all = await readAll()
  save(all.filter((p) => p.id !== id))
  return null
}
