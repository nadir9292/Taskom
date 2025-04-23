import { SnackBarStatus } from '@/src/types/SnackBarStatus'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

type Props = { error: SnackBarStatus; success: SnackBarStatus }

const SnackBar = ({ error, success }: Props) => {
  const isActive = error.active || success.active
  const message = error.message || success.message
  const type = error.active ? 'error' : 'success'

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="snackbar"
          role="alert"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`alert ${
            type === 'error' ? 'alert-error' : 'alert-success'
          } fixed top-12 inset-x-0 mx-auto w-[90vw] max-w-xl z-[999] shadow-lg`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                type === 'error'
                  ? 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                  : 'M5 13l4 4L19 7'
              }
            />
          </svg>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SnackBar
