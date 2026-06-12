import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const GLYPHS = '<>/\\#%&@$+=*'

/** Scrambled characters settle left-to-right when the element scrolls into view. */
export default function DecodeText({ text, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [out, setOut] = useState(() => (reduce ? text : ''))

  useEffect(() => {
    if (reduce || !inView) return
    const start = performance.now()
    const duration = 620
    const id = setInterval(() => {
      const p = Math.min(1, (performance.now() - start) / duration)
      const settled = Math.floor(p * text.length)
      let s = text.slice(0, settled)
      for (let i = settled; i < text.length; i++) {
        s += text[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      setOut(s)
      if (p >= 1) {
        setOut(text)
        clearInterval(id)
      }
    }, 34)
    return () => clearInterval(id)
  }, [inView, reduce, text])

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{out || ' '}</span>
      <span className="sr-only">{text}</span>
    </span>
  )
}
