import { useState } from 'react'
import type { Flight } from '../types'
import flightsData from '../data/flights.json'
import FlightCard from '../components/FlightCard'
import styles from './FlightsPage.module.css'


type FilterType = 'all' | 'available' | 'asap'

const FlightsPage = () => {
  const [filter, setFilter] = useState<FilterType>('all')
  const today = new Date()
today.setHours(0, 0, 0, 0)
const flights = (flightsData.flights as Flight[]).filter(
  flight => new Date(flight.date) >= today
)

  const filteredFlights = flights.filter(flight => {
    const available = flight.seats.filter(s => s.status === 'available').length
    if (filter === 'available' || filter === 'asap') return available > 0
    return true
  })

  return (
    <main className={styles.flights}>

      <div className={styles.flights__content}>
        <div className={styles.flights__header}>
          <h1 className={styles.flights__title}>Choose your departure</h1>
          <p className={styles.flights__subtitle}>
            Select an available evacuation route aboard the Ark of Dawn.
          </p>
        </div>

        <div className={styles.flights__filter}>
          <span>Filter:</span>
          {(['all', 'available', 'asap'] as FilterType[]).map((f) => (
            <label key={f} className={styles['flights__filter-label']}>
              <input
                type="radio"
                name="filter"
                value={f}
                checked={filter === f}
                onChange={() => setFilter(f)}
              />
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </label>
          ))}
        </div>

        <ul className={styles.flights__list}>
          {filteredFlights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </ul>
      </div>
    </main>
  )
}

export default FlightsPage