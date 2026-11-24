import Logo from '../ui/Logo'

const columns = [
  { title: 'Explore', items: [['Features', '#features'], ['How it works', '#how-it-works'], ['Letters to the future', '#letters']] },
  { title: 'Account', items: [['Create an account', '/register'], ['Log in', '/login']] },
]

export default function Footer() {
  return (
    <footer className="relative bg-ink-900 text-cream-200">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div className="max-w-sm">
          <Logo tone="light" />
          <p className="mt-5 font-serif text-xl italic leading-snug text-cream-300">
            A little corner of the internet for your favourite people.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream-400">{col.title}</h3>
            <ul className="mt-5 space-y-3">
              {col.items.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-cream-200 transition-colors hover:text-rose-300">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-cream-50/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Memory Lane. Made with care for the moments that matter.</p>
          <p className="font-hand text-xl text-cream-400">keep the good ones.</p>
        </div>
      </div>
    </footer>
  )
}
