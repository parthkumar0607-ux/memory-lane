import { Link } from 'react-router-dom'

export default function Logo({ className = '', tone = 'dark' }) {
  const text = tone === 'light' ? 'text-cream-50' : 'text-ink-900'
  return (
    <Link to="/" aria-label="Memory Lane — home" className={`inline-flex items-center gap-2.5 ${className}`}>
      <span aria-hidden className="relative grid h-9 w-9 place-items-center">
        <span className="absolute inset-0 -rotate-6 rounded-[3px] bg-cream-50 shadow-soft" />
        <span className="absolute inset-[5px] -rotate-6 bg-clay-500" />
        <span className="absolute right-[9px] top-[9px] h-2 w-2 -rotate-6 rounded-full bg-mustard-500" />
      </span>
      <span className={`font-serif text-[1.35rem] font-medium tracking-tight ${text}`}>
        Memory <em className="font-normal italic">Lane</em>
      </span>
    </Link>
  )
}
