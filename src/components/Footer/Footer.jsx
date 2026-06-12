import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Footer.module.css'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const fadeUpVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

const logoVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const linkVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
}

const LINKS = [
  { label: 'Contact', href: '/contact' },
  { label: 'Shop',    href: '/shop'    },
  { label: 'Account', href: '/account' },
]

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.footer
      ref={ref}
      className={styles.footer}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className={styles.footerInner}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className={styles.shimmerBorder} aria-hidden="true" />

        <motion.div className={styles.footerLogo} variants={logoVariants}>
          <motion.span
            whileHover={{ scale: 1.05, color: '#a78bfa' }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            style={{ display: 'inline-block', cursor: 'default' }}
          >
            Ali Site
          </motion.span>
        </motion.div>

        <motion.div className={styles.footerCopy} variants={fadeUpVariants}>
          © 2025 Ali Site. All rights reserved.
        </motion.div>

        <motion.div
          className={styles.footerLinks}
          variants={containerVariants}
        >
          {LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className={styles.footerLink}
              variants={linkVariants}
              whileHover={{ scale: 1.08, color: '#a78bfa' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              {link.label}
              <motion.span
                className={styles.linkUnderline}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </motion.footer>
  )
}