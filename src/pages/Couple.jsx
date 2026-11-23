import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Photo from '../components/Photo.jsx'
import { Shutters } from '../components/Scenery.jsx'
import Reveal from '../components/Reveal.jsx'
import { numbers, profiles, quiz } from '../data/couple.js'
import './Couple.css'

function Profile({ profile, flip }) {
  const [main, ...more] = profile.photos
  return (
    <article className={`profile ${flip ? 'profile--flip' : ''}`}>
      <div className="profile__collage">
        <span className="profile__initial" aria-hidden="true">
          {profile.initial}
        </span>
        <Reveal className="profile__main">
          <Photo id={main} shape="arch" ratio="3 / 4" sizes="(min-width: 52rem) 22rem, 70vw">
            <Shutters />
          </Photo>
        </Reveal>
        {more.map((id, index) => (
          <Reveal key={id} className={`profile__small profile__small--${index + 1}`} delay={200 + index * 150}>
            <Photo id={id} shape="polaroid" ratio="1 / 1" sizes="10rem" />
          </Reveal>
        ))}
      </div>

      <Reveal className="profile__text" delay={150}>
        <p className="eyebrow">
          <span className="hindi">{profile.roleHindi}</span> · {profile.role}
        </p>
        <h2 className="profile__name script">{profile.name}</h2>
        <p className="lead">{profile.intro}</p>
        <dl className="profile__facts">
          {profile.facts.map((fact) => (
            <div key={fact.label} className="profile__fact">
              <dt className="eyebrow">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </article>
  )
}

function QuizCard({ question, answer }) {
  const [shown, setShown] = useState(false)
  return (
    <button
      type="button"
      className={`quiz-card ${shown ? 'is-shown' : ''}`}
      onClick={() => setShown((value) => !value)}
      aria-pressed={shown}
    >
      <span className="quiz-card__face quiz-card__front">
        <span>{question}</span>
        <span className="eyebrow">Tap to find out</span>
      </span>
      <span className="quiz-card__face quiz-card__back">
        <span className="script">{answer}</span>
      </span>
    </button>
  )
}

export default function Couple() {
  return (
    <>
      <PageHeader
        gate="lotus"
        decor="ashok"
        hindi="वर-वधू"
        title="The Bride & Groom"
        intro="A little about the two of us, and a few things even our friends might not know."
      />

      <section className="section couple">
        <div className="container couple__profiles">
          {profiles.map((profile, index) => (
            <Profile key={profile.id} profile={profile} flip={index % 2 === 1} />
          ))}
        </div>
      </section>

      <section className="numbers">
        <div className="container">
          <Reveal as="h2" className="numbers__title eyebrow">
            Us, in numbers
          </Reveal>
          <ul className="numbers__grid">
            {numbers.map((item, index) => (
              <Reveal as="li" key={item.label} delay={index * 100} className="numbers__item">
                <span className="numbers__value">{item.value}</span>
                <span className="numbers__label">{item.label}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section quiz">
        <div className="container">
          <Reveal as="header" className="quiz__header">
            <p className="hindi">कौन है ज़्यादा…?</p>
            <h2>Who is more likely to…</h2>
            <p className="muted">Make your guess, then tap the card.</p>
          </Reveal>
          <div className="quiz__grid">
            {quiz.map((item) => (
              <QuizCard key={item.question} {...item} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
