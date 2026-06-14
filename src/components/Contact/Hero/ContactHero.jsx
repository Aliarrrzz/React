import { motion } from 'framer-motion'
import styles from './ContactHero.module.css'

const orbVariants = {
  animate: (delay) => ({
    y: [0, -30, 0],
    scale: [1, 1.06, 1],
    transition: { duration: 8, delay, repeat: Infinity, ease: 'easeInOut' },
  }),
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function ContactHero() {
  return (
    <section className={styles.pageHero}>
      <motion.div
        className={`${styles.heroOrb} ${styles.heroOrb1}`}
        variants={orbVariants}
        animate="animate"
        custom={0}
      />
      <motion.div
        className={`${styles.heroOrb} ${styles.heroOrb2}`}
        variants={orbVariants}
        animate="animate"
        custom={-3}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className={styles.pageLabel} variants={itemVariants}>
          Get in touch
        </motion.p>
        <motion.h1 variants={itemVariants}>
          We'd love to <em>hear</em> from you
        </motion.h1>
        <motion.p className={styles.pageDesc} variants={itemVariants}>
          Have a question, a suggestion, or just want to say hello?
          Drop us a message and we'll get back to you.
        </motion.p>
      </motion.div>
    </section>
  )
}