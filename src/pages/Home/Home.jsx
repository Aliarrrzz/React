import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import styles from './Home.module.css'
import Navbar   from '../../components/Navbar/Navbar'
import Hero     from '../../components/Hero/Hero'
import Stats    from '../../components/Stats/Stats'
import Features from '../../components/Features/Features'
import CTA      from '../../components/CTA/CTA'
import Footer   from '../../components/Footer/Footer'

// hooks
function useCursorGlow() {
  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }
    const leave = () => setIsVisible(false)
    const enter = () => setIsVisible(true)

    window.addEventListener('mousemove', move)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)

    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
    }
  }, [])

  return { cursorX, cursorY, isVisible }
}

function CursorGlow({ cursorX, cursorY, isVisible }) {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    setIsDesktop(window.matchMedia('(pointer: fine)').matches)
  }, [])

  if (!isDesktop) return null

  return (
    <motion.div
      className={styles.cursorGlow}
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.3 } }}
    />
  )
}


export const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
}


export function SectionWrapper({ children, className = '', delay = 0 }) {
  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden:  {},
        visible: { transition: { staggerChildren: 0.13, delayChildren: delay } }
      }}
    >
      {children}
    </motion.section>
  )
}

// animation background
function AnimatedBackground() {
  return (
    <>
      <motion.div
        className={styles.bg}
        animate={{
          backgroundPosition: [
            '20% 20%, 80% 80%, 55% 50%',
            '35% 30%, 65% 70%, 65% 40%',
            '15% 35%, 85% 65%, 45% 60%',
            '25% 15%, 75% 85%, 60% 45%',
            '20% 20%, 80% 80%, 55% 50%',
          ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className={styles.bgSweep}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className={styles.bgPulse}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  )
}

// background 

function ParallaxOrb({ x, y, size, color, speed = 0.3, floatRange = 40, floatDuration = 14 }) {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 3000], [0, -3000 * speed])
  const springParallaxY = useSpring(parallaxY, { stiffness: 60, damping: 25 })

  return (
    <motion.div
      ref={ref}
      className={styles.orb}
      style={{
        left: x,
        top:  y,
        width:  size,
        height: size,
        background: color,
        y: springParallaxY,
      }}
      animate={{
        x: [0, floatRange, -floatRange * 0.6, 0],
        y: [0, -floatRange * 0.7, floatRange * 0.5, 0],
        scale: [1, 1.08, 0.96, 1],
      }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

// home page 
export default function Home() {
  const cursorGlow = useCursorGlow()

  return (
    <>
      <CursorGlow {...cursorGlow} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <AnimatedBackground />

        <div className={styles.orbContainer} aria-hidden="true">
          <ParallaxOrb x="5%"  y="10%"  size="520px" color="radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)"  speed={0.18} floatRange={50} floatDuration={18} />
          <ParallaxOrb x="65%" y="60%"  size="420px" color="radial-gradient(circle, rgba(6,182,212,0.15)  0%, transparent 70%)"  speed={0.28} floatRange={40} floatDuration={15} />
          <ParallaxOrb x="40%" y="30%"  size="300px" color="radial-gradient(circle, rgba(244,63,94,0.10)  0%, transparent 70%)"  speed={0.12} floatRange={35} floatDuration={20} />
          <ParallaxOrb x="80%" y="5%"   size="240px" color="radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)"  speed={0.35} floatRange={45} floatDuration={12} />
        </div>

        <Navbar />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <Hero />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          <Stats />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <Features />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <CTA />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Footer />
        </motion.div>
      </motion.div>
    </>
  )
}