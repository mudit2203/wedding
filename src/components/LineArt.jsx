import './LineArt.css'

/*
 * Fine gold line drawings that decorate the site: Ganesh ji, rajnigandha,
 * a lotus, a matka (kalash) and a Jaipur skyline. Each is a small static SVG
 * in /images/line, purely decorative.
 */
export default function LineArt({ name, className = '' }) {
  return (
    <img
      src={`/images/line/${name}.svg`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`line-art line-art--${name} ${className}`.trim()}
    />
  )
}
