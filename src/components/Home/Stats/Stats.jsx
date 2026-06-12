import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import styles from './Stats.module.css'

const STATS = [
  { number: 12,    suffix: 'k+', label: 'Happy Customers' },
  { number: 4.9,   suffix: '★',  label: 'Average Rating'  },
  { number: 340,   suffix: '+',  label: 'Products'         },
  { number: 24,    suffix: '/7', label: 'Support'          },
]

function AnimatedNumber({ value, suffix, inView }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) =>
    Number.isInteger(value) ? Math.round(v) : v.toFixed(1)
  )

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    })
    return controls.stop
  }, [inView, value, count])

  return (
    <div className={styles.statNumber}>
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </div>
  )
}

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref}>
      <motion.div
        className={styles.stats}
        variants={gridVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {STATS.map((s) => (
          <motion.div
            key={s.label}
            className={styles.statCard}
            variants={cardVariants}
            whileHover={{
              y: -6,
              boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
              transition: { type: 'spring', stiffness: 300, damping: 18 },
            }}
          >
            <AnimatedNumber value={s.number} suffix={s.suffix} inView={inView} />
            <div className={styles.statLabel}>{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}