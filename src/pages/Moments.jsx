import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import InlineVideo from '../components/InlineVideo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { photoSources, photos } from '../data/photos.js'
import './Moments.css'

const gallery = Object.keys(photos)

/** A full-screen view of one photo, using the native <dialog> element. */
function Lightbox({ index, onClose, onMove }) {
  const ref = useRef(null)
  const photo = index === null ? null : photoSources(gallery[index])

  useEffect(() => {
    const dialog = ref.current
    if (photo && !dialog.open) dialog.showModal()
    if (!photo && dialog.open) dialog.close()
  }, [photo])

  useEffect(() => {
    if (!photo) return
    const onKey = (event) => {
      if (event.key === 'ArrowRight') onMove(1)
      if (event.key === 'ArrowLeft') onMove(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [photo, onMove])

  return (
    <dialog
      ref={ref}
      className="lightbox"
      onClose={onClose}
      onClick={(event) => event.target === ref.current && onClose()}
    >
      {photo && (
        <>
          <img src={photo.src} alt={photo.alt} />
          <p className="lightbox__caption">{photo.alt}</p>
          <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => onMove(-1)}>
            <span className="visually-hidden">Previous photo</span>‹
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => onMove(1)}>
            <span className="visually-hidden">Next photo</span>›
          </button>
          <button type="button" className="lightbox__close" onClick={onClose}>
            Close
          </button>
        </>
      )}
    </dialog>
  )
}

export default function Moments() {
  const [open, setOpen] = useState(null)
  const move = (step) => setOpen((current) => (current + step + gallery.length) % gallery.length)

  return (
    <>
      <PageHeader
        gate="indigo"
        hindi="यादें"
        title="Moments"
        intro="A few of our favourite frames so far. After the wedding, this is where all of your photos will live too."
      />

      <section className="section moments-videos">
        <div className="container moments-videos__grid">
          <Reveal className="moments-video">
            <InlineVideo
              src="/video/save-the-date.mp4"
              poster="/video/save-the-date-poster.webp"
              label="Our save the date video"
            />
            <p className="eyebrow">Save the date</p>
          </Reveal>
          <Reveal className="moments-video" delay={150}>
            <InlineVideo
              src="/video/families.mp4"
              poster="/video/families-poster.webp"
              label="A short video introducing both families"
            />
            <p className="eyebrow">Both families</p>
          </Reveal>
        </div>
      </section>

      <section className="container moments-gallery" aria-label="Photo gallery">
        {gallery.map((id, index) => {
          const photo = photoSources(id)
          return (
            <Reveal key={id} className="moments-gallery__item" delay={(index % 3) * 100}>
              <button type="button" onClick={() => setOpen(index)} style={{ aspectRatio: photo.ratio }}>
                <img
                  src={photo.src}
                  srcSet={photo.srcSet}
                  sizes="(min-width: 60rem) 30vw, (min-width: 36rem) 45vw, 90vw"
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: photo.focus }}
                />
              </button>
            </Reveal>
          )
        })}
      </section>

      <section className="section moments-share">
        <Reveal className="narrow">
          <p className="hindi moments-share__hindi">अपनी तस्वीरें साझा करें</p>
          <h2>Share yours</h2>
          <p className="lead">
            Tag your photos from the celebrations so we can find them. A shared album link will be added here.
          </p>
          <Link to="/rsvp" viewTransition className="button">
            RSVP
          </Link>
        </Reveal>
      </section>

      <Lightbox index={open} onClose={() => setOpen(null)} onMove={move} />
    </>
  )
}
