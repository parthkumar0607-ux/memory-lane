import { motion } from 'framer-motion'
import PhotoScene from './PhotoScene'

/**
 * Polaroid — the signature card of Memory Lane.
 * Reused on the landing page now, and for real memories later
 * (pass `src` for an uploaded photo, or `scene` for an illustrated one).
 */
export default function Polaroid({
  scene,
  src,
  alt = '',
  caption,
  date,
  rotate = 0,
  tape = false,
  className = '',
  hoverLift = true,
  ...motionProps
}) {
  return (
    <motion.figure
      className={`relative m-0 bg-cream-50 p-2.5 pb-4 shadow-paper sm:p-3 sm:pb-5 ${className}`}
      style={{ rotate }}
      whileHover={hoverLift ? { rotate: rotate * 0.35, y: -6, scale: 1.02, boxShadow: 'var(--shadow-lift)' } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      {...motionProps}
    >
      {tape && (
        <span
          aria-hidden
          className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-2 bg-mustard-500/35 shadow-sm backdrop-blur-[1px]"
          style={{ clipPath: 'polygon(3% 0, 97% 0, 100% 12%, 97% 25%, 100% 38%, 97% 50%, 100% 62%, 97% 75%, 100% 88%, 97% 100%, 3% 100%, 0 88%, 3% 75%, 0 62%, 3% 50%, 0 38%, 3% 25%, 0 12%)' }}
        />
      )}
      <div className="aspect-square w-full overflow-hidden bg-cream-200">
        {src ? (
          <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover sepia-[.12] saturate-[.92]" />
        ) : (
          <PhotoScene scene={scene} label={alt || undefined} />
        )}
      </div>
      {(caption || date) && (
        <figcaption className="mt-2.5 flex items-baseline justify-between gap-2 px-0.5 text-ink-700">
          <span className="font-hand text-[1.35rem] leading-none sm:text-2xl">{caption}</span>
          {date && <span className="shrink-0 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-ink-400">{date}</span>}
        </figcaption>
      )}
    </motion.figure>
  )
}
