import { Camera, Users, CalendarClock, Shuffle, Clapperboard, Images } from 'lucide-react'
import Reveal from '../ui/Reveal'

const features = [
  { icon: Camera, title: 'Your personal memory wall', text: 'Upload photos and videos with a title, a date, a place and a few tags. Browse them in a gallery that feels like a well-loved album.', tilt: -1.2 },
  { icon: Users, title: 'Shared albums', text: 'Invite friends with a simple link. Everyone adds their own photos, comments and reactions, so the whole story ends up in one place.', tilt: 1 },
  { icon: Images, title: 'A timeline of your life', text: 'Scroll through everything in order — years, seasons, events — with captions that remind you what the day was really like.', tilt: -0.8 },
  { icon: CalendarClock, title: 'On this day', text: 'Every morning, see what you were up to on this date in years gone by. A small, gentle surprise.', tilt: 1.2 },
  { icon: Shuffle, title: 'Random memory', text: 'Feeling nostalgic? One tap pulls a memory out of the box and opens it full-screen.', tilt: -1 },
  { icon: Clapperboard, title: 'Cinematic replay', text: 'Turn any collection into a slow, soft slideshow with captions, dates and your own music.', tilt: 0.9 },
]

export default function Features() {
  return (
    <section id="features" className="paper-card relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">What lives here</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Everything a good memory box should hold</h2>
          <p className="mt-5 text-ink-700">
            No feeds, no followers, no noise. Just the moments you care about and the people you shared them with.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text, tilt }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.1}>
              <article
                className="group relative h-full rounded-[3px] border border-cream-300/70 bg-cream-50 p-7 shadow-soft transition-all duration-500 ease-out-soft hover:-translate-y-1.5 hover:rotate-0 hover:shadow-paper"
                style={{ rotate: `${tilt}deg` }}
              >
                <span aria-hidden className="absolute -top-2.5 left-8 h-5 w-14 -rotate-3 bg-rose-300/55" />
                <span className="grid h-12 w-12 place-items-center rounded-full bg-cream-200 text-clay-600 transition-colors duration-300 group-hover:bg-clay-500 group-hover:text-cream-50">
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 text-2xl">{title}</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-700">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
