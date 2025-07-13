"use client"

import type React from "react"
import { MoonIcon } from "./icons/MoonIcon"
import { SunIcon } from "./icons/SunIcon"
import { NavButton } from "./NavButton"
import { useTheme } from "./ThemeProvider"

type ThemeToggleProps = {
  className?: string
  tabIndex?: number
  testId?: string
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  tabIndex,
  testId = "theme-toggle",
}) => {
  const { theme, toggleTheme } = useTheme()

  const handleToggle = () => {
    toggleTheme()

    // Announce change to screen readers
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", "polite")
    announcement.setAttribute("aria-atomic", "true")
    announcement.className = "sr-only"
    announcement.textContent = `Switched to ${theme === "light" ? "dark" : "light"} theme`

    document.body.appendChild(announcement)

    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement)
      }
    }, 1000)
  }

  return (
    <NavButton
      variant="orange"
      className={`justify-center ${className}`}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      tabIndex={tabIndex}
      role="switch"
      aria-checked={theme === "dark"}
      testId={testId}
      onClick={handleToggle}
    >
      <SunIcon className="dark:hidden flex-shrink-0" size={20} />
      <MoonIcon className="hidden dark:block flex-shrink-0" size={20} />
      <span className="sr-only">{theme === "dark" ? "Dark mode active" : "Light mode active"}</span>
    </NavButton>
  )
}
