import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Ticker from './components/Ticker'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

/** Soft accent glow that trails the cursor. Desktop + motion-safe only. */
function CursorGlow() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const el = document.getElementById('cursor-glow')
    if (!el) return
    let raf = 0
    function onMove(e) {
      if (e.pointerType && e.pointerType !== 'mouse') return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduce])

  if (reduce) return null
  return (
    <div
      id="cursor-glow"
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[600px] w-[600px] rounded-full lg:block"
      style={{
        background: 'radial-gradient(circle, rgb(94 234 212 / 0.05) 0%, transparent 62%)',
        transform: 'translate3d(-100vw, -100vh, 0)',
      }}
    />
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* ambient background: grid + scanlines + top glow */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="bg-grid absolute inset-0" />
        <div className="bg-scan absolute inset-0" />
        <div className="absolute -top-44 left-1/2 h-[460px] w-[800px] max-w-full -translate-x-1/2 rounded-full bg-acc/[0.06] blur-[120px]" />
      </div>
      <CursorGlow />

      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Ticker />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
