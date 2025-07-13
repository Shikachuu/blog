import type React from "react"

type HamburgerIconProps = {
  className?: string
  size?: number
}

export const HamburgerIcon: React.FC<HamburgerIconProps> = ({ className = "", size = 20 }) => {
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  )
}
