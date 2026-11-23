import { useEffect, useState } from 'react'

function timeLeft(target) {
  const diff = Math.max(0, new Date(target) - new Date())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function Countdown({ date }) {
  const [left, setLeft] = useState(() => timeLeft(date))

  useEffect(() => {
    const id = setInterval(() => setLeft(timeLeft(date)), 1000)
    return () => clearInterval(id)
  }, [date])

  return (
    <section className="countdown" aria-label="Countdown to the wedding">
      {Object.entries(left).map(([unit, value]) => (
        <div key={unit} className="countdown-item">
          <span className="countdown-value">{value}</span>
          <span className="countdown-unit">{unit}</span>
        </div>
      ))}
    </section>
  )
}
