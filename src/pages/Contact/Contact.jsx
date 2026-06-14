import styles from './Contact.module.css'
import ContactHero      from '../../components/Contact/Hero/ContactHero'
import ContactInfoCards from '../../components/Contact/InfoCards/ContactInfoCards'
import ContactForm      from '../../components/Contact/Form/ContactForm'
import Footer           from '../../Layout/Footer/Footer'

export default function Contact() {
  return (
    <div className={styles.contactWrapper}>
      <ContactHero />

      <section className={styles.contactSection}>
        <ContactInfoCards />
        <ContactForm />
      </section>

      <Footer />
    </div>
  )
}