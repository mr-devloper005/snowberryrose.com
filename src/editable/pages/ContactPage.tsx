'use client'

import { Building2, FileText, Image as ImageIcon, Mail, Sparkles, Bookmark } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

function getLanes(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return [
      { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
      { icon: Mail, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
      { icon: Sparkles, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
    ]
  }
  if (kind === 'editorial') {
    return [
      { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
      { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
      { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
    ]
  }
  if (kind === 'visual') {
    return [
      { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
      { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
      { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
    ]
  }
  return [
    { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
    { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
    { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
  ]
}

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const lanes = getLanes(productKind)

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--editable-border)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(255,255,255,0.02),transparent)]" />
          <div className="mx-auto max-w-[var(--editable-container)] px-6 py-20 sm:py-24 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="editable-display mt-5 max-w-2xl text-5xl font-bold leading-[1.04] tracking-[-0.03em] sm:text-6xl">
              {pagesContent.contact.title}
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-7 text-[var(--slot4-muted-text)]">
              {pagesContent.contact.description}
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-[var(--editable-container)] px-6 py-14 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            {/* Lanes */}
            <div className="space-y-4">
              {lanes.map((lane) => (
                <div
                  key={lane.title}
                  className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 transition duration-300 hover:border-[rgba(255,255,255,0.14)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)]">
                    <lane.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                  </div>
                  <h2 className="editable-display mt-4 text-[17px] font-bold tracking-[-0.015em]">{lane.title}</h2>
                  <p className="mt-2 text-[13.5px] leading-6 text-[var(--slot4-muted-text)]">{lane.body}</p>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 sm:p-9">
              <h2 className="editable-display text-2xl font-bold tracking-[-0.02em]">{pagesContent.contact.formTitle}</h2>
              <p className="mt-2 text-[13px] text-[var(--slot4-muted-text)]">We&apos;ll get back to you within 24 hours.</p>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
