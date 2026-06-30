import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'
import { Ads } from '@/lib/ads'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const summaryOf = (post: SitePost) => post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post }: { post: SitePost }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const taskRoute = SITE_CONFIG.tasks.find((item) => item.key === task)?.route
  const href = `${taskRoute || `/${task || 'article'}`}/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(255,255,255,0.14)] hover:shadow-[0_20px_56px_rgba(0,0,0,0.5)]"
    >
      {image && task !== 'sbm' ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-panel-bg)]">
          <img src={image} alt="" className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(9,9,11,0.7)] via-transparent to-transparent" />
          <span className="absolute left-3 top-3 rounded-full bg-[rgba(9,9,11,0.85)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
            {taskLabel}
          </span>
        </div>
      ) : (
        <div className="border-b border-[var(--editable-border)] px-5 pt-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">
            {taskLabel}
          </span>
        </div>
      )}
      <div className="p-5">
        <h2 className="editable-display line-clamp-2 text-[17px] font-bold leading-snug tracking-[-0.02em]">{post.title}</h2>
        {summary ? <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-[var(--slot4-muted-text)]">{stripHtml(summary).replace(/\s+/g, ' ').trim()}</p> : null}
        <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--slot4-accent)]">
          Open <ExternalLink className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled && item.key !== 'profile')

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* Search header */}
        <section className="relative overflow-hidden border-b border-[var(--editable-border)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.02),transparent)]" />
          <div className="mx-auto max-w-[var(--editable-container)] px-6 py-14 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">
                  {pagesContent.search.hero.badge}
                </p>
                <h1 className="editable-display mt-5 text-5xl font-bold leading-[1.04] tracking-[-0.03em] sm:text-6xl">
                  {pagesContent.search.hero.title}
                </h1>
                <p className="mt-5 max-w-md text-[15px] leading-7 text-[var(--slot4-muted-text)]">
                  {pagesContent.search.hero.description}
                </p>
              </div>

              {/* Search form */}
              <form action="/search" className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 sm:p-6">
                <input type="hidden" name="master" value="1" />
                <label className="flex items-center gap-3 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-3 transition focus-within:border-[var(--slot4-accent)]/40">
                  <Search className="h-5 w-5 shrink-0 text-[var(--slot4-muted-text)]" />
                  <input
                    name="q"
                    defaultValue={query}
                    placeholder={pagesContent.search.hero.placeholder}
                    className="min-w-0 flex-1 bg-transparent text-[15px] font-medium outline-none placeholder:text-[var(--slot4-muted-text)]"
                  />
                </label>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="flex items-center gap-2 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-3 transition focus-within:border-[var(--slot4-accent)]/40">
                    <Filter className="h-4 w-4 shrink-0 text-[var(--slot4-muted-text)]" />
                    <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[var(--slot4-muted-text)]" />
                  </label>
                  <select
                    name="task"
                    defaultValue={task}
                    className="rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-3 text-sm font-medium text-[var(--slot4-page-text)] outline-none"
                  >
                    <option value="">All content types</option>
                    {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                  </select>
                </div>
                <button
                  className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--slot4-accent-fill)] px-6 text-sm font-semibold text-white transition hover:opacity-90"
                  type="submit"
                >
                  <Search className="h-4 w-4" /> Search
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Ad unit */}
        <div className="mx-auto max-w-[var(--editable-container)] px-6 pt-10 lg:px-8">
          <Ads slot="article-bottom" showLabel className="w-full" />
        </div>

        {/* Results */}
        <section className="mx-auto max-w-[var(--editable-container)] px-6 py-10 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{results.length} results</p>
              <h2 className="editable-display mt-2 text-2xl font-bold tracking-[-0.025em]">
                {query ? `Results for "${query}"` : pagesContent.search.resultsTitle}
              </h2>
            </div>
            <Link href="/article" className="inline-flex items-center gap-2 rounded-xl border border-[var(--editable-border)] px-5 py-2.5 text-[13px] font-medium text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)]/30 hover:text-[var(--slot4-page-text)]">
              Browse latest <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {results.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post) => <SearchResultCard key={post.id || post.slug} post={post} />)}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[var(--editable-border)] p-14 text-center">
              <p className="text-2xl font-bold tracking-[-0.025em]">No matching posts found.</p>
              <p className="mt-3 text-sm text-[var(--slot4-muted-text)]">Try a different keyword, task type, or category.</p>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
