import { Loader2 } from 'lucide-react'

export default function Spinner({ label = 'Loading', className = '' }) {
  return (
    <span role="status" className={`inline-flex items-center gap-2 text-ink-500 ${className}`}>
      <Loader2 size={18} className="animate-spin" aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  )
}

export function FullPageSpinner() {
  return (
    <div className="paper-texture grid min-h-screen place-items-center">
      <Spinner label="Opening your album" className="text-clay-600" />
    </div>
  )
}
