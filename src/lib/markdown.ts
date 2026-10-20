import { Marked } from "marked"
import sanitizeHtml from "sanitize-html"

export type Heading = { id: string; text: string; depth: number }

const attr = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")
const slug = (text: string) => text.toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-")

/** Markdown to safe HTML, with heading ids for the table of contents and lazy images. */
export function renderMarkdown(markdown: string) {
  const headings: Heading[] = []
  const used = new Map<string, number>()
  const marked = new Marked({ gfm: true })
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens)
        let id = slug(text) || "section"
        const count = used.get(id) ?? 0
        used.set(id, count + 1)
        if (count) id = `${id}-${count}`
        if (depth === 2 || depth === 3) headings.push({ id, text: text.replace(/<[^>]+>/g, ""), depth })
        return `<h${depth} id="${id}">${text}</h${depth}>`
      },
      image({ href, title, text }) {
        return `<figure><img src="${attr(href)}" alt="${attr(text)}" loading="lazy" decoding="async"${title ? ` title="${attr(title)}"` : ""} />${title ? `<figcaption>${attr(title)}</figcaption>` : ""}</figure>`
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens)
        const external = /^https?:\/\//.test(href)
        return `<a href="${attr(href)}"${title ? ` title="${attr(title)}"` : ""}${external ? ' target="_blank" rel="noopener"' : ""}>${text}</a>`
      },
    },
  })
  const raw = marked.parse(markdown, { async: false })
  const html = sanitizeHtml(raw, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "figure", "figcaption", "h1", "h2", "del", "details", "summary", "video", "source", "iframe"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["id", "class"],
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "loading", "decoding", "width", "height"],
      video: ["src", "controls", "poster", "width", "height"],
      source: ["src", "type"],
      iframe: ["src", "title", "width", "height", "allow", "allowfullscreen", "loading"],
      code: ["class"],
    },
    // Embeds only from video sites.
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com", "player.vimeo.com", "www.loom.com"],
  })
  return { html, headings }
}
