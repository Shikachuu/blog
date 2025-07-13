import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/blog")

export type BlogPost = {
  slug: string
  frontmatter: {
    title: string
    description: string
    pubDate: string
    heroImage?: string
    tags: string[]
    draft?: boolean
  }
  content: string
}

export type SearchPost = {
  slug: string
  title: string
  description: string
  tags: string[]
  content: string // Raw markdown content for search
  pubDate: string
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter(name => name.endsWith(".mdx"))
    .map(name => {
      const slug = name.replace(/\.mdx$/, "")
      const fullPath = path.join(postsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        frontmatter: {
          title: data.title || "",
          description: data.description || "",
          pubDate: data.pubDate || new Date().toISOString(),
          heroImage: data.heroImage,
          tags: data.tags || [],
          draft: data.draft || false,
        },
        content,
      }
    })
    .filter(post => !post.frontmatter.draft)

  return posts
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      frontmatter: {
        title: data.title || "",
        description: data.description || "",
        pubDate: data.pubDate || new Date().toISOString(),
        heroImage: data.heroImage,
        tags: data.tags || [],
        draft: data.draft || false,
      },
      content,
    }
  } catch (_error) {
    return null
  }
}
