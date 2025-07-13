"use client"

import { usePathname } from "next/navigation"
import type React from "react"
import { useEffect, useState } from "react"
import { getPersonalInfo } from "@/lib/personal-config"
import { MobileMenu } from "./MobileMenu"
import { MobileMenuToggle } from "./MobileMenuToggle"
import { NavButton } from "./NavButton"
import { ScrollToTopButton } from "./ScrollToTopButton"
import { ThemeToggle } from "./ThemeToggle"

export const Navigation: React.FC = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const personalInfo = getPersonalInfo()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const throttledScroll = () => {
      requestAnimationFrame(handleScroll)
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })
    return () => window.removeEventListener("scroll", throttledScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      const nav = document.getElementById("main-nav")
      if (nav && !nav.contains(e.target as Node) && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isMenuOpen])

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Calculate shadow opacity based on scroll
  const shadowOpacity = Math.max(0, 1 - scrollY / 200)
  const shadowOffset = Math.max(0, 6 * shadowOpacity)

  return (
    <nav
      className="navbar-container fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4"
      id="main-nav"
      aria-label="Main navigation"
      data-testid="main-navigation"
    >
      <div
        className="navbar-card bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-4 border-black dark:border-white transition-all duration-300 ease-out"
        style={{
          boxShadow: `${shadowOffset}px ${shadowOffset}px 0px 0px rgba(0, 0, 0, ${shadowOpacity})`,
        }}
      >
        {/* Main Navigation Bar */}
        <div className="flex justify-between items-center px-6 py-4">
          {/* Logo/Brand with Scroll Button */}
          <div className="flex items-center space-x-3">
            <a
              href="/"
              className="text-xl font-black text-primary hover:text-primary-dark transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 rounded-sm min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={`${personalInfo.name} - Go to homepage`}
              data-testid="logo-link"
            >
              {personalInfo.name}
            </a>

            <ScrollToTopButton />
          </div>

          {/* Desktop Navigation */}
          <div
            className="hidden sm:flex items-center space-x-4"
            role="menubar"
            aria-label="Desktop navigation"
          >
            <NavButton
              href="/"
              variant="primary"
              role="menuitem"
              aria-current={pathname === "/" ? "page" : undefined}
              testId="desktop-home-link"
            >
              Home
            </NavButton>

            <NavButton
              href="/blog"
              variant="secondary"
              role="menuitem"
              aria-current={pathname.startsWith("/blog") ? "page" : undefined}
              testId="desktop-blog-link"
            >
              Blog
            </NavButton>

            <ThemeToggle testId="desktop-theme-toggle" />
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <MobileMenuToggle isOpen={isMenuOpen} onToggle={toggleMobileMenu} />
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMenuOpen}
          currentPath={pathname}
          onClose={() => setIsMenuOpen(false)}
        />
      </div>
    </nav>
  )
}
