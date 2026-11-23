import { Link } from 'react-router-dom'
import Monogram from '../components/Monogram.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { dressCodes } from '../data/dressCodes.js'
import { days } from '../data/events.js'
import './Celebrations.css'

function Postcard({ event, date }) {
  const dressCode = event.dressCode ? dressCodes[event.dressCode] : null
  return (
    <article
      id={event.id}
      className={`postcard ${event.night ? 'postcard--night' : ''}`}
      style={{ '--sky-top': event.sky[0], '--sky-bottom': event.sky[1] }}
    >
      <div className="postcard__scene" aria-hidden="true">
        <span className="postcard__sun" />
        <span className="postcard__skyline" />
        <span className="postcard__hindi hindi">{event.hindi}</span>
      </div>

      <div className="postcard__body">
        <div className="postcard__stamp" aria-hidden="true">
          <Monogram />
        </div>
        <div className="postcard__postmark" aria-hidden="true">
          <span>Jaipur</span>
          <span>{date.split(' ').slice(0, 2).join(' ')}</span>
        </div>

        <p className="eyebrow postcard__side">{event.side}</p>
        <h3 className="postcard__name">{event.name}</h3>
        <p className="postcard__about">{event.about}</p>

        <dl className="postcard__details">
          <div>
            <dt className="eyebrow">When</dt>
            <dd>{event.time}</dd>
          </div>
          <div>
            <dt className="eyebrow">Where</dt>
            <dd>
              {event.venue}
              {event.directions ? (
                <a className="postcard__map" href={event.directions} target="_blank" rel="noreferrer">
                  Directions
                </a>
              ) : (
                <span className="postcard__map postcard__map--soon">Directions coming soon</span>
              )}
            </dd>
          </div>
        </dl>

        {dressCode && (
          <Link to={`/dress-code#${event.dressCode}`} viewTransition className="postcard__dress">
            <span className="postcard__swatches" aria-hidden="true">
              {dressCode.colours.slice(0, 4).map((colour) => (
                <i key={colour.name} style={{ background: colour.hex }} />
              ))}
            </span>
            Dress code · {dressCode.theme}
          </Link>
        )}
      </div>
    </article>
  )
}

export default function Celebrations() {
  return (
    <>
      <PageHeader
        hindi="उत्सव"
        title="The Celebrations"
        intro="Four days of rituals, music and colour, from the first mehendi to the seven pheras."
      >
        <nav className="day-links" aria-label="Days">
          {days.map((day, index) => (
            <a key={day.id} href={`#${day.id}`} className="day-links__item">
              <span className="eyebrow">Day {index + 1}</span>
              <span>{day.date.replace(' 2027', '')}</span>
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="celebrations container">
        {days.map((day, index) => (
          <section key={day.id} id={day.id} className="day" aria-labelledby={`${day.id}-title`}>
            <Reveal as="header" className="day__header">
              <p className="day__number">0{index + 1}</p>
              <div>
                <p className="hindi day__hindi">{day.dateHindi}</p>
                <h2 id={`${day.id}-title`} className="day__title">
                  {day.weekday}, {day.date}
                </h2>
              </div>
            </Reveal>
            <div className="day__events">
              {day.events.map((event) => (
                <Reveal key={event.id}>
                  <Postcard event={event} date={day.date} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
