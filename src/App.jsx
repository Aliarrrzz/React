import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './Layout/Layout'
import Home  from './pages/Home/Home'
import Login from './pages/Login/Login'

const pageVariants = {
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0, y: -18, filter: 'blur(4px)',
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
  },
}

export function navigate(to) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key={path}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {path === '/login' ? <Login /> : <Home />}
        </motion.div>
      </AnimatePresence>
    </Layout>
  )
}