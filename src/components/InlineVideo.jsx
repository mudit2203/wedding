import { useEffect, useRef, useState } from 'react'
import { useSound } from '../context/SoundContext.jsx'
import './InlineVideo.css'

/**
 * A short video in an arch frame. It loads only when scrolled near, plays
 * silently on loop, and can be unmuted with a tap (which pauses the music).
 */
export default function InlineVideo({ src, poster, label }) {
  const ref = useRef(null)
  const [muted, setMuted] = useState(true)
  const { playing, toggle } = useSound()

  useEffect(() => {
    const video = ref.current
    if (!video || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.preload = 'auto'
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const toggleSound = () => {
    const next = !muted
    setMuted(next)
    if (!next && playing) toggle()
  }

  return (
    <div className="inline-video">
      <video ref={ref} src={src} poster={poster} muted={muted} loop playsInline preload="none" aria-label={label} />
      <button type="button" className="inline-video__sound" onClick={toggleSound}>
        {muted ? 'Tap for sound' : 'Mute'}
      </button>
    </div>
  )
}
