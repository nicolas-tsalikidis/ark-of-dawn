import type { Seat } from '../types'
import styles from './SeatButton.module.css'

type SeatButtonProps = {
  seat: Seat
  isSelected: boolean
  onSelect: (seat: Seat) => void
}

const SeatButton = ({ seat, isSelected, onSelect }: SeatButtonProps) => {
  const getClass = () => {
    if (isSelected) return `${styles.seat} ${styles['seat--selected']}`
    if (seat.status === 'reserved') return `${styles.seat} ${styles['seat--reserved']}`
    if (seat.status === 'unavailable') return `${styles.seat} ${styles['seat--unavailable']}`
    return `${styles.seat} ${styles['seat--available']}`
  }

  return (
    <button
      className={getClass()}
      onClick={() => onSelect(seat)}
      disabled={seat.status !== 'available'}
    >
      {seat.id}
    </button>
  )
}

export default SeatButton