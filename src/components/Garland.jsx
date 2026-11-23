import { useEffect, useId, useRef } from 'react'
import './Garland.css'

/*
 * Hanging marigold ladis, like the strings at a mandap entrance. A rope of
 * mango leaves runs across the top, and strands of genda flowers hang from it,
 * long at the edges and short in the middle so they frame the title. The
 * strands drop in and part from the centre, sway in the breeze, and swing
 * when a finger or cursor brushes past them.
 */


// A small seeded random, so the flowers look hand-made but render the same every time.
function seeded(seed) {
  let value = seed
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

/*
 * One frilly petal, fanning out from radius r0 to r1 around angle `a`,
 * with a crinkled outer edge like a real genda petal.
 */
function petal(a, half, r0, r1, rand) {
  const at = (angle, r) => `${(r * Math.cos(angle)).toFixed(2)} ${(r * Math.sin(angle)).toFixed(2)}`
  const reach = r1 * (0.94 + rand() * 0.1)
  const bumps = 3
  let d = `M ${at(a - half * 0.55, r0)} L ${at(a - half, reach * 0.9)}`
  for (let i = 0; i < bumps; i++) {
    const from = a - half + (2 * half * i) / bumps
    const to = a - half + (2 * half * (i + 1)) / bumps
    d += ` Q ${at((from + to) / 2, reach * 1.08)} ${at(to, reach * (i === bumps - 1 ? 0.9 : 0.97))}`
  }
  return `${d} L ${at(a + half * 0.55, r0)} Z`
}

// Rings of petals from the outside in: [outer radius, inner radius, petal count].
const RINGS = [
  [12, 6, 17],
  [10, 4.6, 14],
  [7.8, 3, 11],
  [5.4, 1.2, 8],
  [3, 0, 5],
]

export const SHADES = {
  yellow: ['#ec9f16', '#f4b222', '#f8c234', '#f3ad1e', '#e39410'],
  orange: ['#e2691a', '#ec7d24', '#f18f30', '#e5741b', '#d35d10'],
}

export function flowerPetals(seed) {
  const rand = seeded(seed)
  return RINGS.map(([r1, r0, count], ring) => {
    const turn = rand() * Math.PI
    const half = (Math.PI / count) * 1.15
    return Array.from({ length: count }, (_, i) => ({
      ring,
      light: i % 2 === 0,
      d: petal(turn + (i / count) * Math.PI * 2 + (rand() - 0.5) * 0.2, half, r0, r1, rand),
    }))
  }).flat()
}

const FLOWERS = [
  { key: 'yellow-a', tone: 'yellow', petals: flowerPetals(11) },
  { key: 'yellow-b', tone: 'yellow', petals: flowerPetals(29) },
  { key: 'orange-a', tone: 'orange', petals: flowerPetals(47) },
  { key: 'orange-b', tone: 'orange', petals: flowerPetals(83) },
]

const STRANDS = 25
const GAP = 14

// Strand lengths in flowers: a curtain that is long at the sides.
function strandLength(index) {
  const fromCentre = Math.abs(index - (STRANDS - 1) / 2) / ((STRANDS - 1) / 2)
  const wobble = [0, 1, -1, 0, 1][index % 5]
  return Math.round(4 + fromCentre ** 1.6 * 13 + wobble)
}

const strands = Array.from({ length: STRANDS }, (_, index) => {
  const rand = seeded(index + 7)
  const length = strandLength(index)
  return {
    length,
    items: Array.from({ length }, (_, f) => {
      // Mostly yellow genda, orange in a rhythm, and a rani pink rose now and then.
      const rose = index % 3 === 1 && f % 5 === 4
      const orange = (index + f) % 3 === 0
      return {
        symbol: rose ? 'rose' : `${orange ? 'orange' : 'yellow'}-${rand() > 0.5 ? 'a' : 'b'}`,
        size: rose ? 19 : 24 + rand() * 4,
        spin: Math.round(rand() * 360),
        nudge: (rand() - 0.5) * 2,
      }
    }),
    sway: 3.4 + (index % 4) * 0.45,
    drop: Math.abs(index - (STRANDS - 1) / 2) * 0.06,
  }
})

function Flower({ id, flower }) {
  const shades = SHADES[flower.tone]
  return (
    <symbol id={`${id}-${flower.key}`} viewBox="-13 -13 26 26" overflow="visible">
      {flower.petals.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill={shades[p.ring]}
          stroke={shades[Math.min(4, p.ring + 1)]}
          strokeWidth="0.35"
          opacity={p.light ? 1 : 0.92}
        />
      ))}
      <circle r="12.5" fill={`url(#${id}-shade)`} />
    </symbol>
  )
}

