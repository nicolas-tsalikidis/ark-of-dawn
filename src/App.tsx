import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { ReservationProvider } from './context/ReservationContext'
import KioskLayout from './layouts/KioskLayout'
import WelcomePage from './pages/WelcomePage'
import FlightsPage from './pages/FlightsPage'
import SeatSelectionPage from './pages/SeatSelectionPage'
import ConfirmationPage from './pages/ConfirmationPage'
import PaymentPage from './pages/PaymentPage'
import SuccessPage from './pages/SuccessPage'
import PageTransition from './components/PageTransition'

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><WelcomePage /></PageTransition>} />
        <Route path="/flights" element={<PageTransition><FlightsPage /></PageTransition>} />
        <Route path="/flights/:flightId/seats" element={<PageTransition><SeatSelectionPage /></PageTransition>} />
        <Route path="/confirmation" element={<PageTransition><ConfirmationPage /></PageTransition>} />
        <Route path="/payment" element={<PageTransition><PaymentPage /></PageTransition>} />
        <Route path="/success" element={<PageTransition><SuccessPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ReservationProvider>
        <KioskLayout>
          <AnimatedRoutes />
        </KioskLayout>
      </ReservationProvider>
    </BrowserRouter>
  )
}

export default App