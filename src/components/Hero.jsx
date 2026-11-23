import { useEffect, useRef } from 'react'
import { wedding } from '../data/wedding.js'
import { MONOGRAM_PATH, MONOGRAM_VIEWBOX } from './Monogram.jsx'
import { archPath } from './arch.js'
import { Birds, Rickshaw } from './Scenery.jsx'
import './Hero.css'

/*
 * The home page opens on a painted Jaipur gateway, in the peacock teal, rani
 * pink and gold of the City Palace gates, with the couple's names on it.
 * Through its arch is their palace painting. Scrolling walks you through the
 * gate: it grows past you while the painting's garden and palace settle into
 * place, with birds and a rickshaw moving between the layers.
 */

// Two layouts of the same gate: wide for desktop, tall for phones.
const GATES = {
  wide: {
    width: 1600, height: 900, archWidth: 520, spring: 500, apex: 240, lobes: 6,
    text: {
      invocation: { x: 800, y: 50, size: 26 },
      monogram: { x: 800, y: 66, size: 84 },
      bride: { x: 290, y: 520, size: 104 },
      groom: { x: 1310, y: 520, size: 104 },
      amp: null,
      date: { x: 290, y: 600 },
      place: { x: 1310, y: 600 },
      lamps: [290, 1310],
    },
  },
  tall: {
    width: 400, height: 800, archWidth: 290, spring: 560, apex: 372, lobes: 5,
    text: {
      invocation: { x: 200, y: 44, size: 15 },
      monogram: { x: 200, y: 56, size: 54 },
      bride: { x: 200, y: 172, size: 58 },
      groom: { x: 200, y: 280, size: 58 },
      amp: { x: 200, y: 218, size: 30 },
      date: { x: 200, y: 326 },
      place: null,
      lamps: [],
    },
  },
}

function Rosette({ x, y, r }) {
  return (
    <g transform={`translate(${x} ${y})`} className="gate__rosette">
      <circle r={r} className="gate__gold-line" />
      <circle r={r * 0.82} className="gate__pink-fill" />
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} rx={r * 0.16} ry={r * 0.42} cy={-r * 0.38} transform={`rotate(${i * 45})`} className="gate__petal" />
      ))}
      <circle r={r * 0.16} className="gate__gold-fill" />
    </g>
  )
}

function Lamp({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} className="gate__lamp">
      <line y2="56" className="gate__gold-line" />
      <path d="M-16 56 Q 0 78 16 56 Z" className="gate__gold-fill" />
      <path d="M0 40 C 5 48, 5 53, 0 57 C -5 53, -5 48, 0 40 Z" className="gate__flame" />
    </g>
  )
}

