import { createContext, useContext, useState } from 'react'
import type { Flight, Seat } from '../types'

type ReservationContextType = {
  selectedFlight: Flight | null
  selectedSeat: Seat | null
  setSelectedFlight: (flight: Flight) => void
  setSelectedSeat: (seat: Seat | null) => void
  resetReservation: () => void
}

const ReservationContext = createContext<ReservationContextType | null>(null)

export const ReservationProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null)

  const resetReservation = () => {
    setSelectedFlight(null)
    setSelectedSeat(null)
  }

  return (
    <ReservationContext.Provider value={{
      selectedFlight,
      selectedSeat,
      setSelectedFlight,
      setSelectedSeat,
      resetReservation
    }}>
      {children}
    </ReservationContext.Provider>
  )
}

export const useReservation = () => {
  const context = useContext(ReservationContext)
  if (!context) throw new Error('useReservation must be used within ReservationProvider')
  return context
}