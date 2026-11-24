import { Link } from 'react-router-dom'

const base =
  'group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 ease-out-soft focus-visible:outline-offset-4 active:translate-y-px'

const variants = {
  primary:
    'bg-ink-900 text-cream-50 shadow-soft hover:bg-clay-600 hover:shadow-paper',
  secondary:
    'border border-ink-900/20 bg-cream-50/60 text-ink-900 hover:border-ink-900/50 hover:bg-cream-50',
  ghost: 'text-ink-800 hover:text-clay-600',
  light: 'bg-cream-50 text-ink-900 hover:bg-white shadow-soft',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[0.95rem]',
  lg: 'px-8 py-4 text-base',
}

/** Renders a router <Link>, an <a>, or a <button> depending on the props it gets. */
export default function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if (to) return <Link to={to} className={classes} {...rest}>{children}</Link>
  if (href) return <a href={href} className={classes} {...rest}>{children}</a>
  return <button type="button" className={classes} {...rest}>{children}</button>
}