function Rose({ id }) {
  return (
    <symbol id={`${id}-rose`} viewBox="-13 -13 26 26" overflow="visible">
      <circle r="10.5" fill="#a8213f" />
      <path d="M-9 2 C -9 -8, 4 -11, 9 -3 C 4 -6, -4 -6, -9 2 Z" fill="#c8306e" />
      <path d="M9 -1 C 10 8, -3 11, -9 5 C -3 7, 5 5, 9 -1 Z" fill="#b8285a" />
      <path d="M-5 -1 C -4 -6, 4 -6, 5 -1 C 3 3, -3 3, -5 -1 Z" fill="#d9467f" />
      <path d="M-2 -1 C -1 -3, 2 -3, 2 0" fill="none" stroke="#7d1631" strokeWidth="0.8" />
      <circle r="11" fill={`url(#${id}-shade)`} />
    </symbol>
  )
}

export default function Garland({ className = '' }) {
  const id = useId().replace(/:/g, '')
  const ref = useRef(null)

  // Strands near the pointer swing away from it, then settle.
  useEffect(() => {
    const root = ref.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let lastX = null
    let frame = 0
    const onMove = (event) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const box = root.getBoundingClientRect()
        const dx = lastX === null ? 0 : event.clientX - lastX
        lastX = event.clientX
        if (event.clientY < box.top || event.clientY > box.bottom || Math.abs(dx) < 2) return
        for (const strand of root.querySelectorAll('.garland__strand')) {
          const rect = strand.getBoundingClientRect()
          const near = event.clientX > rect.left - 14 && event.clientX < rect.right + 14
          if (!near || event.clientY > rect.bottom) continue
          const angle = Math.max(-14, Math.min(14, -dx * 0.9))
          strand.animate(
            [
              { rotate: '0deg' },
              { rotate: `${angle}deg` },
              { rotate: `${-angle * 0.55}deg` },
              { rotate: `${angle * 0.25}deg` },
              { rotate: '0deg' },
            ],
            { duration: 1800, easing: 'ease-out', composite: 'add' },
          )
        }
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={ref} className={`garland ${className}`.trim()} aria-hidden="true">
      <svg className="garland__defs" width="0" height="0">
        <defs>
          <radialGradient id={`${id}-shade`}>
            <stop offset="0.45" stopColor="#fff3c4" stopOpacity="0.25" />
            <stop offset="1" stopColor="#8a3d06" stopOpacity="0.28" />
          </radialGradient>
          <linearGradient id={`${id}-leaf`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7d9b3c" />
            <stop offset="1" stopColor="#3f5a26" />
          </linearGradient>
          {FLOWERS.map((flower) => (
            <Flower key={flower.key} id={id} flower={flower} />
          ))}
          <Rose id={id} />
        </defs>
      </svg>

      <svg className="garland__rope" viewBox="0 0 1000 46" preserveAspectRatio="none">
        <path d="M0 6 Q 500 18 1000 6" className="garland__cord" />
        <path d="M0 6 Q 500 18 1000 6" className="garland__cord garland__cord--twist" />
      </svg>

      <ul className="garland__leaves">
        {Array.from({ length: 26 }, (_, index) => (
          <li key={index} style={{ '--i': index, rotate: `${((index % 3) - 1) * 9}deg` }}>
            <svg viewBox="-10 0 20 40">
              <path d="M0 0 C 9 9, 9 27, 0 40 C -9 27, -9 9, 0 0 Z" fill={`url(#${id}-leaf)`} />
              <path d="M0 3 Q 1.5 20 0 37" className="garland__vein" />
            </svg>
          </li>
        ))}
      </ul>

      <ul className="garland__strands">
        {strands.map((strand, index) => (
          <li
            key={index}
            className="garland__strand"
            style={{
              '--x': `${(index / (STRANDS - 1)) * 100}%`,
              '--sway': `${strand.sway}s`,
              '--drop': `${strand.drop}s`,
            }}
          >
            <svg viewBox={`-15 -4 30 ${strand.length * GAP + 34}`}>
              <line x1="0" y1="-4" x2="0" y2={strand.length * GAP} className="garland__thread" />
              {strand.items.map((item, f) => {
                const cy = f * GAP + 9
                return (
                  <use
                    key={f}
                    href={`#${id}-${item.symbol}`}
                    x={item.nudge - item.size / 2}
                    y={cy - item.size / 2}
                    width={item.size}
                    height={item.size}
                    transform={`rotate(${item.spin} ${item.nudge} ${cy})`}
                  />
                )
              })}
              {/* A brass bell and a red tassel at the end of the strand */}
              <g transform={`translate(0 ${strand.length * GAP + 10})`}>
                <circle r="2.2" cy="-2" className="garland__bead" />
                <path d="M-4.5 6 Q -4.5 0 0 0 Q 4.5 0 4.5 6 L 5.5 8 L -5.5 8 Z" className="garland__bell" />
                <path d="M-2 9 L -3 21 M 0 9 L 0 22 M 2 9 L 3 21" className="garland__tassel" />
              </g>
            </svg>
          </li>
        ))}
      </ul>
    </div>
  )
}
