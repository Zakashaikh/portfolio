import Reveal from './Reveal'
import DecodeText from './DecodeText'

/**
 * Section header opened by the shell command that "produced" it —
 * the site-wide alternative to a generic uppercase eyebrow.
 */
export default function SectionHead({ cmd, title, blurb }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p aria-hidden="true" className="font-mono text-xs text-mut sm:text-sm">
        <span className="text-acc">❯ </span>
        {cmd}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg md:text-5xl">
        <DecodeText text={title} />
      </h2>
      {blurb && <p className="mt-4 max-w-2xl leading-relaxed text-mut">{blurb}</p>}
    </Reveal>
  )
}
