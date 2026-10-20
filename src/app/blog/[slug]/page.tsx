import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { absoluteUrl, site } from "@/content"
import { JsonLd } from "@/components/json-ld"
import { PortfolioHeader } from "@/components/layout/site-header"
import { getPortfolioContent } from "@/lib/portfolio-content"
import { getPublishedPost, getPublishedPosts } from "@/lib/server/blog-repo"
import { renderMarkdown } from "@/lib/markdown"
import "../../blog.css"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getPublishedPosts()).map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const [post, { profile }] = await Promise.all([getPublishedPost(slug), getPortfolioContent()])
  if (!post) return {}
  const title = post.seoTitle || post.title
  const description = post.seoDescription || post.excerpt
  const images = post.coverImage ? [{ url: post.coverImage, alt: post.coverAlt || post.title }] : undefined
  return {
    title,
    description,
    keywords: post.tags,
    authors: [{ name: profile.name, url: site.url }],
    alternates: { canonical: post.canonicalUrl || `/blog/${post.slug}` },
    openGraph: { type: "article", url: `/blog/${post.slug}`, title, description, images, publishedTime: post.publishedAt ?? undefined, modifiedTime: post.updatedAt, authors: [site.url], tags: post.tags, siteName: site.name },
    twitter: { card: "summary_large_image", title, description, images: post.coverImage ? [post.coverImage] : undefined, creator: profile.links.xHandle },
  }
}

const formatDate = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "")

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const [post, content, all] = await Promise.all([getPublishedPost(slug), getPortfolioContent(), getPublishedPosts()])
  if (!post) notFound()
  const { html, headings } = renderMarkdown(post.content)
  const url = absoluteUrl(`/blog/${post.slug}`)
  const related = all.filter((item) => item.slug !== post.slug).map((item) => ({ item, score: item.tags.filter((tag) => post.tags.includes(tag)).length })).sort((a, b) => b.score - a.score).slice(0, 2).map(({ item }) => item)

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#post`,
        headline: post.title,
        description: post.seoDescription || post.excerpt,
        image: post.coverImage ? [post.coverImage.startsWith("http") ? post.coverImage : absoluteUrl(post.coverImage)] : undefined,
        datePublished: post.publishedAt ?? undefined,
        dateModified: post.updatedAt,
        author: { "@type": "Person", "@id": absoluteUrl("/#person"), name: content.profile.name, url: site.url },
        publisher: { "@type": "Person", "@id": absoluteUrl("/#person"), name: content.profile.name },
        mainEntityOfPage: url,
        url,
        keywords: post.tags.join(", "),
        wordCount: post.content.split(/\s+/).filter(Boolean).length,
        timeRequired: `PT${post.readingMinutes}M`,
        inLanguage: "en",
        isPartOf: { "@id": absoluteUrl("/blog#blog") },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  }

  return (
    <div className="blog-page">
      <JsonLd data={schema} />
      <PortfolioHeader content={content} homePath="/" />
      <main>
        <article className="blog-article">
          <header className="blog-width blog-article-head">
            <Link href="/blog" className="blog-back"><ArrowLeft size={14} aria-hidden /> All posts</Link>
            <p className="blog-meta"><time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time> · {post.readingMinutes} min read{post.updatedAt && post.publishedAt && post.updatedAt.slice(0, 10) > post.publishedAt.slice(0, 10) ? <> · Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time></> : null}</p>
            <h1>{post.title}</h1>
            {post.excerpt ? <p className="blog-lead">{post.excerpt}</p> : null}
            <p className="blog-byline">By <Link href="/#about">{content.profile.name}</Link></p>
          </header>
          {post.coverImage ? <figure className="blog-width blog-cover"><Image src={post.coverImage} alt={post.coverAlt || post.title} fill priority sizes="(max-width: 1100px) 100vw, 1100px" /></figure> : null}
          <div className="blog-width blog-body">
            {headings.length > 2 ? (
              <nav className="blog-toc" aria-label="On this page">
                <p>ON THIS PAGE</p>
                <ol>{headings.map((heading) => <li key={heading.id} data-depth={heading.depth}><a href={`#${heading.id}`}>{heading.text}</a></li>)}</ol>
              </nav>
            ) : <div />}
            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
          <footer className="blog-width blog-article-foot">
            {post.tags.length ? <ul className="blog-tags">{post.tags.map((tag) => <li key={tag}><Link href={`/blog?tag=${encodeURIComponent(tag)}`}>{tag}</Link></li>)}</ul> : null}
            <p>Building something? <Link href="/#contact">Let’s talk.</Link></p>
          </footer>
        </article>
        {related.length ? (
          <aside className="blog-width blog-related" aria-label="More posts">
            <p className="blog-kicker">KEEP READING</p>
            <div className="blog-grid">{related.map((item) => <Link key={item.slug} href={`/blog/${item.slug}`} className="blog-related-card"><span className="blog-meta">{formatDate(item.publishedAt)}</span><strong>{item.title}</strong><span>{item.excerpt}</span></Link>)}</div>
          </aside>
        ) : null}
      </main>
    </div>
  )
}
