import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Letters', href: '#letters' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? 'border-b border-ink-900/10 bg-cream-100/90 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[0.95rem] text-ink-700 transition-colors hover:text-clay-600">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button to="/login" variant="ghost" size="sm">Log in</Button>
          <Button to="/register" size="sm">Start your album</Button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full text-ink-900 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <nav aria-label="Mobile" className="container-page flex flex-col gap-1 pb-6 pt-2">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-ink-900/10 py-3.5 font-serif text-xl text-ink-900">
                  {l.label}
                </a>
              ))}
              <div className="mt-5 flex flex-col gap-3">
                <Button to="/register" size="lg">Start your album</Button>
                <Button to="/login" variant="secondary" size="lg">Log in</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
