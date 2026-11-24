import { motion } from 'framer-motion'
import { Lock, Mail } from 'lucide-react'
import Reveal from '../ui/Reveal'

export default function Letters() {
  return (
    <section id="letters" className="relative scroll-mt-20 overflow-hidden bg-brown-700 py-24 text-cream-100 sm:py-32">
      <div aria-hidden className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.9  0 0 0 0 0.8  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }} />
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow !text-rose-300">Letters to the future</p>
          <h2 className="mt-4 text-4xl !text-cream-50 sm:text-5xl">
            Write now. <em className="font-normal">Open later.</em>
          </h2>
          <p className="mt-6 max-w-lg text-lg text-cream-200">
            Write a letter to yourself or to a friend, pick a date, and seal it. It stays locked — truly locked — until that
            day arrives. Then it&rsquo;s waiting for you, in your own words.
          </p>
          <ul className="mt-8 space-y-3 text-cream-200">
            {['Choose any unlock date in the future', 'Send to yourself, or to a friend in a shared album', 'Sealed until the day — no peeking'].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mustard-500" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="relative mx-auto w-full max-w-md">
          {/* A sample sealed letter — illustrative, not real user data */}
          <motion.div
            className="relative rotate-[-2deg]"
            whileHover={{ rotate: 0, y: -6 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          >
            <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rotate-[4deg] rounded-[3px] bg-cream-300/80 shadow-paper" />
            <div className="paper-card relative rounded-[3px] p-8 shadow-lift sm:p-10">
              <div className="flex items-center justify-between text-ink-500">
                <Mail size={20} strokeWidth={1.5} />
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em]">Sealed · example</span>
              </div>
              <p className="mt-8 font-hand text-3xl leading-tight text-ink-800">Dear future me,</p>
              <div className="mt-4 space-y-2.5" aria-hidden>
                <div className="h-2 w-full rounded-full bg-ink-900/10" />
                <div className="h-2 w-11/12 rounded-full bg-ink-900/10" />
                <div className="h-2 w-4/5 rounded-full bg-ink-900/10" />
                <div className="h-2 w-2/3 rounded-full bg-ink-900/10" />
              </div>
              <div className="mt-8 flex items-center gap-3 border-t border-dashed border-ink-900/20 pt-5 text-ink-700">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-clay-500 text-cream-50">
                  <Lock size={17} />
                </span>
                <div className="leading-tight">
                  <p className="font-serif text-lg text-ink-900">Opens on 14 February</p>
                  <p className="text-sm text-ink-500">Not a day sooner.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
