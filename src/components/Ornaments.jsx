/*
 * Small hand-drawn ornaments used across the site: a section divider and
 * the brass diya. All are plain SVG with no images.
 */
import './Ornaments.css'

/** A thin rule with a small lotus at its centre. */
export function Divider({ className = '' }) {
  return (
    <div className={`divider ${className}`.trim()} aria-hidden="true">
      <span className="divider__line" />
      <svg viewBox="0 0 40 20" className="divider__lotus">
        <path d="M20 2 C 24 7, 24 13, 20 18 C 16 13, 16 7, 20 2 Z" />
        <path d="M20 18 C 14 16, 9 12, 7 6 C 13 7, 17 11, 20 18 Z" />
        <path d="M20 18 C 26 16, 31 12, 33 6 C 27 7, 23 11, 20 18 Z" />
      </svg>
      <span className="divider__line" />
    </div>
  )
}

/** A brass diya. `lit` shows the flame. */
export function Diya({ lit = false, className = '' }) {
  return (
    <svg className={`diya ${lit ? 'is-lit' : ''} ${className}`.trim()} viewBox="0 0 160 120" aria-hidden="true">
      <defs>
        <linearGradient id="diya-brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e7c27a" />
          <stop offset="0.55" stopColor="#b8873a" />
          <stop offset="1" stopColor="#7a5520" />
        </linearGradient>
        <radialGradient id="diya-flame" cx="0.5" cy="0.75" r="0.75">
          <stop offset="0" stopColor="#fffbe8" />
          <stop offset="0.35" stopColor="#ffd36b" />
          <stop offset="0.75" stopColor="#f08a1c" />
          <stop offset="1" stopColor="#c8551b" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="diya__flame">
        <path d="M80 18 C 90 34, 91 46, 80 56 C 69 46, 70 34, 80 18 Z" fill="url(#diya-flame)" />
        <path d="M80 34 C 84 42, 84 48, 80 53 C 76 48, 76 42, 80 34 Z" fill="#fffdf2" opacity="0.85" />
      </g>
      <path d="M78 52 L82 52 L81 60 L79 60 Z" fill="#3b2a14" />

      {/* Bowl with a pinched spout */}
      <path
        d="M34 60 C 46 58, 66 57, 80 58 C 96 57, 118 56, 132 52 C 128 60, 122 64, 116 66
           C 110 82, 96 90, 80 90 C 62 90, 46 82, 40 68 C 36 66, 34 63, 34 60 Z"
        fill="url(#diya-brass)"
      />
      <path d="M42 64 C 58 70, 102 70, 118 64" fill="none" stroke="#f3dca6" strokeWidth="1.2" opacity="0.7" />
      {/* Foot */}
      <path d="M64 89 C 66 96, 70 99, 80 99 C 90 99, 94 96, 96 89 Z" fill="#8a6126" />
      <ellipse cx="80" cy="102" rx="26" ry="4.5" fill="#6d4c1c" />
    </svg>
  )
}
