'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Bookmark, CheckCircle2, FileText, ImageIcon, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: Bookmark,
}

const fieldClass = 'w-full rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-3 text-[14px] font-medium text-[var(--slot4-page-text)] outline-none transition placeholder:text-[var(--slot4-muted-text)] focus:border-[rgba(255,255,255,0.2)] focus:ring-1 focus:ring-[rgba(255,255,255,0.14)]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="flex min-h-[calc(100vh-4rem)] items-center bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
          <section className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-8">
            <div className="overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
              {/* Accent bar */}
              <div className="h-1 w-full bg-[linear-gradient(90deg,transparent,var(--slot4-accent),transparent)]" />
              <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[auto_1fr]">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-[var(--slot4-panel-bg)]">
                  <Lock className="h-10 w-10 text-[var(--slot4-muted-text)]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.create.locked.badge}</p>
                  <h1 className="editable-display mt-4 text-4xl font-bold leading-[1.04] tracking-[-0.03em] sm:text-5xl">{pagesContent.create.locked.title}</h1>
                  <p className="mt-5 text-[15px] leading-7 text-[var(--slot4-muted-text)]">{pagesContent.create.locked.description}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                      Login <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/signup" className="inline-flex items-center gap-2 rounded-xl border border-[var(--editable-border)] px-6 py-3 text-sm font-medium transition hover:border-[rgba(255,255,255,0.14)]">
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* Page header */}
        <section className="border-b border-[var(--editable-border)]">
          <div className="mx-auto max-w-[var(--editable-container)] px-6 py-10 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.create.hero.badge}</p>
            <h1 className="editable-display mt-3 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">{pagesContent.create.hero.title}</h1>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-[var(--slot4-muted-text)]">{pagesContent.create.hero.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-6 py-10 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
            {/* Task selector */}
            <aside>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--slot4-muted-text)]">Content type</p>
              <div className="grid gap-2">
                {enabledTasks.map((item) => {
                  const Icon = taskIcon[item.key] || FileText
                  const active = item.key === task
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setTask(item.key)}
                      className={`flex items-center gap-3 rounded-xl border p-4 text-left transition duration-200 ${
                        active
                          ? 'border-[var(--slot4-accent)]/30 bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]'
                          : 'border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] text-[var(--slot4-muted-text)] hover:border-[rgba(255,255,255,0.14)] hover:text-[var(--slot4-page-text)]'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <div className="min-w-0">
                        <span className="block text-[13px] font-semibold">{item.label}</span>
                        <span className="block truncate text-[11px] opacity-65">{item.description}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </aside>

            {/* Form */}
            <div className="overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
              <div className="flex items-center justify-between gap-4 border-b border-[var(--editable-border)] px-7 py-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">
                    Create {activeTask?.label || 'post'}
                  </p>
                  <h2 className="editable-display mt-1 text-2xl font-bold tracking-[-0.02em]">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-3 py-1.5 text-[12px] font-semibold text-[var(--slot4-muted-text)]">
                  {session.name}
                </span>
              </div>

              <form onSubmit={submit} className="p-7">
                <div className="grid gap-4">
                  <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title *" required />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                    <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                  </div>
                  <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                  <textarea className={`${fieldClass} min-h-24 resize-y`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary *" required />
                  <textarea className={`${fieldClass} min-h-48 resize-y`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description *" required />
                </div>

                {created ? (
                  <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                      <p className="text-[13px] font-semibold">{pagesContent.create.successTitle}</p>
                      <p className="mt-0.5 text-[12px] opacity-80">{created.title}</p>
                    </div>
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--slot4-accent-fill)] px-6 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
