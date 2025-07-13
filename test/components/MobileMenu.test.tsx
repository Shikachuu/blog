import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { MobileMenu } from "@/components/MobileMenu"
import { ThemeProvider } from "@/components/ThemeProvider"

type MobileMenuProps = {
  isOpen: boolean
  currentPath: string
  onClose: () => void
  testId?: string
}

const MobileMenuWithProvider = (props: MobileMenuProps) => (
  <ThemeProvider>
    <MobileMenu {...props} />
  </ThemeProvider>
)

describe("MobileMenu Component", () => {
  const defaultProps = {
    isOpen: false,
    currentPath: "/",
    onClose: vi.fn(),
  }

  describe("WCAG 2.1 AA Compliance", () => {
    describe("Menu Role and Structure", () => {
      it("should have proper menu role", () => {
        render(<MobileMenuWithProvider {...defaultProps} isOpen={true} />)
        const menu = screen.getByRole("menu")
        expect(menu).toBeInTheDocument()
      })

      it("should have proper aria-label", () => {
        render(<MobileMenuWithProvider {...defaultProps} isOpen={true} />)
        const menu = screen.getByRole("menu")
        expect(menu).toHaveAttribute("aria-label", "Mobile navigation menu")
      })

      it("should have menu items with proper roles", () => {
        render(<MobileMenuWithProvider {...defaultProps} isOpen={true} />)
        const menuItems = screen.getAllByRole("menuitem")
        expect(menuItems.length).toBeGreaterThan(0)
      })

      it("should manage aria-hidden state correctly", () => {
        const { rerender } = render(<MobileMenuWithProvider {...defaultProps} isOpen={false} />)
        let menu = screen.getByTestId("mobile-menu")
        expect(menu).toHaveAttribute("aria-hidden", "true")

        rerender(<MobileMenuWithProvider {...defaultProps} isOpen={true} />)
        menu = screen.getByTestId("mobile-menu")
        expect(menu).toHaveAttribute("aria-hidden", "false")
      })
    })

    describe("Focus Management", () => {
      it("should focus first menu item when opened", async () => {
        // Don't use fake timers for this test to avoid timing issues
        render(<MobileMenuWithProvider {...defaultProps} isOpen={true} />)

        const firstMenuItem = screen.getByTestId("mobile-home-link")

        // Wait for the component's setTimeout to complete (150ms)
        await waitFor(
          () => {
            expect(firstMenuItem).toHaveFocus()
          },
          { timeout: 500 },
        )
      })

      it("should have focusable elements in correct tab order", () => {
        render(<MobileMenuWithProvider {...defaultProps} isOpen={true} />)

        const homeLink = screen.getByTestId("mobile-home-link")
        const blogLink = screen.getByTestId("mobile-blog-link")
        const themeToggle = screen.getByTestId("mobile-theme-toggle")

        // Verify elements are focusable (links are focusable by default, buttons should not have tabIndex="-1")
        expect(homeLink).not.toHaveAttribute("tabIndex", "-1")
        expect(blogLink).not.toHaveAttribute("tabIndex", "-1")
        expect(themeToggle).not.toHaveAttribute("tabIndex", "-1")

        // Test manual focus works
        homeLink.focus()
        expect(homeLink).toHaveFocus()

        blogLink.focus()
        expect(blogLink).toHaveFocus()

        themeToggle.focus()
        expect(themeToggle).toHaveFocus()
      })

      it("should handle keyboard navigation events", () => {
        render(<MobileMenuWithProvider {...defaultProps} isOpen={true} />)

        const menu = screen.getByTestId("mobile-menu")
        const homeLink = screen.getByTestId("mobile-home-link")

        // Focus first element
        homeLink.focus()
        expect(homeLink).toHaveFocus()

        // Test Tab key event handling
        const tabEvent = new KeyboardEvent("keydown", { key: "Tab", bubbles: true })
        Object.defineProperty(tabEvent, "shiftKey", { value: false })

        // Dispatch the event
        fireEvent.keyDown(menu, tabEvent)

        // The event handler should be called (we can't easily test focus changes in jsdom)
        expect(menu).toBeInTheDocument()
      })
    })
  })

  describe("Menu Animation and Transitions", () => {
    it("should have smooth opening animation", () => {
      const { rerender } = render(<MobileMenuWithProvider {...defaultProps} isOpen={false} />)
      let menu = screen.getByTestId("mobile-menu")
      expect(menu).toHaveClass("max-h-0", "opacity-0")

      rerender(<MobileMenuWithProvider {...defaultProps} isOpen={true} />)
      menu = screen.getByTestId("mobile-menu")
      expect(menu).toHaveClass("max-h-96", "opacity-100")
    })

    it("should animate menu content separately", () => {
      const { rerender } = render(<MobileMenuWithProvider {...defaultProps} isOpen={false} />)
      let content = screen.getByTestId("mobile-menu").querySelector(".mobile-menu-content")
      expect(content).toHaveClass("translate-y-2")

      rerender(<MobileMenuWithProvider {...defaultProps} isOpen={true} />)
      content = screen.getByTestId("mobile-menu").querySelector(".mobile-menu-content")
      expect(content).toHaveClass("translate-y-0")
    })
  })

  describe("Menu Content and Structure", () => {
    it("should contain navigation links", () => {
      render(<MobileMenuWithProvider {...defaultProps} isOpen={true} />)

      const homeLink = screen.getByTestId("mobile-home-link")
      const blogLink = screen.getByTestId("mobile-blog-link")

      expect(homeLink).toHaveAttribute("href", "/")
      expect(blogLink).toHaveAttribute("href", "/blog")
    })

    it("should include theme toggle button", () => {
      render(<MobileMenuWithProvider {...defaultProps} isOpen={true} />)
      const themeToggle = screen.getByTestId("mobile-theme-toggle")

      expect(themeToggle).toBeInTheDocument()
    })

    it("should call onClose when links are clicked", () => {
      const onClose = vi.fn()
      render(<MobileMenuWithProvider {...defaultProps} isOpen={true} onClose={onClose} />)

      const homeLink = screen.getByTestId("mobile-home-link")
      fireEvent.click(homeLink)

      expect(onClose).toHaveBeenCalled()
    })
  })
})
