/** biome-ignore-all lint/suspicious/noExplicitAny: we are mocking the whole fetch api */
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import useSWR from "swr"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { SearchBox } from "@/components/SearchBox"

// Mock SWR
vi.mock("swr", () => ({
  default: vi.fn(),
}))

// Mock fetch
global.fetch = vi.fn()

const mockUseSWR = useSWR as any

describe("SearchBox Component", () => {
  const mockPosts = [
    {
      slug: "test-post",
      title: "Test Post",
      description: "A test post description",
      tags: ["test", "example"],
      content: "Test content",
      pubDate: "2024-01-15",
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()

    // Mock SWR to return our test data
    mockUseSWR.mockReturnValue({
      data: mockPosts,
      error: null,
      isLoading: false,
    })
  })

  describe("Search Functionality", () => {
    it("should render search input with proper accessibility", () => {
      render(<SearchBox />)

      const searchInput = screen.getByLabelText("Search posts...")
      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toHaveAttribute("autocomplete", "off")
    })

    it("should load posts on mount", async () => {
      render(<SearchBox />)

      await waitFor(() => {
        expect(mockUseSWR).toHaveBeenCalledWith(
          "/api/search",
          expect.any(Function),
          expect.any(Object),
        )
      })
    })

    it("should perform search when user types", async () => {
      render(<SearchBox />)

      const searchInput = screen.getByLabelText("Search posts...")

      fireEvent.change(searchInput, { target: { value: "test" } })

      await waitFor(() => {
        expect(screen.getByText("1 results found")).toBeInTheDocument()
      })
    })

    it("should show no results message when no matches found", async () => {
      render(<SearchBox />)

      const searchInput = screen.getByLabelText("Search posts...")

      fireEvent.change(searchInput, { target: { value: "nonexistent" } })

      await waitFor(() => {
        expect(screen.getByText("No posts found. Try different keywords!")).toBeInTheDocument()
      })
    })

    it("should clear results when search input is empty", async () => {
      render(<SearchBox />)

      const searchInput = screen.getByLabelText("Search posts...")

      // Type and then clear
      fireEvent.change(searchInput, { target: { value: "test" } })
      fireEvent.change(searchInput, { target: { value: "" } })

      expect(screen.queryByText("results found")).not.toBeInTheDocument()
    })
  })

  describe("Search Results Display", () => {
    it("should display search results with proper formatting", async () => {
      render(<SearchBox />)

      const searchInput = screen.getByLabelText("Search posts...")
      fireEvent.change(searchInput, { target: { value: "test" } })

      await waitFor(() => {
        expect(screen.getByText("Test Post")).toBeInTheDocument()
        expect(screen.getByText("A test post description")).toBeInTheDocument()
        expect(screen.getByText("test")).toBeInTheDocument()
        expect(screen.getByText("example")).toBeInTheDocument()
      })
    })

    it("should format dates correctly", async () => {
      render(<SearchBox />)

      const searchInput = screen.getByLabelText("Search posts...")
      fireEvent.change(searchInput, { target: { value: "test" } })

      await waitFor(() => {
        expect(screen.getByText("Jan 15, 2024")).toBeInTheDocument()
      })
    })
  })

  describe("Error Handling", () => {
    it("should handle API errors gracefully", async () => {
      // Mock SWR to return an error
      mockUseSWR.mockReturnValue({
        data: null,
        error: new Error("API Error"),
        isLoading: false,
      })

      render(<SearchBox />)

      await waitFor(() => {
        expect(screen.getByText("Failed to load posts")).toBeInTheDocument()
        expect(screen.getByText("API Error")).toBeInTheDocument()
      })
    })

    it("should show loading state", () => {
      // Mock SWR to return loading state
      mockUseSWR.mockReturnValue({
        data: null,
        error: null,
        isLoading: true,
      })

      render(<SearchBox />)

      const searchInput = screen.getByLabelText("Search posts...")
      fireEvent.change(searchInput, { target: { value: "test" } })

      // Should show loading initially
      expect(screen.getByText("Loading posts...")).toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("should have proper ARIA labels", () => {
      render(<SearchBox placeholder="Custom placeholder" />)

      const searchInput = screen.getByLabelText("Custom placeholder")
      expect(searchInput).toBeInTheDocument()
    })

    it("should have proper input attributes", () => {
      render(<SearchBox />)

      const searchInput = screen.getByRole("textbox")
      expect(searchInput).toHaveAttribute("type", "text")
      expect(searchInput).toHaveAttribute("autocomplete", "off")
    })
  })
})
