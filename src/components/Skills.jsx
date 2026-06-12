import Reveal from './ui/Reveal'
import SectionHead from './ui/SectionHead'
import Tilt from './ui/Tilt'

const GROUPS = [
  {
    code: 'DET-01',
    name: 'SIEM & Detection',
    desc: 'Finding the signal.',
    items: ['Splunk', 'Phishing analysis', 'Email header forensics', 'IOC enrichment', 'Alert triage'],
    icon: (
      <path d="M3 17l4-6 3 3 4-8 4 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    code: 'NET-02',
    name: 'Network & Systems',
    desc: 'Knowing what normal looks like.',
    items: ['Wireshark', 'Nmap', 'Linux', 'TCP/IP fundamentals'],
    icon: (
      <>
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.7" fill="none" />
        <path d="M3 11h16M11 3c2.5 2.4 2.5 13.6 0 16-2.5-2.4-2.5-13.6 0-16z" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinejoin="round" />
      </>
    ),
  },
  {
    code: 'DEV-03',
    name: 'Code & Automation',
    desc: 'Scripting the boring parts.',
    items: ['Python', 'Flask', 'SQL', 'Git', 'REST APIs'],
    icon: (
      <path d="M8 6l-5 5 5 5M14 6l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    code: 'LAB-04',
    name: 'Labs & Practice',
    desc: 'Reps, on purpose.',
    items: ['XSS / CSRF labs', 'HackTheBox', 'TryHackMe', 'Kubernetes'],
    icon: (
      <path d="M9 3h4v5.5l4.5 7.8a2 2 0 01-1.7 3H6.2a2 2 0 01-1.7-3L9 8.5V3zM7 3h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
]

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          no="03"
          code="capabilities"
          title="Tooling I reach for."
          blurb="Grouped the way a SOC actually uses them — detect, understand, automate, practise."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {GROUPS.map((g, i) => (
            <Reveal key={g.code} delay={i * 0.07}>
              <Tilt className="h-full">
              <div className="group h-full rounded-xl border border-line bg-panel/70 p-6 transition-all duration-300 hover:border-acc/30 hover:shadow-[0_12px_40px_-16px_rgba(94,234,212,0.14)] sm:p-7">
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-ink-2/80 text-acc">
                    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                      {g.icon}
                    </svg>
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mut">
                    {g.code}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-fg">
                  {g.name}
                </h3>
                <p className="mt-1 font-mono text-xs text-mut">{g.desc}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line bg-ink-2/70 px-2.5 py-1 font-mono text-[11px] text-mut transition-colors duration-300 group-hover:border-acc/20 group-hover:text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
