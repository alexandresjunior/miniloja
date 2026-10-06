import { Link, NavLink } from 'react-router-dom'

export default function Header({ count = 0 }) {
  return (
    <header className="header">
      <Link to="/" className="brand"><h1>MiniLoja</h1></Link>
      <nav className="nav">
        <NavLink to="/">Loja</NavLink>
        <NavLink to="/admin">Painel</NavLink>
      </nav>
      <Link to="/carrinho" className="cart-badge" aria-label={`Carrinho: ${count} itens`}>
        🛒 {count}
      </Link>
    </header>
  )
}
