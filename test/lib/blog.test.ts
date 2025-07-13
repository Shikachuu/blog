/** biome-ignore-all lint/suspicious/noExplicitAny: test mocks require any for proper typing */
import { beforeEach, describe, expect, it, vi } from "vitest"
import { type BlogPost, getAllPosts, getPostBySlug } from "@/lib/blog"

// Mock the entire modules
vi.mock("node:fs", () => ({
  default: {
    existsSync: vi.fn(),
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
  },
  existsSync: vi.fn(),
  readdirSync: vi.fn(),
  readFileSync: vi.fn(),
}))

vi.mock("gray-matter", () => ({
  default: vi.fn(),
}))

// Import mocked modules
import fs from "node:fs"
import matter from "gray-matter"

const mockFs = vi.mocked(fs)
const mockMatter = vi.mocked(matter)

describe("Blog Library", () => {
  const currentWorkingDirectory = process.cwd()
  const expectedContentDir = `${currentWorkingDirectory}/content/blog`

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("getAllPosts", () => {
    it("should return empty array when posts directory does not exist", async () => {
      mockFs.existsSync.mockReturnValue(false)

      const result = await getAllPosts()

      expect(result).toEqual([])
      expect(mockFs.existsSync).toHaveBeenCalledWith(expectedContentDir)
    })

    it("should return empty array when no MDX files exist", async () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(["README.md", "image.png"] as any)

      const result = await getAllPosts()

      expect(result).toEqual([])
    })

    it("should parse MDX files and return blog posts", async () => {
      const mockFiles = ["post1.mdx", "post2.mdx", "not-a-post.txt"]
      const mockFileContent = "# Test Post\n\nContent here"

      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(mockFiles as any)
      mockFs.readFileSync.mockReturnValue(mockFileContent)

      mockMatter
        .mockReturnValueOnce({
          data: {
            title: "Test Post 1",
            description: "First test post",
            pubDate: "2024-01-01",
            tags: ["test", "blog"],
            heroImage: "/test.jpg",
            draft: false,
          },
          content: "Content 1",
        } as any)
        .mockReturnValueOnce({
          data: {
            title: "Test Post 2",
            description: "Second test post",
            pubDate: "2024-01-02",
            tags: ["test"],
            draft: false,
          },
          content: "Content 2",
        } as any)

      const result = await getAllPosts()

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({
        slug: "post1",
        frontmatter: {
          title: "Test Post 1",
          description: "First test post",
          pubDate: "2024-01-01",
          tags: ["test", "blog"],
          heroImage: "/test.jpg",
          draft: false,
        },
        content: "Content 1",
      })
      expect(result[1]).toEqual({
        slug: "post2",
        frontmatter: {
          title: "Test Post 2",
          description: "Second test post",
          pubDate: "2024-01-02",
          tags: ["test"],
          heroImage: undefined,
          draft: false,
        },
        content: "Content 2",
      })
    })

    it("should filter out draft posts", async () => {
      const mockFiles = ["published.mdx", "draft.mdx"]

      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(mockFiles as any)
      mockFs.readFileSync.mockReturnValue("content")

      mockMatter
        .mockReturnValueOnce({
          data: {
            title: "Published Post",
            description: "Published",
            pubDate: "2024-01-01",
            tags: [],
            draft: false,
          },
          content: "Published content",
        } as any)
        .mockReturnValueOnce({
          data: {
            title: "Draft Post",
            description: "Draft",
            pubDate: "2024-01-02",
            tags: [],
            draft: true,
          },
          content: "Draft content",
        } as any)

      const result = await getAllPosts()

      expect(result).toHaveLength(1)
      expect(result[0].frontmatter.title).toBe("Published Post")
    })

    it("should handle missing frontmatter fields with defaults", async () => {
      const mockFiles = ["minimal.mdx"]

      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(mockFiles as any)
      mockFs.readFileSync.mockReturnValue("content")

      mockMatter.mockReturnValueOnce({
        data: {}, // Empty frontmatter
        content: "Minimal content",
      } as any)

      const result = await getAllPosts()

      expect(result).toHaveLength(1)
      expect(result[0].frontmatter).toEqual({
        title: "",
        description: "",
        pubDate: expect.any(String), // Should be current ISO string
        tags: [],
        heroImage: undefined,
        draft: false,
      })
      // Verify pubDate is a valid ISO string
      expect(new Date(result[0].frontmatter.pubDate).toISOString()).toBe(
        result[0].frontmatter.pubDate,
      )
    })

    it("should only include .mdx files", async () => {
      const mockFiles = ["post.mdx", "post.md", "post.txt", "another.mdx"]

      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(mockFiles as any)
      mockFs.readFileSync.mockReturnValue("content")

      mockMatter.mockReturnValue({
        data: {
          title: "Test",
          description: "Test",
          pubDate: "2024-01-01",
          tags: [],
          draft: false,
        },
        content: "content",
      } as any)

      const result = await getAllPosts()

      expect(result).toHaveLength(2) // Only .mdx files
      expect(mockFs.readFileSync).toHaveBeenCalledTimes(2)
    })
  })

  describe("getPostBySlug", () => {
    it("should return post when file exists", async () => {
      const mockContent = "# Test Post\n\nContent"

      mockFs.readFileSync.mockReturnValue(mockContent)
      mockMatter.mockReturnValue({
        data: {
          title: "Test Post",
          description: "A test post",
          pubDate: "2024-01-01",
          tags: ["test"],
          heroImage: "/test.jpg",
          draft: false,
        },
        content: "Post content",
      } as any)

      const result = await getPostBySlug("test-post")

      expect(result).toEqual({
        slug: "test-post",
        frontmatter: {
          title: "Test Post",
          description: "A test post",
          pubDate: "2024-01-01",
          tags: ["test"],
          heroImage: "/test.jpg",
          draft: false,
        },
        content: "Post content",
      })
      expect(mockFs.readFileSync).toHaveBeenCalledWith(
        `${expectedContentDir}/test-post.mdx`,
        "utf8",
      )
    })

    it("should return null when file does not exist", async () => {
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error("File not found")
      })

      const result = await getPostBySlug("non-existent")

      expect(result).toBeNull()
    })

    it("should handle missing frontmatter fields with defaults", async () => {
      mockFs.readFileSync.mockReturnValue("content")
      mockMatter.mockReturnValue({
        data: {
          title: "Partial Post",
          // Missing other fields
        },
        content: "Partial content",
      } as any)

      const result = await getPostBySlug("partial")

      expect(result?.frontmatter).toEqual({
        title: "Partial Post",
        description: "",
        pubDate: expect.any(String),
        tags: [],
        heroImage: undefined,
        draft: false,
      })
    })

    it("should return null on any error during file reading", async () => {
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error("Permission denied")
      })

      const result = await getPostBySlug("error-post")

      expect(result).toBeNull()
    })

    it("should handle gray-matter parsing errors", async () => {
      mockFs.readFileSync.mockReturnValue("content")
      mockMatter.mockImplementation(() => {
        throw new Error("Invalid frontmatter")
      })

      const result = await getPostBySlug("invalid-frontmatter")

      expect(result).toBeNull()
    })
  })

  describe("Type compliance", () => {
    it("should return properly typed BlogPost objects", async () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(["test.mdx"] as any)
      mockFs.readFileSync.mockReturnValue("content")

      mockMatter.mockReturnValue({
        data: {
          title: "Typed Post",
          description: "Type test",
          pubDate: "2024-01-01",
          tags: ["typescript"],
          heroImage: "/hero.jpg",
          draft: false,
        },
        content: "Typed content",
      } as any)

      const posts = await getAllPosts()
      const post = await getPostBySlug("test")

      // Type assertions to ensure TypeScript compliance
      posts.forEach((p: BlogPost) => {
        expect(typeof p.slug).toBe("string")
        expect(typeof p.frontmatter.title).toBe("string")
        expect(typeof p.frontmatter.description).toBe("string")
        expect(typeof p.frontmatter.pubDate).toBe("string")
        expect(Array.isArray(p.frontmatter.tags)).toBe(true)
        expect(typeof p.frontmatter.draft).toBe("boolean")
        expect(typeof p.content).toBe("string")
      })

      if (post) {
        expect(typeof post.slug).toBe("string")
        expect(typeof post.frontmatter.title).toBe("string")
        expect(typeof post.frontmatter.description).toBe("string")
        expect(typeof post.frontmatter.pubDate).toBe("string")
        expect(Array.isArray(post.frontmatter.tags)).toBe(true)
        expect(typeof post.frontmatter.draft).toBe("boolean")
        expect(typeof post.content).toBe("string")
      }
    })
  })
})
