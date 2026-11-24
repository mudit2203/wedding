import { contacts, instagram } from '../data/wedding.js'
import Reveal from './Reveal.jsx'
import './Contacts.css'

const formatPhone = (phone) => `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`

/** Who to call or message, plus the couple's Instagram. */
export default function Contacts({ id = 'contact', header = true }) {
  return (
    <section
      id={id}
      className="contacts section"
      aria-labelledby={header ? `${id}-title` : undefined}
      aria-label={header ? undefined : 'Family contacts'}
    >
      <div className="container">
        {header && (
          <Reveal as="header" className="contacts__header">
            <p className="hindi">संपर्क करें</p>
            <h2 id={`${id}-title`}>Get in touch</h2>
            <p className="muted">For travel, stay or anything at all, call or message the family.</p>
          </Reveal>
        )}

        <ul className="contacts__list">
          {contacts.map((person, index) => (
            <Reveal as="li" key={person.phone} className="contact gloss" delay={index * 100}>
              <p className="eyebrow contact__role">
                {person.role} · <span className="hindi">{person.roleHindi}</span>
              </p>
              <p className="contact__name">{person.name}</p>
              <a className="contact__phone" href={`tel:+91${person.phone}`}>
                {formatPhone(person.phone)}
              </a>
              <div className="contact__actions">
                <a href={`tel:+91${person.phone}`}>Call</a>
                <a href={`https://wa.me/91${person.phone}`} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="contacts__social">
          <a href={instagram.url} target="_blank" rel="noreferrer" className="contacts__instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.3" cy="6.7" r="0.8" />
            </svg>
            Follow along at {instagram.handle}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
