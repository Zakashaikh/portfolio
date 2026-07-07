import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Terminal from './Terminal'
import Magnetic from './ui/Magnetic'

const EASE = [0.21, 0.6, 0.35, 1]

export default function Hero() {
  const reduce = useReducedMotion()
  const [revealed, setRevealed] = useState(false)
  const show = revealed || reduce

  // never hold the name hostage to the terminal boot — reveal after 1.4s regardless
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1400)
    return () => clearTimeout(t)
  }, [])

  const fadeUp = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 24, filter: 'blur(5px)' },
    animate: show
      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
      : { opacity: 0, y: 24, filter: 'blur(5px)' },
    transition: { duration: 0.7, delay, ease: EASE },
  })

  const rise = (delay) => ({
    initial: reduce ? false : { y: '112%' },
    animate: show ? { y: '0%' } : { y: '112%' },
    transition: { duration: 0.9, delay, ease: EASE },
  })

  return (
    <section className="relative flex min-h-svh flex-col justify-center px-6 pb-20 pt-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* name block */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <motion.p
            {...fadeUp(0)}
            aria-hidden="true"
            className="font-mono text-xs text-mut sm:text-sm"
          >
            <span className="text-acc">❯ </span>whoami
          </motion.p>

          <h1 className="mt-6 font-display font-bold leading-[1.02] tracking-tight">
            <span className="sr-only">Zakaurrehman Shaikh</span>
            <span aria-hidden="true" className="block overflow-hidden pb-1">
              <motion.span
                {...rise(0.05)}
                className="block text-[clamp(2.6rem,7.2vw,4.5rem)] lg:text-[clamp(2.6rem,4.4vw,4.2rem)]"
              >
                Zakaurrehman
              </motion.span>
            </span>
            <span aria-hidden="true" className="block overflow-hidden pb-2">
              <motion.span
                {...rise(0.16)}
                className="block text-acc text-[clamp(2.6rem,7.2vw,4.5rem)] lg:text-[clamp(2.6rem,4.4vw,4.2rem)]"
              >
                Shaikh
              </motion.span>
            </span>
          </h1>

          <motion.p
            {...fadeUp(0.28)}
            className="mx-auto mt-5 max-w-md text-lg text-mut sm:text-xl lg:mx-0"
          >
            I turn <span className="text-fg">noisy logs</span> into{' '}
            <span className="text-fg">clear verdicts</span>.
          </motion.p>

          <motion.p
            {...fadeUp(0.36)}
            className="mt-4 font-mono text-xs leading-relaxed text-mut sm:text-[13px]"
          >
            MSc Cyber Security · University of Surrey
            <span className="hidden sm:inline"> · </span>
            <br className="sm:hidden" />
            Guildford, UK
          </motion.p>

          <motion.div
            {...fadeUp(0.44)}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Magnetic>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-md bg-acc px-6 py-3 font-mono text-sm font-medium text-ink transition-colors hover:bg-sky"
              >
                View case files
                <span aria-hidden="true">↓</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md border border-line bg-panel/60 px-6 py-3 font-mono text-sm text-fg transition-colors hover:border-acc/50 hover:text-acc"
              >
                Get in touch
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* live terminal */}
        <div className="order-1 lg:order-2">
          <Terminal onResolve={() => setRevealed(true)} />
        </div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-mut transition-colors hover:text-acc"
      >
        scroll ↓
      </motion.a>
    </section>
  )
}
