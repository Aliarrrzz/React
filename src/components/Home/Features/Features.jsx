import { motion } from 'framer-motion'
import styles from './Features.module.css'

const FEATURES = [
  {
    icon: '⚡',
    iconBg: 'rgba(167,139,250,0.15)',
    title: 'Blazing Performance',
    desc: 'Optimised for speed at every layer — from fonts to animations — so you never wait around.',
  },
  {
    icon: '🔒',
    iconBg: 'rgba(103,232,249,0.12)',
    title: 'Secure by Default',
    desc: 'Your data and payments are protected with industry-standard encryption and best practices.',
  },
  {
    icon: '✦',
    iconBg: 'rgba(244,114,182,0.12)',
    title: 'Premium Design',
    desc: 'Glassmorphism cards, smooth hover states, and orchestrated animations for a refined look.',
  },
  {
    icon: '📱',
    iconBg: 'rgba(167,139,250,0.15)',
    title: 'Fully Responsive',
    desc: 'Pixel-perfect on any screen — mobile, tablet, or widescreen desktop.',
  },
  {
    icon: '🛒',
    iconBg: 'rgba(103,232,249,0.12)',
    title: 'Easy Shopping',
    desc: 'Streamlined product pages and a checkout flow that gets you from browse to buy in seconds.',
  },
  {
    icon: '💬',
    iconBg: 'rgba(244,114,182,0.12)',
    title: 'Always Available',
    desc: "Reach our team any time — we're here to help with orders, returns, and anything in between.",
  },
]

const headVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 48, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Features() {
  return (
    <section className={styles.featuresSection}>
      <motion.div
        className={styles.sectionHead}
        variants={headVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className={styles.sectionLabel}>Why Ali Site</div>
        <div className={styles.sectionTitle}>
          Everything you need,<br />beautifully designed
        </div>
        <div className={styles.sectionSub}>
          A seamless experience from browsing to checkout, wrapped in a premium aesthetic.
        </div>
      </motion.div>

      <motion.div
        className={styles.featuresGrid}
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {FEATURES.map((f) => (
          <motion.div
            key={f.title}
            className={styles.featureCard}
            variants={cardVariants}
            whileHover={{
              y: -8,
              boxShadow: '0 24px 56px rgba(0,0,0,0.38)',
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
          >
            <motion.div
              className={styles.featureIcon}
              style={{ background: f.iconBg }}
              whileHover={{ scale: 1.15, rotate: 6 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {f.icon}
            </motion.div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}