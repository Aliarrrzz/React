import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ContactForm.module.css'

const formVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const fieldVariants = {
  hidden:  { opacity: 0, x: -16, filter: 'blur(4px)' },
  visible: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

function AnimatedField({ label, children }) {
  return (
    <motion.div className={styles.field} variants={fieldVariants}>
      {label && <label>{label}</label>}
      {children}
    </motion.div>
  )
}

function FocusInput({ type = 'text', placeholder, value, onChange, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className={styles.inputWrap}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
      />
      <AnimatePresence>
        {focused && (
          <motion.span
            className={styles.focusRing}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function FocusTextarea({ placeholder, value, onChange, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className={styles.inputWrap}>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
      />
      <AnimatePresence>
        {focused && (
          <motion.span
            className={styles.focusRing}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContactForm() {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [msg,     setMsg]     = useState({ text: '', type: '' })
  const [sending, setSending] = useState(false)

  const isReady = name.trim() && email.trim() && message.trim()

  useEffect(() => {
    if (msg.text) {
      const t = setTimeout(() => setMsg({ text: '', type: '' }), 5000)
      return () => clearTimeout(t)
    }
  }, [msg.text])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isReady || sending) return

    setSending(true)
    setMsg({ text: '', type: '' })

    // backend felan nist — placeholder
    setTimeout(() => {
      setMsg({ text: '⚠️ Backend not connected yet', type: 'error' })
      setSending(false)
    }, 900)
  }

  return (
    <motion.div
      className={styles.formCard}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <h2>Send a Message</h2>

      <motion.form
        onSubmit={handleSubmit}
        noValidate
        variants={formVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className={styles.row2} variants={fieldVariants}>
          <AnimatedField label="Name">
            <FocusInput
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </AnimatedField>
          <AnimatedField label="Email">
            <FocusInput
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </AnimatedField>
        </motion.div>

        <AnimatedField label="Subject">
          <FocusInput
            placeholder="What's this about?"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </AnimatedField>

        <AnimatedField label="Message">
          <FocusTextarea
            placeholder="Tell us everything…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </AnimatedField>

        <motion.div variants={fieldVariants}>
          <motion.button
            type="submit"
            className={styles.btnPrimary}
            disabled={!isReady || sending}
            whileHover={isReady && !sending
              ? { y: -3, boxShadow: '0 16px 40px rgba(124,58,237,0.55)', filter: 'brightness(1.1)' }
              : {}}
            whileTap={isReady && !sending ? { scale: 0.97 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <motion.span
              className={styles.btnShimmer}
              animate={isReady && !sending ? { x: ['-120%', '220%'] } : { x: '-120%' }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
            />

            <AnimatePresence mode="wait">
              <motion.span
                key={sending ? 'sending' : 'idle'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                {sending
                  ? <span className={styles.dotsWrap}>
                      Sending
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.25 }}
                        >.</motion.span>
                      ))}
                    </span>
                  : 'Send Message'}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.form>

      <AnimatePresence>
        {msg.text && (
          <motion.div
            className={`${styles.msgBox} ${styles[msg.type]}`}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
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
    </motion.div>
  )
}