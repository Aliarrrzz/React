import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Signup.module.css'
import SignupCard   from '../../components/Signup/Card/SignupCard'
import LoginFooter  from '../../Layout/Footer/Footer'

const wrapVariants = {
  initial: { opacity: 0, y: 22, scale: 0.97 },
  animate: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.05 },
  },
  exit: {
    opacity: 0, y: -10, scale: 0.98,
    transition: { duration: 0.15 },
  },
}

export default function Signup() {
  const [shake, setShake] = useState(false)

  function triggerShake() {
    setShake(true)
    setTimeout(() => setShake(false), 400)
  }

  return (
    <div className={styles.signupWrapper}>
      <motion.div
        className={styles.signupWrap}
        variants={wrapVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <SignupCard shake={shake} onShake={triggerShake} />
      </motion.div>

      <LoginFooter />
    </div>
  )
}