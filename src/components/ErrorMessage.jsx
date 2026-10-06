export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="status error" role="alert">
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Tentar novamente</button>}
    </div>
  )
}
