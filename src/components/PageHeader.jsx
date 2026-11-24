import Garland from './Garland.jsx'
import LineArt from './LineArt.jsx'
import { Birds, WordReveal } from './Scenery.jsx'
import './PageHeader.css'

/**
 * The opening band of each inner page: hanging marigolds, the page title in Hindi
 * and English, an optional short introduction, and an optional line drawing
 * (`art`) standing in both bottom corners.
 */
export default function PageHeader({ hindi, title, intro, art, children }) {
  return (
    <header className="page-header">
      <Garland />
      {art && (
        <>
          <LineArt name={art} className="page-header__art page-header__art--left" />
          <LineArt name={art} className="page-header__art page-header__art--right" />
        </>
      )}
      <Birds />
      <div className="page-header__inner narrow">
        <p className="page-header__hindi hindi">{hindi}</p>
        <h1 className="page-header__title">{title}</h1>
        {intro && <WordReveal text={intro} className="page-header__intro lead" />}
        {children}
      </div>
    </header>
  )
}
