import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const NAME_LINE = 'zakaurrehman.shaikh · guildford.uk · tier1-ready'

const BOOT = [
  { kind: 'cmd', text: 'tail -f /var/log/soc/alerts.log' },
  { kind: 'dim', text: '09:14:02Z auth    4 failed logins · 185.220.101.7' },
  { kind: 'dim', text: '09:14:03Z corr    1,247 events · 3 sources · 15m' },
  { kind: 'warn', text: '09:14:05Z detect  credential stuffing — T1110.004' },
  { kind: 'ok', text: '09:14:06Z verdict TRUE POSITIVE · escalated' },
  { kind: 'cmd', text: 'whoami' },
  { kind: 'me', text: NAME_LINE },
  { kind: 'hint', text: "this terminal is live — type 'help' and hit enter" },
]

const AMBIENT = [
  '10:02Z dns    beacon-interval query flagged',
  '10:03Z email  spf softfail quarantined',
  '10:04Z ids    port scan blocked at edge',
  '10:05Z auth   impossible travel · checking vpn',
  '10:06Z intel  38 new iocs ingested',
  '10:07Z triage queue clear · 0 pending',
]

const COMMANDS = {
  help: [
    'available commands:',
    '  whoami     analyst identity',
    '  projects   list case files',
    '  skills     capability summary',
    '  contact    how to reach me',
    '  clear      wipe the screen',
  ],
  whoami: [{ kind: 'me', text: NAME_LINE }],
  projects: [
    'INC-2026-001  jwtcheck — jwt security analyser · resolved',
    'INC-2026-002  phishing email analyser · resolved',
    'INC-2026-003  log analyzer · resolved',
    'INC-2026-004  hash function tool · resolved',
    'INC-2026-005  password vault · in progress',
  ],
  skills: ['splunk · wireshark · nmap · python · flask · linux'],
  contact: [
    'email     shaikhzakaurrehman@gmail.com',
    'github    github.com/Zakashaikh',
    'linkedin  linkedin.com/in/zakaurrehman-shaikh-46679a212',
  ],
  exit: ['nice try — the queue never ends'],
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const LINE_STYLE = {
  cmd: 'text-fg',
  dim: 'text-mut',
  warn: 'text-amber',
  ok: 'text-acc',
  me: 'text-fg font-medium',
  out: 'text-fg/75',
  hint: 'text-sky/70 italic',
}

function Line({ line }) {
  return (
    <div
      aria-hidden={line.ambient || undefined}
      className={`line-in whitespace-pre-wrap break-words ${LINE_STYLE[line.kind]}`}
    >
      {line.kind === 'cmd' && <span className="mr-2 text-acc">❯</span>}
      {line.kind === 'me' && <span className="mr-2 text-sky">▸</span>}
      {line.text}
    </div>
  )
}

export default function Terminal({ onResolve }) {
  const reduce = useReducedMotion()
  const [lines, setLines] = useState(() => (reduce ? BOOT : []))
  const [typing, setTyping] = useState('')
  const [entry, setEntry] = useState('')
  const [interactive, setInteractive] = useState(() => !!reduce)
  const [engaged, setEngaged] = useState(false)
  const resolved = useRef(false)
  const seq = useRef(0)
  const inputRef = useRef(null)

  const resolve = () => {
    if (!resolved.current) {
      resolved.current = true
      onResolve?.()
    }
  }

  // boot sequence: type commands, stream log lines, then go interactive
  useEffect(() => {
    if (reduce) {
      resolve()
      return
    }
    let dead = false
    async function run() {
      await sleep(500)
      for (const item of BOOT) {
        if (dead) return
        if (item.kind === 'cmd') {
          for (let i = 1; i <= item.text.length; i++) {
            if (dead) return
            setTyping(item.text.slice(0, i))
            await sleep(22 + Math.random() * 34)
          }
          await sleep(220)
          if (dead) return
          setTyping('')
          setLines((l) => [...l, item])
        } else {
          await sleep(item.kind === 'me' ? 400 : item.kind === 'hint' ? 600 : 280)
          if (dead) return
          setLines((l) => [...l, item])
          if (item.kind === 'me') resolve()
        }
      }
      if (!dead) setInteractive(true)
    }
    run()
    return () => {
      dead = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  // ambient tail: rolls until the visitor starts typing
  useEffect(() => {
    if (!interactive || engaged || reduce) return
    let i = 0
    const id = setInterval(() => {
      const text = AMBIENT[i % AMBIENT.length]
      i += 1
      setLines((l) => [...l, { kind: 'dim', text, id: `amb-${i}`, ambient: true }].slice(-11))
    }, 4600)
    return () => clearInterval(id)
  }, [interactive, engaged, reduce])

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    setEngaged(true)
    if (cmd === 'clear') {
      setLines([])
      return
    }
    seq.current += 1
    const out = cmd.startsWith('sudo')
      ? ['permission denied — attempt logged as INC-2026-006']
      : (COMMANDS[cmd] ?? [`command not found: ${cmd} — try 'help'`])
    const outLines = out.map((o, i) => ({
      kind: typeof o === 'string' ? 'out' : o.kind,
      text: typeof o === 'string' ? o : o.text,
      id: `out-${seq.current}-${i}`,
    }))
    setLines((l) =>
      [...l, { kind: 'cmd', text: cmd, id: `cmd-${seq.current}` }, ...outLines].slice(-11),
    )
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      runCommand(entry)
      setEntry('')
    } else if (e.key === 'Escape') {
      inputRef.current?.blur()
    }
  }

  return (
    // click anywhere on the card to focus the (screen-reader-visible) command input
    <div
      className="overflow-hidden rounded-xl border border-line bg-panel/80 text-left shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)] backdrop-blur-sm"
      onClick={() => interactive && inputRef.current?.focus({ preventScroll: true })}
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-line bg-ink-2/80 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose/70" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/70" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-acc/70" aria-hidden="true" />
        <span className="ml-3 font-mono text-[11px] text-mut">soc-terminal — zsh</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-acc">
          <span className="dot-live h-1.5 w-1.5 rounded-full bg-acc" aria-hidden="true" />
          live
        </span>
      </div>

      {/* log body */}
      <div
        role="log"
        aria-label="Terminal output"
        className="flex h-64 flex-col justify-end gap-[5px] overflow-hidden px-4 py-4 font-mono text-[12px] leading-[1.5] sm:h-72 sm:text-[13px]"
      >
        {lines.map((line, i) => (
          <Line key={line.id ?? `${line.kind}-${i}-${line.text.slice(0, 12)}`} line={line} />
        ))}
        <div className="flex items-center text-fg">
          <span className="mr-2 text-acc">❯</span>
          <span>{interactive ? entry : typing}</span>
          <span className="cursor-blink ml-0.5 inline-block h-[1.1em] w-[7px] bg-acc/80" aria-hidden="true" />
        </div>
        <input
          ref={inputRef}
          type="text"
          className="sr-only"
          value={entry}
          maxLength={36}
          disabled={!interactive}
          onChange={(e) => setEntry(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Terminal command input — type help and press enter"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>

      {/* telemetry strip */}
      <div
        aria-hidden="true"
        className="flex items-center justify-between gap-4 border-t border-line bg-ink-2/60 px-4 py-2 font-mono text-[10px] text-mut"
      >
        <span className="flex items-center gap-2">
          events/s
          <svg width="64" height="14" viewBox="0 0 64 14" className="overflow-hidden">
            <g className="spark-anim text-acc/70">
              <path
                d="M0 11L8 8L16 10L24 5L32 9L40 4L48 8L56 6L64 11"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M64 11L72 8L80 10L88 5L96 9L104 4L112 8L120 6L128 11"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </g>
          </svg>
        </span>
        <span className="hidden sm:inline">queue 0</span>
        <span className="text-acc">uptime 99.98%</span>
      </div>
    </div>
  )
}
