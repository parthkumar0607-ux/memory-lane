import { useState } from 'react'
import { CalendarDays, MapPin } from 'lucide-react'
import FormField from '../components/ui/FormField'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'
import { useAuth } from '../hooks/useAuth'
import { initials } from '../utils/validation'

export default function Profile() {
  const { user, saveProfile } = useAuth()
  const [form, setForm] = useState({ displayName: user.display_name, bio: user.bio ?? '', location: user.location ?? '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', text: '' })
  const [busy, setBusy] = useState(false)

  const set = (k) => (e) => { setStatus({ type: '', text: '' }); setForm((f) => ({ ...f, [k]: e.target.value })) }
  const dirty = form.displayName !== user.display_name || form.bio !== (user.bio ?? '') || form.location !== (user.location ?? '')

  const submit = async (e) => {
    e.preventDefault()
    if (!form.displayName.trim()) { setErrors({ display_name: 'Your name can’t be empty.' }); return }
    setErrors({})
    setBusy(true)
    try {
      const updated = await saveProfile({ display_name: form.displayName, bio: form.bio, location: form.location })
      setForm({ displayName: updated.display_name, bio: updated.bio ?? '', location: updated.location ?? '' })
      setStatus({ type: 'success', text: 'Profile saved.' })
    } catch (err) {
      setErrors(err.fieldErrors || {})
      setStatus({ type: 'error', text: err.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="container-page py-14 sm:py-20">
      <p className="eyebrow">Your profile</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">This is you.</h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-[18rem_1fr] lg:gap-16">
        <aside className="h-fit rounded-[4px] border border-cream-300/80 bg-cream-50 p-7 text-center shadow-soft">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-clay-500 font-serif text-3xl text-cream-50">{initials(user.display_name)}</div>
          <h2 className="mt-5 text-2xl">{user.display_name}</h2>
          <p className="mt-1 break-all text-sm text-ink-500">{user.email}</p>
          <ul className="mt-5 space-y-2 text-sm text-ink-700">
            {user.location && <li className="flex items-center justify-center gap-2"><MapPin size={15} /> {user.location}</li>}
            <li className="flex items-center justify-center gap-2"><CalendarDays size={15} /> Joined {new Date(user.created_at).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</li>
          </ul>
          {user.bio && <p className="mt-5 border-t border-dashed border-ink-900/20 pt-5 font-serif italic text-ink-700">{user.bio}</p>}
        </aside>

        <form onSubmit={submit} noValidate className="max-w-xl space-y-5">
          {status.text && <Alert tone={status.type}>{status.text}</Alert>}
          <FormField label="Display name" value={form.displayName} onChange={set('displayName')} error={errors.display_name} maxLength={80} />
          <FormField label="Location" value={form.location} onChange={set('location')} error={errors.location} maxLength={120} placeholder="Where are you based?" />
          <FormField as="textarea" rows={4} label="A little about you" value={form.bio} onChange={set('bio')} error={errors.bio} maxLength={500} hint={`${form.bio.length}/500`} />
          <Button type="submit" disabled={busy || !dirty}>{busy ? <Spinner label="Saving" className="text-cream-50" /> : 'Save changes'}</Button>
        </form>
      </div>
    </main>
  )
}
