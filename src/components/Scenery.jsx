/*
 * Small moving pieces of Jaipur that recur across the site, so every page
 * feels like part of the same painted city: birds crossing the sky, a cycle
 * rickshaw on its way, carved jharokha shutters and an invitation cloth that
 * unrolls. All are plain SVG and CSS, and all rest when motion is reduced.
 */
import { useInView } from '../hooks/useInView.js'
import './Scenery.css'

const FLOCK = [
  { top: 18, size: 1, delay: 0, duration: 28 },
  { top: 24, size: 0.8, delay: 1.2, duration: 28 },
  { top: 14, size: 0.7, delay: 2.1, duration: 30 },
  { top: 34, size: 0.9, delay: 11, duration: 34 },
  { top: 29, size: 0.6, delay: 12.4, duration: 34 },
]

/** A few pigeons that cross the sky now and then, flapping as they go. */
export function Birds({ className = '', tone = 'dark' }) {
  return (
    <div className={`birds birds--${tone} ${className}`.trim()} aria-hidden="true">
      {FLOCK.map((bird, index) => (
        <span
          key={index}
          className="bird"
          style={{
            '--top': `${bird.top}%`,
            '--size': bird.size,
            '--delay': `${bird.delay}s`,
            '--duration': `${bird.duration}s`,
          }}
        >
          <svg viewBox="0 0 40 16">
            <path className="bird__wing bird__wing--left" d="M20 9 C 15 3, 8 2, 1 6 C 8 5, 14 7, 20 11 Z" />
            <path className="bird__wing bird__wing--right" d="M20 9 C 25 3, 32 2, 39 6 C 32 5, 26 7, 20 11 Z" />
          </svg>
        </span>
      ))}
    </div>
  )
}

function Wheel({ cx, cy, r }) {
  return (
    <g className="rickshaw__wheel" style={{ transformOrigin: `${cx}px ${cy}px` }}>
      <circle cx={cx} cy={cy} r={r} />
      <circle cx={cx} cy={cy} r={2} className="rickshaw__fill" />
      {[0, 30, 60, 90, 120, 150].map((angle) => (
        <line
          key={angle}
          x1={cx}
          y1={cy - r}
          x2={cx}
          y2={cy + r}
          transform={`rotate(${angle} ${cx} ${cy})`}
          className="rickshaw__spoke"
        />
      ))}
    </g>
  )
}

/**
 * A cycle rickshaw drawn in a single line, with a crimson canopy and a rider
 * in a saffron safa. It pedals across its parent from left to right.
 */
export function Rickshaw({ className = '', tone = 'dark' }) {
  const [ref, inView] = useInView({ once: false, threshold: 0 })
  return (
    <div ref={ref} className={`rickshaw-road rickshaw-road--${tone} ${inView ? 'is-moving' : ''} ${className}`.trim()} aria-hidden="true">
      <svg className="rickshaw" viewBox="0 0 220 130">
        {/* Canopy and passenger seat */}
        <path className="rickshaw__canopy" d="M14 64 C 16 26, 46 12, 84 16 L 88 64 Z" />
        <path d="M18 60 C 22 34, 46 22, 80 22" className="rickshaw__trim" />
        <path d="M20 66 L 90 66 L 92 84 L 24 84 Z" className="rickshaw__seat" />
        <path d="M86 16 L 92 84" />
        {/* Frame */}
        <path d="M60 84 L 60 100 M 92 84 L 128 74 L 168 104 M 128 74 L 132 60 M 124 60 L 140 60 M 168 104 L 152 62 L 160 56 L 170 58" />
        {/* Rider */}
        <circle cx="136" cy="22" r="7" className="rickshaw__face" />
        <path className="rickshaw__safa" d="M128 20 C 128 10, 144 10, 144 20 C 140 16, 132 16, 128 20 Z" />
        <path className="rickshaw__kurta" d="M130 30 L 142 30 L 146 58 L 126 58 Z" />
        <path d="M142 36 L 156 54 L 160 56" />
        <g className="rickshaw__legs">
          <path d="M132 58 L 140 74 L 134 88" />
          <path d="M140 58 L 126 72 L 132 84" />
        </g>
        <Wheel cx={60} cy={104} r={22} />
        <Wheel cx={168} cy={104} r={18} />
      </svg>
    </div>
  )
}

/**
 * Carved wooden shutters over a picture. They swing open the first time the
 * picture scrolls into view. Place inside a frame that clips its children.
 */
export function Shutters({ className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.35 })
  return (
    <div ref={ref} className={`shutters ${inView ? 'is-open' : ''} ${className}`.trim()} aria-hidden="true">
      <span className="shutters__door shutters__door--left" />
      <span className="shutters__door shutters__door--right" />
    </div>
  )
}

/**
 * Like a banner let down from a haveli balcony: a cloth between two wooden
 * rods that unrolls when it comes into view.
 */
export function Unroll({ children, className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.2 })
  return (
    <div ref={ref} className={`unroll ${inView ? 'is-open' : ''} ${className}`.trim()}>
      <span className="unroll__rod" aria-hidden="true" />
      <div className="unroll__cloth">
        <div className="unroll__content">{children}</div>
      </div>
      <span className="unroll__rod unroll__rod--bottom" aria-hidden="true">
        <span className="unroll__tassels" />
      </span>
    </div>
  )
}

/** A line of text whose words light up one after another as it scrolls in. */
export function WordReveal({ text, as: Tag = 'p', className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  return (
    <Tag ref={ref} className={`word-reveal ${inView ? 'is-in' : ''} ${className}`.trim()}>
      {text.split(' ').map((word, index) => (
        <span key={index} style={{ '--w': index }}>
          {word}{' '}
        </span>
      ))}
    </Tag>
  )
}
