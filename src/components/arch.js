/*
 * Geometry shared by the gateways on the site.
 */

/** The outline of a cusped (multifoil) Mughal arch opening down to the ground. */
export function archPath({ width, height, archWidth, spring, apex, lobes }) {
  const cx = width / 2
  const x1 = cx - archWidth / 2
  const x2 = cx + archWidth / 2
  // A pointed arch: each side is part of a circle centred across the opening.
  const radius = archWidth * 0.75
  const centre = x1 + radius
  const top = Math.acos(Math.min(1, (centre - cx) / radius))
  const side = (from, sign) =>
    Array.from({ length: lobes + 1 }, (_, i) => {
      const angle = (top * i) / lobes
      const x = sign > 0 ? from + radius - radius * Math.cos(angle) : from - radius + radius * Math.cos(angle)
      const y = spring - ((spring - apex) * radius * Math.sin(angle)) / (radius * Math.sin(top))
      return [x, y]
    })
  const left = side(x1, 1)
  const right = side(x2, -1).reverse()
  const lobe = (points) =>
    points
      .slice(1)
      .map(([x, y], i) => {
        const [px, py] = points[i]
        const r = Math.hypot(x - px, y - py) * 0.62
        return `A ${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${x.toFixed(1)} ${y.toFixed(1)}`
      })
      .join(' ')
  return [
    `M ${x1} ${height} L ${x1} ${spring}`,
    lobe(left),
    lobe(right),
    `L ${x2} ${height} Z`,
  ].join(' ')
}
