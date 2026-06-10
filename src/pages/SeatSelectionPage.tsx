import { useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Seat } from '../types'
import flightsData from '../data/flights.json'
import { useReservation } from '../context/ReservationContext'
import SeatButton from '../components/SeatButton'
import styles from './SeatSelectionPage.module.css'

type SeatState = {
  selectedSeat: Seat | null
}

type SeatAction =
  | { type: 'SELECT_SEAT'; payload: Seat }
  | { type: 'CLEAR_SEAT' }

const seatReducer = (state: SeatState, action: SeatAction): SeatState => {
  switch (action.type) {
    case 'SELECT_SEAT':
      return { ...state, selectedSeat: action.payload }
    case 'CLEAR_SEAT':
      return { ...state, selectedSeat: null }
    default:
      return state
  }
}

const SeatSelectionPage = () => {
  const navigate = useNavigate()
  const { flightId } = useParams()
  const { setSelectedSeat } = useReservation()

  const [state, dispatch] = useReducer(seatReducer, { selectedSeat: null })

  const flight = flightsData.flights.find(f => f.id === Number(flightId))
  if (!flight) return <p>Flight not found</p>

  const deckA = (flight.seats as Seat[]).filter(s => s.deck === 'A')
  const deckB = (flight.seats as Seat[]).filter(s => s.deck === 'B')
  
  const handleSelectSeat = (seat: Seat) => {
    dispatch({ type: 'SELECT_SEAT', payload: seat })
  }

  const handleContinue = () => {
    if (state.selectedSeat) {
      setSelectedSeat(state.selectedSeat)
      navigate('/confirmation')
    }
  }

  const renderDeck = (seats: Seat[]) => (
    <div className={styles.seats__grid}>
      {seats.map(seat => (
        <SeatButton
          key={seat.id}
          seat={seat}
          isSelected={state.selectedSeat?.id === seat.id}
          onSelect={handleSelectSeat}
        />
      ))}
    </div>
  )

  return (
    <main className={styles.seats}>
      <div className={styles.seats__header}>
        <h1 className={styles.seats__title}>Choose your seat</h1>
        <p className={styles.seats__subtitle}>
          {flight.title} · Earth → {flight.destination} · {flight.date} · {flight.time}
        </p>
      </div>

      <div className={styles.seats__decks}>
        <div className={styles.seats__deck}>
          <h2 className={styles['seats__deck-title']}>Deck A</h2>
          {renderDeck(deckA)}
        </div>
        <div className={styles.seats__deck}>
          <h2 className={styles['seats__deck-title']}>Deck B</h2>
          {renderDeck(deckB)}
        </div>
      </div>

      <div className={styles.seats__info}>
        <p className={styles['seats__info-label']}>Selected Seat</p>

        <div className={styles.seats__legend}>
          <div className={styles['seats__legend-item']}>
            <span className={`${styles['seats__legend-dot']} ${styles['seats__legend-dot--available']}`} />
            Available
          </div>
          <div className={styles['seats__legend-item']}>
            <span className={`${styles['seats__legend-dot']} ${styles['seats__legend-dot--reserved']}`} />
            Reserved
          </div>
        </div>

        {state.selectedSeat ? (
          <>
            <div className={styles['seats__info-seat']}>{state.selectedSeat.id}</div>
            <p className={styles['seats__info-status']}>
              <strong>Status</strong><br />
              🟢 Available
            </p>
            <p className={styles['seats__info-price']}>
              <strong>Price</strong><br />
              € {state.selectedSeat.price.toFixed(2)}
            </p>
          </>
        ) : (
          <p>Select a seat</p>
        )}

        <button
          className={styles.seats__continue}
          onClick={handleContinue}
          disabled={!state.selectedSeat}
        >
          Continue
        </button>
      </div>
    </main>
  )
}

export default SeatSelectionPage