import { motion } from 'framer-motion'
import styles from './CTA.module.css'

const cardVariants = {
  hidden:  { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

const contentVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function CTA() {
  return (
    <section className={styles.ctaSection}>
      <motion.div
        className={styles.ctaCard}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className={styles.ctaGlow} />

        <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 variants={itemVariants}>
            Ready to explore<br />the collection?
          </motion.h2>

          <motion.p variants={itemVariants}>
            Join thousands of happy customers and find exactly what you're looking for.
          </motion.p>

          <motion.div className={styles.ctaBtns} variants={itemVariants}>
            <motion.a
              href="/shop"
              className={styles.btnPrimary}
              whileHover={{
                y: -3,
                filter: 'brightness(1.12)',
                boxShadow: '0 16px 40px rgba(124,58,237,0.55)',
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              Shop Now
            </motion.a>
            <motion.a
              href="/login"
              className={styles.btnGhost}
              whileHover={{ y: -3, background: 'var(--glass-hover)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              Sign In
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}