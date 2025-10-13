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
          className="fixed inset-0 h-full w-full backdrop-blur-xl z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="p-4 max-w-md w-[95vw] mx-auto mt-32 bg-white/60 rounded-[22px] shadow-lg relative flex flex-col"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
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
