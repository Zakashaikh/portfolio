import Reveal from './ui/Reveal'
import SectionHead from './ui/SectionHead'
import Tilt from './ui/Tilt'

const PROFILE = [
  ['name', 'zakaurrehman_shaikh'],
  ['base', 'guildford_uk'],
  ['education', 'msc_cyber_security@surrey'],
  ['graduating', '"2026"'],
  ['background', 'mechanical_engineering'],
  ['superpower', 'root_cause_analysis'],
  ['status', 'open_to_tier1_soc'],
]

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead no="01" code="about" title="From failure analysis to threat analysis." />

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-mut sm:text-lg">
              <p>
                My route into security wasn't a straight line — it started with machines. I trained
                as a mechanical engineer in Mumbai, where the job was working out why complex
                systems break: trace the symptom, isolate the variable, prove the root cause, and
                write it up so the fix actually sticks.
              </p>
              <p>
                That is, almost line for line, the job description of a SOC analyst. The systems
                changed — pipelines and gearboxes became networks and identity providers — but the
                discipline didn't. I moved to the UK to make that switch deliberately, and I'm now
                finishing an <span className="text-fg">MSc in Cyber Security at the University of
                Surrey</span>, with a dissertation on automated phishing triage.
              </p>
              <p>
                What I bring to a Tier 1 seat: an engineer's respect for process, calm
                pattern-matching when everything is noisy, and documentation people actually want
                to read.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <Tilt>
            <div className="overflow-hidden rounded-xl border border-line bg-panel/70">
              <div className="flex items-center justify-between border-b border-line bg-ink-2/80 px-4 py-2.5">
                <span className="font-mono text-[11px] text-mut">analyst_profile.yaml</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-acc">verified</span>
              </div>
              <div className="px-5 py-5 font-mono text-[13px] leading-[1.9]">
                <div className="text-sky">analyst:</div>
                {PROFILE.map(([k, v]) => (
                  <div key={k} className="pl-5">
                    <span className="text-mut">{k}:</span>{' '}
                    <span className={k === 'status' ? 'text-acc' : 'text-fg'}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
