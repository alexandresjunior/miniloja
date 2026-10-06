import * as remote from './products'
import * as local from './productsLocal'

const impl = import.meta.env.VITE_DEMO === 'true' ? local : remote

export const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = impl
