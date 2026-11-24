import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import FormField from '../components/ui/FormField'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'
import { useAuth } from '../hooks/useAuth'
import { validateRegister } from '../utils/validation'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ displayName: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setFormError('')
    const found = validateRegister(form)
    setErrors(found)
    if (Object.keys(found).length) return
    setBusy(true)
    try {
      await register({ display_name: form.displayName.trim(), email: form.email.trim(), password: form.password })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setErrors(err.fieldErrors || {})
      setFormError(err.message)
      setBusy(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Start your album"
      title="Let’s make a little room for your memories."
      subtitle="It takes about a minute. Everything you add stays private unless you choose to share it."
      footer={<>Already have an account? <Link to="/login" className="font-medium text-ink-900 underline decoration-clay-500/50 underline-offset-4 hover:text-clay-600">Log in</Link></>}
    >
      <form onSubmit={submit} noValidate className="space-y-5">
        {formError && <Alert>{formError}</Alert>}
        <FormField label="What should we call you?" autoComplete="name" value={form.displayName} onChange={set('displayName')} error={errors.display_name} maxLength={80} />
        <FormField label="Email" type="email" autoComplete="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="you@example.com" />
        <FormField label="Password" type="password" autoComplete="new-password" value={form.password} onChange={set('password')} error={errors.password} hint="At least 8 characters." />
        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy ? <Spinner label="Creating your account" className="text-cream-50" /> : 'Create my account'}
        </Button>
      </form>
    </AuthLayout>
  )
}
