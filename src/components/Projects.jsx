import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Reveal from './ui/Reveal'
import SectionHead from './ui/SectionHead'

const GITHUB = 'https://github.com/Zakashaikh'

const TICKETS = [
  {
    id: 'INC-2026-001',
    severity: 'HIGH',
    status: 'RESOLVED',
    title: 'Phishing Email Analyser',
    summary: 'Automated triage for suspicious emails — parse, score, enrich, ML verdict.',
    tag: 'MSc dissertation',
    body: [
      'My MSc dissertation project. Feed it a raw .eml file and it does what a Tier 1 analyst would: tears down the headers, extracts every URL and attachment, runs 15 weighted heuristic rules each mapped to a MITRE ATT&CK technique, enriches the indicators against the VirusTotal API, and scores it with a trained gradient-boosting model — producing a verdict with the evidence attached.',
      'The part I am proudest of is the evaluation. I benchmarked the rules against 7,095 real emails (Nazario phishing corpus + SpamAssassin ham) and the per-rule fire rates showed two header rules were anti-signals — they fired more on legitimate mailing-list traffic than on phish. Reweighting from that data lifted precision from 0.63 to 0.91 and cut the false-positive rate from 1-in-5 to 1-in-27.',
    ],
    findings: [
      '15-rule heuristic engine — SPF/DKIM/DMARC, lookalike domains, link-text mismatch — each finding tagged with its MITRE ATT&CK technique',
      'Data-driven tuning on 7,095 real emails: 0.907 precision at a 3.7% false-positive rate, fully offline',
      'ML layer (gradient boosting over rules + TF-IDF) reached 0.995 precision and 1.000 recall on the held-out test split',
      'Flask triage dashboard: drag in an .eml, analysed in memory, safe HTML preview and score gauge — VirusTotal opt-in per request',
    ],
    timeline: [
      { t: 'M1', label: 'parser + 15-rule engine' },
      { t: 'M2', label: 'evaluated on 7,095 emails' },
      { t: 'M3', label: 'ML layer trained + compared' },
      { t: 'M4', label: 'Flask triage dashboard' },
    ],
    stack: ['Python', 'scikit-learn', 'Flask', 'VirusTotal API', 'MITRE ATT&CK'],
  },
  {
    id: 'INC-2026-002',
    severity: 'MEDIUM',
    status: 'RESOLVED',
    title: 'Log Analyzer',
    summary: "Parses raw logs and surfaces the events worth a human's time.",
    body: [
      'A Python pipeline that ingests auth and system logs, normalises them, and flags anomalies — failed-login bursts, activity at unusual hours, first-seen source IPs. Built to drill the core Tier 1 skill: separating signal from noise at volume.',
    ],
    findings: [
      'Regex-driven parsing and normalisation across log formats',
      'Threshold and baseline rules for brute-force and odd-hours detection',
      'Plain-English summary report: who, what, when, how confident',
    ],
    timeline: [
      { t: 't+0s', label: 'raw logs ingested' },
      { t: 't+1s', label: 'normalised + indexed' },
      { t: 't+3s', label: 'anomaly rules applied' },
      { t: 't+4s', label: 'summary report out' },
    ],
    stack: ['Python', 'Regex', 'Anomaly detection'],
  },
  {
    id: 'INC-2026-003',
    severity: 'MEDIUM',
    status: 'RESOLVED',
    title: 'Hashing Tool',
    summary: 'CLI + Flask hashing utility — then I audited my own crypto and fixed it.',
    body: [
      'Started as a hashing utility with both a CLI and a Flask web front-end. The interesting part came after shipping: I security-audited my own build, concluded SHA-256 was the wrong primitive for password handling, and migrated to bcrypt — a small project that taught a big lesson about fast hashes versus slow KDFs.',
    ],
    findings: [
      'Dual interface: command-line tool and Flask web app',
      'Self-audit identified fast-hash misuse in credential handling',
      'Migrated SHA-256 → bcrypt with per-password salting and tuned cost factor',
    ],
    timeline: [
      { t: 'v1', label: 'CLI + Flask shipped' },
      { t: 'audit', label: 'fast-hash misuse found' },
      { t: 'fix', label: 'SHA-256 → bcrypt' },
      { t: 'closed', label: 'lessons documented' },
    ],
    stack: ['Python', 'Flask', 'bcrypt', 'Security audit'],
  },
  {
    id: 'INC-2026-004',
    severity: 'HIGH',
    status: 'IN PROGRESS',
    title: 'Password Vault',
    summary: 'An encrypted credential manager — currently on the bench.',
    body: [
      'A local-first password vault: credentials encrypted at rest, master password run through a proper key-derivation function, nothing stored in plaintext — ever. In active development, with a spec informed directly by what the hashing-tool audit taught me.',
    ],
    findings: [
      'Encrypted credential storage at rest',
      'Master key derived via a slow KDF, never stored',
      'Threat-model-first design before feature work',
    ],
    timeline: [
      { t: 'done', label: 'threat model drafted' },
      { t: 'done', label: 'crypto design locked' },
      { t: 'now', label: 'vault core in build', live: true },
      { t: 'next', label: 'CLI + audit pass' },
    ],
    stack: ['Python', 'Cryptography', 'KDF'],
  },
]

