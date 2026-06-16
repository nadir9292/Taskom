import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

type ModalVariant = 'create' | 'edit' | 'delete' | 'neutral'

type AnimatedModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  variant?: ModalVariant
}

const accentClass: Record<ModalVariant, string> = {
  create: 'modal-accent-create',
  edit: 'modal-accent-edit',
  delete: 'modal-accent-delete',
  neutral: '',
}

const AnimatedModal = ({ isOpen, onClose, children, variant = 'neutral' }: AnimatedModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 h-full w-full z-50 flex items-end sm:items-start justify-center"
          style={{
            backdropFilter: 'blur(16px)',
            background: 'rgba(4, 4, 20, 0.65)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          onClick={onClose}
        >
          <motion.div
            className={`glass-strong ${accentClass[variant]} p-6 w-full sm:max-w-md sm:w-[95vw] sm:mx-auto sm:mt-20 sm:rounded-2xl rounded-t-2xl relative flex flex-col max-h-[92vh] overflow-y-auto`}
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28, mass: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-4 sm:hidden" />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AnimatedModal
