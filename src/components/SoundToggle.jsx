import { useSound } from '../context/SoundContext.jsx'
import './SoundToggle.css'

/** A small round button that plays or pauses the music, with moving bars while it plays. */
export default function SoundToggle({ className = '' }) {
  const { playing, toggle } = useSound()
  return (
    <button
      type="button"
      className={`sound ${playing ? 'is-playing' : ''} ${className}`.trim()}
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? 'Pause music' : 'Play music'}
    >
      <span className="sound__bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
    </button>
  )
}
