import { motion } from 'motion/react'

type PageTransitionProps = {
  children: React.ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition