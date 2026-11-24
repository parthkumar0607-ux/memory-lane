import { useId } from 'react'

const inputBase =
  'w-full rounded-[4px] border bg-cream-50/80 px-4 py-3 text-ink-900 placeholder:text-ink-400 transition-colors duration-200 focus:border-clay-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-clay-500/20'

/** Label + input (or textarea) + inline error, wired for screen readers. */
export default function FormField({ label, error, hint, as = 'input', className = '', ...props }) {
  const id = useId()
  const Tag = as
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-800">{label}</label>
      <Tag
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        className={`${inputBase} ${error ? 'border-clay-600' : 'border-ink-900/20'}`}
        {...props}
      />
      {error ? (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-sm text-clay-600">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-500">{hint}</p>
      ) : null}
    </div>
  )
}
