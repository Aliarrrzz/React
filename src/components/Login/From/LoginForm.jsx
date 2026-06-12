import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import styles from './LoginForm.module.css'

const fieldVariants = {
  hidden:  { opacity: 0, x: -18, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0,   filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const formVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

function AnimatedInput({ icon, id, type, placeholder, value, onChange,
                         autoComplete, rightSlot }) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  return (
    <motion.div
      className={styles.field}
      variants={fieldVariants}
      animate={focused ? { scale: 1.015 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >

      <motion.span
        className={styles.fieldIcon}
        animate={{ opacity: focused ? 1 : 0.5, scale: focused ? 1.15 : 1 }}
        transition={{ duration: 0.25 }}
      >
        {icon}
      </motion.span>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
      />

      <AnimatePresence>
        {focused && (
          <motion.span
            className={styles.focusRing}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{   opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>

      {rightSlot}
    </motion.div>
  )
}

function SubmitButton({ isReady, isSubmitting, progress }) {
  return (
    <motion.button
      type="submit"
      className={styles.submitBtn}
      disabled={!isReady || isSubmitting}
      whileHover={isReady && !isSubmitting
        ? { y: -3, boxShadow: '0 20px 48px rgba(124,58,237,0.6)' }
        : {}}
      whileTap={isReady && !isSubmitting ? { scale: 0.97 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >

      <motion.span
        className={styles.btnShimmer}
        animate={isReady && !isSubmitting
          ? { x: ['-120%', '220%'] }
          : { x: '-120%' }}
        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
      />

      <AnimatePresence>
        {isSubmitting && (
          <motion.span
            className={styles.btnProgress}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.span
          key={isSubmitting ? 'loading' : 'idle'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{   opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {isSubmitting
            ? <span className={styles.dotsWrap}>
                Signing in
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.25 }}
                  >.</motion.span>
                ))}
              </span>
            : 'Sign In →'}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}


export default function LoginForm({ onShake }) {
  const [email,        setEmail]        = useState('')
  const [password,     setPassword]     = useState('')
  const [showPass,     setShowPass]     = useState(false)
  const [remember,     setRemember]     = useState(false)
  const [msg,          setMsg]          = useState({ text: '', type: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isReady = email.trim().length > 0 && password.length > 0

  useEffect(() => { if (msg.text) setMsg({ text: '', type: '' }) }, [email, password])

  function showMsg(text, type) { setMsg({ text, type }) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isReady || isSubmitting) return
    setIsSubmitting(true)
    setMsg({ text: '', type: '' })

    // ── Real API call (uncomment when backend ready) ──
    // try {
    //   const res  = await fetch('/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password }),
    //   })
    //   const data = await res.json()
    //   if (res.ok) {
    //     localStorage.setItem('accessToken', data.accessToken)
    //     if (data.user) localStorage.setItem('user', JSON.stringify(data.user))
    //     if (remember)  localStorage.setItem('rememberMe', 'true')
    //     showMsg('🎉 Welcome back! Redirecting…', 'success')
    //     setTimeout(() => window.location.replace('/'), 1600)
    //   } else {
    //     showMsg(data.message || '❌ Incorrect email or password', 'error')
    //     onShake(); setIsSubmitting(false)
    //   }
    // } catch {
    //   showMsg('🚫 Server unavailable — try again', 'error')
    //   setIsSubmitting(false)
    // }

    setTimeout(() => {
      showMsg('⚠️ Backend not connected yet', 'error')
      onShake()
      setIsSubmitting(false)
    }, 900)
  }

  return (
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >

      <AnimatedInput
        icon="✉️"
        id="email"
        type="email"
        placeholder="Email address"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <motion.div variants={fieldVariants}>
        <div className={styles.fieldHeader}>
          <span className={styles.fieldLabel}>Password</span>
          <motion.a
            href="/forgot"
            className={styles.forgotLink}
            whileHover={{ x: 3, color: '#67e8f9' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            Forgot Password?
          </motion.a>
        </div>
        <AnimatedInput
          icon="🔑"
          id="password"
          type={showPass ? 'text' : 'password'}
          placeholder="Your password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          rightSlot={
            <motion.button
              type="button"
              className={styles.toggleEye}
              onClick={() => setShowPass(p => !p)}
              aria-label={showPass ? 'Hide password' : 'Show password'}
              whileHover={{ scale: 1.2, opacity: 1 }}
              whileTap={{ scale: 0.85, rotate: 15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={showPass ? 'hide' : 'show'}
                  initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0,   scale: 1 }}
                  exit={{   opacity: 0, rotate:  30,  scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'inline-block' }}
                >
                  {showPass ? '🙈' : '👁'}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          }
        />
      </motion.div>

      <motion.label
        className={styles.rememberRow}
        variants={fieldVariants}
        whileHover={{ x: 3 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        <motion.div
          className={styles.checkboxWrap}
          animate={remember
            ? { scale: [1, 1.2, 1], transition: { duration: 0.3 } }
            : {}}
        >
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <AnimatePresence>
            {remember && (
              <motion.span
                className={styles.checkMark}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{   scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              >
                ✓
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
        <span>Remember me (30 days)</span>
      </motion.label>

      <AnimatePresence>
        {msg.text && (
          <motion.div
            className={`${styles.msg} ${styles[msg.type]}`}
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1,  y: 0,  scale: 1 }}
            exit={{   opacity: 0,  y: -10, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >

            {msg.type === 'error' && (
              <motion.span
                className={styles.msgPulse}
                animate={{ opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
            )}
            {msg.text}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={fieldVariants}>
        <SubmitButton isReady={isReady} isSubmitting={isSubmitting} />
      </motion.div>
    </motion.form>
  )
}