import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import Button from '../ui/Button'
import Polaroid from '../ui/Polaroid'

const headline = ['Some', 'moments', 'deserve', 'to', 'live', 'forever.']

const collage = [
  { scene: 'beach', caption: 'golden hour', date: 'AUG 2019', rotate: -5, className: 'left-[0%] top-[0%] w-[41%]', delay: 0.5, tape: true },
  { scene: 'mountain', caption: 'the hike', date: 'JUN 2021', rotate: 4, className: 'right-[1%] top-[1%] w-[40%]', delay: 0.65 },
  { scene: 'campfire', caption: 'one more song', date: 'OCT 2022', rotate: -3, className: 'left-[30%] top-[40%] z-10 w-[38%]', delay: 0.8, tape: true },
  { scene: 'cafe', caption: 'our table', date: 'JAN 2023', rotate: 6, className: 'right-[0%] top-[56%] w-[33%]', delay: 0.95 },
  { scene: 'picnic', caption: 'sunday', date: 'MAY 2024', rotate: -7, className: 'left-[0%] top-[64%] w-[33%]', delay: 1.1 },
]

export default function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="paper-texture relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* faint ruled lines, like an album page */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.35]" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0 63px, rgb(122 90 67 / .08) 63px 64px)' }} />

      <div className="container-page relative grid items-center gap-14 pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-28">
        <div className="max-w-2xl">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            A digital scrapbook for friends
          </motion.p>

          <h1 className="mt-6 text-[2.9rem] leading-[1.02] sm:text-6xl lg:text-[4.6rem]" aria-label={headline.join(' ')}>
            {headline.map((word, i) => (
              <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
                <motion.span
                  className={`inline-block ${word === 'forever.' ? 'italic text-clay-600' : ''}`}
                  initial={reduce ? false : { y: '110%', rotate: 3 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-7 max-w-lg font-serif text-xl italic leading-relaxed text-ink-700 sm:text-2xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85 }}
          >
            A little corner of the internet for your favourite people.
          </motion.p>

          <motion.p
            className="mt-5 max-w-xl text-ink-700"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
          >
            Keep your photos, videos and stories in one warm, private place. Build shared albums with the people who were
            there, and open letters from your past selves exactly when you meant to.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15 }}
          >
            <Button to="/register" size="lg">
              Start your first album
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button href="#how-it-works" variant="secondary" size="lg">
              <Play size={16} className="fill-current" />
              See how it works
            </Button>
          </motion.div>
        </div>

        {/* Memory collage */}
        <div className="relative mx-auto aspect-[10/11.5] w-full max-w-[34rem] lg:max-w-none">
          {collage.map((p) => (
            <motion.div
              key={p.scene}
              className={`absolute ${p.className}`}
              initial={reduce ? false : { opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 6 + p.delay * 2, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
              >
                <Polaroid scene={p.scene} caption={p.caption} date={p.date} rotate={p.rotate} tape={p.tape} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* torn-paper edge into the next section */}
      <svg aria-hidden viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-6 w-full text-cream-50 sm:h-8">
        <path fill="currentColor" d="M0 40V18l40 6 40-8 40 10 40-6 40 4 40-10 40 8 40-4 40 6 40-10 40 8 40-2 40 4 40-8 40 6 40-6 40 10 40-8 40 4 40-6 40 8 40-8 40 6 40-4 40 6 40-8 40 4 40-2 40 6 40-10 40 8 40-4 40 2 40-6 40 6 40-4V40Z" />
      </svg>
    </section>
  )
}
