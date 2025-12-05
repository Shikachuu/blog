import { NextResponse } from "next/server"
import { getAllPosts, type SearchPost } from "@/lib/blog"

export const dynamic = "force-static"

export async function GET() {
  try {
    const posts = await getAllPosts()

    const searchData = posts.map(post => ({
      slug: post.slug,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      tags: post.frontmatter.tags,
      content: post.content, // Raw markdown content for search
      pubDate: post.frontmatter.pubDate,
    }))

    return NextResponse.json<SearchPost[]>(searchData)
  } catch (error) {
    console.error("Error fetching posts for search:", error)
    return NextResponse.json([], { status: 500 })
  }
}
