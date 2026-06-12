import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.21, 0.6, 0.35, 1]

/** Scroll-triggered fade/rise. Renders statically for reduced-motion users. */
export default function Reveal({ children, delay = 0, y = 26, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
