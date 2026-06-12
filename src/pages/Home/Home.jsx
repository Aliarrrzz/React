import styles from './Home.module.css'
import Hero     from '../../components/Home/Hero/Hero'
import Stats    from '../../components/Home/Stats/Stats'
import Features from '../../components/Home/Features/Features'
import CTA      from '../../components/Home/CTA/CTA'
import Footer   from '../../components/Home/Footer/Footer'

export default function Home() {
  return (
    <div className={styles.homeWrapper}>
      <Hero />
      <Stats />
      <Features />
      <CTA />
      <Footer />
    </div>
  )
}