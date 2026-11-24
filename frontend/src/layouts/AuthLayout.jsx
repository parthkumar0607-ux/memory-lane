import Logo from '../components/ui/Logo'
import Polaroid from '../components/ui/Polaroid'

/** Shared frame for Login and Register: form on the left, a little scrapbook on the right. */
export default function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
      <main className="paper-card flex flex-col px-5 py-8 sm:px-10 lg:px-16">
        <Logo />
        <div className="mx-auto my-auto w-full max-w-md py-12">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">{title}</h1>
          <p className="mt-4 text-ink-700">{subtitle}</p>
          <div className="mt-9">{children}</div>
          <div className="mt-8 text-sm text-ink-700">{footer}</div>
        </div>
      </main>
      <aside aria-hidden className="paper-texture relative hidden overflow-hidden bg-cream-200 lg:block">
        <p className="absolute right-10 top-10 max-w-[14rem] text-right font-serif text-2xl italic leading-snug text-brown-600">
          Some moments deserve to live forever.
        </p>
        <div className="absolute left-[8%] top-[22%] w-[40%]"><Polaroid scene="mountain" caption="the hike" date="JUN 2021" rotate={-5} tape hoverLift={false} /></div>
        <div className="absolute right-[8%] top-[38%] w-[36%]"><Polaroid scene="campfire" caption="one more song" date="OCT 2022" rotate={6} hoverLift={false} /></div>
        <div className="absolute bottom-[5%] left-[20%] w-[36%]"><Polaroid scene="picnic" caption="sunday" date="MAY 2024" rotate={-3} tape hoverLift={false} /></div>
      </aside>
    </div>
  )
}
