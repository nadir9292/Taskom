import { SnackBarStatus } from '@/src/types/SnackBarStatus'
import React from 'react'

type Props = { error: SnackBarStatus; success: SnackBarStatus }

const SnackBar = ({ error, success }: Props) => {
  return success.active || error.active ? (
    <div
      role="alert"
      className={`alert ${
        error.active ? 'alert-error' : 'alert-success'
      } absolute inset-x-0 top-12 w-[90vw] max-w-xl mx-auto`}
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
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{error.message || success.message}</span>
    </div>
  ) : (
    <></>
  )
}

export default SnackBar
