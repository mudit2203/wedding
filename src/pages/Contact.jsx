import Contacts from '../components/Contacts.jsx'
import InlineVideo from '../components/InlineVideo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { instagram } from '../data/wedding.js'
import './Contact.css'

export default function Contact() {
  return (
    <>
      <PageHeader
        gate="indigo"
        decor="rajnigandha"
        hindi="संपर्क करें"
        title="Contact"
        intro="For travel, stay or anything at all, call or message the family. Someone will always pick up."
      />

      <Contacts header={false} />

      <section className="section contact-share">
        <div className="container contact-share__inner">
          <Reveal className="contact-share__text">
            <p className="hindi contact-share__hindi">अपनी तस्वीरें साझा करें</p>
            <h2>Share the joy</h2>
            <p className="lead">
              Tag your photos and videos from the celebrations with {instagram.handle} so we can find every one of them.
            </p>
            <a href={instagram.url} target="_blank" rel="noreferrer" className="button">
              Open Instagram
            </a>
          </Reveal>
          <Reveal delay={150}>
            <InlineVideo
              src="/video/save-the-date.mp4"
              poster="/video/save-the-date-poster.webp"
              label="Our save the date video"
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
