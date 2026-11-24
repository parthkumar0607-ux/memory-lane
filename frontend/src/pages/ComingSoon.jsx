import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Logo from '../components/ui/Logo'
import Polaroid from '../components/ui/Polaroid'

/**
 * Honest holding page for routes that arrive in later phases
 * (login / register land in Phase 2). It says what it is instead of faking a form.
 */
export default function ComingSoon({ title, phase }) {
  return (
    <main className="paper-texture grid min-h-screen place-items-center px-5 py-16">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <Logo />
        <div className="mt-12 w-40">
          <Polaroid scene="cafe" rotate={-4} tape hoverLift={false} />
        </div>
        <p className="eyebrow mt-10">{phase}</p>
        <h1 className="mt-3 text-4xl">{title} is on its way</h1>
        <p className="mt-4 text-ink-700">
          We&rsquo;re building Memory Lane one careful step at a time. This page arrives with {phase.toLowerCase()}.
        </p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 text-ink-900 underline decoration-clay-500/50 underline-offset-4 transition-colors hover:text-clay-600">
          <ArrowLeft size={16} /> Back to the landing page
        </Link>
      </div>
    </main>
  )
}
