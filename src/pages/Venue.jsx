import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { Rickshaw } from '../components/Scenery.jsx'
import Reveal from '../components/Reveal.jsx'
import { explore, faqs, gettingThere, venuePhotos, weather } from '../data/travel.js'
import { wedding } from '../data/wedding.js'
import './Venue.css'

function VenuePhoto({ photo, ratio, className = '', sizes }) {
  const small = `/images/venue/${photo.file}-640.webp`
  const large = `/images/venue/${photo.file}-1280.webp`
  return (
    <div className={`venue-photo ${className}`} style={{ aspectRatio: ratio ?? photo.ratio }}>
      <img
        src={photo.maxWidth > 640 ? large : small}
        srcSet={`${small} 640w, ${large} ${photo.maxWidth}w`}
        sizes={sizes}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

/** The Google map loads only when asked for, so the page stays light. */
function MapEmbed() {
  const [show, setShow] = useState(false)
  const query = encodeURIComponent(wedding.venue.mapQuery)

  if (show) {
    return (
      <iframe
        className="venue-map__frame"
        title={`Map of ${wedding.venue.name}`}
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    )
  }

  return (
    <button type="button" className="venue-map__placeholder" onClick={() => setShow(true)}>
      <span className="eyebrow">Show the map</span>
      <span className="muted">Loads Google Maps</span>
    </button>
  )
}

export default function Venue() {
  const [front, evening, grounds] = venuePhotos
  const { venue } = wedding

  return (
    <>
      <PageHeader
        art="lotus"
        hindi="विवाह स्थल"
        title="Venue & Travel"
        intro={`${venue.name}, ${venue.city}. Our home for the celebrations on ${venue.dates}.`}
      />

      <section className="venue-hero container">
        <Reveal className="venue-hero__main">
          <VenuePhoto photo={front} ratio="10 / 11" sizes="(min-width: 60rem) 60vw, 100vw" className="venue-photo--arch" />
        </Reveal>
        <div className="venue-hero__side">
          <Reveal delay={120}>
            <VenuePhoto photo={evening} sizes="(min-width: 60rem) 30vw, 100vw" />
          </Reveal>
          <Reveal delay={240}>
            <VenuePhoto photo={grounds} sizes="(min-width: 60rem) 30vw, 100vw" />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container venue-where">
          <Reveal className="venue-where__text">
            <p className="hindi venue-where__hindi">रूप गढ़ पैलेस</p>
            <h2>{venue.name}</h2>
            <p className="lead">
              A white palace with terraces, lawns and an open-air amphitheatre, on the edge of Jaipur. The Mayara,
              Sangeet, Haldi and the wedding itself all take place here.
            </p>
            <div className="venue-where__actions">
              <a className="button" href={venue.directionsUrl} target="_blank" rel="noreferrer">
                Get directions
              </a>
              <Link to="/celebrations" viewTransition className="button button--ghost">
                See the schedule
              </Link>
            </div>
          </Reveal>
          <Reveal className="venue-map" delay={120}>
            <MapEmbed />
          </Reveal>
        </div>
      </section>

      <section className="section venue-travel">
        <div className="container">
          <Reveal as="header" className="venue-heading">
            <p className="hindi">यात्रा</p>
            <h2>Getting to Jaipur</h2>
          </Reveal>
          <Rickshaw className="venue-travel__road" />
          <div className="venue-travel__grid">
            {gettingThere.map((item, index) => (
              <Reveal key={item.title} className="venue-card" delay={index * 100}>
                <p className="eyebrow">{item.title}</p>
                <p>{item.text}</p>
              </Reveal>
            ))}
            <Reveal className="venue-card venue-card--weather" delay={300}>
              <p className="eyebrow">The weather</p>
              <p className="venue-weather">
                <span>
                  {weather.day}
                  <small>day</small>
                </span>
                <span>
                  {weather.night}
                  <small>night</small>
                </span>
              </p>
              <p>{weather.note}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal as="header" className="venue-heading">
            <p className="hindi">गुलाबी नगरी</p>
            <h2>While you are in the Pink City</h2>
          </Reveal>
          <ul className="venue-explore">
            {explore.map((place, index) => (
              <Reveal as="li" key={place.name} className="venue-explore__item" delay={(index % 3) * 100}>
                <span className="eyebrow">{place.kind}</span>
                <h3>{place.name}</h3>
                <p className="muted">{place.note}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section venue-faq">
        <div className="narrow">
          <Reveal as="header" className="venue-heading">
            <p className="hindi">प्रश्न</p>
            <h2>Good to know</h2>
          </Reveal>
          <div className="faq">
            {faqs.map((faq) => (
              <details key={faq.question} className="faq__item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
