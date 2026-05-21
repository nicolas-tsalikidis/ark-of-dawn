import { useNavigate } from 'react-router-dom'
import styles from './WelcomePage.module.css'

const WelcomePage = () => {
  const navigate = useNavigate()

  return (
    <main className={styles.welcome}>
      <h1 className={styles.welcome__title}>Ark of Dawn</h1>
      <p className={styles.welcome__subtitle}>Reserve your Earth evacuation seat</p>
      <p className={styles.welcome__description}>
        Secure your place aboard the Ark of Dawn in a few simple steps.
      </p>
      <button
        className={styles.welcome__btn}
        onClick={() => navigate('/flights')}
      >
        Start reservation
      </button>
    </main>
  )
}

export default WelcomePage