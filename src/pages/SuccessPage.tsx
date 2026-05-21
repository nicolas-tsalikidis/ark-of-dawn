import { useNavigate } from 'react-router-dom'
import { useReservation } from '../context/ReservationContext'
import styles from './SuccessPage.module.css'
import qr from '../assets/QR.png'

const SuccessPage = () => {
  const navigate = useNavigate()
  const { resetReservation } = useReservation()

  const handleNewReservation = () => {
    resetReservation()
    navigate('/flights')
  }

  return (
    <main className={styles.success}>
      <h1 className={styles.success__title}>Reservation confirmed!</h1>
      <p className={styles.success__subtitle}>
        Your seat aboard the Ark of Dawn has been successfully reserved.
      </p>
      <img src={qr} alt="QR code" className={styles.success__qr} />
      <button className={styles.success__btn} onClick={handleNewReservation}>
        New reservation
      </button>
    </main>
  )
}

export default SuccessPage