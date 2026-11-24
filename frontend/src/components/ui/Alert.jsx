import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function Alert({ tone = 'error', children }) {
  const isError = tone === 'error'
  const Icon = isError ? AlertCircle : CheckCircle2
  return (
    <div
      role={isError ? 'alert' : 'status'}
      className={`flex items-start gap-3 rounded-[4px] border px-4 py-3 text-sm ${
        isError ? 'border-clay-500/40 bg-clay-500/10 text-clay-600' : 'border-sage-500/50 bg-sage-500/10 text-ink-800'
      }`}
    >
      <Icon size={18} className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </div>
  )
}
