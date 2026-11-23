import { Link } from 'react-router-dom'
import { instagram, navLinks, wedding } from '../data/wedding.js'
import Monogram from './Monogram.jsx'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__seal">
          <Monogram className="footer__monogram" />
        </div>
        <p className="footer__names script">
          {wedding.bride} &amp; {wedding.groom}
        </p>
        <p className="eyebrow footer__meta">
          {wedding.dateLabel} · {wedding.venue.name}, {wedding.city}
        </p>
        <nav className="footer__links" aria-label="Footer">
          <Link to="/" viewTransition>
            Home
          </Link>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} viewTransition>
              {link.label}
            </Link>
          ))}
          <Link to="/rsvp" viewTransition>
            RSVP
          </Link>
        </nav>
        <p className="footer__hashtag">
          {wedding.hashtag} ·{' '}
          <a href={instagram.url} target="_blank" rel="noreferrer">
            {instagram.handle}
          </a>
        </p>
      </div>
    </footer>
  )
}
