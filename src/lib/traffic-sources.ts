/** Where a visit came from, worked out from the referrer and UTM tags. */
export type SourceType = "ai" | "search" | "social" | "email" | "referral" | "campaign" | "direct" | "internal"
export type TrafficSource = { source: string; type: SourceType }

type Rule = { name: string; type: SourceType; hosts: RegExp; utm?: RegExp }

// Order matters: AI assistants first, since some live on search domains (gemini.google.com, bing.com/chat).
const rules: Rule[] = [
  { name: "ChatGPT", type: "ai", hosts: /(^|\.)(chatgpt\.com|chat\.openai\.com|openai\.com)$/, utm: /^(chatgpt(\.com)?|openai)$/ },
  { name: "Perplexity", type: "ai", hosts: /(^|\.)perplexity\.ai$/, utm: /^perplexity(\.ai)?$/ },
  { name: "Claude", type: "ai", hosts: /(^|\.)claude\.ai$/, utm: /^claude(\.ai)?$/ },
  { name: "Gemini", type: "ai", hosts: /^(gemini|bard)\.google\.com$/, utm: /^gemini(\.google\.com)?$/ },
  { name: "Microsoft Copilot", type: "ai", hosts: /^(copilot\.microsoft\.com|copilot\.cloud\.microsoft|edgeservices\.bing\.com)$/, utm: /^copilot(\.microsoft\.com)?$/ },
  { name: "DeepSeek", type: "ai", hosts: /(^|\.)deepseek\.com$/, utm: /^deepseek/ },
  { name: "Grok", type: "ai", hosts: /(^|\.)(grok\.com|x\.ai)$/, utm: /^grok/ },
  { name: "Meta AI", type: "ai", hosts: /(^|\.)meta\.ai$/, utm: /^meta\.ai$/ },
  { name: "Mistral Le Chat", type: "ai", hosts: /^chat\.mistral\.ai$/, utm: /^mistral/ },
  { name: "Poe", type: "ai", hosts: /(^|\.)poe\.com$/ },
  { name: "You.com", type: "ai", hosts: /(^|\.)you\.com$/ },
  { name: "Phind", type: "ai", hosts: /(^|\.)phind\.com$/ },
  { name: "Kagi", type: "search", hosts: /(^|\.)kagi\.com$/ },
  { name: "Google", type: "search", hosts: /(^|\.)google\.[a-z.]+$/, utm: /^google$/ },
  { name: "Bing", type: "search", hosts: /(^|\.)bing\.com$/, utm: /^bing$/ },
  { name: "DuckDuckGo", type: "search", hosts: /(^|\.)duckduckgo\.com$/ },
  { name: "Yahoo", type: "search", hosts: /(^|\.)yahoo\.com$/ },
  { name: "Brave Search", type: "search", hosts: /^search\.brave\.com$/ },
  { name: "Ecosia", type: "search", hosts: /(^|\.)ecosia\.org$/ },
  { name: "Yandex", type: "search", hosts: /(^|\.)yandex\.[a-z]+$/ },
  { name: "Baidu", type: "search", hosts: /(^|\.)baidu\.com$/ },
  { name: "LinkedIn", type: "social", hosts: /(^|\.)(linkedin\.com|lnkd\.in)$/, utm: /^linkedin/ },
  { name: "X (Twitter)", type: "social", hosts: /(^|\.)(x\.com|twitter\.com|t\.co)$/, utm: /^(x|twitter|x\.com)$/ },
  { name: "GitHub", type: "social", hosts: /(^|\.)github\.com$/, utm: /^github/ },
  { name: "Facebook", type: "social", hosts: /(^|\.)(facebook\.com|fb\.com|fb\.me)$/, utm: /^(facebook|fb)$/ },
  { name: "Instagram", type: "social", hosts: /(^|\.)instagram\.com$/, utm: /^(instagram|ig)$/ },
  { name: "Threads", type: "social", hosts: /(^|\.)threads\.(net|com)$/ },
  { name: "WhatsApp", type: "social", hosts: /(^|\.)(whatsapp\.com|wa\.me)$/, utm: /^whatsapp/ },
  { name: "Telegram", type: "social", hosts: /(^|\.)(t\.me|telegram\.org)$/, utm: /^telegram/ },
  { name: "Reddit", type: "social", hosts: /(^|\.)reddit\.com$/, utm: /^reddit/ },
  { name: "YouTube", type: "social", hosts: /(^|\.)(youtube\.com|youtu\.be)$/, utm: /^youtube/ },
  { name: "TikTok", type: "social", hosts: /(^|\.)tiktok\.com$/, utm: /^tiktok/ },
  { name: "Hacker News", type: "social", hosts: /^news\.ycombinator\.com$/ },
  { name: "Dev.to", type: "social", hosts: /(^|\.)dev\.to$/ },
  { name: "Medium", type: "social", hosts: /(^|\.)medium\.com$/ },
  { name: "Hashnode", type: "social", hosts: /(^|\.)hashnode\.(com|dev)$/ },
  { name: "Gmail", type: "email", hosts: /^mail\.google\.com$/, utm: /^(gmail|email|newsletter)$/ },
  { name: "Outlook", type: "email", hosts: /(^|\.)(outlook\.live\.com|outlook\.office\.com|outlook\.office365\.com)$/ },
  { name: "Yahoo Mail", type: "email", hosts: /^mail\.yahoo\.com$/ },
]

