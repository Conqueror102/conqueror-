import type { MetadataRoute } from "next"
import { absoluteUrl, site } from "@/content"

// Search engines and AI assistants are explicitly welcome: being cited by ChatGPT, Claude,
// Perplexity, Gemini, Copilot and the rest is part of the goal, not something to block.
// Bing's index also feeds ChatGPT search, Copilot and DuckDuckGo, so Bingbot matters as much as Googlebot.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "Amazonbot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "MistralAI-User",
  "cohere-ai",
  "YouBot",
  "CCBot",
]

const privatePaths = ["/api/", "/admin"]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privatePaths },
      { userAgent: aiCrawlers, allow: "/", disallow: privatePaths },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  }
}
