import { motion } from 'motion/react'
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
    <motion.button
      className={getClass()}
      onClick={() => onSelect(seat)}
      disabled={seat.status !== 'available'}
      whileTap={seat.status === 'available' ? { scale: 0.88 } : {}}
      animate={isSelected ? { scale: [1, 1.12, 1] } : { scale: 1 }}
      transition={{ duration: 0.25 }}
    >
      {seat.id}
    </motion.button>
  )
}

export default SeatButton