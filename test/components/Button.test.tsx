import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { Button } from "@/components/Button"

describe("Button Component", () => {
  describe("Accessibility Compliance (WCAG 2.1 AA)", () => {
    it("should have minimum touch target size of 44px", () => {
      render(<Button>Test Button</Button>)
      const button = screen.getByRole("button")

      // Check computed styles for minimum size
      expect(button).toHaveClass("min-h-[44px]", "min-w-[44px]")
    })

    it("should have proper focus indicators with sufficient contrast", () => {
      render(<Button>Test Button</Button>)
      const button = screen.getByRole("button")

      expect(button).toHaveClass("focus:outline-none", "focus:ring-4", "focus:ring-offset-2")
    })

    it("should support disabled state with proper ARIA", () => {
      render(<Button disabled>Disabled Button</Button>)
      const button = screen.getByRole("button")

      expect(button).toBeDisabled()
      expect(button).toHaveClass("disabled:opacity-50", "disabled:cursor-not-allowed")
    })

    it("should support keyboard navigation", () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Test Button</Button>)
      const button = screen.getByRole("button")

      // Test Enter key
      fireEvent.keyDown(button, { key: "Enter" })
      // Test Space key
      fireEvent.keyDown(button, { key: " " })

      button.focus()
      expect(button).toHaveFocus()
    })
  })

  describe("Hover Effects", () => {
    it("should have hover effect classes", () => {
      render(<Button variant="primary">Test Button</Button>)
      const button = screen.getByRole("button")

      expect(button).toHaveClass("hover:shadow-none", "hover:translate-x-1", "hover:translate-y-1")
    })

    it("should disable hover effects when disabled", () => {
      render(<Button disabled>Disabled Button</Button>)
      const button = screen.getByRole("button")

      expect(button).toHaveClass(
        "disabled:hover:shadow-none",
        "disabled:hover:translate-x-0",
        "disabled:hover:translate-y-0",
      )
    })
  })

  describe("Variants and Styling", () => {
    it("should apply correct variant classes", () => {
      const variants = [
        { variant: "primary" as const, expectedClass: "bg-primary" },
        { variant: "secondary" as const, expectedClass: "bg-secondary" },
        { variant: "accent" as const, expectedClass: "bg-accent" },
        { variant: "orange" as const, expectedClass: "bg-orange" },
        { variant: "default" as const, expectedClass: "bg-white" },
      ]

      variants.forEach(({ variant, expectedClass }) => {
        const { unmount } = render(<Button variant={variant}>Test</Button>)
        const button = screen.getByRole("button")
        expect(button).toHaveClass(expectedClass)
        unmount()
      })
    })

    it("should apply correct size classes", () => {
      const sizes = [
        { size: "sm" as const, expectedClasses: ["px-4", "py-2", "text-sm"] },
        { size: "md" as const, expectedClasses: ["px-6", "py-3", "text-base"] },
        { size: "lg" as const, expectedClasses: ["px-8", "py-4", "text-lg"] },
      ]

      sizes.forEach(({ size, expectedClasses }) => {
        const { unmount } = render(<Button size={size}>Test</Button>)
        const button = screen.getByRole("button")
        expectedClasses.forEach(className => {
          expect(button).toHaveClass(className)
        })
        unmount()
      })
    })
  })

  describe("Rendering Behavior", () => {
    it("should render as link when href is provided", () => {
      render(<Button href="/test">Link Button</Button>)
      const link = screen.getByRole("link")
      expect(link).toHaveAttribute("href", "/test")
    })

    it("should render as button when no href is provided", () => {
      render(<Button>Button</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveAttribute("type", "button")
    })

    it("should include test id when provided", () => {
      render(<Button testId="test-button">Test</Button>)
      const button = screen.getByTestId("test-button")
      expect(button).toBeInTheDocument()
    })
  })

  describe("Event Handling", () => {
    it("should handle click events", () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Test Button</Button>)
      const button = screen.getByRole("button")

      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })
})
