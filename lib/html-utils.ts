// Utility function to strip HTML tags and decode HTML entities
export const stripHtml = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&") // Decode common HTML entities (do &amp; last)
}
