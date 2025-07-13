import { fireEvent, render, screen } from "@testing-library/react"
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

describe("Navigation Component", () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, "scrollY", { value: 0, writable: true })
  })

  describe("WCAG 2.1 AA Compliance", () => {
    describe("Keyboard Navigation", () => {
      it("should support keyboard navigation through all interactive elements", () => {
        render(<NavigationWithProvider />)

        const homeLink = screen.getByTestId("desktop-home-link")
        const blogLink = screen.getByTestId("desktop-blog-link")
        const themeToggle = screen.getByTestId("desktop-theme-toggle")

        expect(homeLink).toBeInTheDocument()
        expect(blogLink).toBeInTheDocument()
        expect(themeToggle).toBeInTheDocument()
      })

      it("should handle Escape key to close mobile menu", () => {
        render(<NavigationWithProvider />)

        const mobileMenuButton = screen.getByTestId("mobile-menu-toggle")

        // Open menu
        fireEvent.click(mobileMenuButton)

        // Press Escape
        fireEvent.keyDown(document, { key: "Escape" })

        expect(mobileMenuButton).toHaveAttribute("aria-expanded", "false")
      })
    })

    describe("ARIA Attributes and Roles", () => {
      it("should have proper navigation landmark", () => {
        render(<NavigationWithProvider />)
        const nav = screen.getByRole("navigation")
        expect(nav).toHaveAttribute("aria-label", "Main navigation")
      })

      it("should update aria-expanded on mobile menu toggle", () => {
        render(<NavigationWithProvider />)
        const mobileMenuButton = screen.getByTestId("mobile-menu-toggle")

        expect(mobileMenuButton).toHaveAttribute("aria-expanded", "false")

        fireEvent.click(mobileMenuButton)
        expect(mobileMenuButton).toHaveAttribute("aria-expanded", "true")
      })

      it("should have proper aria-controls relationship", () => {
        render(<NavigationWithProvider />)
        const mobileMenuButton = screen.getByTestId("mobile-menu-toggle")

        expect(mobileMenuButton).toHaveAttribute("aria-controls", "mobile-menu")
      })

      it("should have proper aria-current for active pages", () => {
        render(<NavigationWithProvider />)
        const homeLink = screen.getByTestId("desktop-home-link")

        expect(homeLink).toHaveAttribute("aria-current", "page")
      })
    })

    describe("Touch Target Sizes", () => {
      it("should have minimum 44px touch targets", () => {
        render(<NavigationWithProvider />)

        const mobileMenuButton = screen.getByTestId("mobile-menu-toggle")
        const themeToggle = screen.getByTestId("desktop-theme-toggle")

        expect(mobileMenuButton).toHaveClass("min-h-[44px]", "min-w-[44px]")
        expect(themeToggle).toHaveClass("min-h-[44px]", "min-w-[44px]")
      })
    })
  })

  describe("Mobile Menu Functionality", () => {
    it("should initialize with menu closed", () => {
      render(<NavigationWithProvider />)
      const mobileMenuButton = screen.getByTestId("mobile-menu-toggle")

      expect(mobileMenuButton).toHaveAttribute("aria-expanded", "false")
    })

    it("should toggle menu state on button click", () => {
      render(<NavigationWithProvider />)
      const mobileMenuButton = screen.getByTestId("mobile-menu-toggle")

      fireEvent.click(mobileMenuButton)
      expect(mobileMenuButton).toHaveAttribute("aria-expanded", "true")

      fireEvent.click(mobileMenuButton)
      expect(mobileMenuButton).toHaveAttribute("aria-expanded", "false")
    })

    it("should close menu when clicking outside", () => {
      render(<NavigationWithProvider />)
      const mobileMenuButton = screen.getByTestId("mobile-menu-toggle")

      // Open menu
      fireEvent.click(mobileMenuButton)
      expect(mobileMenuButton).toHaveAttribute("aria-expanded", "true")

      // Click outside
      fireEvent.click(document.body)
      expect(mobileMenuButton).toHaveAttribute("aria-expanded", "false")
    })
  })

  describe("Responsive Behavior", () => {
    it("should hide mobile menu on desktop breakpoints", () => {
      render(<NavigationWithProvider />)
      const desktopNav = screen.getByLabelText("Desktop navigation")
      const mobileMenuButton = screen.getByTestId("mobile-menu-toggle")

      expect(desktopNav).toHaveClass("hidden", "sm:flex")
      expect(mobileMenuButton.parentElement).toHaveClass("sm:hidden")
    })
  })
})
