import type { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllPosts, getPostBySlug } from "@/lib/blog"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map(post => ({
    slug: post.slug,
  }))
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = (await params).slug
  const postMetaData = await getPostBySlug(slug)

  const defaults = await parent
  const tags = postMetaData?.frontmatter.tags ?? []
  const defaultTags = defaults.keywords ?? []

  return {
    title: postMetaData?.frontmatter.title,
    description: postMetaData?.frontmatter.description,
    keywords: [...defaultTags, ...tags],
    openGraph: {
      title: postMetaData?.frontmatter.title,
      description: postMetaData?.frontmatter.description,
      publishedTime: postMetaData?.frontmatter.pubDate,
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen py-20">
      <section className="px-10 pt-20">
        <article className="prose dark:prose-invert mx-auto">
          <MDXRemote source={post.content} />
        </article>
      </section>
    </main>
  )
}
