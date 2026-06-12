import { useState } from 'react'
import Reveal from './ui/Reveal'
import Magnetic from './ui/Magnetic'

const EMAIL = 'shaikhzakaurrehman@gmail.com'

const LINKS = [
  {
    label: 'github',
    value: 'github.com/Zakashaikh',
    href: 'https://github.com/Zakashaikh',
  },
  {
    label: 'linkedin',
    value: 'linkedin.com/in/zakaurrehman-shaikh-46679a212',
    href: 'https://www.linkedin.com/in/zakaurrehman-shaikh-46679a212',
  },
  {
    label: 'email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
]

function CopyButton() {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="inline-flex items-center gap-2 rounded-md border border-line bg-panel/60 px-5 py-3.5 font-mono text-sm text-mut transition-colors hover:border-acc/50 hover:text-acc"
    >
      {copied ? 'copied ✓' : 'copy address'}
    </button>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 px-6 py-24 md:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-acc sm:text-xs">
            <span aria-hidden="true">{'// '}</span>05 · contact
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-fg md:text-6xl">
            Let's clear some queues.
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-mut sm:text-lg">
            I'm looking for a <span className="text-fg">Tier 1 SOC Analyst</span> role in the UK
            from 2026. If you've got noisy logs and not enough analysts, I'd love to talk.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2.5 rounded-md bg-acc px-7 py-3.5 font-mono text-sm font-medium text-ink transition-colors hover:bg-sky"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 4.5l6 4.5 6-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {EMAIL}
              </a>
            </Magnetic>
            <Magnetic>
              <CopyButton />
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-12">
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="group font-mono text-xs text-mut transition-colors hover:text-acc"
                >
                  <span className="text-acc/70">{l.label}:</span>{' '}
                  <span className="underline-offset-4 group-hover:underline">{l.value}</span>
                  <span aria-hidden="true"> ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
