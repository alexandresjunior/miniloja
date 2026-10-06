import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section>
      <h2>Página não encontrada</h2>
      <p>O endereço que você acessou não existe.</p>
      <Link to="/">Voltar para a loja</Link>
    </section>
  )
}
