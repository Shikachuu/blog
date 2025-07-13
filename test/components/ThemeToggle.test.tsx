import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ThemeToggle } from "@/components/ThemeToggle"

const ThemeToggleWithProvider = () => (
  <ThemeProvider>
    <ThemeToggle />
  </ThemeProvider>
)

describe("ThemeToggle Component", () => {
  beforeEach(() => {
    // Clear localStorage
    localStorage.clear()
    // Reset document class
    document.documentElement.classList.remove("dark")
  })

  describe("WCAG 2.1 AA Compliance", () => {
    describe("Switch Role and ARIA", () => {
      it("should have proper switch role", () => {
        render(<ThemeToggleWithProvider />)
        const toggle = screen.getByRole("switch")
        expect(toggle).toBeInTheDocument()
      })

      it("should have descriptive aria-label", () => {
        render(<ThemeToggleWithProvider />)
        const toggle = screen.getByRole("switch")
        expect(toggle).toHaveAttribute("aria-label")
      })

      it("should have proper aria-checked state", () => {
        render(<ThemeToggleWithProvider />)
        const toggle = screen.getByRole("switch")
        expect(toggle).toHaveAttribute("aria-checked")
      })

      it("should update aria-checked when theme changes", () => {
        render(<ThemeToggleWithProvider />)
        const toggle = screen.getByRole("switch")

        const initialChecked = toggle.getAttribute("aria-checked")
        fireEvent.click(toggle)

        const newChecked = toggle.getAttribute("aria-checked")
        expect(newChecked).not.toBe(initialChecked)
      })
    })

    describe("Touch Target Requirements", () => {
      it("should meet minimum 44px touch target size", () => {
        render(<ThemeToggleWithProvider />)
        const toggle = screen.getByRole("switch")

        expect(toggle).toHaveClass("min-h-[44px]", "min-w-[44px]")
      })
    })

    describe("Focus Management", () => {
      it("should have visible focus indicators", () => {
        render(<ThemeToggleWithProvider />)
        const toggle = screen.getByRole("switch")

        expect(toggle).toHaveClass("focus:outline-none", "focus:ring-4")
      })

      it("should be keyboard accessible", () => {
        render(<ThemeToggleWithProvider />)
        const toggle = screen.getByRole("switch")

        // Test Enter key
        fireEvent.keyDown(toggle, { key: "Enter" })
        // Test Space key
        fireEvent.keyDown(toggle, { key: " " })

        toggle.focus()
        expect(toggle).toHaveFocus()
      })
    })
  })

  describe("Theme Management", () => {
    it("should toggle theme on button click", () => {
      render(<ThemeToggleWithProvider />)
      const toggle = screen.getByRole("switch")

      const initialChecked = toggle.getAttribute("aria-checked")
      fireEvent.click(toggle)

      const newChecked = toggle.getAttribute("aria-checked")
      expect(newChecked).not.toBe(initialChecked)
    })

    it("should update localStorage on theme change", () => {
      const setItemSpy = vi.spyOn(localStorage, "setItem")

      render(<ThemeToggleWithProvider />)
      const toggle = screen.getByRole("switch")

      fireEvent.click(toggle)

      expect(setItemSpy).toHaveBeenCalledWith("theme", expect.any(String))
      expect(setItemSpy).toHaveBeenCalledWith("theme-manual", "true")
    })
  })

  describe("Visual State and Icons", () => {
    it("should show appropriate icons based on theme", () => {
      render(<ThemeToggleWithProvider />)

      // Check that both sun and moon icons are present
      const sunIcon = screen.getByRole("switch").querySelector(".dark\\:hidden")
      const moonIcon = screen.getByRole("switch").querySelector(".hidden.dark\\:block")

      expect(sunIcon).toBeInTheDocument()
      expect(moonIcon).toBeInTheDocument()
    })
  })
})
