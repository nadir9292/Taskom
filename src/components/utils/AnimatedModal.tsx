import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

type AnimatedModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const AnimatedModal = ({ isOpen, onClose, children }: AnimatedModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 h-full w-full z-50 flex items-start justify-center"
          style={{ backdropFilter: 'blur(12px)', background: 'rgba(5, 5, 26, 0.6)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-strong p-6 max-w-md w-[95vw] mx-auto mt-24 rounded-2xl relative flex flex-col"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AnimatedModal