export function hostOf(url: string | null | undefined) {
  if (!url) return ""
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase()
  } catch {
    return ""
  }
}

export function classifySource({ referrer, utmSource, utmMedium, siteHost }: { referrer?: string | null; utmSource?: string | null; utmMedium?: string | null; siteHost?: string }): TrafficSource {
  const utm = utmSource?.trim().toLowerCase()
  if (utm) {
    const rule = rules.find((item) => item.utm?.test(utm) || item.hosts.test(utm))
    if (rule) return { source: rule.name, type: rule.type }
    if (utmMedium && /e-?mail|newsletter/i.test(utmMedium)) return { source: utmSource!, type: "email" }
    return { source: utmSource!, type: "campaign" }
  }
  const host = hostOf(referrer)
  if (!host) return { source: "Direct", type: "direct" }
  // A session that starts from one of your own pages (a reload or an old tab) counts as direct.
  if (siteHost && (host === siteHost.replace(/^www\./, "") || host === "localhost")) return { source: "Direct", type: "direct" }
  const rule = rules.find((item) => item.hosts.test(host))
  if (rule) return { source: rule.name, type: rule.type }
  if (/^android-app:\/\/com\.google/.test(referrer ?? "")) return { source: "Google", type: "search" }
  return { source: host, type: "referral" }
}

/** Known crawlers, with AI crawlers named so you can see which assistants are reading the site. */
const crawlerRules: { name: string; ai: boolean; pattern: RegExp }[] = [
  { name: "GPTBot (OpenAI training)", ai: true, pattern: /GPTBot/i },
  { name: "ChatGPT-User (live browsing)", ai: true, pattern: /ChatGPT-User/i },
  { name: "OAI-SearchBot (ChatGPT search)", ai: true, pattern: /OAI-SearchBot/i },
  { name: "ClaudeBot", ai: true, pattern: /ClaudeBot|Claude-Web|Claude-User|Claude-SearchBot|anthropic-ai/i },
  { name: "PerplexityBot", ai: true, pattern: /PerplexityBot|Perplexity-User/i },
  { name: "Google-Extended / Gemini", ai: true, pattern: /Google-Extended|GoogleOther/i },
  { name: "Applebot", ai: true, pattern: /Applebot/i },
  { name: "Meta AI", ai: true, pattern: /meta-externalagent|FacebookBot|meta-externalfetcher/i },
  { name: "Bytespider (TikTok/Doubao)", ai: true, pattern: /Bytespider/i },
  { name: "Amazonbot", ai: true, pattern: /Amazonbot/i },
  { name: "CCBot (Common Crawl)", ai: true, pattern: /CCBot/i },
  { name: "DeepSeekBot", ai: true, pattern: /DeepSeek/i },
  { name: "MistralAI-User", ai: true, pattern: /MistralAI/i },
  { name: "YouBot", ai: true, pattern: /YouBot/i },
  { name: "cohere-ai", ai: true, pattern: /cohere-ai/i },
  { name: "Googlebot", ai: false, pattern: /Googlebot|Google-InspectionTool|Storebot-Google/i },
  { name: "Bingbot", ai: false, pattern: /bingbot|BingPreview/i },
  { name: "LinkedInBot", ai: false, pattern: /LinkedInBot/i },
  { name: "Twitterbot", ai: false, pattern: /Twitterbot/i },
  { name: "facebookexternalhit", ai: false, pattern: /facebookexternalhit/i },
  { name: "WhatsApp preview", ai: false, pattern: /^WhatsApp\//i },
  { name: "Slackbot", ai: false, pattern: /Slackbot/i },
  { name: "Discordbot", ai: false, pattern: /Discordbot/i },
  { name: "TelegramBot", ai: false, pattern: /TelegramBot/i },
  { name: "DuckDuckBot", ai: false, pattern: /DuckDuckBot/i },
  { name: "YandexBot", ai: false, pattern: /YandexBot/i },
  { name: "Ahrefs / Semrush", ai: false, pattern: /AhrefsBot|SemrushBot|MJ12bot|DotBot/i },
]

const genericBot = /bot|crawler|spider|crawling|headless|lighthouse|pingdom|uptime|monitor|curl|wget|python-requests|axios|node-fetch|go-http-client/i

export function detectCrawler(userAgent: string | null | undefined) {
  if (!userAgent) return null
  const rule = crawlerRules.find((item) => item.pattern.test(userAgent))
  if (rule) return { name: rule.name, ai: rule.ai }
  return genericBot.test(userAgent) ? { name: "Other bot", ai: false } : null
}
