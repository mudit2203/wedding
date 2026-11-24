import { useEffect, useRef } from 'react'
import './InlineVideo.css'

/**
 * A short video in an arch frame. It loads only when scrolled near and plays
 * silently on loop: Jeevan Ki Dor is the only sound on the site.
 */
export default function InlineVideo({ src, poster, label }) {
  const ref = useRef(null)

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

  return (
    <div className="inline-video">
      <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-label={label} />
    </div>
  )
}
