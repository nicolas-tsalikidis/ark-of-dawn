import { useNavigate } from 'react-router-dom'
import type { Flight } from '../types'
import { useReservation } from '../context/ReservationContext'
import styles from './FlightCard.module.css'

type FlightCardProps = {
  flight: Flight
}

const FlightCard = ({ flight }: FlightCardProps) => {
  const navigate = useNavigate()
  const { setSelectedFlight, setSelectedSeat } = useReservation()

  const availableSeats = flight.seats.filter(s => s.status === 'available').length

  const handleChooseSeats = () => {
    setSelectedFlight(flight)
    setSelectedSeat(null)
    navigate(`/flights/${flight.id}/seats`)
  }

  const getSeatClass = () => {
    if (availableSeats === 0) return styles['flightcard__seats--none']
    if (availableSeats <= flight.totalSeats * 0.3) return styles['flightcard__seats--low']
    return styles['flightcard__seats--high']
  }

  return (
    <li className={styles.flightcard}>
      <h2 className={styles.flightcard__title}>
        {flight.title} - Earth → {flight.destination}
      </h2>
      <p className={styles.flightcard__date}>
        Departure · {flight.date} · {flight.time}
      </p>
      <p className={`${styles.flightcard__seats} ${getSeatClass()}`}>
        {availableSeats} / {flight.totalSeats} seats available
      </p>
      <button className={styles.flightcard__btn} onClick={handleChooseSeats}>
        Choose seats
      </button>
    </li>
  )
}

export default FlightCard