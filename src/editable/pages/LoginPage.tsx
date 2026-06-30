import type { Metadata } from 'next'
import Link from 'next/link'
import { Bookmark, Shield, Sparkles } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

const perks = [
  { icon: Bookmark, label: 'Save bookmarks', body: 'Curate and organise resources that matter to you.' },
  { icon: Sparkles, label: 'Create posts', body: 'Publish articles, listings, and collections.' },
  { icon: Shield, label: 'Private & secure', body: 'Your data stays yours — always.' },
]

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="flex min-h-[calc(100vh-4rem)] items-center bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid w-full max-w-[var(--editable-container)] items-center gap-14 px-6 py-16 lg:grid-cols-[1fr_0.92fr] lg:px-8">
          {/* Left: brand pitch */}
          <div className="max-w-xl">
            <Link href="/" className="mb-8 inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--slot4-accent-soft)] ring-1 ring-[var(--slot4-accent)]/20">
                <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-6 w-6 object-contain" />
              </div>
              <span className="text-[15px] font-semibold tracking-tight">{SITE_CONFIG.name}</span>
            </Link>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.auth.login.badge}</p>
            <h1 className="editable-display mt-5 text-5xl font-bold leading-[1.04] tracking-[-0.03em] sm:text-6xl">
              {pagesContent.auth.login.title}
            </h1>
            <p className="mt-5 text-[16px] leading-7 text-[var(--slot4-muted-text)]">
              {pagesContent.auth.login.description}
            </p>
            <div className="mt-10 space-y-4">
              {perks.map(({ icon: Icon, label, body }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)]">
                    <Icon className="h-4 w-4 text-[var(--slot4-accent)]" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold">{label}</p>
                    <p className="text-[13px] text-[var(--slot4-muted-text)]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form card */}
          <div className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-8 shadow-[0_24px_64px_rgba(0,0,0,0.5)] sm:p-10">
            <h2 className="editable-display text-2xl font-bold tracking-[-0.02em]">{pagesContent.auth.login.formTitle}</h2>
            <p className="mt-2 text-[13px] text-[var(--slot4-muted-text)]">Enter your credentials to continue.</p>
            <EditableLocalLoginForm />
            <p className="mt-6 text-[13px] text-[var(--slot4-muted-text)]">
              New here?{' '}
              <Link href="/signup" className="font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">
                {pagesContent.auth.login.createCta}
              </Link>
            </p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
