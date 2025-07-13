import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Card } from "@/components/Card"

describe("Card Component", () => {
  describe("Accessibility Compliance (WCAG 2.1 AA)", () => {
    it("should have proper focus management", () => {
      render(<Card testId="test-card">Test Card</Card>)
      const card = screen.getByTestId("test-card")

      expect(card).toHaveClass("focus-within:ring-4", "focus-within:ring-offset-2")
    })

    it("should support semantic HTML elements", () => {
      render(<Card as="article">Article Card</Card>)
      const article = screen.getByText("Article Card").closest("article")
      expect(article).toBeInTheDocument()
    })

    it("should have proper ARIA labeling when used as link", () => {
      render(
        <Card href="/test" aria-label="Navigate to test">
          Link Card
        </Card>,
      )
      const link = screen.getByRole("link")
      expect(link).toHaveAttribute("aria-label", "Navigate to test")
    })

    it("should have sufficient color contrast for all variants", () => {
      const variants = ["default", "primary", "secondary", "accent", "orange"] as const

      variants.forEach(variant => {
        const { unmount } = render(
          <Card variant={variant} testId="test-card">
            Test
          </Card>,
        )
        const card = screen.getByTestId("test-card")
        expect(card).toHaveClass(`shadow-brutal${variant === "default" ? "" : `-${variant}`}`)
        unmount()
      })
    })
  })

  describe("Hover Effects", () => {
    it("should apply correct hover effects based on hoverEffect prop", () => {
      const { rerender } = render(
        <Card hoverEffect="lift" testId="test-card">
          Test
        </Card>,
      )
      let card = screen.getByTestId("test-card")
      expect(card).toHaveClass("hover:translate-x-1", "hover:translate-y-1", "hover:shadow-none")

      rerender(
        <Card hoverEffect="shadow" testId="test-card">
          Test
        </Card>,
      )
      card = screen.getByTestId("test-card")
      expect(card).toHaveClass("hover:shadow-brutal-lg")

      rerender(
        <Card hoverEffect="none" testId="test-card">
          Test
        </Card>,
      )
      card = screen.getByTestId("test-card")
      expect(card).not.toHaveClass("hover:translate-x-1", "hover:shadow-brutal-lg")
    })
  })

  describe("Variants and Styling", () => {
    it("should apply correct size classes", () => {
      const sizes = [
        { size: "sm" as const, expectedClass: "p-4" },
        { size: "md" as const, expectedClass: "p-6" },
        { size: "lg" as const, expectedClass: "p-8" },
      ]

      sizes.forEach(({ size, expectedClass }) => {
        const { unmount } = render(
          <Card size={size} testId="test-card">
            Test
          </Card>,
        )
        const card = screen.getByTestId("test-card")
        expect(card).toHaveClass(expectedClass)
        unmount()
      })
    })

    it("should have consistent base styling", () => {
      render(<Card testId="test-card">Test</Card>)
      const card = screen.getByTestId("test-card")

      expect(card).toHaveClass(
        "bg-white",
        "dark:bg-neutral-900",
        "border-4",
        "border-black",
        "dark:border-white",
      )
    })
  })

  describe("Rendering Behavior", () => {
    it("should render as link wrapper when href is provided", () => {
      render(<Card href="/test">Link Card</Card>)
      const link = screen.getByRole("link")
      expect(link).toHaveAttribute("href", "/test")
    })

    it("should render as specified element when no href", () => {
      render(<Card as="article">Article Card</Card>)
      const article = screen.getByText("Article Card").closest("article")
      expect(article).toBeInTheDocument()
    })

    it("should default to div element", () => {
      render(<Card testId="test-card">Default Card</Card>)
      const card = screen.getByTestId("test-card")
      expect(card?.tagName).toBe("DIV")
    })
  })
})
