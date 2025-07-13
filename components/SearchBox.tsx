"use client"

import Fuse from "fuse.js"
import type React from "react"
import { useEffect, useMemo, useState } from "react"
import useSWR from "swr"
import type * as blog from "@/lib/blog"
import { fetcher } from "@/lib/fetchers"
import { stripHtml } from "@/lib/html-utils"

type SearchBoxProps = {
  placeholder?: string
}

export const SearchBox: React.FC<SearchBoxProps> = ({ placeholder = "Search posts..." }) => {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // Use SWR to fetch posts data
  const {
    data: postsData,
    error,
    isLoading,
  } = useSWR<blog.SearchPost[]>("/api/search", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000, // Cache for 1 minute
  })

  // Memoize Fuse instance to avoid recreating on every render
  const fuse = useMemo(() => {
    if (!postsData) return null

    return new Fuse(postsData, {
      keys: [
        { name: "title", weight: 0.4 },
        { name: "description", weight: 0.3 },
        { name: "tags", weight: 0.2 },
        { name: "content", weight: 0.1 },
      ],
      threshold: 0.4, // More lenient for typo tolerance
      distance: 100,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
    })
  }, [postsData])

  // Memoize search results
  const results = useMemo(() => {
    if (!fuse || !debouncedQuery.trim()) {
      return []
    }

    const searchResults = fuse.search(debouncedQuery)
    return searchResults.map(result => result.item)
  }, [fuse, debouncedQuery])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="search-container mb-8">
      <div className="relative">
        <input
          type="text"
          id="search-input"
          className="brutal-input w-full pl-12 pr-4 py-4 text-lg"
          placeholder={placeholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoComplete="off"
          aria-label={placeholder}
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-6 w-6 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border-4 border-red-500 text-red-700 dark:text-red-400">
          <div className="font-bold">Failed to load posts</div>
          <div className="text-sm">{error.message}</div>
        </div>
      )}

      {/* Search Results */}
      {query && !error && (
        <div className="mt-4 space-y-4">
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            {isLoading
              ? "Loading posts..."
              : debouncedQuery !== query
                ? "Searching..."
                : `${results.length} results found`}
          </div>

          {results.length > 0 && (
            <div className="space-y-4">
              {results.map(post => (
                <div
                  key={post.slug}
                  className="bg-white dark:bg-neutral-900 border-4 border-black dark:border-white shadow-brutal hover:shadow-brutal-primary p-6 transition-all duration-200 ease-in-out"
                >
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <time className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">
                        {formatDate(post.pubDate)}
                      </time>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs font-bold bg-secondary text-black border-2 border-black"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold">
                      <a
                        href={`/blog/${post.slug}`}
                        className="text-neutral-900 dark:text-neutral-50 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        {stripHtml(post.title)}
                      </a>
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      {stripHtml(post.description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && debouncedQuery && results.length === 0 && (
            <div className="text-center py-8">
              <div className="text-neutral-500 dark:text-neutral-400 text-lg">
                No posts found. Try different keywords!
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
