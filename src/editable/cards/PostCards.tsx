import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}…` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured' }: { post: SitePost; href: string; label?: string }) {
  const image = getEditablePostImage(post)
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#141414] transition duration-300 hover:border-[rgba(255,255,255,0.14)]"
    >
      <div className="relative min-h-[480px]">
        <img
          src={image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-60"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgba(0,0,0,0.95))]" />
        <div className="relative z-10 flex h-full min-h-[480px] flex-col justify-end p-7">
          <span className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#888]">{label}</span>
          <h3 className="text-3xl font-bold leading-tight tracking-[-0.025em] text-white sm:text-4xl">{post.title}</h3>
          <p className="mt-3 line-clamp-2 text-[14px] leading-6 text-white/50">{getEditableExcerpt(post, 160)}</p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition group-hover:bg-[rgba(255,255,255,0.1)]">
            Read more <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getEditablePostImage(post)
  return (
    <Link
      href={href}
      className="group block w-[200px] shrink-0 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#141414] transition duration-300 hover:border-[rgba(255,255,255,0.14)] snap-start"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-[#1a1a1a]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-90" />
        <span className="absolute left-3 top-3 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.8)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
          #{String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#666]">{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-3 text-[15px] font-bold leading-snug tracking-[-0.015em] text-white">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-[#666]">{getEditableExcerpt(post, 90)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#141414] p-4 transition duration-300 hover:border-[rgba(255,255,255,0.14)]"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1e1e1e] text-[13px] font-bold text-[#888]">
          {index + 1}
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#666]">
            {getEditableCategory(post)}
          </p>
          <h3 className="mt-1.5 line-clamp-2 text-[15px] font-bold leading-snug tracking-[-0.015em] text-white">
            {post.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-[#666]">{getEditableExcerpt(post, 90)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getEditablePostImage(post)
  return (
    <Link
      href={href}
      className="group grid min-w-0 gap-5 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#141414] p-4 transition duration-300 hover:border-[rgba(255,255,255,0.14)] sm:grid-cols-[200px_minmax(0,1fr)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#1a1a1a] sm:aspect-auto sm:min-h-[160px]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-90" />
      </div>
      <div className="min-w-0 py-2 sm:pr-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#666]">
          #{String(index + 1).padStart(2, '0')} · {getEditableCategory(post)}
        </p>
        <h2 className="mt-2.5 line-clamp-3 text-xl font-bold leading-snug tracking-[-0.02em] text-white sm:text-2xl">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-[13.5px] leading-6 text-[#666]">{getEditableExcerpt(post, 160)}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#888] transition group-hover:text-white">
          Open <ExternalLink className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  )
}
