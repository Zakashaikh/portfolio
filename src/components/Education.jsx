import Reveal from './ui/Reveal'
import SectionHead from './ui/SectionHead'

const ITEMS = [
  {
    period: 'Graduating 2026',
    title: 'MSc Cyber Security',
    org: 'University of Surrey · Guildford, UK',
    detail:
      'Dissertation: automated phishing email triage — weighted heuristics evaluated on 7,095 real emails, VirusTotal enrichment and an ML verdict layer.',
    badge: { label: 'current', tone: 'acc' },
  },
  {
    period: '2026',
    title: 'CompTIA Security+',
    org: 'Certification',
    detail: 'Security operations, threat and vulnerability management, incident response fundamentals.',
    badge: { label: 'in progress', tone: 'amber' },
  },
  {
    period: 'Completed',
    title: 'BE Mechanical Engineering',
    org: 'Mumbai, India',
    detail:
      'Where the systems thinking comes from — failure analysis, process discipline and root-cause habits, now pointed at security incidents.',
  },
]

export default function Education() {
  return (
    <section id="education" className="scroll-mt-20 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead no="04" code="training_log" title="Education & certifications." />

        <ol className="relative ml-1.5 space-y-10 border-l border-line pl-8 sm:ml-3">
          {ITEMS.map((item, i) => (
            <li key={item.title} className="relative">
              <Reveal delay={i * 0.08}>
                <span
                  className={`absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-ink ${
                    i === 0 ? 'bg-acc' : 'bg-line'
                  }`}
                  aria-hidden="true"
                />
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-mut">{item.period}</p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                  {item.title}
                  {item.badge && (
                    <span
                      className={`ml-3 align-middle rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${
                        item.badge.tone === 'amber'
                          ? 'border-amber/40 bg-amber/10 text-amber'
                          : 'border-acc/40 bg-acc/10 text-acc'
                      }`}
                    >
                      {item.badge.label}
                    </span>
                  )}
                </h3>
                <p className="mt-1 font-mono text-[13px] text-sky/80">{item.org}</p>
                <p className="mt-3 max-w-2xl leading-relaxed text-mut">{item.detail}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
