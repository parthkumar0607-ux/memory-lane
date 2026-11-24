import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import Polaroid from '../ui/Polaroid'
import Reveal from '../ui/Reveal'

export default function CallToAction() {
  return (
    <section className="paper-texture relative overflow-hidden py-24 sm:py-32">
      <div className="container-page relative">
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <div aria-hidden className="pointer-events-none absolute -left-4 top-0 hidden w-36 -translate-y-1/3 lg:-left-40 lg:block xl:-left-56 xl:w-44">
            <Polaroid scene="beach" rotate={-9} tape hoverLift={false} />
          </div>
          <div aria-hidden className="pointer-events-none absolute -right-4 bottom-0 hidden w-36 translate-y-1/4 lg:-right-40 lg:block xl:-right-56 xl:w-44">
            <Polaroid scene="picnic" rotate={8} hoverLift={false} />
          </div>

          <p className="eyebrow">Your turn</p>
          <h2 className="mt-4 text-4xl sm:text-6xl">
            Start the album you&rsquo;ll be <em className="font-normal text-clay-600">glad you made.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-700">
            It&rsquo;s free to begin, private by default, and it only takes a minute. The best time to save a memory is
            while you still remember it.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/register" size="lg">
              Create your account
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button to="/login" variant="secondary" size="lg">I already have one</Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
