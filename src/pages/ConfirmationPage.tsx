import { useNavigate } from 'react-router-dom'
import { useReservation } from '../context/ReservationContext'
import styles from './ConfirmationPage.module.css'
import { motion } from 'motion/react'

const ConfirmationPage = () => {
  const navigate = useNavigate()
  const { selectedFlight, selectedSeat } = useReservation()

  if (!selectedFlight || !selectedSeat) {
    return <p>No reservation found</p>
  }

  return (
    <main className={styles.confirmation}>
      <div className={styles.confirmation__header}>
        <h1 className={styles.confirmation__title}>Confirm your reservation</h1>
        <p className={styles.confirmation__subtitle}>
          Please review your selected departure and seat.
        </p>
      </div>

      <div className={styles.confirmation__card}>
        <div>
          <p className={styles['confirmation__section-title']}>Departure</p>
          <p className={styles.confirmation__text}>
            {selectedFlight.title} · {selectedFlight.date} · {selectedFlight.time}
          </p>
        </div>

        <div>
          <p className={styles['confirmation__section-title']}>Selected Seat</p>
          <div className={styles.confirmation__seat}>
            {selectedSeat.id}
          </div>
        </div>

        <div>
          <p className={styles['confirmation__section-title']}>Price</p>
          <p className={styles.confirmation__text}>
            € {selectedSeat.price.toFixed(2)}
          </p>
        </div>

        <motion.button
          className={styles.confirmation__btn}
          onClick={() => navigate('/payment')}
          whileTap={{ scale: 0.95 }}
        >
          Confirm reservation
        </motion.button>
      </div>
    </main>
  )
}

export default ConfirmationPage