import type { CSSProperties } from 'react'

export const editableRootStyle = {
  // Pure monochrome dark system — inspired by Infranex's black/white/gray palette.
  // No color accents; all emphasis via brightness contrast (white on near-black).
  '--slot4-page-bg': '#080808',
  '--slot4-page-text': '#ffffff',
  '--slot4-panel-bg': '#0e0e0e',
  '--slot4-surface-bg': '#141414',
  '--slot4-muted-text': '#888888',
  '--slot4-soft-muted-text': '#555555',
  '--slot4-accent': '#e0e0e0',
  '--slot4-accent-fill': '#1e1e1e',
  '--slot4-accent-soft': 'rgba(255,255,255,0.04)',
  '--slot4-on-accent': '#ffffff',
  '--slot4-dark-bg': '#080808',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#1a1a1a',
  '--slot4-cream': '#141414',
  '--slot4-warm': '#0e0e0e',
  '--slot4-lavender': '#141414',
  '--slot4-gray': '#0e0e0e',
  '--slot4-body-gradient': 'none',
  '--editable-page-bg': '#080808',
  '--editable-page-text': '#ffffff',
  '--editable-container': '1280px',
  '--editable-border': 'rgba(255,255,255,0.06)',
  '--editable-nav-bg': '#080808',
  '--editable-nav-text': '#ffffff',
  '--editable-nav-active': '#ffffff',
  '--editable-nav-active-text': '#ffffff',
  '--editable-cta-bg': '#1e1e1e',
  '--editable-cta-text': '#ffffff',
  '--editable-search-bg': '#141414',
  '--editable-footer-bg': '#080808',
  '--editable-footer-text': '#ffffff',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_1px_4px_rgba(0,0,0,0.8)]',
  shadowStrong: 'shadow-[0_8px_40px_rgba(0,0,0,0.9)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.88))]',
} as const

export const editableDesignContract = {
  shell: {
    page: 'min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]',
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-20 sm:py-24 lg:py-28',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[140px] shrink-0 snap-start sm:w-[160px]',
  },
  type: {
    eyebrow: 'text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slot4-muted-text)]',
    heroTitle: 'text-5xl font-bold leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-7xl',
    sectionTitle: 'text-4xl font-bold tracking-[-0.03em] sm:text-5xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: 'rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]',
    soft: 'rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]',
    dark: 'rounded-2xl bg-[var(--slot4-dark-bg)] border border-[var(--editable-border)]',
  },
  button: {
    primary: 'inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#1e1e1e] px-7 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-[#2a2a2a] active:scale-[0.98]',
    secondary: 'inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--editable-border)] bg-transparent px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-[rgba(255,255,255,0.05)] active:scale-[0.98]',
    accent: 'inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#1e1e1e] px-7 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-[#2a2a2a] active:scale-[0.98]',
  },
  media: {
    frame: 'relative overflow-hidden rounded-xl bg-[var(--slot4-media-bg)]',
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:border-[rgba(255,255,255,0.12)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
