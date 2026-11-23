import { useEffect, useState } from 'react'

const UNITS = [
  ['days', 86_400_000],
  ['hours', 3_600_000],
  ['minutes', 60_000],
  ['seconds', 1_000],
]

function remaining(target) {
  let diff = Math.max(0, new Date(target).getTime() - Date.now())
  const parts = {}
  for (const [unit, ms] of UNITS) {
    parts[unit] = Math.floor(diff / ms)
    diff -= parts[unit] * ms
  }
  return { ...parts, done: parts.days + parts.hours + parts.minutes + parts.seconds === 0 }
}

/** Live time left until `target` (any Date-parsable value), ticking each second. */
export function useCountdown(target) {
  const [left, setLeft] = useState(() => remaining(target))

  useEffect(() => {
    const id = setInterval(() => setLeft(remaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return left
}
