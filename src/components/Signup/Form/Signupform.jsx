import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './SignupForm.module.css'

const levelClass = ['', styles.weak, styles.fair, styles.good, styles.strong]
const passwordRule = /^(?=.*[A-Z])(?=.*\d).+$/

function getStrength(pw) {
  let score = 0
  if (pw.length >= 8)            score++
  if (/[A-Z]/.test(pw))         score++
  if (/\d/.test(pw))            score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
}

const fieldVariants = {
  initial: { opacity: 0, x: -18, filter: 'blur(4px)' },
  animate: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0 },
}

const formVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  exit:    {},
}

function AnimatedInput({ icon, id, type, placeholder, value, onChange, autoComplete, rightSlot }) {
  const [focused, setFocused] = useState(false)

  return (
    <motion.div
      className={styles.field}
      variants={fieldVariants}
      animate={focused ? { scale: 1.015 } : undefined}
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
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>

      {rightSlot}
    </motion.div>
  )
}

function StrengthBar({ score }) {
  return (
    <motion.div className={styles.strengthWrap} variants={fieldVariants}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={`${styles.strengthSeg} ${i < score ? levelClass[score] : ''}`}
          animate={{ scaleX: i < score ? 1 : 0.6, opacity: i < score ? 1 : 0.3 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  )
}

function EyeToggle({ show, onToggle, label }) {
  return (
    <motion.button
      type="button"
      className={styles.toggleEye}
      onClick={onToggle}
      aria-label={label}
      whileHover={{ scale: 1.2, opacity: 1 }}
      whileTap={{ scale: 0.85, rotate: 15 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={show ? 'hide' : 'show'}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'inline-block' }}
        >
          {show ? '🙈' : '👁'}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

function SubmitButton({ isReady, isSubmitting, label }) {
  return (
    <motion.button
      type="submit"
      className={styles.submitBtn}
      disabled={!isReady || isSubmitting}
      whileHover={isReady && !isSubmitting ? { y: -3, boxShadow: '0 20px 48px rgba(124,58,237,0.6)' } : {}}
      whileTap={isReady && !isSubmitting ? { scale: 0.97 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <motion.span
        className={styles.btnShimmer}
        animate={isReady && !isSubmitting ? { x: ['-120%', '220%'] } : { x: '-120%' }}
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
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {isSubmitting
            ? <span className={styles.dotsWrap}>
                Creating account
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.25 }}
                  >.</motion.span>
                ))}
              </span>
            : label}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

export default function SignupForm({ onShake }) {
  const [username,        setUsername]        = useState('')
  const [email,           setEmail]           = useState('')
  const [password,        setPassword]        = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword,    setShowPassword]    = useState(false)
  const [showConfirm,     setShowConfirm]     = useState(false)
  const [msg,             setMsg]             = useState({ text: '', type: '' })
  const [isSubmitting,    setIsSubmitting]    = useState(false)

  const strengthScore = getStrength(password)

  useEffect(() => {
    if (msg.text) setMsg({ text: '', type: '' })
  }, [username, email, password, confirmPassword])

  let canSubmit   = false
  let computedMsg = null

  if (username.trim() && email.trim() && password && confirmPassword) {
    if (!passwordRule.test(password)) {
      computedMsg = { text: 'Password needs 1 uppercase letter & 1 number ❌', type: 'error' }
    } else if (password !== confirmPassword) {
      computedMsg = { text: "Passwords don't match ❌", type: 'error' }
    } else {
      canSubmit   = true
      computedMsg = { text: 'Looking good — ready to register! ✅', type: 'success' }
    }
  }

  const displayedMsg = msg.text ? msg : computedMsg

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit || isSubmitting) return
    setIsSubmitting(true)
    setMsg({ text: '', type: '' })

    try {
      const res  = await fetch('http://localhost:3000/auth/signup', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ username: username.trim(), email: email.trim(), password }),
      })
      const data = await res.json()

      if (data.success) {
        setMsg({ text: '🎉 Account created! Redirecting…', type: 'success' })
        setTimeout(() => { window.location.href = '/login' }, 1800)
      } else {
        setMsg({ text: data.message || '❌ Sign up failed', type: 'error' })
        onShake?.()
        setIsSubmitting(false)
      }
    } catch {
      setMsg({ text: '🚫 Server unavailable — try again', type: 'error' })
      onShake?.()
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      variants={formVariants}
    >
      <AnimatedInput
        icon="👤" id="username" type="text" placeholder="Username"
        autoComplete="username" value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <AnimatedInput
        icon="✉️" id="email" type="email" placeholder="Email address"
        autoComplete="email" value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <AnimatedInput
        icon="🔑" id="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Password" autoComplete="new-password"
        value={password} onChange={(e) => setPassword(e.target.value)}
        rightSlot={
          <EyeToggle show={showPassword}
            onToggle={() => setShowPassword(v => !v)}
            label={showPassword ? 'Hide password' : 'Show password'} />
        }
      />

      <StrengthBar score={strengthScore} />

      <AnimatedInput
        icon="🔒" id="confirmPassword"
        type={showConfirm ? 'text' : 'password'}
        placeholder="Confirm password" autoComplete="new-password"
        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
        rightSlot={
          <EyeToggle show={showConfirm}
            onToggle={() => setShowConfirm(v => !v)}
            label={showConfirm ? 'Hide confirm password' : 'Show confirm password'} />
        }
      />

      <AnimatePresence>
        {displayedMsg?.text && (
          <motion.div
            className={`${styles.msg} ${styles[displayedMsg.type]}`}
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {displayedMsg.type === 'error' && (
              <motion.span
                className={styles.msgPulse}
                animate={{ opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
            )}
            {displayedMsg.text}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={fieldVariants}>
        <SubmitButton isReady={canSubmit} isSubmitting={isSubmitting} label="Create Account →" />
      </motion.div>
    </motion.form>
  )
}