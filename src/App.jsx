import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Layout  from './Layout/Layout'
import Home    from './pages/Home/Home'
import Login   from './pages/Login/Login'
import Signup  from './pages/Signup/Signup'

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0, y: -8, filter: 'blur(3px)',
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  },
}

export function navigate(to) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function CurrentPage({ path }) {
  if (path === '/login')  return <Login />
  if (path === '/signup') return <Signup />
  return <Home />
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
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={path}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ width: '100%' }}
        >
          <CurrentPage path={path} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  )
}