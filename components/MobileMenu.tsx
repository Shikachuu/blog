"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { NavButton } from "./NavButton"
import { ThemeToggle } from "./ThemeToggle"

type MobileMenuProps = {
  isOpen: boolean
  currentPath: string
  onClose: () => void
  testId?: string
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  currentPath,
  onClose,
  testId = "mobile-menu",
}) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const firstItemRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (isOpen && firstItemRef.current) {
      // Focus first menu item after animation
      setTimeout(() => {
        firstItemRef.current?.focus()
      }, 150)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        const focusableElements = menuRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) as NodeListOf<HTMLElement>

        if (!focusableElements || focusableElements.length === 0) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  return (
    <div
      ref={menuRef}
      id="mobile-menu"
      className={`mobile-menu overflow-hidden transition-all duration-300 ease-in-out border-black dark:border-white sm:hidden ${
        isOpen ? "max-h-96 opacity-100 border-t-4" : "max-h-0 opacity-0 border-t-0"
      }`}
      role="menu"
      aria-label="Mobile navigation menu"
      aria-hidden={!isOpen}
      hidden={!isOpen}
      data-testid={testId}
    >
      <div
        className={`mobile-menu-content px-6 py-4 space-y-4 transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-2"
        }`}
      >
        <NavButton
          ref={firstItemRef}
          href="/"
          variant="primary"
          className="w-full justify-center"
          role="menuitem"
          aria-current={currentPath === "/" ? "page" : undefined}
          testId="mobile-home-link"
          onClick={onClose}
        >
          Home
        </NavButton>

        <NavButton
          href="/blog"
          variant="secondary"
          className="w-full justify-center"
          role="menuitem"
          aria-current={currentPath.startsWith("/blog") ? "page" : undefined}
          testId="mobile-blog-link"
          onClick={onClose}
        >
          Blog
        </NavButton>

        <div className="flex justify-center">
          <ThemeToggle className="w-full max-w-[200px]" testId="mobile-theme-toggle" />
        </div>
      </div>
    </div>
  )
}
