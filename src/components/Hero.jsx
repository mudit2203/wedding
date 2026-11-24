import { useEffect, useState } from 'react'
import { wedding } from '../data/wedding.js'
import { MONOGRAM_PATH, MONOGRAM_VIEWBOX } from './Monogram.jsx'
import './Hero.css'

/*
 * The home page opens inside a spray of bougainvillea from the couple's own
 * theme painting. As the music starts the branches drift past the camera and
 * part, leaving a soft Jaipur dawn. The MH monogram writes itself in, small
 * touches bloom at its ends, and the palace from the painting rises into
 * place while the names and date arrive line by line, with petals falling.
 *
 * The whole opening is CSS animation, started once by adding `is-playing`.
 */

const SEEN_KEY = 'mh-opening-seen'

function openingSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return true
  }
}

// The sprays we fly through: which cut-out, where it starts and where it leaves to.
const FLIGHT = [
  { piece: 'whole', className: 'spray--a' },
  { piece: 'whole', className: 'spray--b', flip: true },
  { piece: 'arch', className: 'spray--c' },
  { piece: 'low', className: 'spray--d' },
  { piece: 'low', className: 'spray--e', flip: true },
  { piece: 'drop', className: 'spray--f' },
  { piece: 'drop', className: 'spray--g', flip: true },
]

const PETALS = Array.from({ length: 12 }, (_, i) => ({
  x: (i * 37 + 11) % 100,
  size: 0.7 + ((i * 7) % 5) * 0.12,
  duration: 9 + ((i * 5) % 7),
  delay: 3.4 + ((i * 13) % 11) * 0.6,
  drift: ((i % 2 ? 1 : -1) * (20 + ((i * 11) % 30))) / 10,
}))

const spray = (piece) => `/images/hero/bougainvillea-${piece}.webp`

function Petal() {
  return (
    <svg viewBox="-10 -12 20 24">
      <path d="M0 11 C -9 4, -9 -7, -2 -11 C -1 -8, 1 -8, 2 -11 C 9 -7, 9 4, 0 11 Z" />
      <path d="M0 9 V -6" className="petal__vein" />
    </svg>
  )
}

/** The small things that bloom at the monogram's ends: a marigold, a diya flame and a mango leaf. */
function Touches() {
  return (
    <svg className="hero__touches" viewBox={MONOGRAM_VIEWBOX} aria-hidden="true">
      <g className="touch touch--marigold" transform="translate(52 118)">
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse key={i} rx="2.4" ry="6" cy="-5" transform={`rotate(${i * 30})`} />
        ))}
        <circle r="3.6" className="touch__heart" />
      </g>
      <g className="touch touch--flame" transform="translate(238 255)">
        <path d="M-9 4 C -6 9, 6 9, 9 4 Z" className="touch__brass" />
        <path d="M0 -12 C 4 -6, 4 -1, 0 3 C -4 -1, -4 -6, 0 -12 Z" className="touch__fire" />
      </g>
      <g className="touch touch--leaf" transform="translate(60 262) rotate(-32)">
        <path d="M0 0 C 6 -6, 20 -6, 28 0 C 20 6, 6 6, 0 0 Z" className="touch__green" />
        <path d="M2 0 H 25" className="touch__vein" />
      </g>
    </svg>
  )
}

export default function Hero() {
  const [playing, setPlaying] = useState(false)

  // Play once the diya opening has faded, or straight away if it was seen already.
  useEffect(() => {
    if (openingSeen()) {
      const id = setTimeout(() => setPlaying(true), 250)
      return () => clearTimeout(id)
    }
    const start = () => setPlaying(true)
    window.addEventListener('mh:opened', start, { once: true })
    return () => window.removeEventListener('mh:opened', start)
  }, [])

  return (
    <section className={`hero ${playing ? 'is-playing' : ''}`} aria-labelledby="hero-names">
      <div className="hero__sky" aria-hidden="true" />

      <img
        className="hero__palace"
        src="/images/hero/palace-1400.webp"
        srcSet="/images/hero/palace-720.webp 720w, /images/hero/palace-1400.webp 1400w"
        sizes="(min-width: 64rem) 64rem, 100vw"
        alt="A watercolour of a Jaipur palace at sunrise, with palms, lotuses and two decorated camels"
        fetchPriority="high"
      />

      <div className="hero__words">
        <div className="hero__mark">
          <svg className="hero__monogram" viewBox={MONOGRAM_VIEWBOX} aria-hidden="true">
            <path d={MONOGRAM_PATH} fillRule="evenodd" pathLength="1" />
          </svg>
          <Touches />
        </div>

        <p className="hero__line hero__line--1 hindi">शुभ विवाह</p>
        <h1 id="hero-names" className="hero__line hero__line--2 hero__names script">
          {wedding.bride} <span>&amp;</span> {wedding.groom}
        </h1>
        <p className="hero__line hero__line--3 eyebrow">{wedding.dateLabel}</p>
        <p className="hero__line hero__line--4 hero__venue">
          {wedding.venue.name} · {wedding.city}
        </p>
      </div>

      <div className="hero__petals" aria-hidden="true">
        {PETALS.map((petal, i) => (
          <span
            key={i}
            className="petal"
            style={{
              '--x': `${petal.x}%`,
              '--size': petal.size,
              '--duration': `${petal.duration}s`,
              '--delay': `${petal.delay}s`,
              '--drift': `${petal.drift}rem`,
            }}
          >
            <Petal />
          </span>
        ))}
      </div>

      {/* Two sprays stay behind, hanging into the top corners */}
      <img className="hero__corner hero__corner--left" src={spray('arch')} alt="" aria-hidden="true" />
      <img className="hero__corner hero__corner--right" src={spray('arch')} alt="" aria-hidden="true" />

      <div className="hero__flight" aria-hidden="true">
        {FLIGHT.map((item) => (
          <img
            key={item.className}
            className={`spray ${item.className} ${item.flip ? 'spray--flip' : ''}`}
            src={spray(item.piece)}
            alt=""
          />
        ))}
      </div>
    </section>
  )
}
