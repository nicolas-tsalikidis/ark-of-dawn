import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PaymentPage.module.css'

const PaymentPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/success')
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <main className={styles.payment}>
      <h1 className={styles.payment__title}>Processing payment...</h1>
      <p className={styles.payment__subtitle}>
        Please wait while we confirm your reservation.
      </p>
      <div className={styles.payment__spinner} />
    </main>
  )
}

export default PaymentPage