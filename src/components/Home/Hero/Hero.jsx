import { motion } from 'framer-motion'
import styles from './Hero.module.css'

const orbVariants = {
  animate: (delay) => ({
    y: [0, -30, 0],
    scale: [1, 1.06, 1],
    transition: {
      duration: 8,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

const scrollVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 1.1, ease: 'easeOut' },
  },
}

export default function Hero() {
  return (
    <section className={styles.hero}>
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
        className={`${styles.heroOrb} ${styles.heroOrb3}`}
        variants={orbVariants}
        animate="animate"
        custom={-6}
      />

      <motion.div
        className={styles.heroContent}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className={styles.heroLabel} variants={itemVariants}>
          Welcome to Ali Site
        </motion.p>

        <motion.h1 className={styles.heroTitle} variants={itemVariants}>
          Where <em>finest</em> materials<br />meets bold ideas
        </motion.h1>

        <motion.p className={styles.heroDesc} variants={itemVariants}>
          Experience another level of online shopping with us.
        </motion.p>

        <motion.div className={styles.heroBtns} variants={itemVariants}>
          <motion.a
            href="/shop"
            className={styles.btnPrimary}
            whileHover={{ y: -3, filter: 'brightness(1.12)', boxShadow: '0 16px 40px rgba(124,58,237,0.55)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            Explore Shop
          </motion.a>
          <motion.a
            href="/account"
            className={styles.btnGhost}
            whileHover={{ y: -3, background: 'var(--glass-hover)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            My Account
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.heroScroll}
        variants={scrollVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className={styles.scrollLine}
          animate={{ scaleY: [1, 1.15, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span>Scroll</span>
      </motion.div>
    </section>
  )
}