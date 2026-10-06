export default function Header({ count = 0 }) {
  return (
    <header className="header">
      <h1>MiniLoja</h1>
      <span className="tagline">Casa Nativa · sabonetes e cosméticos artesanais</span>
      <span className="cart-badge" aria-label={`Itens no carrinho: ${count}`}>
        🛒 {count}
      </span>
    </header>
  )
}