function Gate({ layout, className }) {
  const g = GATES[layout]
  const { width: W, height: H, text } = g
  const cx = W / 2
  const opening = archPath(g)
  const around = (scale) => `translate(${cx} ${H}) scale(${scale}) translate(${-cx} ${-H})`
  const panelInset = 40

  return (
    <svg className={`gate gate--${layout} ${className}`} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`gate-wall-${layout}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14514d" />
          <stop offset="1" stopColor="#0b3532" />
        </linearGradient>
        <pattern id={`gate-jaali-${layout}`} width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M11 0 L22 11 L11 22 L0 11 Z" fill="none" stroke="#c9a15a" strokeWidth="0.8" opacity="0.35" />
          <circle cx="11" cy="11" r="1.6" fill="#d9828f" opacity="0.6" />
        </pattern>
      </defs>

      {/* The wall, with the arch cut out of it */}
      <path d={`M0 0 H ${W} V ${H} H 0 Z ${opening}`} fillRule="evenodd" fill={`url(#gate-wall-${layout})`} />

      {/* Carved side panels with a jaali screen */}
      {layout === 'wide' &&
        [0, 1].map((side) => {
          const x = side ? cx + g.archWidth / 2 + 90 : panelInset + 30
          const w = cx - g.archWidth / 2 - 90 - panelInset - 30
          return (
            <g key={side}>
              <rect x={x} y={150} width={w} height={H - 230} className="gate__panel" />
              <rect x={x + 10} y={160} width={w - 20} height={H - 250} className="gate__gold-line" />
              <rect x={x + 24} y={H - 210} width={w - 48} height={110} fill={`url(#gate-jaali-${layout})`} />
            </g>
          )
        })}

      {/* Bands around the arch: rani pink, gold dots, then a fine gold rule */}
      <path d={opening} transform={around(1.045)} className="gate__band" />
      <path d={opening} transform={around(1.045)} className="gate__dots" />
      <path d={opening} transform={around(1.085)} className="gate__gold-line" />
      <path d={opening} className="gate__edge" />

      {/* Rosettes in the spandrels */}
      {layout === 'wide' && (
        <>
          <Rosette x={cx - g.archWidth * 0.68} y={g.apex + 40} r={44} />
          <Rosette x={cx + g.archWidth * 0.68} y={g.apex + 40} r={44} />
        </>
      )}

      {/* A sandstone plinth */}
      <rect x="0" y={H - 26} width={W} height="26" className="gate__plinth" />

      {/* The writing on the gate */}
      <g className="gate__writing">
        <text x={text.invocation.x} y={text.invocation.y} fontSize={text.invocation.size} className="gate__invocation hindi">
          {wedding.invocation.hindi}
        </text>
        <svg
          x={text.monogram.x - text.monogram.size * 0.63}
          y={text.monogram.y}
          width={text.monogram.size * 1.26}
          height={text.monogram.size}
          viewBox={MONOGRAM_VIEWBOX}
          className="gate__monogram"
        >
          <path fillRule="evenodd" d={MONOGRAM_PATH} />
        </svg>
        {text.lamps.map((x) => (
          <Lamp key={x} x={x} y={150} />
        ))}
        <text x={text.bride.x} y={text.bride.y} fontSize={text.bride.size} className="gate__name script">
          {wedding.bride}
        </text>
        {text.amp && (
          <text x={text.amp.x} y={text.amp.y} fontSize={text.amp.size} className="gate__amp script">
            &amp;
          </text>
        )}
        <text x={text.groom.x} y={text.groom.y} fontSize={text.groom.size} className="gate__name script">
          {wedding.groom}
        </text>
        <text x={text.date.x} y={text.date.y} className="gate__date">
          {wedding.dateShort}
        </text>
        {text.place && (
          <text x={text.place.x} y={text.place.y} className="gate__date">
            {wedding.venue.name.toUpperCase()}
          </text>
        )}
      </g>
    </svg>
  )
}

const layer = (name) => ({
  src: `/images/theme/hero-${name}-1400.webp`,
  srcSet: `/images/theme/hero-${name}-720.webp 720w, /images/theme/hero-${name}-1400.webp 1400w`,
  sizes: '100vw',
})

export default function Hero() {
  const ref = useRef(null)

  // Share scroll progress through the hero (0 to 1) with the CSS as --p.
  useEffect(() => {
    const hero = ref.current
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const box = hero.getBoundingClientRect()
      const travel = box.height - window.innerHeight
      const progress = travel > 0 ? Math.min(1, Math.max(0, -box.top / travel)) : 0
      hero.style.setProperty('--p', progress.toFixed(4))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-names">
      <h1 id="hero-names" className="visually-hidden">
        {wedding.bride} &amp; {wedding.groom}, {wedding.dateLabel}, {wedding.venue.name}, {wedding.city}
      </h1>

      <div className="hero__view">
        <div className="hero__painting">
          <img
            className="hero__back"
            {...layer('back')}
            alt="A watercolour of a Jaipur palace at sunrise, framed by bougainvillea, palms and two decorated camels"
            fetchPriority="high"
          />
          <Birds className="hero__birds" />
          <Rickshaw tone="paint" className="hero__road" />
          <img className="hero__front" {...layer('front')} alt="" aria-hidden="true" />
        </div>

        <div className="hero__gate" aria-hidden="true">
          <Gate layout="wide" className="hero__gate-wide" />
          <Gate layout="tall" className="hero__gate-tall" />
        </div>

        <span className="hero__cue" aria-hidden="true">
          <span className="eyebrow">Step inside</span>
        </span>
      </div>
    </section>
  )
}
