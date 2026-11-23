import { useState } from 'react'

export default function Rsvp({ rsvpBy }) {
  const [form, setForm] = useState({ name: '', guests: 1, attending: 'yes' })
  const [sent, setSent] = useState(false)

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    // TODO: send `form` to a backend, Google Form, or email service.
    console.log('RSVP', form)
    setSent(true)
  }

  if (sent) {
    return (
      <section className="section">
        <h2>Thank you, {form.name}!</h2>
        <p>Your response has been recorded.</p>
      </section>
    )
  }

  return (
    <section className="section">
      <h2>RSVP</h2>
      <p className="muted">Kindly respond by {rsvpBy}</p>
      <form className="rsvp" onSubmit={submit}>
        <label>
          Your name
          <input name="name" value={form.name} onChange={update} required />
        </label>
        <label>
          Number of guests
          <input name="guests" type="number" min="1" max="10" value={form.guests} onChange={update} />
        </label>
        <label>
          Will you attend?
          <select name="attending" value={form.attending} onChange={update}>
            <option value="yes">Joyfully accept</option>
            <option value="no">Regretfully decline</option>
          </select>
        </label>
        <button className="button" type="submit">Send RSVP</button>
      </form>
    </section>
  )
}
