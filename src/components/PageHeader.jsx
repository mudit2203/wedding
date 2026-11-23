import { archPath } from './arch.js'
import AshokToran from './AshokToran.jsx'
import Garland from './Garland.jsx'
import Rajnigandha from './Rajnigandha.jsx'
import { Birds, WordReveal } from './Scenery.jsx'
import './PageHeader.css'

// The top of the doorway: a cusped arch the full width of the opening.
const CAP = { width: 900, height: 300, archWidth: 900, spring: 300, apex: 24, lobes: 7 }
const capPath = archPath(CAP)
// The same outline left open at the bottom, so its bands run straight into the jambs.
const capEdge = capPath.replace(/ Z$/, '')

// What hangs across the top of the wall, so no two neighbouring pages look alike.
const DECOR = { marigold: Garland, rajnigandha: Rajnigandha, ashok: AshokToran }

/**
 * The opening of each inner page is a painted Jaipur gateway, each page in
 * its own colour like the four gates of the City Palace. Marigold ladis hang
 * across the wall (or rajnigandha, or ashok leaves), and the page title sits inside the doorway.
 *
 * `gate` picks the colour: peacock, rose, lotus, leheriya, sandstone,
 * indigo or emerald. `decor` picks what hangs across the top: marigold
 * ladis, rajnigandha swags or an ashok-leaf toran.
 */
export default function PageHeader({ hindi, title, intro, gate = 'peacock', decor = 'marigold', children }) {
  const Decor = DECOR[decor]
  return (
    <header className={`page-header page-header--${gate}`}>
      <Decor />
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
