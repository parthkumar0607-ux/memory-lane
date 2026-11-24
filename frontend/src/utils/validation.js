// Client-side checks are a courtesy for faster feedback — the server validates everything again.
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

export function validateRegister({ displayName, email, password }) {
  const e = {}
  if (!displayName.trim()) e.display_name = 'Tell us what to call you.'
  if (!isEmail(email)) e.email = 'Enter a valid email address.'
  if (password.length < 8) e.password = 'Use at least 8 characters.'
  else if (password.length > 64) e.password = 'Use 64 characters or fewer.'
  return e
}

export function validateLogin({ email, password }) {
  const e = {}
  if (!isEmail(email)) e.email = 'Enter a valid email address.'
  if (!password) e.password = 'Enter your password.'
  return e
}

export const initials = (name = '') =>
  name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('') || '?'
