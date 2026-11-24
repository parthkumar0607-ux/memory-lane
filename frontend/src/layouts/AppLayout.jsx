import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, LogOut, Menu, Settings, UserRound, X } from 'lucide-react'
import Logo from '../components/ui/Logo'
import { useAuth } from '../hooks/useAuth'
import { initials } from '../utils/validation'

// New sections (Memories, Albums, Timeline…) get added here as their phases ship.
const nav = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/profile', label: 'Profile', icon: UserRound },
  { to: '/settings', label: 'Settings', icon: Settings },
]

const linkClass = ({ isActive }) =>
  `inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.95rem] transition-colors ${
    isActive ? 'bg-ink-900 text-cream-50' : 'text-ink-700 hover:bg-cream-200 hover:text-ink-900'
  }`

/** The signed-in shell: consistent top navigation around every private page. */
export default function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="paper-texture min-h-screen">
      <header className="sticky top-0 z-40 border-b border-ink-900/10 bg-cream-100/90 backdrop-blur-md">
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
          <Logo />
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={linkClass}><Icon size={17} />{label}</NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <NavLink to="/profile" aria-label="Your profile" className="grid h-10 w-10 place-items-center rounded-full bg-clay-500 text-sm font-semibold text-cream-50">
              {initials(user?.display_name)}
            </NavLink>
            <button type="button" onClick={handleLogout} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-ink-700 hover:text-clay-600">
              <LogOut size={16} /> Log out
            </button>
          </div>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <nav aria-label="Mobile" className="container-page flex flex-col gap-1 pb-5 md:hidden">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} onClick={() => setOpen(false)} className={linkClass}><Icon size={17} />{label}</NavLink>
            ))}
            <button type="button" onClick={handleLogout} className="mt-2 inline-flex items-center gap-2 rounded-full px-4 py-2 text-ink-700">
              <LogOut size={17} /> Log out
            </button>
          </nav>
        )}
      </header>
      <Outlet />
    </div>
  )
}
