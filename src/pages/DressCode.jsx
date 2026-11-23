import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { dressCodeOrder, dressCodes } from '../data/dressCodes.js'
import { weather } from '../data/travel.js'
import './DressCode.css'

function DressPanel({ id, code, index }) {
  const [who, setWho] = useState('her')
  const pieces = who === 'her' ? code.her : code.him

  return (
    <section id={id} className={`dress ${index % 2 ? 'dress--flip' : ''}`} aria-labelledby={`${id}-title`}>
      <Reveal className="dress__look">
        <img
          src={code.look}
          alt={`Illustrated outfit ideas for the ${code.event}`}
          width={code.width}
          loading="lazy"
          decoding="async"
        />
      </Reveal>

      <Reveal className="dress__text" delay={120}>
        <p className="eyebrow dress__when">{code.when}</p>
        <p className="hindi dress__hindi">{code.eventHindi}</p>
        <h2 id={`${id}-title`} className="dress__event">{code.event}</h2>
        <p className="dress__theme">
          <span className="script">{code.theme}</span>
          <span className="hindi">{code.themeHindi}</span>
        </p>
        <p className="dress__style">{code.style}</p>

        <ul className="dress__palette" aria-label="Colour palette">
          {code.colours.map((colour) => (
            <li key={colour.name}>
              <span className="dress__chip" style={{ background: colour.hex }} />
              <span className="dress__chip-name">{colour.name}</span>
            </li>
          ))}
        </ul>

        <div className="dress__toggle" role="group" aria-label="Show outfits for">
          {['her', 'him'].map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={who === option}
              className={who === option ? 'is-active' : ''}
              onClick={() => setWho(option)}
            >
              For {option}
            </button>
          ))}
        </div>
        <ul className="dress__pieces" key={who}>
          {pieces.map((piece) => (
            <li key={piece}>{piece}</li>
          ))}
        </ul>

        <p className="dress__tip">{code.tip}</p>
      </Reveal>
    </section>
  )
}

export default function DressCode() {
  return (
    <>
      <PageHeader
        gate="leheriya"
        decor="marigold"
        hindi="पहनावा"
        title="What to Wear"
        intro="A little guide to help you dress for each celebration. Colours are suggestions, not rules. Come as you are, and come comfortable."
      >
        <nav className="day-links dress-links" aria-label="Events">
          {dressCodeOrder.map((key) => (
            <a key={key} href={`#${key}`} className="day-links__item">
              <span className="eyebrow">{dressCodes[key].when.split(' · ')[0]}</span>
              <span>{dressCodes[key].theme}</span>
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="dress-list container">
        {dressCodeOrder.map((key, index) => (
          <DressPanel key={key} id={key} code={dressCodes[key]} index={index} />
        ))}
      </div>

      <section className="dress-notes section">
        <div className="container dress-notes__grid">
          <Reveal className="dress-note">
            <p className="eyebrow">The weather</p>
            <p>
              Around {weather.day} by day and {weather.night} at night. Bring a shawl, a stole or a jacket for the
              evenings.
            </p>
          </Reveal>
          <Reveal className="dress-note" delay={100}>
            <p className="eyebrow">Shoes</p>
            <p>Some events are on lawns. Block heels and juttis will be kinder to you than stilettos.</p>
          </Reveal>
          <Reveal className="dress-note" delay={200}>
            <p className="eyebrow">Hair &amp; make-up</p>
            <p>Details of salon artists at the venue will be shared closer to the date.</p>
          </Reveal>
        </div>
        <div className="dress-notes__next">
          <Link to="/venue" viewTransition className="button button--ghost">
            Next: Venue &amp; travel
          </Link>
        </div>
      </section>
    </>
  )
}
