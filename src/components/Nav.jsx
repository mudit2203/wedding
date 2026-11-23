import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navLinks } from '../data/wedding.js'
import Monogram from './Monogram.jsx'
import SoundToggle from './SoundToggle.jsx'
import './Nav.css'

const half = Math.ceil(navLinks.length / 2)

function NavItem({ to, label }) {
  return (
    <NavLink to={to} viewTransition className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}>
      {label}
    </NavLink>
  )
}

export default function Nav() {
  const { pathname } = useLocation()
  // The mobile menu remembers the page it was opened on, so it closes by itself on navigation.
  const [openOn, setOpenOn] = useState(null)
  const open = openOn === pathname

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
  }, [open])

  return (
    <header className="nav">
      <div className="nav__bar container">
        <nav className="nav__side nav__side--left" aria-label="Main">
          {navLinks.slice(0, half).map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </nav>

        <Link to="/" viewTransition className="nav__home" aria-label="Home">
          <Monogram className="nav__monogram" />
        </Link>

        <nav className="nav__side nav__side--right" aria-label="More">
          {navLinks.slice(half).map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
          <Link to="/rsvp" viewTransition className="button nav__rsvp">
            RSVP
          </Link>
        </nav>

        <div className="nav__tools">
          <SoundToggle />
          <button
            type="button"
            className="nav__menu-button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
            <span className="nav__burger" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`nav__sheet ${open ? 'is-open' : ''}`} hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            <li>
              <NavLink to="/" end viewTransition className="nav__sheet-link">
                <span className="hindi">निमंत्रण</span>
                Home
              </NavLink>
            </li>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} viewTransition className="nav__sheet-link">
                  <span className="hindi">{link.hindi}</span>
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/rsvp" viewTransition className="nav__sheet-link">
                <span className="hindi">उपस्थिति</span>
                RSVP
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
