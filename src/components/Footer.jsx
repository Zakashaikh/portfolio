export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line/70 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-mut">
        <p>© 2026 Zakaurrehman Shaikh · Guildford, UK</p>
        <p className="flex items-center gap-2">
          <span className="dot-live h-1.5 w-1.5 rounded-full bg-acc" aria-hidden="true" />
          status: no critical alerts
        </p>
      </div>
    </footer>
  )
}
