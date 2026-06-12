import Reveal from './Reveal'
import DecodeText from './DecodeText'

export default function SectionHead({ no, code, title, blurb }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.28em] text-acc">
        <span aria-hidden="true">{'// '}</span>
        {no} · {code}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg md:text-5xl">
        <DecodeText text={title} />
      </h2>
      {blurb && <p className="mt-4 max-w-2xl leading-relaxed text-mut">{blurb}</p>}
    </Reveal>
  )
}
