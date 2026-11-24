import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import FormField from '../components/ui/FormField'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'
import { useAuth } from '../hooks/useAuth'
import { validateLogin } from '../utils/validation'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setFormError('')
    const found = validateLogin(form)
    setErrors(found)
    if (Object.keys(found).length) return
    setBusy(true)
    try {
      await login({ email: form.email.trim(), password: form.password })
      navigate(location.state?.from || '/dashboard', { replace: true })
    } catch (err) {
      setErrors(err.fieldErrors || {})
      setFormError(err.message)
      setBusy(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Good to see you again."
      subtitle="Log in to pick up where you left off."
      footer={<>New here? <Link to="/register" className="font-medium text-ink-900 underline decoration-clay-500/50 underline-offset-4 hover:text-clay-600">Create an account</Link></>}
    >
      <form onSubmit={submit} noValidate className="space-y-5">
        {formError && <Alert>{formError}</Alert>}
        <FormField label="Email" type="email" autoComplete="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="you@example.com" />
        <FormField label="Password" type="password" autoComplete="current-password" value={form.password} onChange={set('password')} error={errors.password} />
        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy ? <Spinner label="Logging in" className="text-cream-50" /> : 'Log in'}
        </Button>
      </form>
    </AuthLayout>
  )
}
