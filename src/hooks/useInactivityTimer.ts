import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const TIMEOUT_MS = 30000

const useInactivityTimer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (location.pathname === '/') return

    const reset = () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        navigate('/')
      }, TIMEOUT_MS)
    }

    const events = ['touchstart', 'mousemove', 'mousedown', 'keydown']
    events.forEach(e => window.addEventListener(e, reset))
    reset()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      events.forEach(e => window.removeEventListener(e, reset))
    }
  }, [location.pathname, navigate])
}

export default useInactivityTimer