import { useEffect, useRef } from 'react'
import { wedding } from '../data/wedding.js'
import { MONOGRAM_PATH, MONOGRAM_VIEWBOX } from './Monogram.jsx'
import { archPath } from './arch.js'
import './Hero.css'

/*
 * The home page opens on a Jaipur haveli on Diwali night. Strings of lights
 * switch on along its arches one after another, the jharokhas glow, diyas
 * flicker along the steps and paper kandeels sway overhead. The couple's
 * names sit in the lit doorway in gold.
 */

const NIGHT = { wide: { width: 1200, height: 800 }, tall: { width: 400, height: 800 } }
const GROUND = 760

// A jharokha window: a small cusped arch with a sill, centred at x.
const jharokha = (x, archWidth, spring, apex, sill) =>
  archPath({ width: x * 2, height: sill, archWidth, spring, apex, lobes: 4 })

// A chhatri dome sitting on a cornice at y.
const dome = (x, y, w) =>
  `M ${x - w} ${y} C ${x - w} ${y - w * 1.1}, ${x - w * 0.2} ${y - w * 1.05}, ${x} ${y - w * 1.5} C ${x + w * 0.2} ${y - w * 1.05}, ${x + w} ${y - w * 1.1}, ${x + w} ${y}`

function facade(layout) {
  const { width } = NIGHT[layout]
  const cx = width / 2
  if (layout === 'wide') {
    const frame = { x1: cx - 270, x2: cx + 270, top: 64 }
    const wings = [
      [170, 280],
      [width - 280, width - 170],
    ]
    return {
      door: archPath({ width, height: GROUND, archWidth: 420, spring: 400, apex: 150, lobes: 7 }),
      frame: `M ${frame.x1} ${GROUND} V ${frame.top} H ${frame.x2} V ${GROUND}`,
      inner: `M ${frame.x1 + 16} ${GROUND} V ${frame.top + 16} H ${frame.x2 - 16} V ${GROUND}`,
      cornices: [`M 110 214 H ${frame.x1}`, `M ${frame.x2} 214 H ${width - 110}`, `M 110 446 H ${frame.x1}`, `M ${frame.x2} 446 H ${width - 110}`],
      domes: [dome(225, 214, 58), dome(width - 225, 214, 58), dome(cx, frame.top, 44)],
      windows: wings.flatMap((xs) => xs.flatMap((x) => [jharokha(x, 78, 330, 262, 420), jharokha(x, 92, 610, 520, 712)])),
      diyas: Array.from({ length: 15 }, (_, i) => 150 + i * 64.3),
      text: {
        invocation: { y: 120, size: 20 },
        monogram: { y: 188, size: 58 },
        bride: { y: 382, size: 74 },
        amp: { y: 444, size: 40 },
        groom: { y: 528, size: 74 },
        date: { y: 600, size: 16 },
        place: { y: 632, size: 12 },
      },
    }
  }
  const frame = { x1: cx - 178, x2: cx + 178, top: 56 }
  return {
    door: archPath({ width, height: GROUND, archWidth: 300, spring: 470, apex: 132, lobes: 5 }),
    frame: `M ${frame.x1} ${GROUND} V ${frame.top} H ${frame.x2} V ${GROUND}`,
    inner: `M ${frame.x1 + 12} ${GROUND} V ${frame.top + 12} H ${frame.x2 - 12} V ${GROUND}`,
    cornices: [],
    domes: [dome(cx, frame.top, 34)],
    windows: [],
    diyas: Array.from({ length: 7 }, (_, i) => 50 + i * 50),
    text: {
      invocation: { y: 106, size: 15 },
      monogram: { y: 158, size: 44 },
      bride: { y: 326, size: 52 },
      amp: { y: 372, size: 28 },
      groom: { y: 430, size: 52 },
      date: { y: 486, size: 13 },
      place: { y: 512, size: 10 },
    },
  }
}

/** Fairy lights along a path. They switch on from one end, then twinkle. */
function Lights({ id, d, delay }) {
  return (
    <g>
      <mask id={id} maskUnits="userSpaceOnUse">
        <path d={d} pathLength="1" className="night__reveal" style={{ '--delay': `${delay}s` }} />
      </mask>
      <g mask={`url(#${id})`}>
        <path d={d} className="night__glow" />
        <path d={d} className="night__bulbs" />
        <path d={d} className="night__bulbs night__bulbs--alt" />
      </g>
    </g>
  )
}

function Diya({ x }) {
  return (
    <g transform={`translate(${x.toFixed(1)} ${GROUND - 4})`} className="night__diya">
      <ellipse cy="-14" rx="16" ry="18" className="night__diya-halo" />
      <path d="M0 -26 C 4 -19, 4 -14, 0 -10 C -4 -14, -4 -19, 0 -26 Z" className="night__flame" />
      <path d="M-14 -9 C -10 -9, 10 -9, 15 -11 C 12 -2, 6 2, 0 2 C -7 2, -12 -2, -14 -9 Z" className="night__bowl" />
    </g>
  )
}