const SEV_STYLE = {
  HIGH: 'border-amber/40 bg-amber/10 text-amber',
  MEDIUM: 'border-sky/40 bg-sky/10 text-sky',
  LOW: 'border-line bg-panel-2 text-mut',
}

function StatusBadge({ status }) {
  const live = status === 'IN PROGRESS'
  return (
    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em]">
      <span
        className={`h-1.5 w-1.5 rounded-full ${live ? 'dot-progress bg-amber' : 'bg-acc'}`}
        aria-hidden="true"
      />
      <span className={live ? 'text-amber' : 'text-acc'}>{status}</span>
    </span>
  )
}

function Ticket({ ticket, open, onToggle }) {
  const reduce = useReducedMotion()
  const panelId = `${ticket.id}-panel`

  return (
    <div
      className={`overflow-hidden rounded-xl border bg-panel/70 transition-all duration-300 ${
        open
          ? 'border-acc/40 shadow-[0_16px_50px_-20px_rgba(94,234,212,0.18)]'
          : 'border-line hover:border-acc/25 hover:shadow-[0_12px_40px_-16px_rgba(94,234,212,0.14)] motion-safe:hover:-translate-y-[2px]'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-5 py-4 text-left sm:grid-cols-[auto_1fr_auto] sm:px-6 sm:py-5"
      >
        <div className="flex items-center gap-3 sm:w-44 sm:flex-col sm:items-start sm:gap-2">
          <span className="font-mono text-xs text-mut">{ticket.id}</span>
          <span
            className={`rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${SEV_STYLE[ticket.severity]}`}
          >
            sev:{ticket.severity.toLowerCase()}
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <h3 className="font-display text-lg font-semibold tracking-tight text-fg sm:text-xl">
            {ticket.title}
            {ticket.tag && (
              <span className="ml-3 align-middle rounded border border-acc/30 bg-acc/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-acc">
                {ticket.tag}
              </span>
            )}
          </h3>
          <p className="mt-1 text-sm text-mut">{ticket.summary}</p>
        </div>

        <div className="col-start-2 row-start-1 flex items-center gap-4 sm:col-start-3">
          <StatusBadge status={ticket.status} />
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            className="text-mut"
            aria-hidden="true"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.21, 0.6, 0.35, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-line px-5 py-6 sm:px-6">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mut">
                    investigation notes
                  </p>
                  {ticket.body.map((p) => (
                    <p key={p.slice(0, 24)} className="mt-3 leading-relaxed text-mut">
                      {p}
                    </p>
                  ))}
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mut">
                    key findings
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {ticket.findings.map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-mut">
                        <span className="mt-0.5 text-acc" aria-hidden="true">▸</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mut">
                  triage timeline
                </p>
                <ol className="mt-4 grid gap-4 sm:grid-cols-4">
                  {ticket.timeline.map((step, i) => (
                    <li key={step.label} className="relative">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                            step.live
                              ? 'dot-progress bg-amber'
                              : i === ticket.timeline.length - 1
                                ? 'bg-acc'
                                : 'bg-mut/50'
                          }`}
                          aria-hidden="true"
                        />
                        {i < ticket.timeline.length - 1 && (
                          <span className="hidden h-px flex-1 bg-line sm:block" aria-hidden="true" />
                        )}
                      </div>
                      <p className="mt-2 font-mono text-[10px] text-mut">{step.t}</p>
                      <p className="mt-0.5 text-[13px] leading-snug text-fg/85">{step.label}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-5">
                <ul className="flex flex-wrap gap-2">
                  {ticket.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-md border border-line bg-ink-2/70 px-2.5 py-1 font-mono text-[11px] text-mut"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-acc transition-colors hover:text-sky"
                >
                  view on github ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Projects() {
  const [openId, setOpenId] = useState(TICKETS[0].id)

  return (
    <section id="projects" className="scroll-mt-20 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          no="02"
          code="case_files"
          title="Projects, filed as incidents."
          blurb="Work formatted the way I think about it — as tickets. Open one to read the investigation."
        />

        <div className="space-y-4">
          {TICKETS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.06}>
              <Ticket
                ticket={t}
                open={openId === t.id}
                onToggle={() => setOpenId(openId === t.id ? null : t.id)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
