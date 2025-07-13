"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ChevronUpIcon } from "./icons/ChevronUpIcon"
import { NavButton } from "./NavButton"

type ScrollToTopButtonProps = {
  className?: string
  testId?: string
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  className = "",
  testId = "scroll-to-top",
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const threshold = 300

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold)
    }

    const throttledScroll = () => {
      requestAnimationFrame(handleScroll)
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", throttledScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      scrollToTop()
    }
  }

  return (
    <NavButton
      size="sm"
      className={`scroll-up-button transition-all duration-300 ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      } ${className}`}
      aria-label="Scroll to top of page"
      title="Scroll to top of page"
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      testId={testId}
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
    >
      <ChevronUpIcon size={16} />
    </NavButton>
  )
}
