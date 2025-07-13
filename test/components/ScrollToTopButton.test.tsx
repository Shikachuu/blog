import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { ScrollToTopButton } from "@/components/ScrollToTopButton"

describe("ScrollToTopButton Component", () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, "scrollY", { value: 0, writable: true })

    // Mock scrollTo
    window.scrollTo = vi.fn()
  })

  describe("WCAG 2.1 AA Compliance", () => {
    describe("Button Accessibility", () => {
      it("should have descriptive aria-label", () => {
        render(<ScrollToTopButton />)
        const button = screen.getByLabelText("Scroll to top of page")
        expect(button).toBeInTheDocument()
      })

      it("should have matching title attribute", () => {
        render(<ScrollToTopButton />)
        const button = screen.getByTitle("Scroll to top of page")
        expect(button).toBeInTheDocument()
      })

      it("should manage aria-hidden based on visibility", () => {
        render(<ScrollToTopButton />)
        const button = screen.getByTestId("scroll-to-top")

        // Should be hidden initially
        expect(button).toHaveAttribute("aria-hidden", "true")
      })

      it("should manage tabindex based on visibility", () => {
        render(<ScrollToTopButton />)
        const button = screen.getByTestId("scroll-to-top")

        // Should not be focusable when hidden
        expect(button).toHaveAttribute("tabindex", "-1")
      })
    })

    describe("Touch Target Requirements", () => {
      it("should meet minimum 44px touch target size", () => {
        render(<ScrollToTopButton />)
        const button = screen.getByTestId("scroll-to-top")

        expect(button).toHaveClass("min-h-[44px]", "min-w-[44px]")
      })
    })

    describe("Focus Management", () => {
      it("should have visible focus indicators", () => {
        render(<ScrollToTopButton />)
        const button = screen.getByTestId("scroll-to-top")

        expect(button).toHaveClass("focus:outline-none", "focus:ring-4")
      })

      it("should be keyboard accessible when visible", () => {
        // Set scroll position to make button visible
        Object.defineProperty(window, "scrollY", { value: 400, writable: true })

        render(<ScrollToTopButton />)
        const button = screen.getByTestId("scroll-to-top")

        // Test Enter key
        fireEvent.keyDown(button, { key: "Enter" })
        expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" })

        // Test Space key
        fireEvent.keyDown(button, { key: " " })
        expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" })
      })
    })
  })

  describe("Scroll Behavior and Visibility", () => {
    describe("Visibility Threshold", () => {
      it("should be hidden when scroll position is below threshold", () => {
        Object.defineProperty(window, "scrollY", { value: 200, writable: true })

        render(<ScrollToTopButton />)
        const button = screen.getByTestId("scroll-to-top")

        expect(button).toHaveClass("opacity-0", "invisible")
      })

      it("should be visible when scroll position exceeds threshold", () => {
        Object.defineProperty(window, "scrollY", { value: 400, writable: true })

        render(<ScrollToTopButton />)

        // Trigger scroll event
        fireEvent.scroll(window)

        const button = screen.getByTestId("scroll-to-top")
        expect(button).toHaveClass("opacity-100", "visible")
      })
    })

    describe("Scroll Functionality", () => {
      it("should scroll to top when clicked", () => {
        render(<ScrollToTopButton />)
        const button = screen.getByTestId("scroll-to-top")

        fireEvent.click(button)

        expect(window.scrollTo).toHaveBeenCalledWith({
          top: 0,
          behavior: "smooth",
        })
      })
    })
  })
})
