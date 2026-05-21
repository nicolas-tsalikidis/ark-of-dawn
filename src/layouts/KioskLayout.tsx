import { useLocation, useNavigate } from 'react-router-dom'
import styles from './KioskLayout.module.css'

type KioskLayoutProps = {
  children: React.ReactNode
}

const steps = ['/flights', '/flights/:flightId/seats', '/confirmation', '/success']

const KioskLayout = ({ children }: KioskLayoutProps) => {
  const location = useLocation()
  const navigate = useNavigate()

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
              <>
                {index > 0 && <span key={`line-${index}`} className={styles['kiosk__step-line']} />}
                <span
                  key={`step-${index}`}
                  className={
                    index === currentStep
                      ? `${styles.kiosk__step} ${styles['kiosk__step--active']}`
                      : styles.kiosk__step
                  }
                />
              </>
            ))}
          </nav>
        </header>
      )}
      {children}
    </div>
  )
}

export default KioskLayout