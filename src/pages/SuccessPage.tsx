import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { QRCodeSVG } from 'qrcode.react'
import { useReservation } from '../context/ReservationContext'
import styles from './SuccessPage.module.css'

const SuccessPage = () => {
  const navigate = useNavigate()
  const { resetReservation, selectedFlight, selectedSeat } = useReservation()

  const qrData = JSON.stringify({
    flight: selectedFlight?.title,
    destination: selectedFlight?.destination,
    date: selectedFlight?.date,
    time: selectedFlight?.time,
    seat: selectedSeat?.id,
    price: selectedSeat?.price,
  })

  const handleNewReservation = () => {
    resetReservation()
    navigate('/')
  }

  return (
    <main className={styles.success}>
      <h1 className={styles.success__title}>Reservation confirmed!</h1>
      <p className={styles.success__subtitle}>
        Your seat aboard the Ark of Dawn has been successfully reserved.
      </p>
      <QRCodeSVG
        value={qrData}
        size={280}
        bgColor="transparent"
        fgColor="#ffffff"
      />
      <motion.button
        className={styles.success__btn}
        onClick={handleNewReservation}
        whileTap={{ scale: 0.95 }}
      >
        New reservation
      </motion.button>
    </main>
  )
}

export default SuccessPage