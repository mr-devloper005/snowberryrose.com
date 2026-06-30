'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, PlusCircle, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  const coreLinks = useMemo(
    () => [
      { label: 'Home', href: '/' },
      { label: 'About us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    []
  )

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || (href !== '/#features' && pathname.startsWith(`${href}/`))

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.06)] bg-[#080808]/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-[68px] max-w-[var(--editable-container)] items-center gap-6 px-4 sm:px-6 lg:px-8">

        {/* Logo — "Sitename." with period, matching Infranex style */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e1e1e] ring-1 ring-[rgba(255,255,255,0.1)]">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
          </div>
          <span className="text-[16px] font-semibold tracking-tight text-white">
            {SITE_CONFIG.name}<span className="opacity-60">.</span>
          </span>
        </Link>

        {/* Center nav — Home, About us, Features, Blog, etc. */}
        <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {coreLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 text-[14px] font-medium transition-colors ${
                isActive(link.href)
                  ? 'text-white'
                  : 'text-[#888] hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right — GET STARTED button (Infranex-style: dark bordered, uppercase) */}
        <div className="ml-auto flex shrink-0 items-center gap-3">
          {session ? (
            <>
              <Link
                href="/create"
                className="hidden items-center gap-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#1a1a1a] px-4 py-2 text-[13px] font-medium text-white transition hover:bg-[#242424] sm:inline-flex"
              >
                <PlusCircle className="h-3.5 w-3.5" /> Create
              </Link>
              <span className="hidden text-[13px] text-[#666] sm:block">{session.name}</span>
              <button
                type="button"
                onClick={logout}
                className="hidden rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#1e1e1e] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#2a2a2a] sm:block"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/signup"
              className="hidden items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#1e1e1e] px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#2a2a2a] active:scale-[0.98] sm:inline-flex"
            >
              Get Started
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.08)] text-[#888] transition hover:text-white lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open ? (
        <div className="border-t border-[rgba(255,255,255,0.06)] bg-[#080808] px-4 pb-6 pt-4 lg:hidden">
          <nav className="grid gap-0.5">
            {[
              ...coreLinks,
              { label: 'Search', href: '/search' },
              { label: 'Contact', href: '/contact' },
              ...(session
                ? [{ label: 'Create', href: '/create' }]
                : [{ label: 'Sign in', href: '/login' }, { label: 'Get Started', href: '/signup' }]),
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 text-[14px] font-medium transition ${
                  isActive(link.href)
                    ? 'bg-[#1a1a1a] text-white'
                    : 'text-[#888] hover:bg-[#141414] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {session ? (
              <button
                type="button"
                onClick={() => { logout(); setOpen(false) }}
                className="rounded-lg px-4 py-3 text-left text-[14px] font-medium text-[#888] transition hover:bg-[#141414] hover:text-white"
              >
                Logout
              </button>
            ) : null}
          </nav>
          {!session ? (
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#1e1e1e] py-3.5 text-[14px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#2a2a2a]"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
