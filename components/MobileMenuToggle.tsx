import type React from "react"
import { CloseIcon } from "./icons/CloseIcon"
import { HamburgerIcon } from "./icons/HamburgerIcon"
import { NavButton } from "./NavButton"

type MobileMenuToggleProps = {
  isOpen: boolean
  onToggle: () => void
  className?: string
  testId?: string
}

export const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({
  isOpen,
  onToggle,
  className = "",
  testId = "mobile-menu-toggle",
}) => {
  return (
    <NavButton
      variant="accent"
      className={`mobile-menu-button ${className}`}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-haspopup="menu"
      testId={testId}
      onClick={onToggle}
    >
      <span className="sr-only">Toggle navigation menu</span>
      <div className="menu-icon-container relative w-5 h-5 overflow-hidden" aria-hidden="true">
        <HamburgerIcon
          className={`hamburger-icon absolute inset-0 transform transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-180 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
          size={20}
        />
        <CloseIcon
          className={`close-icon absolute inset-0 transform transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-0 scale-100 opacity-100" : "rotate-180 scale-0 opacity-0"
          }`}
          size={20}
        />
      </div>
    </NavButton>
  )
}
