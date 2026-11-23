import { useEffect, useState } from 'react'
import { useSound } from '../context/SoundContext.jsx'
import { wedding } from '../data/wedding.js'
import Monogram from './Monogram.jsx'
import { Diya } from './Ornaments.jsx'
import './Opening.css'

const SEEN_KEY = 'mh-opening-seen'

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    // Private mode or blocked storage: the opening simply shows again next time.
  }
}

/*
 * The first screen: a dark Sheesh Mahal arch with an unlit diya.
 * Tapping the diya lights it, starts the music and reveals the names,
 * then the arch fades away into the site.
 *
 * Stages: idle → lit (flame, glow, names) → leaving (fade out) → done.
 */
export default function Opening() {
  const { start } = useSound()
  const [stage, setStage] = useState(() => (alreadySeen() ? 'done' : 'idle'))

  useEffect(() => {
    if (stage === 'done') return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [stage])

  useEffect(() => {
    if (stage === 'lit') {
      const id = setTimeout(() => setStage('leaving'), 4200)
      return () => clearTimeout(id)
    }
    if (stage === 'leaving') {
      const id = setTimeout(() => setStage('done'), 1200)
      return () => clearTimeout(id)
    }
  }, [stage])

  if (stage === 'done') return null

  const light = () => {
    if (stage !== 'idle') return
    start()
    markSeen()
    setStage('lit')
  }

  return (
    <div className={`opening opening--${stage}`} role="dialog" aria-label="Welcome">
      <div className="opening__mirrors" aria-hidden="true" />
      <div className="opening__glow" aria-hidden="true" />

      <div className="opening__arch" aria-hidden="true">
        <svg viewBox="0 0 400 560" preserveAspectRatio="xMidYMax meet">
          <path
            className="opening__arch-line"
            d="M40 560 V250 C40 210 60 190 80 176 C96 120 140 80 176 70 C186 46 194 34 200 24
               C206 34 214 46 224 70 C260 80 304 120 320 176 C340 190 360 210 360 250 V560"
          />
          <path
            className="opening__arch-line opening__arch-line--inner"
            d="M62 560 V256 C62 222 78 206 96 194 C110 144 148 108 182 98 C190 78 196 66 200 58
               C204 66 210 78 218 98 C252 108 290 144 304 194 C322 206 338 222 338 256 V560"
          />
        </svg>
      </div>

      <div className="opening__content">
        <p className="opening__invocation hindi">{wedding.invocation.hindi}</p>
        <Monogram className="opening__monogram" />
        <h1 className="opening__names script">
          {wedding.bride} <span>&amp;</span> {wedding.groom}
        </h1>
        <p className="opening__date eyebrow">
          {wedding.dateShort} · {wedding.city}
        </p>
      </div>

      <button type="button" className="opening__diya" onClick={light} aria-label="Light the diya to open the invitation">
        <Diya lit={stage !== 'idle'} />
      </button>

      <p className="opening__hint">
        <span className="hindi">दीप जलाइए</span>
        <span className="eyebrow">Tap the diya to begin</span>
      </p>
    </div>
  )
}
