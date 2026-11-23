export default function Events({ events, mapUrl }) {
  return (
    <section className="section">
      <h2>Celebrations</h2>
      <div className="events">
        {events.map((event) => (
          <article key={event.name} className="card">
            <h3>{event.name}</h3>
            <p className="time">{event.time}</p>
            <p>{event.venue}</p>
            <p className="muted">{event.address}</p>
          </article>
        ))}
      </div>
      <a className="button" href={mapUrl} target="_blank" rel="noreferrer">
        View on map
      </a>
    </section>
  )
}
