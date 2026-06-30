'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[#080808] text-white">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">

          {/* Brand + Newsletter */}
          <div className="space-y-7">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e1e1e] ring-1 ring-[rgba(255,255,255,0.1)]">
                <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
              </div>
              <span className="text-[16px] font-semibold tracking-tight">
                {SITE_CONFIG.name}<span className="opacity-50">.</span>
              </span>
            </Link>

            {/* Newsletter card — matches Infranex's avatar + form style */}
            <div className="overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#111111] p-5">
              <div className="mb-4 flex items-center gap-3.5">
                {/* Avatar placeholder */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#1e1e1e] text-xl">
                  🌟
                </div>
                <p className="text-[14px] font-semibold text-white">
                  Subscribe our newsletter
                </p>
              </div>
              {subscribed ? (
                <p className="text-[13px] text-[#888]">Thanks! You&apos;re subscribed.</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0e0e0e]">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[13px] text-white outline-none placeholder:text-[#555]"
                  />
                  <button
                    type="submit"
                    className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#1e1e1e] transition hover:bg-[#2a2a2a]"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="h-4 w-4 text-white" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links column */}
          <div>
            <h3 className="mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white">Links</h3>
            <ul className="space-y-3.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'About us', href: '/about' },
                { label: 'Collections', href: '/sbm' },
                { label: 'Search', href: '/search' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-[14px] text-[#888] transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Utility Pages column */}
          <div>
            <h3 className="mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white">Utility Pages</h3>
            <ul className="space-y-3.5">
              {[
                { label: 'Contact', href: '/contact' },
                { label: 'Login', href: '/login' },
                { label: 'Sign up', href: '/signup' },
                ...(session ? [{ label: 'Create post', href: '/create' }] : []),
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-[14px] text-[#888] transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
              {session ? (
                <li>
                  <button type="button" onClick={logout} className="text-[14px] text-[#888] transition hover:text-white">
                    Logout
                  </button>
                </li>
              ) : null}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(255,255,255,0.06)] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[var(--editable-container)] items-center justify-between gap-4 text-[13px] text-[#555]">
          <span>© {year} {SITE_CONFIG.name} All Rights Reserved.</span>
          <span className="hidden sm:block">{globalContent.footer?.bottomNote}</span>
        </div>
      </div>
    </footer>
  )
}
