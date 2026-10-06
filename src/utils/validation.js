export function validateProduct(values) {
  const errors = {}
  const name = values.name.trim()
  const price = Number(String(values.price).replace(',', '.'))
  const promo = values.promoPrice === '' ? null : Number(String(values.promoPrice).replace(',', '.'))
  const stock = Number(values.stock)

  if (name.length < 3) errors.name = 'Informe um nome com pelo menos 3 caracteres.'
  if (!Number.isFinite(price) || price <= 0) errors.price = 'Informe um preço maior que zero.'
  if (promo !== null) {
    if (!Number.isFinite(promo) || promo <= 0) errors.promoPrice = 'Informe um valor válido ou deixe em branco.'
    else if (promo >= price) errors.promoPrice = 'O preço promocional deve ser menor que o preço.'
  }
  if (!Number.isInteger(stock) || stock < 0) errors.stock = 'Informe um estoque inteiro, zero ou maior.'
  if (!/^https?:\/\/.+/i.test(values.image.trim())) errors.image = 'Informe uma URL começando com http:// ou https://.'
  if (values.description.length > 300) errors.description = 'A descrição pode ter no máximo 300 caracteres.'

  return errors
}
