import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import { useInView } from '../hooks/useInView.js'
import { chapters, storyStack } from '../data/story.js'
import './Story.css'

/** A pile of polaroids that shuffles one card to the back every few seconds. */
function PolaroidStack() {
  const [order, setOrder] = useState(storyStack)
  const [ref, inView] = useInView({ once: false })

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setOrder(([first, ...rest]) => [...rest, first]), 2800)
    return () => clearInterval(id)
  }, [inView])

  return (
    <div ref={ref} className="stack" aria-hidden="true">
      {order.map((id, index) => (
        <div key={id} className="stack__card" style={{ '--i': index, zIndex: order.length - index }}>
          <Photo id={id} shape="polaroid" ratio="4 / 5" sizes="16rem" />
        </div>
      ))}
    </div>
  )
}

function Chapter({ chapter, index }) {
  const [ref, inView] = useInView({ threshold: 0.3 })
  return (
    <li ref={ref} className={`chapter ${index % 2 ? 'chapter--right' : ''} ${inView ? 'is-in' : ''}`}>
      <span className="chapter__dot" aria-hidden="true" />
      <div className="chapter__text">
        <p className="eyebrow chapter__when">{chapter.when}</p>
        <h2 className="chapter__title">{chapter.title}</h2>
        <p>{chapter.text}</p>
      </div>
      {chapter.photo && (
        <div className="chapter__photo">
          <Photo id={chapter.photo} shape="arch" ratio="4 / 5" sizes="(min-width: 52rem) 24rem, 80vw" />
        </div>
      )}
    </li>
  )
}

export default function Story() {
  return (
    <>
      <PageHeader hindi="हमारी कहानी" title="Our Story" intro="The same school, years apart, and one Diwali that changed everything.">
        <PolaroidStack />
      </PageHeader>

      <section className="section">
        <ol className="timeline container">
          {chapters.map((chapter, index) => (
            <Chapter key={chapter.id} chapter={chapter} index={index} />
          ))}
        </ol>
        <Reveal className="story__end narrow">
          <p className="script story__end-line">and this is only the beginning</p>
          <Link to="/couple" viewTransition className="button button--ghost">
            Meet the bride &amp; groom
          </Link>
        </Reveal>
      </section>
    </>
  )
}
