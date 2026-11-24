import { useEffect } from 'react'

// Decorations that loop forever. While one is off screen its animations are
// paused, so the browser only animates what the guest can actually see.
const LOOPING = '.hero, .garland, .birds, .rickshaw-road, .diya'

export function usePauseOffscreen() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const seen = new WeakSet()
    const visibility = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.classList.toggle('is-offscreen', !entry.isIntersecting)
      },
      { rootMargin: '120px 0px' },
    )
    let frame = 0
    const scan = () => {
      frame = 0
      for (const node of document.querySelectorAll(LOOPING)) {
        if (seen.has(node)) continue
        seen.add(node)
        visibility.observe(node)
      }
    }
    // Pages load lazily, so look again whenever new content arrives.
    const additions = new MutationObserver(() => {
      if (!frame) frame = requestAnimationFrame(scan)
    })
    scan()
    additions.observe(document.body, { childList: true, subtree: true })
    return () => {
      additions.disconnect()
      visibility.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])
}
