import { useId } from 'react'
import './Rajnigandha.css'

/*
 * Rajnigandha jhalar: scalloped swags of white tuberose buds strung across
 * the top of a section, with a red rose every few buds and short strings
 * hanging at each knot. The swags open from the centre outwards, and the
 * hanging strings sway a little.
 */

const LAYOUTS = {
  wide: { width: 1200, swags: 5, sag: 62 },
  narrow: { width: 600, swags: 3, sag: 52 },
}

const TOP = 6
const BUD_STEP = 8
const DROP_STEP = 9

// A point and its direction on a quadratic curve.
function onCurve(p0, c, p1, t) {
  const u = 1 - t
  return {
    x: u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0],
    y: u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1],
    angle: Math.atan2(2 * u * (c[1] - p0[1]) + 2 * t * (p1[1] - c[1]), 2 * u * (c[0] - p0[0]) + 2 * t * (p1[0] - c[0])),
  }
}

function build({ width, swags, sag }) {
  const span = width / swags
  const middle = (swags - 1) / 2
  const swagList = Array.from({ length: swags }, (_, s) => {
    const p0 = [s * span, TOP]
    const p1 = [(s + 1) * span, TOP]
    const c = [p0[0] + span / 2, TOP + sag * 2]
    const count = Math.round((span * 1.12) / BUD_STEP)
    const buds = Array.from({ length: count - 1 }, (_, i) => {
      const { x, y, angle } = onCurve(p0, c, p1, (i + 1) / count)
      const deg = (angle * 180) / Math.PI
      return { x, y, deg, rose: i % 9 === 4 }
    })
    return { d: `M ${p0} Q ${c} ${p1}`, buds, delay: Math.abs(s - middle) * 0.25 }
  })
  // Strings hang from every knot, longer towards the edges.
  const drops = Array.from({ length: swags + 1 }, (_, k) => {
    const fromCentre = Math.abs(k - swags / 2) / (swags / 2)
    const length = 5 + Math.round(fromCentre * 6) + (k % 2)
    return { x: k * span, length, delay: Math.abs(k - swags / 2) * 0.25 + 0.4 }
  })
  const height = TOP + sag + Math.max(...drops.map((d) => d.length)) * DROP_STEP + 40
  return { swagList, drops, height }
}

const built = Object.fromEntries(Object.entries(LAYOUTS).map(([key, layout]) => [key, { ...layout, ...build(layout) }]))

function Bud({ id, x, y, deg, rose }) {
  if (rose) return <use href={`#${id}-rose`} x={x - 6} y={y - 6} width="12" height="12" />
  // Two buds per knot, leaning out from the string on either side.
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${deg.toFixed(1)})`}>
      <use href={`#${id}-bud`} transform="rotate(62)" />
      <use href={`#${id}-bud`} transform="rotate(118)" />
    </g>
  )
}

function Drop({ id, x, length, delay }) {
  const end = TOP + length * DROP_STEP
  return (
    <g className="rajnigandha__drop" style={{ transformOrigin: `${x}px ${TOP}px`, '--delay': `${delay}s` }}>
      <line x1={x} y1={TOP} x2={x} y2={end} className="rajnigandha__thread" />
      {Array.from({ length }, (_, i) => (
        <g key={i} transform={`translate(${x} ${TOP + 6 + i * DROP_STEP})`}>
          <use href={`#${id}-bud`} transform="rotate(28)" />
          <use href={`#${id}-bud`} transform="rotate(-28)" />
        </g>
      ))}
      <use href={`#${id}-rose`} x={x - 8} y={end} width="16" height="16" />
      <path d={`M${x - 2} ${end + 15} l -1.5 14 M ${x} ${end + 15} v 16 M ${x + 2} ${end + 15} l 1.5 14`} className="rajnigandha__tassel" />
    </g>
  )
}

function Jhalar({ id, layout }) {
  const { width, height, swagList, drops } = built[layout]
  return (
    <svg className={`rajnigandha__svg rajnigandha__svg--${layout}`} viewBox={`0 0 ${width} ${height}`}>
      {drops.map((drop) => (
        <Drop key={drop.x} id={id} {...drop} />
      ))}
      {swagList.map((swag, s) => (
        <g key={s} className="rajnigandha__swag" style={{ '--delay': `${swag.delay}s` }}>
          <path d={swag.d} className="rajnigandha__thread" />
          {swag.buds.map((bud, b) => (
            <Bud key={b} id={id} {...bud} />
          ))}
        </g>
      ))}
    </svg>
  )
}

export default function Rajnigandha({ className = '' }) {
  const id = useId().replace(/:/g, '')
  return (
    <div className={`rajnigandha ${className}`.trim()} aria-hidden="true">
      <svg width="0" height="0" className="rajnigandha__defs">
        <defs>
          <linearGradient id={`${id}-petal`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d8e2b8" />
            <stop offset="0.35" stopColor="#fffdf4" />
            <stop offset="1" stopColor="#f4efe0" />
          </linearGradient>
          {/* One tuberose bud, hanging from its stalk at the origin */}
          <symbol id={`${id}-bud`} overflow="visible">
            <g transform="scale(1.3)">
            <path d="M0 0 C 2.6 1.6, 3.2 7.5, 0 12.5 C -3.2 7.5, -2.6 1.6, 0 0 Z" fill={`url(#${id}-petal)`} stroke="#cfc6a6" strokeWidth="0.4" />
            <path d="M0 4 L 0 11" stroke="#fff" strokeWidth="0.7" opacity="0.8" />
            <path d="M-1.4 0.4 Q 0 2.6 1.4 0.4" fill="#7f9a43" />
            </g>
          </symbol>
          <symbol id={`${id}-rose`} viewBox="-11 -11 22 22" overflow="visible">
            <circle r="9.5" fill="#a8213f" />
            <path d="M-8 2 C -8 -7, 4 -10, 8 -3 C 4 -5.5, -4 -5.5, -8 2 Z" fill="#c8306e" />
            <path d="M8 -1 C 9 7, -3 10, -8 4.5 C -3 6.5, 5 4.5, 8 -1 Z" fill="#b8285a" />
            <path d="M-4.5 -1 C -3.6 -5.4, 3.6 -5.4, 4.5 -1 C 2.7 2.7, -2.7 2.7, -4.5 -1 Z" fill="#d9467f" />
          </symbol>
        </defs>
      </svg>
      <Jhalar id={id} layout="wide" />
      <Jhalar id={id} layout="narrow" />
    </div>
  )
}
