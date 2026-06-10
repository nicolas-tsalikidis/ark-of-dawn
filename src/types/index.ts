export type SeatStatus = 'available' | 'reserved' | 'unavailable'

export type Seat = {
  id: string
  deck: string
  status: SeatStatus
  price: number
}

export type Flight = {
  id: number
  title: string
  destination: string
  date: string
  time: string
  totalSeats: number
  image: string
  seats: Seat[]
}