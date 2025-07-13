import type React from "react"

type MoonIconProps = {
  className?: string
  size?: number
}

export const MoonIcon: React.FC<MoonIconProps> = ({ className = "", size = 20 }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  )
}
