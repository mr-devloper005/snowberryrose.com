import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--editable-border)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.02),transparent)]" />
          <div className="mx-auto max-w-[var(--editable-container)] px-6 py-20 sm:py-28 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
            <h1 className="editable-display mt-5 max-w-3xl text-5xl font-bold leading-[1.04] tracking-[-0.03em] sm:text-6xl">
              About {SITE_CONFIG.name}
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-[var(--slot4-muted-text)]">
              {pagesContent.about.description}
            </p>
          </div>
        </section>

        {/* Main content */}
        <section className="mx-auto max-w-[var(--editable-container)] px-6 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
            {/* Body text */}
            <article className="space-y-5 text-[15.5px] leading-8 text-[var(--slot4-muted-text)]">
              {pagesContent.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>

            {/* Values */}
            <aside className="space-y-4">
              {pagesContent.about.values.map((value, index) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 transition duration-300 hover:border-[rgba(255,255,255,0.14)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-[12px] font-bold text-[var(--slot4-accent)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="editable-display text-[16px] font-bold tracking-[-0.015em]">{value.title}</h2>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-6 text-[var(--slot4-muted-text)]">{value.description}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>

        {/* Bottom band */}
        <section className="border-t border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
          <div className="mx-auto max-w-[var(--editable-container)] px-6 py-14 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { label: 'Our mission', body: 'Surface the best resources, ideas, and tools from across the web — beautifully curated.' },
                { label: 'Our approach', body: 'Quality over quantity. Every bookmark, article, and collection is handpicked for value.' },
                { label: 'Our community', body: 'Built for curious people who want to discover, save, and share what matters most.' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-[var(--editable-border)] p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{item.label}</p>
                  <p className="mt-3 text-[14px] leading-6 text-[var(--slot4-muted-text)]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
