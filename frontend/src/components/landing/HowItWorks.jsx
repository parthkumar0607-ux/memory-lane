import Reveal from '../ui/Reveal'

const steps = [
  { n: '01', title: 'Collect', text: 'Add a photo or video, give it a name, a date and a place. Takes about as long as writing on the back of a print.' },
  { n: '02', title: 'Gather', text: 'Start a shared album and send an invite link. Friends join, add their side of the story, and react to yours.' },
  { n: '03', title: 'Revisit', text: 'Wander the timeline, press play on a replay, or let On This Day surprise you. Leave a letter to open years from now.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="paper-texture relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Three small steps, a lifetime of looking back</h2>
        </Reveal>

        <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          <span aria-hidden className="absolute left-0 right-0 top-[2.1rem] hidden border-t border-dashed border-ink-900/25 md:block" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.12} className="relative list-none">
              <span className="relative z-10 inline-grid h-[4.2rem] w-[4.2rem] place-items-center rounded-full border border-ink-900/15 bg-cream-50 font-serif text-2xl italic text-clay-600 shadow-soft">
                {s.n}
              </span>
              <h3 className="mt-6 text-3xl">{s.title}</h3>
              <p className="mt-3 max-w-sm text-ink-700">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
