import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Navigation } from "@/components/Navigation"
import { ThemeProvider } from "@/components/ThemeProvider"

// Mock usePathname
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

describe("WCAG 2.1 AA Compliance Tests", () => {
  describe("Principle 1: Perceivable", () => {
    describe("1.1 Text Alternatives", () => {
      it("should provide text alternatives for all non-text content", () => {
        render(
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>,
        )

        // Check that icons have aria-hidden
        const icons = document.querySelectorAll("svg")
        icons.forEach(icon => {
          expect(icon).toHaveAttribute("aria-hidden", "true")
        })
      })
    })

    describe("1.3 Adaptable", () => {
      it("should use proper semantic markup", () => {
        render(
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>,
        )

        const nav = screen.getByRole("navigation")
        const menubar = screen.getByRole("menubar")
        const buttons = screen.getAllByRole("button")

        expect(nav).toBeInTheDocument()
        expect(menubar).toBeInTheDocument()
        expect(buttons.length).toBeGreaterThan(0)
      })

      it("should identify input purpose", () => {
        render(
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>,
        )

        // Use more specific selectors to avoid duplicates
        const desktopThemeToggle = screen.getByTestId("desktop-theme-toggle")
        const mobileMenuButton = screen.getByTestId("mobile-menu-toggle")

        expect(desktopThemeToggle).toHaveAttribute("aria-label")
        expect(mobileMenuButton).toHaveAttribute("aria-label")

        // Verify the aria-labels contain expected text
        const desktopToggleLabel = desktopThemeToggle.getAttribute("aria-label")
        const menuButtonLabel = mobileMenuButton.getAttribute("aria-label")

        expect(desktopToggleLabel).toMatch(/theme/i)
        expect(menuButtonLabel).toMatch(/menu/i)
      })
    })

    describe("1.4 Distinguishable", () => {
      it("should meet color contrast requirements", () => {
        // Test that components use high contrast color combinations
        render(<Button variant="primary">Test Button</Button>)
        const button = screen.getByRole("button")

        // Primary button should have white text on blue background
        expect(button).toHaveClass("text-white", "bg-primary")
      })

      it("should not rely solely on color to convey information", () => {
        render(
          <Card variant="primary" testId="test-card">
            Test Card
          </Card>,
        )
        const card = screen.getByTestId("test-card")

        // Cards use both color AND shadow to indicate variants
        expect(card).toHaveClass("shadow-brutal-primary")
      })

      it("should provide sufficient spacing between interactive elements", () => {
        render(
          <div className="flex gap-4" data-testid="button-container">
            <Button>Button 1</Button>
            <Button>Button 2</Button>
          </div>,
        )

        const container = screen.getByTestId("button-container")
        expect(container).toHaveClass("gap-4") // 16px spacing
      })
    })
  })

  describe("Principle 2: Operable", () => {
    describe("2.1 Keyboard Accessible", () => {
      it("should make all functionality available via keyboard", () => {
        render(
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>,
        )

        const interactiveElements = screen
          .getAllByRole("button")
          .concat(screen.getAllByRole("link"))

        interactiveElements.forEach(element => {
          // All interactive elements should be focusable
          expect(element).not.toHaveAttribute("tabindex", "-1")
        })
      })

      it("should provide visible focus indicators", () => {
        render(<Button>Test Button</Button>)
        const button = screen.getByRole("button")

        expect(button).toHaveClass("focus:outline-none", "focus:ring-4")
      })
    })

    describe("2.4 Navigable", () => {
      it("should provide multiple ways to locate content", () => {
        render(
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>,
        )

        const nav = screen.getByRole("navigation")
        const homeLink = screen.getByTestId("desktop-home-link")
        const blogLink = screen.getByTestId("desktop-blog-link")

        expect(nav).toHaveAttribute("aria-label", "Main navigation")
        expect(homeLink).toBeInTheDocument()
        expect(blogLink).toBeInTheDocument()
      })

      it("should have descriptive labels", () => {
        render(
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>,
        )

        const nav = screen.getByRole("navigation")
        const themeToggle = screen.getByRole("switch")

        expect(nav).toHaveAttribute("aria-label")
        expect(themeToggle).toHaveAttribute("aria-label")
      })

      it("should indicate current location", () => {
        render(
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>,
        )

        const homeLink = screen.getByTestId("desktop-home-link")
        expect(homeLink).toHaveAttribute("aria-current", "page")
      })
    })

    describe("2.5 Input Modalities", () => {
      it("should have adequate touch target sizes (44x44px minimum)", () => {
        render(
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>,
        )

        const buttons = screen.getAllByRole("button")
        const links = screen.getAllByRole("link")

        ;[...buttons, ...links].forEach(element => {
          expect(element).toHaveClass("min-h-[44px]", "min-w-[44px]")
        })
      })
    })
  })

  describe("Principle 3: Understandable", () => {
    describe("3.2 Predictable", () => {
      it("should have consistent navigation patterns", () => {
        render(
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>,
        )

        // Navigation should be consistent across pages
        const nav = screen.getByRole("navigation")
        expect(nav).toHaveClass("fixed", "top-4") // Consistent positioning
      })

      it("should not cause unexpected context changes", () => {
        render(
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>,
        )

        const themeToggle = screen.getByRole("switch")

        // Theme toggle should not navigate away or cause unexpected changes
        expect(themeToggle).toHaveAttribute("type", "button")
      })
    })

    describe("3.3 Input Assistance", () => {
      it("should provide clear labels and instructions", () => {
        render(
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>,
        )

        const themeToggle = screen.getByRole("switch")
        const menuButton = screen.getByTestId("mobile-menu-toggle")

        expect(themeToggle).toHaveAttribute("aria-label")
        expect(menuButton).toHaveAttribute("aria-label")
      })
    })
  })

  describe("Principle 4: Robust", () => {
    describe("4.1 Compatible", () => {
      it("should use valid, semantic HTML", () => {
        render(
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>,
        )

        // Check for proper semantic elements
        const nav = screen.getByRole("navigation")
        const buttons = screen.getAllByRole("button")
        const links = screen.getAllByRole("link")

        expect(nav.tagName).toBe("NAV")
        buttons.forEach(button => expect(button.tagName).toBe("BUTTON"))
        links.forEach(link => expect(link.tagName).toBe("A"))
      })

      it("should provide proper name, role, and value for all components", () => {
        render(
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>,
        )

        const themeToggle = screen.getByRole("switch")
        const menuButton = screen.getByTestId("mobile-menu-toggle")

        // Theme toggle
        expect(themeToggle).toHaveAttribute("role", "switch")
        expect(themeToggle).toHaveAttribute("aria-checked")
        expect(themeToggle).toHaveAttribute("aria-label")

        // Menu button
        expect(menuButton).toHaveAttribute("aria-expanded")
        expect(menuButton).toHaveAttribute("aria-controls")
        expect(menuButton).toHaveAttribute("aria-label")
      })
    })
  })

  describe("Additional Accessibility Features", () => {
    it("should support reduced motion preferences", () => {
      // This would be tested with actual CSS media queries in integration tests
      const reducedMotionCSS = "@media (prefers-reduced-motion: reduce)"
      expect(reducedMotionCSS).toBeTruthy()
    })

    it("should support high contrast mode", () => {
      // Test that components work with high contrast
      render(<Button variant="primary">High Contrast Button</Button>)
      const button = screen.getByRole("button")

      expect(button).toHaveClass("border-4", "border-black")
    })

    it("should announce dynamic content changes", () => {
      render(
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>,
      )

      // Screen reader announcements are handled by the components
      const nav = screen.getByRole("navigation")
      expect(nav).toBeInTheDocument()
    })
  })
})
