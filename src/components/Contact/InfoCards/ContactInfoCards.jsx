import { motion } from 'framer-motion'
import styles from './ContactInfoCards.module.css'

const CARDS = [
  {
    icon: '📬',
    iconBg: 'rgba(167,139,250,0.15)',
    title: 'Email Us',
    desc: 'hello@alisite.com\nWe reply within 24 hours.',
  },
  {
    icon: '💬',
    iconBg: 'rgba(103,232,249,0.12)',
    title: 'Live Chat',
    desc: 'Available Mon – Fri,\n9 AM – 6 PM (GMT+1).',
  },
  {
    icon: '📍',
    iconBg: 'rgba(244,114,182,0.12)',
    title: 'Our Office',
    desc: '123 Design Street,\nAmsterdam, NL',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function ContactInfoCards() {
  return (
    <motion.div
      className={styles.infoCol}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {CARDS.map((card) => (
        <motion.div
          key={card.title}
          className={styles.infoCard}
          variants={cardVariants}
          whileHover={{
            y: -5,
            boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
            transition: { type: 'spring', stiffness: 300, damping: 20 },
          }}
        >
          <motion.div
            className={styles.infoIcon}
            style={{ background: card.iconBg }}
            whileHover={{ scale: 1.12, rotate: 6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            {card.icon}
          </motion.div>
          <h3>{card.title}</h3>
          <p>
            {card.desc.split('\n').map((line, i) => (
              <span key={i}>{line}{i < card.desc.split('\n').length - 1 && <br />}</span>
            ))}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}