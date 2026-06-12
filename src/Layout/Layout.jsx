import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import styles from './Layout.module.css'
import Navbar from './Navbar/Navbar'

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
      style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.3 } }}
    />
  )
}

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
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
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

function ParallaxOrb({ x, y, size, color, speed = 0.3, floatRange = 40, floatDuration = 14 }) {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 3000], [0, -3000 * speed])
  const springParallaxY = useSpring(parallaxY, { stiffness: 60, damping: 25 })

  return (
    <motion.div
      ref={ref}
      className={styles.orb}
      style={{ left: x, top: y, width: size, height: size, background: color, y: springParallaxY }}
      animate={{
        x: [0, floatRange, -floatRange * 0.6, 0],
        y: [0, -floatRange * 0.7, floatRange * 0.5, 0],
        scale: [1, 1.08, 0.96, 1],
      }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export default function Layout({ children }) {
  const cursorGlow = useCursorGlow()

  return (
    <>
      <CursorGlow {...cursorGlow} />
      <AnimatedBackground />

      <div className={styles.orbContainer} aria-hidden="true">
        <ParallaxOrb x="5%"  y="10%"  size="520px" color="radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)"  speed={0.18} floatRange={50} floatDuration={18} />
        <ParallaxOrb x="65%" y="60%"  size="420px" color="radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)"   speed={0.28} floatRange={40} floatDuration={15} />
        <ParallaxOrb x="40%" y="30%"  size="300px" color="radial-gradient(circle, rgba(244,63,94,0.10) 0%, transparent 70%)"   speed={0.12} floatRange={35} floatDuration={20} />
        <ParallaxOrb x="80%" y="5%"   size="240px" color="radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)"  speed={0.35} floatRange={45} floatDuration={12} />
      </div>

      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </>
  )
}