import { Link } from 'react-router-dom'
import Countdown from '../components/Countdown.jsx'
import InlineVideo from '../components/InlineVideo.jsx'
import Garland from '../components/Garland.jsx'
import Hero from '../components/Hero.jsx'
import { Divider } from '../components/Ornaments.jsx'
import Reveal from '../components/Reveal.jsx'
import { Rickshaw, Unroll } from '../components/Scenery.jsx'
import { wedding } from '../data/wedding.js'
import './Home.css'

const explore = [
  {
    to: '/story',
    hindi: 'हमारी कहानी',
    title: 'Our Story',
    text: 'From the same school corridors to forever.',
    image: '/images/photos/roka-480.webp',
  },
  {
    to: '/celebrations',
    hindi: 'उत्सव',
    title: 'Celebrations',
    text: 'Four days of rituals, music and colour.',
    image: '/images/venue/palace-evening-640.webp',
  },
  {
    to: '/dress-code',
    hindi: 'पहनावा',
    title: 'Dress Code',
    text: 'What to wear to each event.',
    image: '/images/guide/rack-mayara.webp',
    contain: true,
  },
  {
    to: '/venue',
    hindi: 'विवाह स्थल',
    title: 'Venue & Travel',
    text: 'Roop Garh Palace, and getting to Jaipur.',
    image: '/images/venue/palace-front-640.webp',
  },
]

function Invitation() {
  const { invocation, invitation, families } = wedding
  return (
    <section className="invitation section">
      <div className="narrow invitation__inner">
        <Reveal className="invitation__deity">
          <img src="/images/blessing/govind-dev-ji.webp" alt="Shri Govind Dev Ji" loading="lazy" width="495" height="619" />
        </Reveal>
        <Reveal>
          <p className="hindi invitation__hindi">{invocation.blessingHindi}</p>
          <p className="eyebrow">{invocation.blessing}</p>
        </Reveal>
        <Divider />
        <Unroll>
          <div className="invitation__cloth">
            <p className="hindi invitation__hindi">{invitation.hindi}</p>
            <p className="lead">{invitation.english}</p>

            <div className="invitation__couple">
              <div className="invitation__person">
                <h2 className="script">{wedding.bride}</h2>
                <p className="hindi">{families.bride.hindi}</p>
                <p className="eyebrow">{families.bride.english}</p>
              </div>
              <p className="invitation__amp script" aria-hidden="true">
                &amp;
              </p>
              <div className="invitation__person">
                <h2 className="script">{wedding.groom}</h2>
                <p className="hindi">{families.groom.hindi}</p>
                <p className="eyebrow">{families.groom.english}</p>
              </div>
            </div>

            <div className="invitation__when">
              <p className="eyebrow">{wedding.dateLabel}</p>
              <p className="invitation__venue">
                {wedding.venue.name}, {wedding.venue.city}
              </p>
              <p className="muted">Celebrations from {wedding.celebrationDates}</p>
            </div>
          </div>
        </Unroll>
      </div>
    </section>
  )
}

function CountdownBand() {
  return (
    <section className="countdown-band" aria-labelledby="countdown-title">
      <div className="container countdown-band__inner">
        <p className="hindi countdown-band__hindi">शुभ दिन आने में</p>
        <h2 id="countdown-title" className="eyebrow countdown-band__title">
          Until we celebrate
        </h2>
        <Countdown to={wedding.countdownTo} tone="dark" />
        <Link to="/rsvp" viewTransition className="button button--light">
          Will you join us? RSVP
        </Link>
      </div>
      <Rickshaw tone="light" className="countdown-band__road" />
    </section>
  )
}

function Families() {
  return (
    <section className="families section">
      <div className="container families__inner">
        <Reveal className="families__text">
          <p className="hindi families__hindi">दो परिवार, एक उत्सव</p>
          <h2 className="families__title">Hers, his and now theirs</h2>
          <p className="lead">
            Two families who have already started to feel like one. We can’t wait for you to meet everyone in Jaipur.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <InlineVideo
            src="/video/families.mp4"
            poster="/video/families-poster.webp"
            label="A short video introducing both families"
          />
        </Reveal>
      </div>
    </section>
  )
}

function Explore() {
  return (
    <section className="explore section">
      <Garland />
      <div className="container">
        <Reveal as="header" className="explore__header">
          <p className="hindi">आइए, जानिए</p>
          <h2>Everything you need to know</h2>
        </Reveal>
        <ul className="explore__grid">
          {explore.map((item, index) => (
            <Reveal as="li" key={item.to} delay={index * 100}>
              <Link to={item.to} viewTransition className="explore__card">
                <div className={`explore__image ${item.contain ? 'explore__image--contain' : ''}`}>
                  <img src={item.image} alt="" loading="lazy" />
                </div>
                <p className="hindi explore__hindi">{item.hindi}</p>
                <h3>{item.title}</h3>
                <p className="muted">{item.text}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Invitation />
      <CountdownBand />
      <Families />
      <Explore />
    </>
  )
}
