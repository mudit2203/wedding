import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const SoundContext = createContext(null)

const TRACK = '/audio/jeevan-ki-dor.mp3'
const VOLUME = 0.55

/**
 * Owns the single background track. Browsers only allow audio after a tap,
 * so `start()` is called from the diya tap in the opening.
 */
export function SoundProvider({ children }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio()
    audio.src = TRACK
    audio.preload = 'none'
    audio.loop = true
    audio.volume = VOLUME
    audioRef.current = audio

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    return () => {
      audio.pause()
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [])

  const start = useCallback(() => {
    audioRef.current?.play().catch(() => setPlaying(false))
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) start()
    else audio.pause()
  }, [start])

  return <SoundContext.Provider value={{ playing, start, toggle }}>{children}</SoundContext.Provider>
}

// eslint-disable-next-line react/only-export-components
export function useSound() {
  const value = useContext(SoundContext)
  if (!value) throw new Error('useSound must be used inside <SoundProvider>')
  return value
}
