import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Nav from './components/Nav.jsx'
import Opening from './components/Opening.jsx'
import SoundToggle from './components/SoundToggle.jsx'
import { SoundProvider } from './context/SoundContext.jsx'
import { usePauseOffscreen } from './hooks/usePauseOffscreen.js'
import Home from './pages/Home.jsx'

// Every page but Home loads on demand, so the first visit stays light.
const Story = lazy(() => import('./pages/Story.jsx'))
const Couple = lazy(() => import('./pages/Couple.jsx'))
const Celebrations = lazy(() => import('./pages/Celebrations.jsx'))
const DressCode = lazy(() => import('./pages/DressCode.jsx'))
const Venue = lazy(() => import('./pages/Venue.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Rsvp = lazy(() => import('./pages/Rsvp.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

/**
 * On a new page, start at the top, or at the #section in the link. Pages load
 * lazily, so wait a moment for the section to appear before giving up.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    let frame
    const started = performance.now()
    const find = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) target.scrollIntoView()
      else if (performance.now() - started < 2000) frame = requestAnimationFrame(find)
    }
    find()
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

function Layout() {
  usePauseOffscreen()

  return (
    <>
      <ScrollToTop />
      <Opening />
      <Nav />
      <main>
        <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <SoundToggle className="sound--floating" />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <SoundProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="story" element={<Story />} />
          <Route path="couple" element={<Couple />} />
          <Route path="celebrations" element={<Celebrations />} />
          <Route path="dress-code" element={<DressCode />} />
          <Route path="venue" element={<Venue />} />
          <Route path="contact" element={<Contact />} />
          <Route path="moments" element={<Navigate to="/contact" replace />} />
          <Route path="rsvp" element={<Rsvp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </SoundProvider>
  )
}
