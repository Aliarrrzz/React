import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Login.module.css'
import LoginCard   from '../../components/Login/Card/LoginCard'
import LoginFooter from '../../Layout/Footer/Footer'

const wrapVariants = {
  hidden:  { opacity: 0, y: 44, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
  },
}

export default function Login() {
  const [shake, setShake] = useState(false)

  function triggerShake() {
    setShake(true)
    setTimeout(() => setShake(false), 400)
  }

  return (
    <div className={styles.loginWrapper}>
      <motion.div
        className={styles.loginWrap}
        variants={wrapVariants}
        initial="hidden"
        animate="visible"
      >
        <LoginCard shake={shake} onShake={triggerShake} />
      </motion.div>

      <LoginFooter />
    </div>
  )
}