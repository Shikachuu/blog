import { describe, expect, it } from "vitest"
import { stripHtml } from "@/lib/html-utils"

describe("stripHtml", () => {
  describe("HTML tag removal", () => {
    it("should remove simple HTML tags", () => {
      const input = "<p>Hello world</p>"
      const expected = "Hello world"

      expect(stripHtml(input)).toBe(expected)
    })

    it("should remove multiple HTML tags", () => {
      const input = "<div><p>Hello <strong>world</strong></p></div>"
      const expected = "Hello world"

      expect(stripHtml(input)).toBe(expected)
    })

    it("should remove self-closing tags", () => {
      const input = "Line 1<br/>Line 2<hr />End"
      const expected = "Line 1Line 2End"

      expect(stripHtml(input)).toBe(expected)
    })

    it("should remove tags with attributes", () => {
      const input = '<a href="https://example.com" class="link">Click here</a>'
      const expected = "Click here"

      expect(stripHtml(input)).toBe(expected)
    })

    it("should remove nested tags", () => {
      const input = "<div><span><em>Nested <strong>content</strong></em></span></div>"
      const expected = "Nested content"

      expect(stripHtml(input)).toBe(expected)
    })

    it("should handle malformed tags", () => {
      const input = "<p>Text with <unclosed tag and >broken< markup</p>"
      const expected = "Text with broken"

      expect(stripHtml(input)).toBe(expected)
    })
  })

  describe("HTML entity decoding", () => {
    it("should decode quote entities", () => {
      const input = "He said &quot;Hello world&quot;"
      const expected = 'He said "Hello world"'

      expect(stripHtml(input)).toBe(expected)
    })

    it("should decode apostrophe entities", () => {
      const input = "It&#39;s a beautiful day"
      const expected = "It's a beautiful day"

      expect(stripHtml(input)).toBe(expected)
    })

    it("should decode less than entities", () => {
      const input = "5 &lt; 10"
      const expected = "5 < 10"

      expect(stripHtml(input)).toBe(expected)
    })

    it("should decode greater than entities", () => {
      const input = "10 &gt; 5"
      const expected = "10 > 5"

      expect(stripHtml(input)).toBe(expected)
    })

    it("should decode ampersand entities (processed last)", () => {
      const input = "Tom &amp; Jerry"
      const expected = "Tom & Jerry"

      expect(stripHtml(input)).toBe(expected)
    })

    it("should decode multiple different entities", () => {
      const input = "&quot;Life &amp; liberty&quot; &lt; &gt; &#39;freedom&#39;"
      const expected = "\"Life & liberty\" < > 'freedom'"

      expect(stripHtml(input)).toBe(expected)
    })
  })

  describe("Combined HTML tags and entities", () => {
    it("should remove tags and decode entities together", () => {
      const input = "<p>&quot;Hello &amp; welcome&quot; to <strong>our site</strong></p>"
      const expected = '"Hello & welcome" to our site'

      expect(stripHtml(input)).toBe(expected)
    })

    it("should handle complex HTML with multiple entities", () => {
      const input =
        "<div><h1>Title &quot;Test&quot;</h1><p>Content with &lt;code&gt; &amp; <em>emphasis</em></p></div>"
      const expected = 'Title "Test"Content with <code> & emphasis'

      expect(stripHtml(input)).toBe(expected)
    })

    it("should handle entities within HTML attributes (should be removed)", () => {
      const input = '<a href="/path?param=value&amp;other=test">Link &quot;text&quot;</a>'
      const expected = 'Link "text"'

      expect(stripHtml(input)).toBe(expected)
    })
  })

  describe("Edge cases", () => {
    it("should handle empty string", () => {
      expect(stripHtml("")).toBe("")
    })

    it("should handle string with no HTML or entities", () => {
      const input = "Just plain text"
      expect(stripHtml(input)).toBe(input)
    })

    it("should handle string with only entities", () => {
      const input = "&quot;&amp;&lt;&gt;&#39;"
      const expected = "\"&<>'"

      expect(stripHtml(input)).toBe(expected)
    })

    it("should handle string with only HTML tags", () => {
      const input = "<div><p><span></span></p></div>"
      const expected = ""

      expect(stripHtml(input)).toBe(expected)
    })

    it("should handle entities that should not be decoded", () => {
      const input = "&nbsp; &copy; &reg;"
      const expected = "&nbsp; &copy; &reg;"

      expect(stripHtml(input)).toBe(expected)
    })

    it("should handle partial entities", () => {
      const input = "&quo; &am; &l; incomplete entities"
      const expected = "&quo; &am; &l; incomplete entities"

      expect(stripHtml(input)).toBe(expected)
    })

    it("should handle mixed case entities", () => {
      const input = "&QUOT; &AMP; &LT;"
      const expected = "&QUOT; &AMP; &LT;"

      expect(stripHtml(input)).toBe(expected)
    })
  })

  describe("Real-world examples", () => {
    it("should clean blog post content", () => {
      const input = `
        <article>
          <h2>Blog Title &quot;Example&quot;</h2>
          <p>This is a <strong>blog post</strong> with &amp; symbols.</p>
          <blockquote>&quot;Quote text&quot; &lt;author&gt;</blockquote>
        </article>
      `
      const expected = `
        
          Blog Title "Example"
          This is a blog post with & symbols.
          "Quote text" <author>
        
      `

      expect(stripHtml(input)).toBe(expected)
    })

    it("should clean search content", () => {
      const input = "<p>Search for <code>&quot;function&quot;</code> &amp; <em>variables</em></p>"
      const expected = 'Search for "function" & variables'

      expect(stripHtml(input)).toBe(expected)
    })

    it("should handle markdown-like content with HTML", () => {
      const input = '<p>Here&#39;s some <code>code</code> and a <a href="#">link</a></p>'
      const expected = "Here's some code and a link"

      expect(stripHtml(input)).toBe(expected)
    })
  })
})
