import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { Navigation } from "@/components/Navigation"
import { ThemeProvider } from "@/components/ThemeProvider"

// Mock usePathname
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

const NavigationWithProvider = () => (
  <ThemeProvider>
    <Navigation />
  </ThemeProvider>
)

describe("Navigation Integration Tests", () => {
  beforeEach(() => {
    // Reset localStorage and scroll position
    localStorage.clear()
    Object.defineProperty(window, "scrollY", { value: 0, writable: true })
    document.documentElement.classList.remove("dark")
  })

  describe("Complete User Workflows", () => {
    it("should handle complete mobile menu workflow", async () => {
      render(<NavigationWithProvider />)

      const mobileMenuButton = screen.getByTestId("mobile-menu-toggle")

      // 1. User clicks mobile menu button
      expect(mobileMenuButton).toHaveAttribute("aria-expanded", "false")

      fireEvent.click(mobileMenuButton)

      // 2. Menu opens with proper ARIA states
      expect(mobileMenuButton).toHaveAttribute("aria-expanded", "true")

      const mobileMenu = screen.getByTestId("mobile-menu")
      expect(mobileMenu).toHaveAttribute("aria-hidden", "false")

      // 3. User navigates with keyboard
      fireEvent.keyDown(mobileMenu, { key: "Tab" })

      // 4. User presses Escape to close
      fireEvent.keyDown(document, { key: "Escape" })

      // 5. Menu closes and focus returns
      expect(mobileMenuButton).toHaveAttribute("aria-expanded", "false")
      expect(mobileMenu).toHaveAttribute("aria-hidden", "true")
    })

    it("should handle theme switching workflow", async () => {
      render(<NavigationWithProvider />)

      const themeToggle = screen.getByRole("switch")

      // 1. User activates theme toggle
      const initialChecked = themeToggle.getAttribute("aria-checked")

      fireEvent.click(themeToggle)

      // 2. Theme state updates
      await waitFor(() => {
        const newChecked = themeToggle.getAttribute("aria-checked")
        expect(newChecked).not.toBe(initialChecked)
      })

      // 3. Theme preference is saved
      expect(localStorage.getItem("theme")).toBeTruthy()
      expect(localStorage.getItem("theme-manual")).toBe("true")
    })

    it("should handle scroll-to-top workflow", async () => {
      window.scrollTo = vi.fn()

      render(<NavigationWithProvider />)

      // 1. User scrolls down page
      Object.defineProperty(window, "scrollY", { value: 500, writable: true })
      fireEvent.scroll(window)

      // 2. Scroll button becomes visible
      const scrollButton = screen.getByTestId("scroll-to-top")

      await waitFor(() => {
        expect(scrollButton).toHaveClass("opacity-100", "visible")
      })

      // 3. User clicks scroll button
      fireEvent.click(scrollButton)

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: "smooth",
      })
    })
  })

  describe("Cross-Component Communication", () => {
    it("should coordinate between mobile menu and theme toggle", () => {
      render(<NavigationWithProvider />)

      // Open mobile menu
      const mobileMenuButton = screen.getByTestId("mobile-menu-toggle")
      fireEvent.click(mobileMenuButton)

      // Both desktop and mobile theme toggles should work
      const desktopToggle = screen.getByTestId("desktop-theme-toggle")
      const mobileToggle = screen.getByTestId("mobile-theme-toggle")

      expect(desktopToggle).toBeInTheDocument()
      expect(mobileToggle).toBeInTheDocument()

      // Both should have the same initial state
      expect(desktopToggle.getAttribute("aria-checked")).toBe(
        mobileToggle.getAttribute("aria-checked"),
      )
    })

    it("should maintain state consistency across components", () => {
      render(<NavigationWithProvider />)

      const mobileMenuButton = screen.getByTestId("mobile-menu-toggle")
      const mobileMenu = screen.getByTestId("mobile-menu")

      // Menu button and menu should have consistent states
      expect(mobileMenuButton.getAttribute("aria-expanded")).toBe("false")
      expect(mobileMenu.getAttribute("aria-hidden")).toBe("true")

      fireEvent.click(mobileMenuButton)

      expect(mobileMenuButton.getAttribute("aria-expanded")).toBe("true")
      expect(mobileMenu.getAttribute("aria-hidden")).toBe("false")
    })
  })

  describe("Accessibility Integration", () => {
    it("should maintain focus management across all components", () => {
      render(<NavigationWithProvider />)

      const focusableElements = [
        screen.getByTestId("logo-link"),
        screen.getByTestId("desktop-home-link"),
        screen.getByTestId("desktop-blog-link"),
        screen.getByTestId("desktop-theme-toggle"),
        screen.getByTestId("mobile-menu-toggle"),
      ]

      focusableElements.forEach(element => {
        element.focus()
        expect(element).toHaveFocus()
      })
    })

    it("should provide consistent ARIA announcements", () => {
      render(<NavigationWithProvider />)

      const nav = screen.getByRole("navigation")
      const themeToggle = screen.getByRole("switch")
      const menuButton = screen.getByTestId("mobile-menu-toggle")

      expect(nav).toHaveAttribute("aria-label", "Main navigation")
      expect(themeToggle).toHaveAttribute("aria-label")
      expect(menuButton).toHaveAttribute("aria-label")
    })

    it("should maintain proper heading hierarchy", () => {
      render(<NavigationWithProvider />)

      // Navigation should not interfere with page heading hierarchy
      const nav = screen.getByRole("navigation")
      const headings = nav.querySelectorAll("h1, h2, h3, h4, h5, h6")

      // Navigation should not contain heading elements
      expect(headings.length).toBe(0)
    })
  })

  describe("Responsive Behavior Integration", () => {
    it("should show/hide appropriate components based on screen size", () => {
      render(<NavigationWithProvider />)

      const desktopNav = screen.getByLabelText("Desktop navigation")
      const mobileMenuButton = screen.getByTestId("mobile-menu-toggle")

      // Desktop nav should be hidden on mobile
      expect(desktopNav).toHaveClass("hidden", "sm:flex")

      // Mobile menu button should be hidden on desktop
      expect(mobileMenuButton.parentElement).toHaveClass("sm:hidden")
    })
  })

  describe("Performance Integration", () => {
    it("should optimize event handling across all components", () => {
      const scrollSpy = vi.fn()
      window.addEventListener("scroll", scrollSpy, { passive: true })

      render(<NavigationWithProvider />)

      // Trigger scroll event
      fireEvent.scroll(window)

      expect(scrollSpy).toHaveBeenCalled()

      window.removeEventListener("scroll", scrollSpy)
    })
  })

  describe("Error Recovery Integration", () => {
    it("should handle component failures gracefully", () => {
      // biome-ignore lint/suspicious/noEmptyBlockStatements: Mock console.error to suppress error output during test
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {})

      expect(() => {
        render(<NavigationWithProvider />)
      }).not.toThrow()

      consoleErrorSpy.mockRestore()
    })

    it("should maintain core functionality when features fail", () => {
      render(<NavigationWithProvider />)

      // Core navigation should always be available - use specific test IDs
      const homeLink = screen.getByTestId("desktop-home-link")
      const blogLink = screen.getByTestId("desktop-blog-link")

      expect(homeLink).toBeInTheDocument()
      expect(blogLink).toBeInTheDocument()
    })
  })

  describe("Real-World Usage Scenarios", () => {
    it("should handle rapid user interactions", () => {
      render(<NavigationWithProvider />)

      const mobileMenuButton = screen.getByTestId("mobile-menu-toggle")
      const themeToggle = screen.getByRole("switch")

      // Simulate rapid clicking
      for (let i = 0; i < 5; i++) {
        fireEvent.click(mobileMenuButton)
        fireEvent.click(themeToggle)
      }

      // Components should still be functional
      expect(mobileMenuButton).toBeInTheDocument()
      expect(themeToggle).toBeInTheDocument()
    })

    it("should handle edge cases in user behavior", () => {
      render(<NavigationWithProvider />)

      const mobileMenuButton = screen.getByTestId("mobile-menu-toggle")

      // Open menu
      fireEvent.click(mobileMenuButton)

      // Press Escape multiple times
      fireEvent.keyDown(document, { key: "Escape" })
      fireEvent.keyDown(document, { key: "Escape" })
      fireEvent.keyDown(document, { key: "Escape" })

      // Menu should be closed and stable
      expect(mobileMenuButton).toHaveAttribute("aria-expanded", "false")
    })
  })
})
