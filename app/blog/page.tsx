import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { SearchBox } from "@/components/SearchBox"
import { getAllPosts } from "@/lib/blog"
import { getBlogConfig } from "@/lib/personal-config"

const blogConfig = getBlogConfig()

export const metadata = {
  title: blogConfig.title,
  description: blogConfig.description,
}

export default async function BlogPage() {
  const allPosts = await getAllPosts()
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.frontmatter.pubDate).getTime() - new Date(a.frontmatter.pubDate).getTime(),
  )

  // Get all unique tags
  const allTags = Array.from(new Set(allPosts.flatMap(post => post.frontmatter.tags))).sort()

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-neutral-900 dark:text-neutral-50 mb-4 mt-8">
            Blog
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            {blogConfig.tagline}
          </p>
        </div>

        {/* Search */}
        <SearchBox placeholder="Search articles..." />

        {/* Tags Filter */}
        <div className="mb-12">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-4">
            Browse by Topic
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button
              className="tag-filter active"
              variant="primary"
              size="sm"
              testId="tag-filter-all"
              aria-label="Show all posts"
            >
              All
            </Button>
            {allTags.map(tag => (
              <Button
                key={tag}
                className="tag-filter"
                variant="default"
                size="sm"
                data-tag={tag}
                testId={`tag-filter-${tag}`}
                aria-label={`Filter posts by ${tag}`}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-neutral-50 mb-8">
            All Articles
          </h2>
          <div className="grid gap-6" id="posts-container">
            {sortedPosts.map(post => (
              <Card
                key={post.slug}
                as="article"
                variant="secondary"
                size="md"
                hoverEffect="shadow"
                className="post-item"
                data-tags={post.frontmatter.tags.join(",")}
                testId={`post-${post.slug}-card`}
                aria-label={`Article: ${post.frontmatter.title}`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-4">
                      <time
                        className="text-sm text-neutral-500 dark:text-neutral-400 font-mono"
                        dateTime={post.frontmatter.pubDate}
                      >
                        {formatDate(post.frontmatter.pubDate)}
                      </time>
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 hover:text-primary transition-colors">
                      <a
                        href={`/blog/${post.slug}`}
                        className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        {post.frontmatter.title}
                      </a>
                    </h3>

                    <p className="text-neutral-600 dark:text-neutral-300">
                      {post.frontmatter.description}
                    </p>

                    <Button
                      href={`/blog/${post.slug}`}
                      variant="secondary"
                      size="sm"
                      testId={`post-${post.slug}-button`}
                      aria-label={`Read ${post.frontmatter.title}`}
                    >
                      Read More →
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 md:ml-6">
                    {post.frontmatter.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm font-bold bg-orange text-white border-2 border-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {sortedPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-neutral-500 dark:text-neutral-400 mb-6">
                No posts published yet. Check back soon!
              </p>
              <Button
                href="/"
                variant="primary"
                testId="no-posts-home-button"
                aria-label="Go back to homepage"
              >
                Back to Home
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
