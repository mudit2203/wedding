import { useId } from 'react'
import { SHADES, flowerPetals } from './Garland.jsx'
import './AshokToran.css'

/*
 * An ashok-leaf bandhanwar, the toran tied over a door for good luck: a
 * twisted cord with long glossy ashok leaves hanging from it and a marigold
 * knot after every few leaves. Each leaf stirs on its own, as if a door had just opened.
 */

const LEAVES = 33
const PETALS = flowerPetals(61)

function seeded(seed) {
  let value = seed
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

const rand = seeded(5)
const items = Array.from({ length: LEAVES }, (_, i) => {
  const fromCentre = Math.abs(i - (LEAVES - 1) / 2)
  if (i % 4 === 2) return { kind: 'knot', fromCentre }
  return {
    kind: 'leaf',
    fromCentre,
    long: i % 2 === 0,
    tilt: ((rand() - 0.5) * 8).toFixed(1),
    sway: (3.6 + rand() * 1.6).toFixed(2),
  }
})

function Leaf({ id }) {
  return (
    <svg viewBox="-9 0 18 90" className="ashok__leaf-svg">
      <path
        d="M0 0 C 6 8, 8.4 24, 7.2 42 C 6.6 56, 4 70, 0 90 C -4 70, -6.6 56, -7.2 42 C -8.4 24, -6 8, 0 0 Z"
        fill={`url(#${id}-leaf)`}
      />
      {/* The light catching one side of the waxy leaf */}
      <path d="M-1.5 6 C -5 20, -5.6 44, -2.4 72" className="ashok__shine" />
      <path d="M0 2 C 0.8 30, 0.6 60, 0 88" className="ashok__rib" />
    </svg>
  )
}

function Knot() {
  return (
    <svg viewBox="-13 -13 26 26" className="ashok__knot-svg">
      {PETALS.map((p, i) => (
        <path key={i} d={p.d} fill={SHADES.orange[p.ring]} stroke={SHADES.orange[Math.min(4, p.ring + 1)]} strokeWidth="0.35" />
      ))}
    </svg>
  )
}

export default function AshokToran({ className = '' }) {
  const id = useId().replace(/:/g, '')
  return (
    <div className={`ashok ${className}`.trim()} aria-hidden="true">
      <svg width="0" height="0" className="ashok__defs">
        <defs>
          <linearGradient id={`${id}-leaf`} x1="0" y1="0" x2="1" y2="0.3">
            <stop offset="0" stopColor="#4f7a2c" />
            <stop offset="0.45" stopColor="#2f5a1f" />
            <stop offset="1" stopColor="#1c3a14" />
          </linearGradient>
        </defs>
      </svg>
      <svg className="ashok__cord" viewBox="0 0 1000 20" preserveAspectRatio="none">
        <path d="M0 5 Q 500 15 1000 5" className="ashok__rope" />
        <path d="M0 5 Q 500 15 1000 5" className="ashok__rope ashok__rope--twist" />
      </svg>
      <ul className="ashok__row">
        {items.map((item, i) => (
          <li
            key={i}
            className={`ashok__item ashok__item--${item.kind} ${item.long ? 'is-long' : ''}`}
            style={{
              '--sag': `${(1 - (item.fromCentre / ((LEAVES - 1) / 2)) ** 2) * 0.5}rem`,
              '--tilt': `${item.tilt ?? 0}deg`,
              '--sway': `${item.sway ?? 4}s`,
              '--delay': `${item.fromCentre * 0.04}s`,
            }}
          >
            {item.kind === 'knot' ? <Knot /> : <Leaf id={id} />}
          </li>
        ))}
      </ul>
    </div>
  )
}
