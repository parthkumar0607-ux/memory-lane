import { useState } from 'react'
import FormField from '../components/ui/FormField'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'
import { useAuth } from '../hooks/useAuth'
import { changePassword } from '../services/auth'

const empty = { current: '', next: '', confirm: '' }

export default function Settings() {
  const { user, logout } = useAuth()
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', text: '' })
  const [busy, setBusy] = useState(false)

  const set = (k) => (e) => { setStatus({ type: '', text: '' }); setForm((f) => ({ ...f, [k]: e.target.value })) }

  const submit = async (e) => {
    e.preventDefault()
    const found = {}
    if (!form.current) found.current_password = 'Enter your current password.'
    if (form.next.length < 8) found.new_password = 'Use at least 8 characters.'
    if (form.confirm !== form.next) found.confirm = 'The two passwords don’t match.'
    setErrors(found)
    if (Object.keys(found).length) return
    setBusy(true)
    try {
      await changePassword({ current_password: form.current, new_password: form.next })
      setForm(empty)
      setStatus({ type: 'success', text: 'Password updated.' })
    } catch (err) {
      setErrors(err.fieldErrors || {})
      setStatus({ type: 'error', text: err.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="container-page py-14 sm:py-20">
      <p className="eyebrow">Settings</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Keep things safe.</h1>

      <section className="mt-12 max-w-xl">
        <h2 className="text-2xl">Account</h2>
        <p className="mt-2 text-ink-700">Signed in as <strong className="font-medium text-ink-900">{user.email}</strong>.</p>
      </section>

      <section className="mt-12 max-w-xl border-t border-ink-900/10 pt-10">
        <h2 className="text-2xl">Change password</h2>
        <form onSubmit={submit} noValidate className="mt-6 space-y-5">
          {status.text && <Alert tone={status.type}>{status.text}</Alert>}
          <FormField label="Current password" type="password" autoComplete="current-password" value={form.current} onChange={set('current')} error={errors.current_password} />
          <FormField label="New password" type="password" autoComplete="new-password" value={form.next} onChange={set('next')} error={errors.new_password} hint="At least 8 characters." />
          <FormField label="Confirm new password" type="password" autoComplete="new-password" value={form.confirm} onChange={set('confirm')} error={errors.confirm} />
          <Button type="submit" disabled={busy}>{busy ? <Spinner label="Updating" className="text-cream-50" /> : 'Update password'}</Button>
        </form>
      </section>

      <section className="mt-12 max-w-xl border-t border-ink-900/10 pt-10">
        <h2 className="text-2xl">Log out</h2>
        <p className="mt-2 text-ink-700">You&rsquo;ll need your email and password to get back in.</p>
        <Button variant="secondary" className="mt-5" onClick={logout}>Log out of this device</Button>
      </section>
    </main>
  )
}
