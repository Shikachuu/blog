import type React from "react"

type CloseIconProps = {
  className?: string
  size?: number
}

export const CloseIcon: React.FC<CloseIconProps> = ({ className = "", size = 20 }) => {
  return (
    <svg
      className={`transition-all duration-300 ease-in-out ${className}`}
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