function Night({ layout, className }) {
  const { width: W, height: H } = NIGHT[layout]
  const f = facade(layout)
  const { text } = f
  const cx = W / 2
  const id = (name) => `night-${layout}-${name}`
  const strings = [f.door, f.frame, ...f.domes, ...f.cornices]

  return (
    <svg className={`night night--${layout} ${className}`} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax meet">
      <defs>
        <radialGradient id={id('doorway')} cx="0.5" cy="0.9" r="0.85">
          <stop offset="0" stopColor="#ffc879" stopOpacity="0.32" />
          <stop offset="0.6" stopColor="#c8306e" stopOpacity="0.08" />
          <stop offset="1" stopColor="#c8306e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id('window')} cx="0.5" cy="0.75" r="0.8">
          <stop offset="0" stopColor="#ffd58c" stopOpacity="0.85" />
          <stop offset="0.55" stopColor="#f0a04b" stopOpacity="0.45" />
          <stop offset="1" stopColor="#c8306e" stopOpacity="0.25" />
        </radialGradient>
        <linearGradient id={id('foil')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7e3a8" />
          <stop offset="0.45" stopColor="#d4a347" />
          <stop offset="0.7" stopColor="#fff1c7" />
          <stop offset="1" stopColor="#b8862f" />
        </linearGradient>
        {/* A soft highlight that slides across the gold now and then */}
        <linearGradient id={id('sheen')} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0.38" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="0.62" stopColor="#fff" stopOpacity="0" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            values="-1 0; -1 0; 1 0"
            keyTimes="0; 0.55; 1"
            dur="7s"
            begin="2.5s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>

      {/* The haveli, drawn in a fine gold line */}
      <path d={f.door} fill={`url(#${id('doorway')})`} />
      {f.windows.map((d, i) => (
        <path key={i} d={d} className="night__window" fill={`url(#${id('window')})`} style={{ '--i': i }} />
      ))}
      <g className="night__line">
        <path d={f.frame} />
        <path d={f.inner} />
        {f.domes.map((d, i) => (
          <path key={i} d={d} />
        ))}
        {f.cornices.map((d, i) => (
          <path key={i} d={d} />
        ))}
        <path d={f.door} />
        <path d={`M 0 ${GROUND} H ${W}`} />
      </g>

      {strings.map((d, i) => (
        <Lights key={i} id={id(`lights-${i}`)} d={d} delay={0.4 + i * 0.35} />
      ))}

      {/* The writing in the doorway */}
      <g className="night__writing">
        <text x={cx} y={text.invocation.y} fontSize={text.invocation.size} className="night__invocation hindi">
          {wedding.invocation.hindi}
        </text>
        <svg
          x={cx - text.monogram.size * 0.63}
          y={text.monogram.y}
          width={text.monogram.size * 1.26}
          height={text.monogram.size}
          viewBox={MONOGRAM_VIEWBOX}
        >
          <path fillRule="evenodd" d={MONOGRAM_PATH} fill={`url(#${id('foil')})`} />
        </svg>
        {[
          ['bride', wedding.bride],
          ['amp', '&'],
          ['groom', wedding.groom],
        ].map(([key, value]) => (
          <g key={key} className={`night__name night__name--${key} script`} fontSize={text[key].size}>
            <text x={cx} y={text[key].y} fill={`url(#${id('foil')})`}>
              {value}
            </text>
            <text x={cx} y={text[key].y} fill={`url(#${id('sheen')})`} className="night__sheen">
              {value}
            </text>
          </g>
        ))}
        <text x={cx} y={text.date.y} fontSize={text.date.size} className="night__date">
          {wedding.dateShort}
        </text>
        <text x={cx} y={text.place.y} fontSize={text.place.size} className="night__place">
          {wedding.venue.name.toUpperCase()} · JAIPUR
        </text>
      </g>

      {f.diyas.map((x) => (
        <Diya key={x} x={x} />
      ))}
    </svg>
  )
}

// Paper kandeels hanging in front of the haveli: where, how low, and in what colour.
const LANTERNS = [
  { x: 4, drop: 7, tone: 'rani' },
  { x: 12, drop: 13, tone: 'saffron' },
  { x: 21, drop: 4, tone: 'peacock', wide: true },
  { x: 79, drop: 5, tone: 'saffron', wide: true },
  { x: 88, drop: 12, tone: 'rani' },
  { x: 96, drop: 6, tone: 'peacock' },
]

function Kandeel() {
  return (
    <svg viewBox="-20 0 40 96" className="kandeel__svg">
      <circle cy="46" r="26" className="kandeel__halo" />
      <path d="M-6 6 H 6 L 9 14 H -9 Z" className="kandeel__cap" />
      <path d="M-9 14 L -17 40 L -9 66 H 9 L 17 40 L 9 14 Z" className="kandeel__paper" />
      <path d="M-4 14 L -7 40 L -4 66 H 4 L 7 40 L 4 14 Z" className="kandeel__light" />
      <path d="M-17 40 H 17 M -13 27 H 13 M -13 53 H 13" className="kandeel__rib" />
      <path d="M-9 66 H 9 L 6 72 H -6 Z" className="kandeel__cap" />
      <path d="M-4 72 L -6 92 M 0 72 V 95 M 4 72 L 6 92" className="kandeel__tassel" />
    </svg>
  )
}

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
      const progress = Math.min(1, Math.max(0, -box.top / box.height))
      hero.style.setProperty('--p', progress.toFixed(4))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-names">
      <h1 id="hero-names" className="visually-hidden">
        {wedding.bride} &amp; {wedding.groom}, {wedding.dateLabel}, {wedding.venue.name}, {wedding.city}
      </h1>

      <div className="hero__night" aria-hidden="true">
        <Night layout="wide" className="hero__wide" />
        <Night layout="tall" className="hero__tall" />
      </div>

      <ul className="hero__kandeels" aria-hidden="true">
        {LANTERNS.map((lantern, i) => (
          <li
            key={lantern.x}
            className={`kandeel kandeel--${lantern.tone} ${lantern.wide ? 'kandeel--wide-only' : ''}`}
            style={{ '--x': `${lantern.x}%`, '--drop': `${lantern.drop}vh`, '--i': i }}
          >
            <Kandeel />
          </li>
        ))}
      </ul>
    </section>
  )
}
