import { SnackBarStatus } from '@/src/types/SnackBarStatus'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

type Props = { error: SnackBarStatus; success: SnackBarStatus }

const SnackBar = ({ error, success }: Props) => {
  const isActive = error.active || success.active
  const message = error.message || success.message
  const isError = error.active

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="snackbar"
          role="alert"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-16 inset-x-0 mx-auto w-fit max-w-sm z-[999] px-4 py-2.5 rounded-xl flex items-center gap-2.5 text-sm"
          style={{
            background: isError
              ? 'rgba(239, 68, 68, 0.15)'
              : 'rgba(34, 197, 94, 0.12)',
            border: `1px solid ${isError ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.25)'}`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            color: isError ? '#fca5a5' : '#86efac',
            boxShadow: `0 8px 32px ${isError ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.12)'}`,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isError
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
