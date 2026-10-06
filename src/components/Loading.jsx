export default function Loading({ text = 'Carregando…' }) {
  return <p className="status" role="status">{text}</p>
}
