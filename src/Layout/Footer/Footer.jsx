import { motion } from 'framer-motion'
import styles from './Footer.module.css'

const footerVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 },
  },
}

const linkVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 1.4 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const links = [
  { label: 'Help',    href: '/help'    },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms',   href: '/terms'   },
]

export default function LoginFooter() {
  return (
    <motion.footer
      className={styles.loginFooter}
      variants={footerVariants}
      initial="hidden"
      animate="visible"
    >

      <motion.div
        className={styles.footerLinks}
        variants={linkVariants}
        initial="hidden"
        animate="visible"
      >
        {links.map(({ label, href }, i) => (
          <motion.a
            key={label}
            href={href}
            className={styles.footerLink}
            variants={itemVariants}
            whileHover={{ y: -2, color: '#a78bfa' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {label}
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        className={styles.footerDivider}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.3 }}
      />

      <motion.span
        className={styles.footerCopy}
        animate={{ opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        © 2025 Ali Site — All rights reserved
      </motion.span>
    </motion.footer>
  )
}