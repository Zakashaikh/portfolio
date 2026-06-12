const ITEMS = [
  'splunk queries',
  'email header forensics',
  'spf · dkim · dmarc',
  'T1566 phishing triage',
  'wireshark pcaps',
  'nmap sweeps',
  'python automation',
  'hackthebox',
  'tryhackme',
  'linux cli',
  'ioc enrichment',
  'alert documentation',
]

export default function Ticker() {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 overflow-hidden border-y border-line/60 bg-panel/40 py-3"
    >
      <div className="tick-track flex w-max">
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0 items-center">
            {ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-6 px-6 font-mono text-[11px] uppercase tracking-[0.22em] text-mut"
              >
                <span>{item}</span>
                <span className="text-acc/50">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
