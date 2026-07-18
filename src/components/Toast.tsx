import type { Toast, ToastType } from '../hooks/useToast'

function ToastIcon({ type }: { type: ToastType }) {
  if (type === 'success') return <span className="toast__icon" aria-hidden="true">&#10004;</span>
  if (type === 'error') return <span className="toast__icon" aria-hidden="true">&#10008;</span>
  return <span className="toast__icon" aria-hidden="true">&#8505;</span>
}

export default function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: Toast[]
  onRemove: (id: number) => void
}) {
  if (toasts.length === 0) return null
  return (
    <div className="toast-wrap" role="region" aria-label="Notifikasi" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast--${t.type}`}>
          <ToastIcon type={t.type} />
          <span>{t.message}</span>
          <button
            type="button"
            className="toast__close"
            onClick={() => onRemove(t.id)}
            aria-label="Tutup notifikasi"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  )
}
