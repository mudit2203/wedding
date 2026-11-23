import { Toran } from './Ornaments.jsx'
import { Birds, WordReveal } from './Scenery.jsx'
import './PageHeader.css'

/**
 * The opening band of each inner page: a toran, the page title in Hindi
 * and English, and an optional short introduction.
 */
export default function PageHeader({ hindi, title, intro, children }) {
  return (
    <header className="page-header">
      <Toran className="page-header__toran" />
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
