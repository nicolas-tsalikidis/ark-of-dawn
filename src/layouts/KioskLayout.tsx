import { useLocation, useNavigate } from 'react-router-dom'
import { Fragment } from 'react'
import styles from './KioskLayout.module.css'
import useInactivityTimer from '../hooks/useInactivityTimer'

type KioskLayoutProps = {
  children: React.ReactNode
}

const steps = ['/flights', '/flights/:flightId/seats', '/confirmation', '/success']

const KioskLayout = ({ children }: KioskLayoutProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  useInactivityTimer()

  const showHeader = location.pathname !== '/'
  const currentStep = steps.findIndex((_, i) => {
    if (i === 1) return location.pathname.includes('/seats')
    return steps[i] === location.pathname
  })

  return (
    <div className={styles.kiosk}>
      {showHeader && (
        <header className={styles.kiosk__header}>
          <button className={styles.kiosk__back} onClick={() => navigate(-1)}>
            ← Back
          </button>
          <nav className={styles.kiosk__nav}>
            {steps.map((_, index) => (
              <Fragment key={index}>
                {index > 0 && <span className={styles['kiosk__step-line']} />}
                <span
                  className={
                    index === currentStep
                      ? `${styles.kiosk__step} ${styles['kiosk__step--active']}`
                      : styles.kiosk__step
                  }
                />
              </Fragment>
            ))}
          </nav>
        </header>
      )}
      {children}
    </div>
  )
}

export default KioskLayout