import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReservationProvider } from './context/ReservationContext'
import KioskLayout from './layouts/KioskLayout'
import WelcomePage from './pages/WelcomePage'
import FlightsPage from './pages/FlightsPage'
import SeatSelectionPage from './pages/SeatSelectionPage'
import ConfirmationPage from './pages/ConfirmationPage'
import PaymentPage from './pages/PaymentPage'
import SuccessPage from './pages/SuccessPage'

function App() {
  return (
    <BrowserRouter>
      <ReservationProvider>
        <KioskLayout>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/flights" element={<FlightsPage />} />
            <Route path="/flights/:flightId/seats" element={<SeatSelectionPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </KioskLayout>
      </ReservationProvider>
    </BrowserRouter>
  )
}

export default App