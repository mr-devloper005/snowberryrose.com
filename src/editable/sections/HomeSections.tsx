'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowRight, Bookmark, ChevronDown, ChevronUp,
  ExternalLink, Globe, Search, Star, X,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function getExcerpt(post?: SitePost | null, limit = 120) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary || ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}…` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

function getWebsite(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.website === 'string' && content.website) || (typeof content.url === 'string' && content.url) || ''
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  return posts.filter((p) => {
    const key = p.slug || p.id || p.title
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const wrap = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

/* ─── Reusable section badge (the Infranex pill pattern) ─── */
function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(255,255,255,0.1)] bg-[#1a1a1a] px-4 py-2">
      <Bookmark className="h-3.5 w-3.5 text-white opacity-70" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">{children}</span>
    </div>
  )
}

/* ─── Hero ─── */
export function EditableHomeHero(_: HomeSectionProps) {
  return (
    <>
      {/* Hero with cosmic/nebula dark bg */}
      <section className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#080808] text-center">
        {/* Layered dark cloud/nebula bg — pure CSS */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[#080808]" />
          {/* Cloud-like dark masses */}
          <div className="absolute right-[5%] top-[8%] h-[500px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(45,45,45,0.55)_0%,transparent_70%)] blur-[2px]" />
          <div className="absolute right-[20%] top-[15%] h-[350px] w-[450px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(35,35,35,0.6)_0%,transparent_65%)]" />
          <div className="absolute right-[10%] top-[30%] h-[280px] w-[380px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(55,55,55,0.35)_0%,transparent_60%)] blur-[1px]" />
          <div className="absolute left-[5%] top-[40%] h-[200px] w-[200px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(40,40,40,0.4)_0%,transparent_70%)]" />
          {/* Subtle center glow */}
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(30,30,30,0.3)_0%,transparent_60%)]" />
          {/* Very subtle grain overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: '200px 200px' }} />
        </div>

        <div className={`${wrap} flex flex-col items-center gap-8 py-32`}>
          {/* Badge */}
          <SectionBadge>{pagesContent.home.hero.badge}</SectionBadge>

          {/* Headline */}
          <h1 className="max-w-3xl text-balance text-[3.25rem] font-bold leading-[1.04] tracking-[-0.03em] text-white sm:text-[4.5rem] lg:text-[5.5rem]">
            {pagesContent.home.hero.title?.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>

          {/* Subheading */}
          <p className="max-w-lg text-[17px] leading-7 text-[#888888]">
            {pagesContent.home.hero.description}
          </p>

          {/* Single dark CTA — matches Infranex's "GET STARTED NOW →" */}
          <Link
            href={pagesContent.home.hero.primaryCta.href}
            className="inline-flex items-center gap-3 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#1e1e1e] px-8 py-4 text-[15px] font-semibold text-white transition duration-200 hover:bg-[#2a2a2a] active:scale-[0.98]"
          >
            {pagesContent.home.hero.primaryCta.label.toUpperCase()}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Trust strip at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[rgba(255,255,255,0.06)]">
          <div className={`${wrap} py-6`}>
            <p className="mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.26em] text-[#555555]">
              Trusted by the world&apos;s largest companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-30">
              {['TECHCORP', 'WEBFLOW', 'STRIPE', 'VERCEL', 'NOTION', 'LINEAR'].map((brand) => (
                <span key={brand} className="text-[13px] font-bold tracking-[0.12em] text-white">{brand}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* helpers for extracting post data */
const postContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const postText = (v: unknown) => typeof v === 'string' ? v.trim() : ''
const postCategory = (post: SitePost) => postText(postContent(post).category) || post.tags?.[0] || ''

/* ─── How It Works — 3 tall cards ─── */
export function EditableStoryRail({ posts, primaryRoute }: HomeSectionProps) {
  const livePosts = posts.slice(0, 12)

  /* derive categories from real tags, fall back to generic labels */
  const rawCategories = [...new Set(
    livePosts.flatMap((p) => [...(p.tags || []), postCategory(p)]).filter(Boolean)
  )].slice(0, 5)
  const categories = rawCategories.length >= 3 ? rawCategories : ['Services', 'Dining', 'Retail', 'Health', 'Tech']

  /* pick a representative post for the detail card */
  const detailPost = livePosts[0] ?? null

  const steps = [
    {
      title: 'Browse Local Listings',
      body: 'Search businesses, services, and spaces by name or keyword. Every listing is clean, detailed, and easy to navigate.',
      mockup: <BrowseMockup posts={livePosts} primaryRoute={primaryRoute} />,
    },
    {
      title: 'Filter by Category',
      body: 'Explore by service type, industry, or location. Narrow results instantly to find exactly what you\'re looking for.',
      mockup: <FilterMockup posts={livePosts} categories={categories} primaryRoute={primaryRoute} />,
    },
    {
      title: 'Connect Directly',
      body: 'Get business details, opening hours, location, and contact info — all on one focused, distraction-free page.',
      mockup: <ConnectMockup post={detailPost} primaryRoute={primaryRoute} />,
    },
  ]

  return (
    <section className="bg-[#080808] py-24 sm:py-28">
      <div className={wrap}>
        <div className="mb-14 flex flex-col items-center gap-5 text-center">
          <SectionBadge>HOW IT WORKS</SectionBadge>
          <h2 className="max-w-2xl text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[3.5rem]">
            Find any business in three steps
          </h2>
          <p className="max-w-lg text-[16px] leading-7 text-[#888888]">
            Browse, filter, and connect with local businesses and services — all in one clean experience.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#141414] transition duration-300 hover:border-[rgba(255,255,255,0.12)]"
            >
              <div className="flex flex-1 items-center justify-center p-8 pt-10">
                {step.mockup}
              </div>
              <div className="border-t border-[rgba(255,255,255,0.07)] p-7">
                <h3 className="text-[18px] font-bold tracking-[-0.015em]">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#888888]">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Card mockup UIs */
const FALLBACK_ICONS = ['🏪', '🏢', '☕', '🎨', '🏋️', '🌿', '🖥️', '📦']

function BrowseMockup({ posts, primaryRoute }: { posts: SitePost[]; primaryRoute: string }) {
  const router = useRouter()
  const [q, setQ] = useState('')
  const items = posts.slice(0, 4).map((p, i) => ({
    icon: FALLBACK_ICONS[i % FALLBACK_ICONS.length],
    label: p.title,
    sub: postCategory(p) || 'Listing',
    slug: p.slug,
  }))

  return (
    <div className="w-full max-w-[280px] space-y-2.5">
      <form
        onSubmit={(e) => { e.preventDefault(); router.push(`/search?q=${encodeURIComponent(q.trim() || '')}`) }}
        className="flex items-center gap-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#1e1e1e] px-4 py-3"
      >
        <Search className="h-4 w-4 shrink-0 text-[#555]" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search businesses, services…"
          className="flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-[#555]"
        />
      </form>
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`${primaryRoute}/${item.slug}`}
          className="flex items-center gap-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1a1a] px-4 py-2.5 transition hover:border-[rgba(255,255,255,0.14)] hover:bg-[#222]"
        >
          <span className="text-sm">{item.icon}</span>
          <div className="min-w-0">
            <p className="truncate text-[13px] text-[#aaa]">{item.label}</p>
            <p className="text-[10px] capitalize text-[#555]">{item.sub}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

function FilterMockup({ posts, categories, primaryRoute }: { posts: SitePost[]; categories: string[]; primaryRoute: string }) {
  const [active, setActive] = useState(categories[0] ?? '')
  const router = useRouter()

  const filtered = active
    ? posts.filter((p) =>
        (p.tags || []).some((t) => t.toLowerCase() === active.toLowerCase()) ||
        postCategory(p).toLowerCase() === active.toLowerCase()
      ).slice(0, 3)
    : posts.slice(0, 3)

  const displayPosts = filtered.length ? filtered : posts.slice(0, 3)

  return (
    <div className="w-full max-w-[280px] space-y-3">
      <div className="flex flex-wrap gap-2">
        {categories.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => { setActive(tag); router.push(`/search?category=${encodeURIComponent(tag.toLowerCase())}`) }}
            className={`rounded-full border px-3 py-1 text-[12px] font-medium capitalize transition ${tag === active ? 'border-white/30 bg-white/10 text-white' : 'border-[rgba(255,255,255,0.06)] bg-[#1a1a1a] text-[#666] hover:border-[rgba(255,255,255,0.14)] hover:text-[#aaa]'}`}
          >
            {tag}
          </button>
        ))}
      </div>
      {displayPosts.map((post) => (
        <Link
          key={post.slug}
          href={`${primaryRoute}/${post.slug}`}
          className="block rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1a1a] p-3.5 transition hover:border-[rgba(255,255,255,0.14)] hover:bg-[#222]"
        >
          <p className="truncate text-[13px] font-semibold text-white/90">{post.title}</p>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] capitalize text-[#555]">
            <Globe className="h-3 w-3 shrink-0" />
            {postCategory(post) || 'Listing'}
          </p>
        </Link>
      ))}
    </div>
  )
}

function ConnectMockup({ post, primaryRoute }: { post: SitePost | null; primaryRoute: string }) {
  const content = post ? postContent(post) : {}
  const address = postText(content.address) || postText(content.location) || ''
  const phone = postText(content.phone) || ''
  const website = postText(content.website) || postText(content.url) || ''
  const hours = postText(content.hours) || postText(content.openingHours) || ''
  const category = post ? postCategory(post) : ''
  const mapsHref = address ? `https://maps.google.com/maps?q=${encodeURIComponent(address)}` : 'https://maps.google.com'

  const rows = [
    { icon: '📍', text: address || '42 Blossom Ave, Suite 3', href: mapsHref, external: true },
    { icon: '🕐', text: hours || 'Mon–Sat  9 AM – 8 PM', href: null, external: false },
    { icon: '📞', text: phone || '+1 (555) 204-7891', href: phone ? `tel:${phone}` : null, external: false },
    { icon: '🌐', text: website || 'snowberryrose.com', href: website || '/search', external: !!website },
  ]

  return (
    <div className="w-full max-w-[280px]">
      <div className="rounded-xl border border-[rgba(255,255,255,0.07)] bg-[#1a1a1a] p-4">
        <div className="flex items-center gap-3 border-b border-[rgba(255,255,255,0.06)] pb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#252525] text-lg">🏪</div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-white">{post?.title ?? 'Sunrise Market'}</p>
            <p className="text-[11px] capitalize text-[#555]">{category || 'Grocery'} · Open now</p>
          </div>
        </div>
        <div className="mt-3 space-y-2.5">
          {rows.map((row) =>
            row.href ? (
              <a key={row.text} href={row.href} target={row.external ? '_blank' : undefined} rel="noreferrer"
                className="flex items-center gap-2.5 transition hover:opacity-80">
                <span className="shrink-0 text-sm">{row.icon}</span>
                <span className="truncate text-[11px] text-[#888] underline-offset-2 hover:underline">{row.text}</span>
              </a>
            ) : (
              <div key={row.text} className="flex items-center gap-2.5">
                <span className="shrink-0 text-sm">{row.icon}</span>
                <span className="truncate text-[11px] text-[#888]">{row.text}</span>
              </div>
            )
          )}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <a href={mapsHref} target="_blank" rel="noreferrer"
            className="rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#1e1e1e] px-3 py-2 text-center text-[11px] font-semibold text-white/70 transition hover:bg-[#2a2a2a] hover:text-white">
            Directions
          </a>
          <Link href={post ? `${primaryRoute}/${post.slug}` : '/contact'}
            className="rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#1e1e1e] px-3 py-2 text-center text-[11px] font-semibold text-white/70 transition hover:bg-[#2a2a2a] hover:text-white">
            {post ? 'View listing' : 'Contact'}
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ─── Content grid (dynamic posts) ─── */
export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((s) => s.posts)]).slice(0, 6)
  if (!pool.length) return null

  return (
    <section className="border-t border-[rgba(255,255,255,0.06)] bg-[#0a0a0a] py-24 sm:py-28">
      <div className={wrap}>
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <SectionBadge>LATEST CONTENT</SectionBadge>
          <h2 className="text-[2.5rem] font-bold tracking-[-0.03em] sm:text-[3.25rem]">
            Fresh from the platform
          </h2>
          <p className="max-w-lg text-[16px] text-[#888888]">
            The newest saves and discoveries from across {SITE_CONFIG.name}.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pool.map((post) => (
            <ContentCard
              key={post.id || post.slug}
              post={post}
              task={primaryTask}
              href={postHref(primaryTask, post, primaryRoute)}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={primaryRoute}
            className="inline-flex items-center gap-2.5 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#1e1e1e] px-7 py-3.5 text-[14px] font-semibold text-white transition hover:bg-[#2a2a2a]"
          >
            Browse all content <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function ContentCard({ post, href, task }: { post: SitePost; href: string; task: TaskKey }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post)
  const website = getWebsite(post)
  const isBookmark = task === 'sbm'

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#141414] transition duration-300 hover:border-[rgba(255,255,255,0.14)]"
    >
      {!isBookmark && image && !image.includes('placeholder') ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-[#1a1a1a]">
          <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:opacity-90 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-transparent to-transparent" />
          {category ? (
            <span className="absolute left-3 top-3 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.8)] px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              {category}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        {isBookmark ? (
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1e1e1e]">
              <Globe className="h-3.5 w-3.5 text-[#888]" />
            </div>
            <span className="truncate text-[12px] text-[#666]">
              {website ? website.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'Bookmark'}
            </span>
          </div>
        ) : null}

        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-[-0.01em] text-white/90 transition group-hover:text-white">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-[#666]">{getExcerpt(post, 100)}</p>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-[rgba(255,255,255,0.06)] pt-4">
          <div className="flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className={`h-3 w-3 ${i < 4 ? 'fill-[#555] text-[#555]' : 'fill-[#2a2a2a] text-[#2a2a2a]'}`} />
            ))}
          </div>
          <span className="flex items-center gap-1 text-[12px] text-[#666] transition group-hover:text-[#aaa]">
            {isBookmark ? 'Open' : 'Read'} <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ─── Features grid (6 cards) ─── */
export function EditableTimeCollections(_props: HomeSectionProps) {
  const features = [
    { icon: '🔖', title: 'Save in one click', body: 'Capture any URL instantly and add it to your personal collection without friction.' },
    { icon: '🗂️', title: 'Smart organization', body: 'Categorize resources by topic, type, or tag so you can find them effortlessly later.' },
    { icon: '🔍', title: 'Powerful search', body: 'Full-text search across titles, descriptions, tags, and categories all at once.' },
    { icon: '📄', title: 'Rich content types', body: 'Bookmarks, articles, images, PDFs, and listings — all under one roof.' },
    { icon: '⚡', title: 'Instant discovery', body: 'Browse curated feeds of the freshest resources as they are added to the platform.' },
    { icon: '🌐', title: 'Public collections', body: 'Share your curated boards with the world or keep them private — your choice.' },
  ]

  return (
    <section className="border-t border-[rgba(255,255,255,0.06)] bg-[#080808] py-24 sm:py-28">
      <div className={wrap}>
        <div className="mb-14 flex flex-col items-center gap-5 text-center">
          <SectionBadge>FEATURES</SectionBadge>
          <h2 className="max-w-2xl text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[3.5rem]">
            Your discovery engine, reinvented
          </h2>
          <p className="max-w-lg text-[16px] leading-7 text-[#888888]">
            Every tool you need to save, organize, and explore curated content — in one place.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col gap-4 rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#141414] p-7 transition duration-300 hover:border-[rgba(255,255,255,0.12)]"
            >
              <span className="text-3xl">{f.icon}</span>
              <div>
                <h3 className="text-[16px] font-bold">{f.title}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-[#888]">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Comparison section ─── */
export function EditableComparisonSection() {
  const ours = [
    'Save any resource in one click',
    'Unified hub for all content types',
    'Smart search across your library',
    'Always-on discovery feed',
    'Clean, distraction-free design',
    'Real-time curated collections',
    'Transparent, simple access model',
    'Proven results for curious minds',
  ]
  const theirs = [
    'Manual bookmarking across tabs',
    'Scattered across disconnected apps',
    'No cross-platform search',
    'Slow, algorithm-driven feeds',
    'Cluttered, noisy interfaces',
    'Reactive after-the-fact saving',
    'Hidden costs and feature walls',
    'Generic results with no curation',
  ]

  return (
    <section className="border-t border-[rgba(255,255,255,0.06)] bg-[#0a0a0a] py-24 sm:py-28">
      <div className={wrap}>
        <div className="mb-14 flex flex-col items-center gap-5 text-center">
          <SectionBadge>COMPARE</SectionBadge>
          <h2 className="max-w-2xl text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[3.5rem]">
            How {SITE_CONFIG.name} stands apart
          </h2>
          <p className="max-w-lg text-[16px] leading-7 text-[#888888]">
            Discover how we deliver a smarter, more focused discovery experience.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Us */}
          <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#141414] p-8">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[rgba(255,255,255,0.1)] bg-[#1e1e1e] px-4 py-2">
              <Bookmark className="h-3.5 w-3.5 text-white/70" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">{SITE_CONFIG.name.toUpperCase()}</span>
            </div>
            <ul className="divide-y divide-[rgba(255,255,255,0.06)]">
              {ours.map((item) => (
                <li key={item} className="flex items-center gap-4 py-4">
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/50" />
                  <span className="text-[15px] font-medium text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Others */}
          <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#0e0e0e] p-8">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[rgba(255,255,255,0.06)] bg-[#141414] px-4 py-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#555]">ALTERNATIVES</span>
            </div>
            <ul className="divide-y divide-[rgba(255,255,255,0.04)]">
              {theirs.map((item) => (
                <li key={item} className="flex items-center gap-4 py-4">
                  <X className="h-4 w-4 shrink-0 text-[#444]" />
                  <span className="text-[15px] text-[#555]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ accordion (needs useState — 'use client' on parent) ─── */
const faqs = [
  { q: 'What kind of content can I save?', a: 'You can save bookmarks (URLs), articles, images, PDFs, business listings, and classified posts. All content types are browseable and searchable from one place.' },
  { q: 'Is it free to explore and discover content?', a: 'Yes — browsing, searching, and reading content is completely free. Creating an account lets you add content and manage your own collection.' },
  { q: 'How does the search work?', a: 'Our search covers titles, descriptions, categories, and tags across every content type simultaneously, so you always find what you\'re looking for.' },
  { q: 'Can I share collections or bookmarks with others?', a: 'Absolutely. Any saved resource is publicly reachable via its URL. You can share individual posts or point people to any category or section directly.' },
  { q: 'How do I submit content to the platform?', a: 'Create a free account and use the Create page to submit bookmarks, articles, and more. Submissions appear on the platform for everyone to discover.' },
]

export function EditableHomeFaq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="border-t border-[rgba(255,255,255,0.06)] bg-[#080808] py-24 sm:py-28">
      <div className={`${wrap} max-w-3xl`}>
        <div className="mb-14 flex flex-col items-center gap-5 text-center">
          <SectionBadge>COMMON QUESTIONS</SectionBadge>
          <h2 className="text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[3.5rem]">
            Got questions? We&apos;ve got answers.
          </h2>
          <p className="text-[16px] leading-7 text-[#888888]">
            Find quick answers to the most common questions about the platform.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-[rgba(255,255,255,0.07)] bg-[#141414]"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
              >
                <span className="text-[15px] font-semibold text-white">{faq.q}</span>
                {open === i
                  ? <ChevronUp className="h-5 w-5 shrink-0 text-[#888]" />
                  : <ChevronDown className="h-5 w-5 shrink-0 text-[#888]" />}
              </button>
              {open === i ? (
                <div className="border-t border-[rgba(255,255,255,0.06)] px-7 pb-6 pt-4">
                  <p className="text-[14.5px] leading-7 text-[#888888]">{faq.a}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Final CTA ─── */
export function EditableHomeCta() {
  return (
    <section className="border-t border-[rgba(255,255,255,0.06)] bg-[#0a0a0a] py-28 sm:py-32">
      <div className={`${wrap} flex flex-col items-center gap-7 text-center`}>
        <SectionBadge>{pagesContent.home.cta.badge}</SectionBadge>
        <h2 className="max-w-2xl text-balance text-[2.75rem] font-bold leading-[1.04] tracking-[-0.03em] sm:text-[3.75rem]">
          {pagesContent.home.cta.title}
        </h2>
        <p className="max-w-md text-[16px] leading-7 text-[#888888]">
          {pagesContent.home.cta.description}
        </p>
        <Link
          href={pagesContent.home.cta.primaryCta.href}
          className="inline-flex items-center gap-3 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#1e1e1e] px-8 py-4 text-[15px] font-semibold text-white transition hover:bg-[#2a2a2a] active:scale-[0.98]"
        >
          {pagesContent.home.cta.primaryCta.label.toUpperCase()} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
