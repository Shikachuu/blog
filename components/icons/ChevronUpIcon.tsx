import type React from "react"

type ChevronUpIconProps = {
  className?: string
  size?: number
}

export const ChevronUpIcon: React.FC<ChevronUpIconProps> = ({ className = "", size = 16 }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
    </svg>
  )
}
