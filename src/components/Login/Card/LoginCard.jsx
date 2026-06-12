import { motion } from 'framer-motion'
import LoginForm from '../From/LoginForm'
import styles from './LoginCard.module.css'

const cardVariants = {
  hidden:  { opacity: 0, y: 60, scale: 0.94 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
}

const contentVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

const iconVariants = {
  hidden:  { scale: 0, rotate: -180, opacity: 0 },
  visible: {
    scale: 1, rotate: 0, opacity: 1,
    transition: { type: 'spring', stiffness: 260, damping: 18, delay: 0.15 },
  },
}

export default function LoginCard({ shake, onShake }) {
  return (
    <motion.div
      className={`${styles.loginCard} ${shake ? styles.shake : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >

      <motion.div
        className={styles.cardIcon}
        variants={iconVariants}
        whileHover={{
          rotate: 360,
          scale: 1.15,
          transition: { duration: 0.55, ease: 'easeInOut' },
        }}
      >
        🔐
      </motion.div>

      <motion.div variants={contentVariants} initial="hidden" animate="visible">

        <motion.h1 className={styles.cardTitle} variants={itemVariants}>
          {'Welcome '.split('').map((char, i) => (
            <motion.span
              key={i}
              style={{ display: 'inline-block' }}
              whileHover={{ y: -4, color: '#a78bfa', transition: { duration: 0.2 } }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
          <span className={styles.gradientWord}>
            {'Back'.split('').map((char, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block' }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p className={styles.cardSub} variants={itemVariants}>
          Sign in to your Ali Site account
        </motion.p>

        <motion.div variants={itemVariants}>
          <LoginForm onShake={onShake} />
        </motion.div>

        <motion.div className={styles.divider} variants={itemVariants}>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            new here?
          </motion.span>
        </motion.div>

        <motion.div className={styles.signupLink} variants={itemVariants}>
          <motion.a
            href="/signup"
            whileHover={{ x: 4, color: '#67e8f9' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            Create an account →
          </motion.a>
        </motion.div>

        <motion.div
          className={styles.terms}
          variants={itemVariants}
          animate={{ opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          By signing in you agree to our{' '}
          <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
        </motion.div>

      </motion.div>
    </motion.div>
  )
}