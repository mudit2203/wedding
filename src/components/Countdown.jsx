import { useCountdown } from '../hooks/useCountdown.js'
import './Countdown.css'

const LABELS = [
  ['days', 'Days', 'दिन'],
  ['hours', 'Hours', 'घंटे'],
  ['minutes', 'Minutes', 'मिनट'],
  ['seconds', 'Seconds', 'सेकंड'],
]

export default function Countdown({ to, tone = 'light' }) {
  const left = useCountdown(to)

  if (left.done) {
    return <p className={`countdown countdown--${tone} countdown__done script`}>Today is the day</p>
  }

  return (
    <div className={`countdown countdown--${tone}`} role="timer" aria-label="Time until the wedding">
      {LABELS.map(([unit, label, hindi]) => (
        <div key={unit} className="countdown__cell">
          <span className="countdown__value">{String(left[unit]).padStart(2, '0')}</span>
          <span className="countdown__label">
            <span className="hindi">{hindi}</span> {label}
          </span>
        </div>
      ))}
    </div>
  )
}
