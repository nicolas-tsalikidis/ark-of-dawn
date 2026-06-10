import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import styles from './PaymentPage.module.css'

const steps = [
  'Connecting to payment terminal...',
  'Verifying identity...',
  'Processing payment...',
  'Confirming reservation...',
]

const PaymentPage = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) return prev + 1
        clearInterval(interval)
        return prev
      })
    }, 1100)

    const timer = setTimeout(() => navigate('/success'), 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [navigate])

  return (
    <main className={styles.payment}>
      <h1 className={styles.payment__title}>Processing payment...</h1>
      <div className={styles.payment__spinner} />
      <div className={styles.payment__steps}>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentStep}
            className={styles.payment__step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {steps[currentStep]}
          </motion.p>
        </AnimatePresence>
      </div>
    </main>
  )
}

export default PaymentPage