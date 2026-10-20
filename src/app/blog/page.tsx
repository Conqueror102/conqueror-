import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { absoluteUrl } from "@/content"
import { JsonLd } from "@/components/json-ld"
import { PortfolioHeader } from "@/components/layout/site-header"
import { getPortfolioContent } from "@/lib/portfolio-content"
import { getPublishedPosts, type Post } from "@/lib/server/blog-repo"
import "../blog.css"

type Props = { searchParams: Promise<{ tag?: string }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const [{ profile }, { tag }] = await Promise.all([getPortfolioContent(), searchParams])
  const title = tag ? `Posts about ${tag}` : "Blog"
  const description = `Notes, build logs and lessons from ${profile.name} on full-stack engineering, AI agents and shipping products.`
  return {
    title,
    description,
    alternates: { canonical: "/blog", types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: `${profile.name} – Blog` }] } },
    openGraph: { type: "website", url: "/blog", title: `${title} | ${profile.name}`, description },
    ...(tag ? { robots: { index: false, follow: true } } : {}),
  }
}

const formatDate = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "")

function PostCard({ post, large = false }: { post: Post; large?: boolean }) {
  return (
    <article className={`blog-card${large ? " blog-card-large" : ""}`}>
      <Link href={`/blog/${post.slug}`} className="blog-card-link">
        <div className="blog-card-image">{post.coverImage ? <Image src={post.coverImage} alt={post.coverAlt || post.title} fill sizes={large ? "(max-width: 900px) 100vw, 60vw" : "(max-width: 700px) 100vw, 33vw"} /> : <span aria-hidden>{post.title.charAt(0)}</span>}</div>
        <div className="blog-card-body">
          <p className="blog-meta"><time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time> · {post.readingMinutes} min read</p>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          {post.tags.length ? <ul className="blog-tags">{post.tags.slice(0, 3).map((tag) => <li key={tag}>{tag}</li>)}</ul> : null}
        </div>
      </Link>
    </article>
  )
}

export default async function BlogIndexPage({ searchParams }: Props) {
  const [content, posts, { tag }] = await Promise.all([getPortfolioContent(), getPublishedPosts(), searchParams])
  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort()
  const visible = tag ? posts.filter((post) => post.tags.some((item) => item.toLowerCase() === tag.toLowerCase())) : posts
  const featured = !tag ? visible.find((post) => post.featured) ?? visible[0] : undefined
  const rest = visible.filter((post) => post !== featured)
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/blog#blog"),
    name: `${content.profile.name} – Blog`,
    url: absoluteUrl("/blog"),
    author: { "@type": "Person", "@id": absoluteUrl("/#person"), name: content.profile.name },
    blogPost: posts.slice(0, 20).map((post) => ({ "@type": "BlogPosting", headline: post.title, url: absoluteUrl(`/blog/${post.slug}`), datePublished: post.publishedAt ?? undefined, dateModified: post.updatedAt })),
  }

  return (
    <div className="blog-page">
      <JsonLd data={schema} />
      <PortfolioHeader content={content} homePath="/" />
      <main className="blog-width">
        <header className="blog-hero">
          <p className="blog-kicker">THE NOTEBOOK</p>
          <h1>Writing</h1>
          <p>Build notes, lessons from shipping, and what I’m learning about AI, payments and products for African markets.</p>
          <a href="/blog/rss.xml" className="blog-rss">RSS feed <ArrowUpRight size={14} aria-hidden /></a>
        </header>
        {tags.length ? (
          <nav className="blog-filter" aria-label="Filter posts by topic">
            <Link href="/blog" aria-current={!tag ? "page" : undefined}>All</Link>
            {tags.map((item) => <Link key={item} href={`/blog?tag=${encodeURIComponent(item)}`} aria-current={tag?.toLowerCase() === item.toLowerCase() ? "page" : undefined}>{item}</Link>)}
          </nav>
        ) : null}
        {visible.length === 0 ? <p className="blog-empty">{posts.length ? "No posts with that tag yet." : "The first posts are on their way."}</p> : null}
        {featured ? <PostCard post={featured} large /> : null}
        {rest.length ? <div className="blog-grid">{rest.map((post) => <PostCard key={post.slug} post={post} />)}</div> : null}
      </main>
    </div>
  )
}
