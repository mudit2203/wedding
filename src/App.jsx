import Hero from './components/Hero.jsx'
import Countdown from './components/Countdown.jsx'
import Events from './components/Events.jsx'
import Rsvp from './components/Rsvp.jsx'
import { wedding } from './data/wedding.js'
import './App.css'

export default function App() {
  return (
    <main className="invite">
      <Hero {...wedding} />
      <Countdown date={wedding.date} />
      <Events events={wedding.events} mapUrl={wedding.mapUrl} />
      <Rsvp rsvpBy={wedding.rsvpBy} />
      <footer className="footer">
        With love, {wedding.partnerOne} &amp; {wedding.partnerTwo}
      </footer>
    </main>
  )
}
