import type * as blog from "@/lib/blog"

// SWR fetcher function
export const fetcher = async (url: string): Promise<blog.SearchPost[]> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}
