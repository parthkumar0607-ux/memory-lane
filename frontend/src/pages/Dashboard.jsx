import { Camera } from 'lucide-react'
import Polaroid from '../components/ui/Polaroid'
import { useAuth } from '../hooks/useAuth'

function greeting() {
  const h = new Date().getHours()
  if (h < 5) return 'Still up'
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

/**
 * Phase 2 dashboard: a real, personal landing spot for signed-in users.
 * Memory stats, albums and On This Day arrive once there are memories to show (Phases 3–5).
 */
export default function Dashboard() {
  const { user } = useAuth()
  const firstName = user.display_name.split(' ')[0]

  return (
    <main className="container-page py-14 sm:py-20">
      <p className="eyebrow">{new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      <h1 className="mt-3 text-4xl sm:text-6xl">{greeting()}, <em className="font-normal text-clay-600">{firstName}.</em></h1>
      <p className="mt-4 max-w-xl text-lg text-ink-700">Welcome to your corner of the internet.</p>

      <section className="mt-14 grid items-center gap-10 rounded-[4px] border border-cream-300/80 bg-cream-50 p-8 shadow-soft sm:p-12 md:grid-cols-[1fr_auto]">
        <div className="max-w-lg">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-cream-200 text-clay-600"><Camera size={22} strokeWidth={1.6} /></span>
          <h2 className="mt-5 text-3xl">Your memory wall is empty — for now.</h2>
          <p className="mt-3 text-ink-700">
            Uploading photos and videos is the next thing we&rsquo;re building. When it lands, your recent memories,
            shared albums and On This Day surprises will appear right here.
          </p>
        </div>
        <div className="mx-auto w-44 md:w-52">
          <Polaroid scene="cafe" caption="soon" rotate={4} tape hoverLift={false} />
        </div>
      </section>
    </main>
  )
}
