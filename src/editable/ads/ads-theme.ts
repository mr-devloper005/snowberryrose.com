// ✏️ EDITABLE — theme the ads to match this site. Devs own this file.
// You control the LOOK here (radius, border, shadow, background, label color).
// You CANNOT change the ad's shape/fit from here — that stays locked in
// src/lib/ad-slots.ts, so the ad always displays correctly no matter what.

import type { AdSkin } from '@/lib/ads/ad-frame'

export const adSkin: AdSkin = {
  radius: '14px',
  border: '1px solid rgba(255,255,255,0.06)',
  shadow: '0 8px 32px rgba(0,0,0,0.8)',
  background: '#141414',
  labelClassName: 'bg-[#1e1e1e] text-white border border-[rgba(255,255,255,0.1)]',
}

export const adSkinBySlot: Partial<Record<string, AdSkin>> = {
  sidebar: { radius: '12px', shadow: 'none', border: '1px solid rgba(255,255,255,0.06)', background: '#1c1c1c' },
  popup: { radius: '20px', background: '#141414' },
  header: { radius: '16px', background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.06)' },
}

export function skinFor(slot: string): AdSkin {
  return { ...adSkin, ...(adSkinBySlot[slot] ?? {}) }
}
