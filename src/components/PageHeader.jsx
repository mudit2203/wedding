import { archPath } from './arch.js'
import Garland from './Garland.jsx'
import { Birds, WordReveal } from './Scenery.jsx'
import './PageHeader.css'

// The top of the doorway: a cusped arch the full width of the opening.
const CAP = { width: 900, height: 300, archWidth: 900, spring: 300, apex: 24, lobes: 7 }
const capPath = archPath(CAP)
// The same outline left open at the bottom, so its bands run straight into the jambs.
const capEdge = capPath.replace(/ Z$/, '')

/**
 * The opening of each inner page is a painted Jaipur gateway, each page in
 * its own colour like the four gates of the City Palace. Marigold ladis hang
 * across the wall, and the page title sits inside the doorway.
 *
 * `gate` picks the colour: peacock, rose, lotus, leheriya, sandstone,
 * indigo or emerald.
 */
export default function PageHeader({ hindi, title, intro, gate = 'peacock', children }) {
  return (
    <header className={`page-header page-header--${gate}`}>
      <Garland />
      <div className="page-header__door">
        <svg className="page-header__cap" viewBox="0 0 900 300" aria-hidden="true">
          <path d={capPath} className="page-header__sky" />
          <path d={capEdge} className="page-header__band" />
          <path d={capEdge} className="page-header__dots" />
          <path d={capEdge} className="page-header__edge" />
        </svg>
        <div className="page-header__body">
          <Birds />
          <div className="page-header__inner">
            <p className="page-header__hindi hindi">{hindi}</p>
            <h1 className="page-header__title">{title}</h1>
            {intro && <WordReveal text={intro} className="page-header__intro lead" />}
            {children}
          </div>
        </div>
      </div>
    </header>
  )
}
