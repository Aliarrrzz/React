import { motion } from 'framer-motion'
import SignupForm from '../Form/SignupForm'
import styles from './SignupCard.module.css'
import { navigate } from '../../../App'

const contentVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  exit:    {},
}

const itemVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0 },
}

const iconVariants = {
  initial: { scale: 0, rotate: -180, opacity: 0 },
  animate: {
    scale: 1, rotate: 0, opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20, delay: 0.05 },
  },
}

export default function SignupCard({ shake, onShake }) {
  return (
    <div className={`${styles.signupCard} ${shake ? styles.shake : ''}`}>
      <motion.div
        className={styles.cardIcon}
        variants={iconVariants}
        initial="initial"
        animate="animate"
        whileHover={{
          rotate: 360,
          scale: 1.15,
          transition: { duration: 0.55, ease: 'easeInOut' },
        }}
      >
        ✨
      </motion.div>

      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        <motion.h1 className={styles.cardTitle} variants={itemVariants}>
          {'Create '.split('').map((char, i) => (
            <motion.span
              key={i}
              style={{ display: 'inline-block' }}
              whileHover={{ y: -4, color: '#a78bfa', transition: { duration: 0.2 } }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
          <span className={styles.gradientWord}>
            {'Account'.split('').map((char, i) => (
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
          Join Ali Site — it only takes a minute
        </motion.p>

        <motion.div variants={itemVariants}>
          <SignupForm onShake={onShake} />
        </motion.div>

        <motion.div className={styles.divider} variants={itemVariants}>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            already a member?
          </motion.span>
        </motion.div>

        <motion.div className={styles.loginLink} variants={itemVariants}>
          <motion.a
            href="/login"
            onClick={(e) => { e.preventDefault(); navigate('/login') }}
            whileHover={{ x: 4, color: '#67e8f9' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            Sign in to your account →
          </motion.a>
        </motion.div>

        <motion.div
          className={styles.terms}
          variants={itemVariants}
          animate={{ opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          By signing up you agree to our{' '}
          <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
        </motion.div>
      </motion.div>
    </div>
  )
}