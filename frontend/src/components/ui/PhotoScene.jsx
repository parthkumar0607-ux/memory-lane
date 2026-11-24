/**
 * PhotoScene — original, hand-built illustrated "photographs".
 *
 * The landing page needs imagery before any user has uploaded a thing.
 * Rather than hot-linking stock photos (licensing, broken links, slow loads)
 * we draw small film-toned scenes in SVG. They are decoration only, and they
 * are replaced by real uploads from Phase 3 onward.
 */
const SCENES = {
  beach: (
    <>
      <rect width="300" height="300" fill="#f0d3a8" />
      <rect y="0" width="300" height="150" fill="#f3c9a0" />
      <circle cx="205" cy="112" r="34" fill="#e9a36b" opacity=".95" />
      <rect y="150" width="300" height="70" fill="#6f8f98" />
      <path d="M0 160 Q40 150 80 160 T160 160 T240 160 T320 160 V180 H0Z" fill="#8aa9ae" opacity=".7" />
      <rect y="215" width="300" height="85" fill="#dcc19a" />
      <path d="M0 222 Q60 212 120 224 T300 218 V235 H0Z" fill="#cfb185" opacity=".8" />
      <path d="M60 250 l22 -48 l22 48z" fill="#b5654a" />
      <rect x="80" y="244" width="4" height="30" fill="#5e4331" />
    </>
  ),
  mountain: (
    <>
      <rect width="300" height="300" fill="#dfe3d6" />
      <rect width="300" height="170" fill="#e9dfc8" />
      <circle cx="82" cy="78" r="24" fill="#f2d9a6" />
      <path d="M-10 210 L90 100 L150 170 L210 85 L320 210Z" fill="#9aa68f" />
      <path d="M90 100 L112 126 L96 122 L84 132 L72 120Z" fill="#f4efe3" opacity=".9" />
      <path d="M210 85 L236 116 L218 110 L206 122 L192 110Z" fill="#f4efe3" opacity=".9" />
      <path d="M-10 235 Q80 190 170 230 T320 220 V300 H-10Z" fill="#6f8062" />
      <path d="M-10 270 Q100 240 200 268 T320 255 V300 H-10Z" fill="#56664b" />
      <path d="M230 232 l10 -28 l10 28z M246 240 l9 -24 l9 24z" fill="#3f4d38" />
    </>
  ),
  city: (
    <>
      <rect width="300" height="300" fill="#d9c7b0" />
      <rect width="300" height="190" fill="#e6c5a2" />
      <circle cx="220" cy="80" r="28" fill="#f0a86a" opacity=".9" />
      <rect x="18" y="120" width="46" height="180" fill="#7a5a43" />
      <rect x="70" y="86" width="52" height="214" fill="#5e4331" />
      <rect x="128" y="140" width="44" height="160" fill="#8b6a50" />
      <rect x="178" y="104" width="58" height="196" fill="#4a3829" />
      <rect x="242" y="152" width="50" height="148" fill="#7a5a43" />
      <g fill="#f2cf8a" opacity=".9">
        <rect x="80" y="100" width="8" height="10" /><rect x="98" y="100" width="8" height="10" />
        <rect x="80" y="124" width="8" height="10" /><rect x="98" y="148" width="8" height="10" />
        <rect x="190" y="120" width="8" height="10" /><rect x="212" y="144" width="8" height="10" />
        <rect x="190" y="168" width="8" height="10" /><rect x="30" y="140" width="8" height="10" />
        <rect x="138" y="164" width="8" height="10" /><rect x="254" y="176" width="8" height="10" />
      </g>
    </>
  ),
  picnic: (
    <>
      <rect width="300" height="300" fill="#c9d3b6" />
      <rect width="300" height="120" fill="#e8e1c9" />
      <circle cx="60" cy="56" r="22" fill="#f2dca0" />
      <path d="M-10 120 Q90 90 190 120 T320 110 V300 H-10Z" fill="#a4b58c" />
      <path d="M40 190 L260 190 L290 270 L10 270Z" fill="#b5654a" />
      <g fill="#f4ecdd">
        <rect x="60" y="190" width="30" height="80" opacity=".9" /><rect x="120" y="190" width="30" height="80" opacity=".9" />
        <rect x="180" y="190" width="30" height="80" opacity=".9" /><rect x="236" y="190" width="24" height="80" opacity=".9" />
      </g>
      <ellipse cx="150" cy="226" rx="34" ry="12" fill="#e9c27a" />
      <rect x="132" y="206" width="36" height="20" rx="4" fill="#8a5a3a" />
      <circle cx="205" cy="222" r="11" fill="#d9674f" />
    </>
  ),
  campfire: (
    <>
      <rect width="300" height="300" fill="#2f2a3a" />
      <rect width="300" height="190" fill="#3c3446" />
      <g fill="#f6e9c8"><circle cx="40" cy="40" r="1.8" /><circle cx="110" cy="70" r="1.4" /><circle cx="190" cy="34" r="2" /><circle cx="250" cy="82" r="1.5" /><circle cx="150" cy="110" r="1.2" /><circle cx="70" cy="120" r="1.6" /></g>
      <path d="M-10 200 Q100 170 200 205 T320 195 V300 H-10Z" fill="#241f2b" />
      <path d="M150 240 C128 232 126 204 148 182 C146 202 160 202 156 178 C178 198 184 230 150 240Z" fill="#e8873f" />
      <path d="M150 240 C138 234 140 216 150 204 C152 216 162 218 158 230Z" fill="#f6cf6e" />
      <path d="M118 246 L184 238 M122 238 L180 250" stroke="#5e4331" stroke-width="6" stroke-linecap="round" />
      <path d="M50 252 q10 -26 22 0z M236 254 q10 -24 22 0z" fill="#17131c" />
    </>
  ),
  cafe: (
    <>
      <rect width="300" height="300" fill="#e7d6bc" />
      <rect x="30" y="34" width="110" height="130" fill="#cfe0dd" stroke="#7a5a43" stroke-width="8" />
      <path d="M85 34 V164 M30 99 H140" stroke="#7a5a43" stroke-width="5" />
      <rect x="168" y="46" width="96" height="70" fill="#d9674f" opacity=".85" />
      <circle cx="216" cy="81" r="18" fill="#f4ecdd" opacity=".85" />
      <rect y="210" width="300" height="90" fill="#8b6a50" />
      <rect y="206" width="300" height="10" fill="#6a4c37" />
      <ellipse cx="108" cy="204" rx="40" ry="8" fill="#f4ecdd" />
      <path d="M78 176 h60 v22 q0 14 -30 14 t-30 -14z" fill="#f4ecdd" stroke="#cdb994" stroke-width="2" />
      <path d="M92 150 q-6 -12 0 -22 M110 154 q-6 -12 0 -24 M126 150 q-6 -12 0 -22" stroke="#9a8d7e" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7" />
      <ellipse cx="208" cy="204" rx="30" ry="7" fill="#f4ecdd" />
      <rect x="184" y="170" width="48" height="30" rx="4" fill="#c99a3e" />
    </>
  ),
}

export const SCENE_NAMES = Object.keys(SCENES)

export default function PhotoScene({ scene = 'beach', className = '', label }) {
  return (
    <svg
      viewBox="0 0 300 300"
      preserveAspectRatio="xMidYMid slice"
      className={`block h-full w-full ${className}`}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {SCENES[scene] ?? SCENES.beach}
      {/* film grain + soft vignette so the drawings feel like prints */}
      <defs>
        <radialGradient id={`vig-${scene}`} cx="50%" cy="50%" r="75%">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#3a2410" stopOpacity=".28" />
        </radialGradient>
      </defs>
      <rect width="300" height="300" fill={`url(#vig-${scene})`} />
    </svg>
  )
}
