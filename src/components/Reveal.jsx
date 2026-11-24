import { useInView } from '../hooks/useInView.js'
import './Reveal.css'

/**
 * Fades and lifts its children into place when they scroll into view.
 * `delay` is in milliseconds, for staggering items in a row.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...props }) {
  const [ref, inView] = useInView({ threshold: 0.05, rootMargin: '0px 0px 6% 0px' })
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`.trim()}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  )
}
