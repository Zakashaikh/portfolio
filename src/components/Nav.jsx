import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

function UtcClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="hidden items-center gap-1.5 font-mono text-[11px] tabular-nums text-mut lg:flex">
      {now.toUTCString().slice(17, 25)}
      <span className="text-[9px] uppercase tracking-[0.18em] text-mut/70">utc</span>
    </span>
  )
}

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-ink/75 backdrop-blur-md">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: reduce ? scrollYProgress : progress }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-acc to-sky"
      />
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="Main">
        <a href="#main" className="group flex items-baseline gap-2 font-mono text-sm">
          <span className="text-acc" aria-hidden="true">❯</span>
          <span className="font-medium text-fg transition-colors group-hover:text-acc">
            zakaurrehman<span className="text-mut">.shaikh</span>
          </span>
          <span className="hidden text-mut xl:inline">— soc.portfolio</span>
        </a>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-mono text-xs uppercase tracking-[0.18em] text-mut transition-colors hover:text-acc"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <UtcClock />

          <span className="hidden items-center gap-2 rounded-full border border-acc/30 bg-acc/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-acc sm:flex">
            <span className="dot-live h-1.5 w-1.5 rounded-full bg-acc" aria-hidden="true" />
            open to work
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-mut transition-colors hover:text-acc md:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              {open ? (
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-line/70 bg-ink/95 px-6 py-4 md:hidden">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-mono text-sm uppercase tracking-[0.18em] text-mut transition-colors hover:text-acc"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
