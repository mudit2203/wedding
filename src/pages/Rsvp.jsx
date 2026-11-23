import { useState } from 'react'
import { Link } from 'react-router-dom'
import Contacts from '../components/Contacts.jsx'
import Countdown from '../components/Countdown.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { days } from '../data/events.js'
import { wedding } from '../data/wedding.js'
import './Rsvp.css'

/*
 * Answers are posted to a Google Apps Script web app that writes them to a
 * Google Sheet (see docs/rsvp-google-sheet.md). Set VITE_RSVP_ENDPOINT to its
 * URL. Without it, the form only pretends to send, which is handy locally.
 */
const ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT

const events = days.flatMap((day) =>
  day.events.map((event) => ({ id: event.id, label: event.name, date: day.date.replace(' 2027', '') })),
)

async function sendRsvp(data) {
  if (!ENDPOINT) {
    await new Promise((resolve) => setTimeout(resolve, 700))
    return
  }
  // Apps Script does not answer CORS preflights, so send a simple form post.
  await fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(data) })
}

// Each petal gets its own sideways drift and fall time, so they don't move in step.
const petals = Array.from({ length: 14 }, (_, index) => ({
  '--i': index,
  '--drift': `${((index * 5) % 7) - 3}rem`,
  '--fall': `${3.2 + (index % 4) * 0.5}s`,
}))

function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((style, index) => (
        <span key={index} style={style} />
      ))}
    </div>
  )
}

function ThankYou({ name, attending }) {
  return (
    <div className="rsvp-thanks" role="status">
      {attending && <Petals />}
      <p className="hindi rsvp-thanks__hindi">{attending ? 'धन्यवाद' : 'आपकी कमी खलेगी'}</p>
      <h2 className="script rsvp-thanks__title">{attending ? 'See you in Jaipur' : 'We will miss you'}</h2>
      <p className="lead">
        {attending
          ? `Thank you, ${name}. We can’t wait to celebrate with you.`
          : `Thank you for letting us know, ${name}. You will be in our hearts on the day.`}
      </p>
      <Link to="/celebrations" viewTransition className="button button--ghost">
        See the celebrations
      </Link>
    </div>
  )
}

export default function Rsvp() {
  const [status, setStatus] = useState('idle')
  const [attending, setAttending] = useState('yes')
  const [sent, setSent] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const data = {
      name: form.get('name').trim(),
      phone: form.get('phone').trim(),
      email: form.get('email').trim(),
      attending: form.get('attending'),
      side: form.get('side'),
      guests: attending === 'yes' ? form.get('guests') : '0',
      events: attending === 'yes' ? form.getAll('events').join(', ') : '',
      arrival: attending === 'yes' ? form.get('arrival') : '',
      message: form.get('message').trim(),
      submittedAt: new Date().toISOString(),
    }

    setStatus('sending')
    try {
      await sendRsvp(data)
      setSent(data)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <PageHeader
        gate="emerald"
        decor="rajnigandha"
        hindi="पधारो म्हारे देस"
        title="Will you join us?"
        intro={`Please let us know by ${wedding.rsvpBy}, so we can plan your stay and the celebrations.`}
      />

      <section className="rsvp section">
        <div className="rsvp__card narrow">
          {status === 'sent' ? (
            <ThankYou name={sent.name.split(' ')[0]} attending={sent.attending === 'yes'} />
          ) : (
            <form className="rsvp-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="rsvp-name">Your name</label>
                <input id="rsvp-name" name="name" autoComplete="name" required />
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="rsvp-phone">Phone</label>
                  <input id="rsvp-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required />
                </div>
                <div className="field">
                  <label htmlFor="rsvp-email">
                    Email <span>optional</span>
                  </label>
                  <input id="rsvp-email" name="email" type="email" autoComplete="email" />
                </div>
              </div>

              <fieldset className="field">
                <legend>Will you be there?</legend>
                <div className="choices">
                  <label className="choice">
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={attending === 'yes'}
                      onChange={() => setAttending('yes')}
                    />
                    <span>Joyfully accepts</span>
                  </label>
                  <label className="choice">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={attending === 'no'}
                      onChange={() => setAttending('no')}
                    />
                    <span>Regretfully declines</span>
                  </label>
                </div>
              </fieldset>

              <fieldset className="field">
                <legend>You are with</legend>
                <div className="choices">
                  <label className="choice">
                    <input type="radio" name="side" value="bride" required />
                    <span>
                      Ladki wale <small className="hindi">लड़की वाले</small>
                    </span>
                  </label>
                  <label className="choice">
                    <input type="radio" name="side" value="groom" />
                    <span>
                      Ladke wale <small className="hindi">लड़के वाले</small>
                    </span>
                  </label>
                </div>
              </fieldset>

              {attending === 'yes' && (
                <div className="rsvp-form__more">
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="rsvp-guests">Guests, including you</label>
                      <select id="rsvp-guests" name="guests" defaultValue="1">
                        {[1, 2, 3, 4, 5, 6].map((count) => (
                          <option key={count}>{count}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="rsvp-arrival">Arriving in Jaipur</label>
                      <select id="rsvp-arrival" name="arrival" defaultValue="">
                        <option value="">Not sure yet</option>
                        <option>23 January</option>
                        <option>24 January</option>
                        <option>25 January</option>
                        <option>26 January</option>
                        <option>27 January</option>
                      </select>
                    </div>
                  </div>

                  <fieldset className="field">
                    <legend>Which celebrations will you attend?</legend>
                    <div className="checks">
                      {events.map((item) => (
                        <label key={item.id} className="check">
                          <input type="checkbox" name="events" value={item.label} defaultChecked />
                          <span>
                            {item.label} <small>{item.date}</small>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              <div className="field">
                <label htmlFor="rsvp-message">
                  A note for the couple <span>optional</span>
                </label>
                <textarea id="rsvp-message" name="message" rows="3" />
              </div>

              {status === 'error' && (
                <p className="rsvp-form__error" role="alert">
                  Something went wrong. Please try again, or call one of the family contacts below.
                </p>
              )}

              <button type="submit" className="button rsvp-form__submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send RSVP'}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="rsvp-countdown">
        <div className="container rsvp-countdown__inner">
          <p className="eyebrow">Until the baraat arrives</p>
          <Countdown to={wedding.countdownTo} />
        </div>
      </section>

      <Contacts />
    </>
  )
}
