import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navigate } from '../../App'
import styles from './Navbar.module.css'

const navVariants = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0, opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const linkContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
}

const linkVariants = {
  hidden:  { y: -12, opacity: 0 },
  visible: { y: 0,   opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const ctaVariants = {
  hidden:  { scale: 0.7, opacity: 0 },
  visible: { scale: 1,   opacity: 1, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.6 } },
}

const logoVariants = {
  hidden:  { x: -24, opacity: 0 },
  visible: { x: 0,   opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 } },
}

const LINKS = [
  { label: 'Home',    href: '/'        },
  { label: 'Shop',    href: '/shop'    },
  { label: 'Contact', href: '/contact' },
  { label: 'Account', href: '/account' },
]

function getActiveLabelFromPath(pathname) {
  const match = LINKS.find((l) => l.href === pathname)
  return match ? match.label : 'Home'
}

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [activeLink,   setActiveLink]   = useState(() => getActiveLabelFromPath(window.location.pathname))
  const [hoveredLink,  setHoveredLink]  = useState(null)
  const [menuOpen,     setMenuOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onPop = () => setActiveLink(getActiveLabelFromPath(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 700) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function handleNav(e, href, label) {
    e.preventDefault()
    setActiveLink(label)
    setMenuOpen(false)
    navigate(href)
  }

  return (
    <motion.header
      className={styles.header}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className={styles.navPill}
        animate={{
          background: scrolled ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.10)',
          boxShadow: scrolled
            ? '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)'
            : '0 8px 32px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.10)',
        }}
        transition={{ duration: 0.4 }}
      >
        <motion.div className={styles.logo} variants={logoVariants}>
          <motion.span
            onClick={(e) => handleNav(e, '/', 'Home')}
            whileHover={{ scale: 1.05, color: '#a78bfa' }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            style={{ display: 'inline-block', cursor: 'pointer' }}
          >
            Ali Site
          </motion.span>
        </motion.div>

        <motion.nav
          className={styles.navLinks}
          variants={linkContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className={activeLink === link.label ? styles.active : ''}
              variants={linkVariants}
              onHoverStart={() => setHoveredLink(link.label)}
              onHoverEnd={() => setHoveredLink(null)}
              onClick={(e) => handleNav(e, link.href, link.label)}
              style={{ position: 'relative' }}
              whileTap={{ scale: 0.95 }}
            >
              {link.label}

              <AnimatePresence>
                {hoveredLink === link.label && activeLink !== link.label && (
                  <motion.span
                    layoutId="hoverPill"
                    className={styles.hoverPill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>

              {activeLink === link.label && (
                <motion.span
                  layoutId="activeDot"
                  className={styles.activeDot}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </motion.nav>

        <motion.a
          href="/login"
          className={styles.navCta}
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
          onClick={(e) => handleNav(e, '/login', '')}
          whileHover={{
            scale: 1.06,
            boxShadow: '0 12px 32px rgba(124,58,237,0.60)',
            filter: 'brightness(1.15)',
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.4 }}
          >
            Sign In
          </motion.span>
        </motion.a>

        <motion.button
          className={styles.hamburger}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <span className={menuOpen ? `${styles.barTop} ${styles.barTopOpen}` : styles.barTop} />
          <span className={menuOpen ? `${styles.barMid} ${styles.barMidOpen}` : styles.barMid} />
          <span className={menuOpen ? `${styles.barBot} ${styles.barBotOpen}` : styles.barBot} />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,   scale: 1    }}
            exit={{   opacity: 0, y: -12,  scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={activeLink === link.label ? styles.mobileActive : styles.mobileLink}
                onClick={(e) => handleNav(e, link.href, link.label)}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}