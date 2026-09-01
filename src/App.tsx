import { useState, useEffect, useRef, useCallback, createContext, useContext, type FC } from 'react'
import hurremLogo from '@/imports/Hurrem_Logo_Final.png'

// ─── Images ──────────────────────────────────────────────────────────────────
const U = (id: string, w = 1920, h = 1080) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`

const IMG = {
  hero:  U('1732081697693-7c6569981102'),
  coast: U('1723143036444-b76835788083'),
  story: U('1742236467666-f516d9e383f5', 1400, 1000),
  dome:  U('1635750768877-8bc31c76a125'),
  a1: U('1655516433028-9e0e1599cf8b', 1400, 900),
  a2: U('1773414026196-0194721e803e', 1400, 900),
  a3: U('1786018120871-fc2c56e308ee', 1400, 900),
  a4: U('1638813893006-20622c05b4f4', 1400, 900),
  a5: U('1769149255670-aa0ad6428dd6', 1400, 900),
  a6: U('1625259566209-8c59614a28fa', 1400, 900),
  // Architecture page extra gallery photos
  ag1: U('1558618666-fcd25c85cd64', 900, 600),
  ag2: U('1531572753322-ad063cecc140', 900, 600),
  ag3: U('1601579936660-0f92df76c3b3', 900, 600),
  ag4: U('1596394516093-501ba68a0ba6', 900, 600),
  ag5: U('1520769945061-0a5c3a2edd82', 900, 600),
  ag6: U('1615729947596-a598e5de0ab3', 900, 600),
  fDining:       U('1687648431656-da99da578d50'),
  fBanquet:      U('1780542900375-0cf459e38fbb'),
  fPools:        U('1769149255670-aa0ad6428dd6'),
  fWellness:     U('1696841212541-449ca29397cc'),
  fFamily:       U('1602002418816-5c0aeef426aa'),
  fLibrary:      U('1782530707382-fdb15bf93789'),
  fShopping:     U('1742236467666-f516d9e383f5', 1400, 900),
  fFaith:        U('1773414026196-0194721e803e', 1400, 900),
  fBeach:        U('1723143036444-b76835788083'),
  fPresidential: U('1731336478850-6bce7235e320'),
  ottoman1: U('1558618666-fcd25c85cd64', 1400, 900),
  chairman: U('1507003211169-0a1dd7228f2d', 800, 1000),
  // Shareholder privilege images
  pVacation:    U('1571003123894-1eebc159e5d4', 1400, 900),
  pShuttle:     U('1544620347-c4be4d7dc628', 1400, 900),
  pSmartCard:   U('1551836022-4196f3335c10', 1400, 900),
  pHealth:      U('1576091160399-112ba8d25d1d', 1400, 900),
  pGift:        U('1513475382585-d06e58bcb0e0', 1400, 900),
  pReferral:    U('1521791136064-7986c2920216', 1400, 900),
  pVisit:       U('1723143036444-b76835788083', 1400, 900),
  pInheritance: U('1484820540004-14f3d7075b73', 1400, 900),
  pTransfer:    U('1611162617213-7d7a39e9b1d7', 1400, 900),
}

const MENU_SLIDES = [
  U('1732081697693-7c6569981102'),
  U('1655516433028-9e0e1599cf8b', 1400, 900),
  U('1687648431656-da99da578d50'),
  U('1769149255670-aa0ad6428dd6', 1400, 900),
  U('1635750768877-8bc31c76a125'),
  U('1723143036444-b76835788083'),
]

import heroVideoSrc from '@/imports/Exterior_01.mp4'
const HERO_VIDEO = heroVideoSrc

// ─── Theme ───────────────────────────────────────────────────────────────────
const DC = {
  imperialBlack: '#0A0807', palaceBlack: '#11100E', crimson: '#5E0F1A',
  gold: '#B38A3E', champagne: '#D4B56A', ivory: '#E8E0D2', sand: '#A99D8B', brass: '#725C31',
}
const LC = {
  imperialBlack: '#F4EDDF', palaceBlack: '#EBE2D0', crimson: '#8B1020',
  gold: '#7A5210', champagne: '#5C3A0D', ivory: '#1C1510', sand: '#5A4830', brass: '#8B6D40',
}

const ThemeCtx = createContext({ isDark: true, toggle: () => {}, C: DC })
const useTheme = () => useContext(ThemeCtx)
const useC = () => useTheme().C

// light-theme overlay helpers for image sections — cream matches navbar bg
const imgOverlay = (isDark: boolean, a: number) =>
  isDark ? `rgba(10,8,7,${a})` : `rgba(244,237,223,${a})`
const imgFilter = (isDark: boolean, brightness: number, sat = 0.7) =>
  `brightness(${isDark ? brightness : brightness + 0.28}) saturate(${sat})`
const imgText = (isDark: boolean) => isDark ? DC.ivory : '#1C1410'
const imgTextSec = (isDark: boolean) => isDark ? DC.sand : '#4A3A28'
const imgGold = (isDark: boolean) => isDark ? DC.gold : '#6B4010'
const imgBrass = (isDark: boolean) => isDark ? DC.brass : '#7A5830'

// ─── CMS Data Model ──────────────────────────────────────────────────────────
type ContentStatus = 'draft' | 'published' | 'scheduled' | 'archived'
type ContentType   = 'news' | 'event'

interface ContentItem {
  id: string
  type: ContentType
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  status: ContentStatus
  featured: boolean
  homepageFeatured: boolean
  publishedAt: string | null
  scheduledAt: string | null
  locationName: string
  locationAddress: string
  mapUrl: string
  coverImage: string
  videoUrl: string
  author: string
  tags: string[]
  createdAt: string
  updatedAt: string
  eventStart?: string
  eventEnd?: string
  venue?: string
  registrationUrl?: string
}

const NEWS_CATEGORIES = ['News', 'Project Update', 'Construction', 'Announcement', 'Partnership', 'Investment', 'Hospitality', 'Press', 'Event']

const SEED_CONTENT: ContentItem[] = [
  {
    id: 'c1', type: 'news',
    title: 'Hurrem Palace Secures Prime Coastal Land at Shamuk Beach',
    slug: 'hurrem-palace-secures-coastal-land-shamuk-beach',
    excerpt: "The company has officially secured four acres of private coastal land along the Cox's Bazar–Teknaf Marine Drive — the foundation of what will become Bangladesh's first Ottoman-inspired five-star palace resort.",
    content: "Hurrem Palace Limited has completed the formal acquisition of four acres of prime coastal land at Shamuk Beach, located along the Cox's Bazar–Teknaf Marine Drive in Bangladesh.\n\nThis milestone marks the beginning of a landmark chapter in the country's tourism and hospitality history.\n\nThe land, situated directly on one of the world's longest natural sea beaches, will serve as the site of an unprecedented Ottoman-inspired palace and five-star resort — a project designed to elevate Bangladesh's profile on the global tourism map.\n\n\"This is not just a real estate acquisition,\" said Md. Jahangir Alam, Chairman. \"This is the foundation of a legacy. We are building something Bangladesh has never seen before.\"\n\nThe development is planned to open in 2032, following a construction phase beginning in 2027. The project will feature authentic Ottoman architecture, including muqarnas, Iznik tilework, and grand domes — all crafted to international standards.",
    category: 'Project Update', status: 'published', featured: true, homepageFeatured: true,
    publishedAt: '2026-08-18T10:00:00Z', scheduledAt: null,
    locationName: 'Shamuk Beach', locationAddress: "Cox's Bazar–Teknaf Marine Drive, Cox's Bazar, Bangladesh", mapUrl: '',
    coverImage: U('1723143036444-b76835788083', 1400, 900), videoUrl: '',
    author: 'Hurrem Palace Editorial Team', tags: ["Cox's Bazar", 'Shamuk Beach', 'Land', 'Milestone'],
    createdAt: '2026-08-18T09:00:00Z', updatedAt: '2026-08-18T10:00:00Z',
  },
  {
    id: 'c2', type: 'news',
    title: 'Ottoman Architecture Consultancy Partnership Announced',
    slug: 'ottoman-architecture-consultancy-partnership-2026',
    excerpt: 'Hurrem Palace has entered into a formal consultancy agreement with an Istanbul-based heritage architecture firm to ensure authenticity in the palace design.',
    content: "Hurrem Palace Limited is pleased to announce a formal partnership with a leading Ottoman heritage architecture consultancy, ensuring the palace's design remains true to the grandeur of the 16th-century Ottoman tradition.\n\nThe partnership was established following months of discussions and a visit to historical sites in Istanbul, Turkey.\n\nThe consultant team will advise on muqarnas detailing, Iznik ceramic tile sourcing, calligraphic elements, and structural dome engineering — all aspects critical to the authenticity of the Hurrem Palace vision.\n\nThis is one of several international partnerships the company is establishing as part of its commitment to delivering a world-class destination.",
    category: 'Partnership', status: 'published', featured: false, homepageFeatured: false,
    publishedAt: '2026-08-22T09:00:00Z', scheduledAt: null,
    locationName: 'Dhaka, Bangladesh', locationAddress: 'House 07, Road 137, Gulshan-1, Dhaka-1212', mapUrl: '',
    coverImage: U('1558618666-fcd25c85cd64', 1400, 900), videoUrl: '',
    author: 'Hurrem Palace Editorial Team', tags: ['Ottoman', 'Architecture', 'Partnership', 'Istanbul'],
    createdAt: '2026-08-22T08:00:00Z', updatedAt: '2026-08-22T09:00:00Z',
  },
  {
    id: 'c3', type: 'news',
    title: 'Share Offering Program Now Open to Bangladeshi Investors',
    slug: 'share-offering-program-open-bangladeshi-investors',
    excerpt: "The company's authorized share offering of 40,000 shares at ৳5,00,000 per share is now formally open, giving Bangladeshi investors the opportunity to participate in this historic project.",
    content: "Hurrem Palace Limited has formally opened its share offering program to qualified Bangladeshi investors.\n\nThe company holds authorization for 40,000 shares at ৳5,00,000 per share — a structure carefully designed to enable broad participation in this historic national project.\n\nThe investment model is Halal-certified, Sharia-compliant, and backed by the company's four-acre private coastal land asset — giving investors a tangible, land-backed security underlying their participation.\n\nShareholders receive a range of privileges including annual vacation packages, priority booking rights, dedicated guest services, and participation in the palace's revenue model.\n\nInterested investors are invited to contact the company office at Gulshan-1, Dhaka, or reach out through the official contact channels.",
    category: 'Investment', status: 'published', featured: false, homepageFeatured: false,
    publishedAt: '2026-08-28T08:00:00Z', scheduledAt: null,
    locationName: 'Dhaka, Bangladesh', locationAddress: 'House 07, Road 137, Gulshan-1, Dhaka-1212', mapUrl: '',
    coverImage: U('1635750768877-8bc31c76a125', 1400, 900), videoUrl: '',
    author: 'Hurrem Palace Editorial Team', tags: ['Investment', 'Shares', 'Halal', 'Bangladesh'],
    createdAt: '2026-08-28T07:00:00Z', updatedAt: '2026-08-28T08:00:00Z',
  },
  {
    id: 'c4', type: 'event',
    title: 'Investor Information & Welcome Evening',
    slug: 'investor-information-welcome-evening-sep-2026',
    excerpt: 'Join us for an exclusive evening presentation covering the Hurrem Palace project, investment details, shareholder privileges, and a Q&A session with the Chairman.',
    content: "Hurrem Palace Limited cordially invites prospective investors and their guests to an exclusive Investor Information & Welcome Evening.\n\nThe evening will feature:\n- A presentation on the Hurrem Palace vision and project timeline\n- Details of the share offering and investment structure\n- A walkthrough of shareholder privileges\n- Architectural concept presentations\n- A Q&A session with Chairman Md. Jahangir Alam\n\nLight refreshments will be served. Attendance is by invitation and registration only.\n\nSeats are limited. Please register early to confirm your place.",
    category: 'Event', status: 'published', featured: true, homepageFeatured: true,
    publishedAt: '2026-08-25T08:00:00Z', scheduledAt: null,
    locationName: 'Dhaka', locationAddress: 'The Westin Dhaka, Road 45, Gulshan 2, Dhaka-1212', mapUrl: 'https://maps.google.com',
    coverImage: U('1687648431656-da99da578d50', 1400, 900), videoUrl: '',
    author: 'Hurrem Palace Events Team', tags: ['Investor Event', 'Dhaka', 'Q&A', 'Presentation'],
    createdAt: '2026-08-20T09:00:00Z', updatedAt: '2026-08-25T08:00:00Z',
    eventStart: '2026-09-24T18:00:00Z', eventEnd: '2026-09-24T21:00:00Z',
    venue: 'The Westin Dhaka', registrationUrl: '#contact',
  },
  {
    id: 'c5', type: 'event',
    title: "Site Visit: Shamuk Beach, Cox's Bazar",
    slug: 'site-visit-shamuk-beach-coxs-bazar-oct-2026',
    excerpt: "Shareholders and prospective investors are invited to visit the Hurrem Palace site at Shamuk Beach — an opportunity to experience the land and location in person.",
    content: "Hurrem Palace Limited invites shareholders and prospective investors to an exclusive site visit to Shamuk Beach.\n\nParticipants will have the opportunity to:\n- Walk the four-acre palace site\n- See the Marine Drive coastal frontage\n- Experience the natural beauty of Shamuk Beach\n- Meet with the project team\n\nTransportation from Dhaka will be arranged. Accommodation at Cox's Bazar is available on request.\n\nThis is a rare opportunity to connect with the physical reality of the Hurrem Palace project.",
    category: 'Event', status: 'published', featured: false, homepageFeatured: false,
    publishedAt: '2026-08-25T08:00:00Z', scheduledAt: null,
    locationName: "Cox's Bazar", locationAddress: "Shamuk Beach, Cox's Bazar–Teknaf Marine Drive", mapUrl: '',
    coverImage: U('1769149255670-aa0ad6428dd6', 1400, 900), videoUrl: '',
    author: 'Hurrem Palace Events Team', tags: ["Cox's Bazar", 'Site Visit', 'Shamuk Beach', 'Shareholders'],
    createdAt: '2026-08-20T09:00:00Z', updatedAt: '2026-08-25T08:00:00Z',
    eventStart: '2026-10-10T09:00:00Z', eventEnd: '2026-10-11T17:00:00Z',
    venue: 'Shamuk Beach', registrationUrl: '#contact',
  },
]

// ─── Supabase API client ──────────────────────────────────────────────────────
const API_BASE = "https://rmhgocojjngqgjfgouym.supabase.co/functions/v1/make-server-d08a237a"

async function apiFetch<T = unknown>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(API_BASE + path, opts)
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`)
  return res.json() as Promise<T>
}

const cmsApi = {
  list:   ()                   => apiFetch<ContentItem[]>('/cms'),
  create: (item: ContentItem)  => apiFetch<ContentItem>('/cms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) }),
  update: (item: ContentItem)  => apiFetch<ContentItem>(`/cms/${item.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) }),
  delete: (id: string)         => apiFetch<{ ok: boolean }>(`/cms/${id}`, { method: 'DELETE' }),
  seed:   (items: ContentItem[]) => apiFetch<{ seeded: boolean }>('/cms/seed', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items) }),
  upload: async (file: File): Promise<string> => {
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch(API_BASE + '/cms/upload', { method: 'POST', body: fd })
    if (!res.ok) throw new Error('Upload failed')
    const { url } = await res.json()
    return url as string
  },
}

const CMSCtx = createContext<{
  items: ContentItem[]
  cmsLoading: boolean
  createItem: (item: ContentItem) => Promise<void>
  updateItem: (item: ContentItem) => Promise<void>
  deleteItem: (id: string) => Promise<void>
  uploadImage: (file: File) => Promise<string>
}>({ items: [], cmsLoading: true, createItem: async () => {}, updateItem: async () => {}, deleteItem: async () => {}, uploadImage: async () => '' })

function useCMS() { return useContext(CMSCtx) }

function usePublishedItems() {
  const { items } = useCMS()
  const now = new Date()
  return items.filter(it => {
    if (it.status === 'published') return true
    if (it.status === 'scheduled' && it.scheduledAt && new Date(it.scheduledAt) <= now) return true
    return false
  })
}

function CMSProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ContentItem[]>([])
  const [cmsLoading, setCmsLoading] = useState(true)

  useEffect(() => {
    cmsApi.list()
      .then(async data => {
        if (!data || data.length === 0) {
          // Seed the database on first load
          await cmsApi.seed(SEED_CONTENT).catch(() => {})
          setItems(SEED_CONTENT)
        } else {
          setItems(data)
        }
      })
      .catch(() => setItems(SEED_CONTENT))
      .finally(() => setCmsLoading(false))
  }, [])

  const createItem = async (item: ContentItem) => {
    await cmsApi.create(item)
    setItems(prev => [item, ...prev])
  }
  const updateItem = async (item: ContentItem) => {
    const updated = { ...item, updatedAt: new Date().toISOString() }
    await cmsApi.update(updated)
    setItems(prev => prev.map(i => i.id === item.id ? updated : i))
  }
  const deleteItem = async (id: string) => {
    await cmsApi.delete(id)
    setItems(prev => prev.filter(i => i.id !== id))
  }
  const uploadImage = (file: File) => cmsApi.upload(file)

  return (
    <CMSCtx.Provider value={{ items, cmsLoading, createItem, updateItem, deleteItem, uploadImage }}>
      {children}
    </CMSCtx.Provider>
  )
}

const fmtDate = (s: string) => new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()
const fmtDateShort = (s: string) => new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()
const fmtDay = (s: string) => new Date(s).getDate().toString().padStart(2, '0')
const fmtMonth3 = (s: string) => new Date(s).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
const fmtYear = (s: string) => new Date(s).getFullYear().toString()
const genId = () => Math.random().toString(36).slice(2, 10)
const toSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')

function eventStatus(item: ContentItem): 'UPCOMING' | 'TODAY' | 'PAST EVENT' | null {
  if (!item.eventStart) return null
  const now = new Date(), start = new Date(item.eventStart)
  const end = item.eventEnd ? new Date(item.eventEnd) : start
  if (now > end) return 'PAST EVENT'
  if (now.toDateString() === start.toDateString()) return 'TODAY'
  return 'UPCOMING'
}

const CINZEL    = 'Cinzel, serif'
const PLAYFAIR  = 'Playfair Display, serif'
const CORMORANT = 'Cormorant Garamond, serif'
const JOST      = 'Jost, sans-serif'
const EASE      = 'cubic-bezier(0.16, 1, 0.3, 1)'

// ─── Keyframes ────────────────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes sealIn  { from{opacity:0;transform:scale(.82) rotate(-8deg)}to{opacity:1;transform:scale(1) rotate(0)} }
  @keyframes fadeUp  { from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)} }
  @keyframes slideRight { from{opacity:0;transform:translateX(50px)}to{opacity:1;transform:translateX(0)} }
  @keyframes slideLeft  { from{opacity:0;transform:translateX(-50px)}to{opacity:1;transform:translateX(0)} }
  @keyframes drawLine   { from{stroke-dashoffset:600}to{stroke-dashoffset:0} }
  @keyframes shimmer    { 0%,100%{opacity:.35}50%{opacity:.8} }
  @keyframes menuIn     { from{opacity:0}to{opacity:1} }
  @keyframes fadeIn     { from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)} }
  @keyframes progressPulse { 0%,100%{opacity:.6}50%{opacity:1} }
  @keyframes glow       { 0%,100%{box-shadow:0 0 12px rgba(179,138,62,0.3)}50%{box-shadow:0 0 28px rgba(179,138,62,0.65),0 0 60px rgba(179,138,62,0.2)} }
`

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(1440)
  useEffect(() => {
    setW(window.innerWidth)
    const fn = () => setW(window.innerWidth)
    window.addEventListener('resize', fn, { passive: true })
    return () => window.removeEventListener('resize', fn)
  }, [])
  return w
}

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// Counts up from startVal to target when `enabled` turns true
function useCountUp(target: number, duration = 1600, enabled = false, startVal = 0) {
  const [val, setVal] = useState(startVal)
  useEffect(() => {
    if (!enabled) return
    const begin = Date.now()
    const tick = () => {
      const p = Math.min(1, (Date.now() - begin) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(startVal + eased * (target - startVal)))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration, enabled, startVal])
  return val
}

// Types out `text` char-by-char when `enabled` turns true
function useTypewriter(text: string, speed = 55, enabled = false) {
  const [out, setOut] = useState('')
  useEffect(() => {
    if (!enabled) { setOut(''); return }
    let i = 0; setOut('')
    const t = setInterval(() => {
      i++; setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(t)
    }, speed)
    return () => clearInterval(t)
  }, [text, speed, enabled])
  return out
}

function useScrollParallax(speed = 0.25) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const fn = () => {
      const el = ref.current; if (!el) return
      const rect = el.getBoundingClientRect()
      setOffset(rect.top * speed)
    }
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [speed])
  return { ref, offset }
}

// ─── Primitives ───────────────────────────────────────────────────────────────
function ImperialSeal({ size = 120, opacity = 1 }: { size?: number; opacity?: number }) {
  const C = useC()
  const dots = Array.from({ length: 36 }, (_, i) => {
    const a = (i * 10 * Math.PI) / 180
    return { cx: 60 + 53 * Math.cos(a), cy: 60 + 53 * Math.sin(a) }
  })
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" style={{ opacity }}>
      <circle cx="60" cy="60" r="56" stroke={C.gold} strokeWidth="0.7" opacity="0.5" />
      <circle cx="60" cy="60" r="50" stroke={C.gold} strokeWidth="0.4" opacity="0.3" />
      {dots.map((d, i) => <circle key={i} cx={d.cx} cy={d.cy} r="0.9" fill={C.gold} opacity="0.4" />)}
      <path d="M60 28 C56 34 52 40 52 48 C52 55 56 60 60 62 C64 60 68 55 68 48 C68 40 64 34 60 28Z" stroke={C.gold} strokeWidth="0.8" fill="none" opacity="0.55" />
      <path d="M47 50 C42 46 38 44 36 46 C34 50 37 56 42 58 C47 60 54 59 58 56" stroke={C.gold} strokeWidth="0.6" fill="none" opacity="0.4" />
      <path d="M73 50 C78 46 82 44 84 46 C86 50 83 56 78 58 C73 60 66 59 62 56" stroke={C.gold} strokeWidth="0.6" fill="none" opacity="0.4" />
      <path d="M60 72 L63 79 L60 86 L57 79 Z" stroke={C.gold} strokeWidth="0.6" fill="none" opacity="0.4" />
      <circle cx="60" cy="68" r="2" stroke={C.gold} strokeWidth="0.6" fill="none" opacity="0.4" />
    </svg>
  )
}

function ArchBorder() {
  return (
    <svg viewBox="0 0 340 520" fill="none" style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
      <path d="M12 518 L12 222 Q12 12 170 12 Q328 12 328 222 L328 518" stroke={DC.gold} strokeWidth="0.7" opacity="0.32" strokeDasharray="600" style={{ animation: 'drawLine 2.5s 0.5s ease both' }} />
      <path d="M22 518 L22 228 Q22 24 170 24 Q318 24 318 228 L318 518" stroke={DC.gold} strokeWidth="0.35" opacity="0.16" />
      <circle cx="12" cy="518" r="3" fill={DC.gold} opacity="0.35" />
      <circle cx="328" cy="518" r="3" fill={DC.gold} opacity="0.35" />
      <path d="M162 22 L170 8 L178 22" stroke={DC.gold} strokeWidth="0.6" fill="none" opacity="0.35" />
    </svg>
  )
}

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const s: React.CSSProperties = {
    position: 'absolute', width: 36, height: 36,
    borderColor: 'rgba(179,138,62,0.38)', borderStyle: 'solid', borderWidth: 0,
    ...(pos === 'tl' ? { top: 24, left: 24, borderTopWidth: 1, borderLeftWidth: 1 } : {}),
    ...(pos === 'tr' ? { top: 24, right: 24, borderTopWidth: 1, borderRightWidth: 1 } : {}),
    ...(pos === 'bl' ? { bottom: 24, left: 24, borderBottomWidth: 1, borderLeftWidth: 1 } : {}),
    ...(pos === 'br' ? { bottom: 24, right: 24, borderBottomWidth: 1, borderRightWidth: 1 } : {}),
  }
  return <div style={s} />
}

function GoldLine({ w = 48 }: { w?: number }) {
  const C = useC()
  return <div style={{ width: w, height: 1, background: C.gold, opacity: 0.45 }} />
}

// ─── Theme Toggle ────────────────────────────────────────────────────────────
function ThemeToggle() {
  const { isDark, toggle } = useTheme()
  const C = useC()
  const btnBase: React.CSSProperties = {
    width: 46, height: 46, borderRadius: '50%', backdropFilter: 'blur(12px)',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.28)', border: 'none',
    transition: `all 0.35s ${EASE}`,
  }
  return (
    <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 800, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* WhatsApp */}
      <a
        href="https://wa.me/8801819911999"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        style={{ ...btnBase, backgroundColor: '#25D366', textDecoration: 'none' }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.12)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.532 5.845L.057 23.943l6.255-1.643A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.947 0-3.763-.524-5.321-1.432l-.381-.226-3.952 1.037 1.055-3.855-.248-.396A9.938 9.938 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>

      {/* Theme toggle */}
      <button onClick={toggle} title={isDark ? 'Switch to light theme' : 'Switch to dark theme'} style={{
        ...btnBase,
        backgroundColor: isDark ? 'rgba(17,16,14,0.92)' : 'rgba(244,237,223,0.95)',
        border: `1px solid ${C.gold}`,
        boxShadow: `0 0 0 1px ${C.gold}33, 0 4px 20px rgba(0,0,0,0.25)`,
      }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isDark ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={DC.champagne} strokeWidth="1.5">
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={LC.champagne} strokeWidth="1.5">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// LOADING SCREEN
// ═════════════════════════════════════════════════════════════════════════════
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [fade, setFade] = useState(false)
  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 2200)
    const t2 = setTimeout(() => onComplete(), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: DC.imperialBlack,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28,
      transition: `opacity 0.8s ${EASE}`, opacity: fade ? 0 : 1, pointerEvents: fade ? 'none' : 'all',
    }}>
      <div style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(179,138,62,0.3)', animation: `sealIn 1.4s ${EASE} both`, flexShrink: 0 }}>
        <img src={hurremLogo} alt="Hurrem Palace" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ textAlign: 'center', animation: `fadeUp 1.2s 0.5s ${EASE} both`, opacity: 0 }}>
        <div style={{ fontFamily: CINZEL, fontSize: 20, letterSpacing: '0.35em', color: DC.champagne, fontWeight: 700, marginBottom: 10 }}>HURREM PALACE</div>
        <div style={{ fontFamily: CORMORANT, fontSize: 14, letterSpacing: '0.18em', color: DC.sand, fontStyle: 'italic' }}>An Ottoman Legacy on Bangladesh's Coast</div>
      </div>
      <div style={{ animation: 'shimmer 2s 0.8s infinite', opacity: 0.35 }}>
        <ImperialSeal size={52} opacity={0.6} />
      </div>
    </div>
  )
}

// ─── Menu Slider ────────────────────────────────────────────────────────────
function MenuImageSlider() {
  const C = useC()
  const [slide, setSlide] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % MENU_SLIDES.length), 3800)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {MENU_SLIDES.map((src, i) => (
        <div key={src} style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.55) saturate(0.7)', transition: 'opacity 1.8s ease', opacity: slide === i ? 1 : 0,
        }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, transparent 60%, rgba(10,8,7,0.6) 100%)' }} />
      <div style={{ position: 'absolute', bottom: 36, right: 32, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {MENU_SLIDES.map((_, i) => (
          <div key={i} style={{ width: 2, height: slide === i ? 22 : 6, backgroundColor: slide === i ? C.champagne : C.brass, transition: 'height 0.5s ease', borderRadius: 1 }} />
        ))}
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// NAVIGATION
// ═════════════════════════════════════════════════════════════════════════════
function Navigation({ onNavigate }: { onNavigate: (page: string | null) => void }) {
  const C = useC()
  const { isDark } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutExpanded, setAboutExpanded] = useState(false)
  const w = useWindowWidth()
  const isMobile = w < 768

  // Both dark (black) and light (crimson) navbars are dark-background → always use light text
  const nGold   = DC.gold
  const nSand   = DC.sand
  const nChampy = DC.champagne

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const goTo = (page: string | null) => { setMenuOpen(false); setAboutExpanded(false); onNavigate(page) }

  const navBg = scrolled
    ? (isDark ? 'rgba(10,8,7,0.94)' : `rgba(68,2,3,0.96)`)
    : 'transparent'

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        padding: isMobile ? '18px 20px' : '26px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: `background 0.9s ${EASE}, border-color 0.9s ease`,
        backgroundColor: navBg,
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? `1px solid ${nGold}28` : '1px solid transparent',
      }}>
        <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: 0 }}>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ width: 22, height: 1, background: nGold, display: 'block' }} />
            <span style={{ width: 14, height: 1, background: nGold, display: 'block' }} />
          </span>
          {!isMobile && <span style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.3em', color: nSand }}>MENU</span>}
        </button>
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <button onClick={() => goTo(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <img
              src={hurremLogo}
              alt="Hurrem Palace"
              style={{ width: isMobile ? 40 : 66, height: 'auto', display: 'block' }}
            />
          </button>
        </div>
        <a href="#contact" style={{
          fontFamily: JOST, fontSize: isMobile ? 9 : 10, letterSpacing: '0.2em',
          color: DC.imperialBlack, textDecoration: 'none', backgroundColor: DC.gold,
          padding: isMobile ? '7px 14px' : '9px 22px', border: `1px solid ${DC.gold}`,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          transition: `all 0.4s ${EASE}`, animation: 'glow 3s ease infinite', whiteSpace: 'nowrap',
        }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = nChampy; e.currentTarget.style.animation = 'none' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = DC.gold; e.currentTarget.style.color = DC.imperialBlack; e.currentTarget.style.animation = 'glow 3s ease infinite' }}
        >
          {!isMobile && <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: DC.imperialBlack, opacity: 0.5 }} />}
          CONTACT
        </a>
      </nav>

      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 600, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', animation: `menuIn 0.45s ${EASE}` }}>
          <div style={{ backgroundColor: isDark ? DC.imperialBlack : LC.imperialBlack, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: isMobile ? '100px 36px 60px' : '0 0 0 80px' }}>
            <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: isMobile ? 20 : 28, right: isMobile ? 20 : 36, fontFamily: JOST, fontSize: 10, letterSpacing: '0.3em', color: C.sand, background: 'none', border: 'none', cursor: 'pointer' }}>CLOSE ✕</button>
            <div style={{ position: 'absolute', top: isMobile ? 20 : 28, left: isMobile ? 20 : 80 }}>
              <img
                src={hurremLogo}
                alt="Hurrem Palace"
                style={{ width: isMobile ? 30 : 45, height: 'auto', display: 'block' }}
              />
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { label: 'HOME', href: null, page: null as string | null },
                { label: 'ABOUT', href: null, page: null as string | null },
                { label: 'ARCHITECTURE', href: null, page: 'architecture' as string | null },
                { label: 'INVESTMENT', href: null, page: 'investment' as string | null },
                { label: 'NEWS & EVENTS', href: null, page: 'news' as string | null },
                { label: 'CONTACT', href: '#contact', page: null as string | null },
              ].map((item, i) => (
                <div key={item.label}>
                  {item.label === 'ABOUT' ? (
                    <div>
                      <button onClick={() => setAboutExpanded(!aboutExpanded)} style={{
                        background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0',
                        display: 'flex', alignItems: 'center', gap: 14,
                        fontFamily: CINZEL, fontSize: isMobile ? 'clamp(22px,6vw,34px)' : 'clamp(24px,2.8vw,40px)',
                        letterSpacing: '0.12em', color: aboutExpanded ? C.champagne : C.ivory,
                        lineHeight: 1.15, transition: 'color 0.3s',
                        animation: `fadeUp 0.6s ${i * 0.07 + 0.1}s ${EASE} both`, opacity: 0,
                      }}>
                        ABOUT
                        <span style={{ fontFamily: JOST, fontSize: 12, color: C.gold, transform: aboutExpanded ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.3s', display: 'inline-block' }}>›</span>
                      </button>
                      {aboutExpanded && (
                        <div style={{ paddingLeft: 20, borderLeft: `1px solid ${C.gold}44`, marginLeft: 4, marginBottom: 4 }}>
                          {[{ label: '01  OUR STORY', page: 'story' }, { label: '02  PROJECT & LOCATION', page: 'location' }, { label: '03  COMPANY DETAILS', page: 'company' }].map((sub, si) => (
                            <button key={sub.page} onClick={() => goTo(sub.page)} style={{
                              display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
                              fontFamily: JOST, fontSize: 12, letterSpacing: '0.22em', color: C.sand,
                              padding: '9px 0', transition: 'color 0.3s',
                              animation: `fadeUp 0.4s ${si * 0.06}s ${EASE} both`, opacity: 0,
                            }}
                              onMouseEnter={e => (e.currentTarget.style.color = C.champagne)}
                              onMouseLeave={e => (e.currentTarget.style.color = C.sand)}
                            >{sub.label}</button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button onClick={() => item.page ? goTo(item.page) : (item.href ? (() => { setMenuOpen(false); window.location.hash = item.href! })() : goTo(null))} style={{
                      display: 'block', fontFamily: CINZEL,
                      fontSize: isMobile ? 'clamp(22px,6vw,34px)' : 'clamp(24px,2.8vw,40px)',
                      letterSpacing: '0.12em', color: C.ivory, background: 'none', border: 'none', cursor: 'pointer',
                      padding: '8px 0', lineHeight: 1.15, transition: 'color 0.3s', textAlign: 'left',
                      animation: `fadeUp 0.6s ${i * 0.07 + 0.1}s ${EASE} both`, opacity: 0,
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = C.champagne)}
                      onMouseLeave={e => (e.currentTarget.style.color = C.ivory)}
                    >{item.label}</button>
                  )}
                </div>
              ))}
            </nav>
            <div style={{ marginTop: 40, animation: `fadeUp 0.6s 0.5s ${EASE} both`, opacity: 0 }}>
              <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, ${C.gold}, transparent)`, marginBottom: 14, opacity: 0.4 }} />
              <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.35em', color: C.brass, marginBottom: 8 }}>LOCATION</div>
              <div style={{ fontFamily: CINZEL, fontSize: 12, letterSpacing: '0.16em', color: C.sand, lineHeight: 2 }}>SHAMUK BEACH<br />COX'S BAZAR · BANGLADESH</div>
              <div style={{ marginTop: 16, fontFamily: CORMORANT, fontSize: 14, fontStyle: 'italic', color: C.brass }}>2027 — 2032</div>
            </div>
          </div>
          {!isMobile && (
            <div style={{ position: 'relative', overflow: 'hidden', animation: `fadeIn 0.7s 0.15s ${EASE} both`, opacity: 0 }}>
              <MenuImageSlider />
              <div style={{ position: 'absolute', top: 44, right: 44, pointerEvents: 'none' }}>
                <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.35em', color: DC.champagne, opacity: 0.6 }}>THE PALACE</div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// HERO
// ═════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  const { isDark } = useTheme()
  const [scrollY, setScrollY] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const w = useWindowWidth()
  const isMobile = w < 768

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // iOS Safari requires calling play() after user interaction or programmatically
  // setAttribute ensures webkit-playsinline is set at the DOM level (React doesn't map it)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.setAttribute('webkit-playsinline', '')
    v.muted = true
    v.play().catch(() => {
      // Low Power Mode or policy block — video stays as poster
    })
  }, [])

  const downloadBrochure = () => {
    const content = [
      'HURREM PALACE', "An Ottoman Legacy on Bangladesh's Coast", '',
      'LOCATION: Shamuk Beach, Cox\'s Bazar, Bangladesh',
      'LAND: 4 Acres Private Company-Owned Land | Bay of Bengal',
      'TIMELINE: Construction 2027 | Opening 2032',
      '', 'INVESTMENT: ৳5,00,000 per share | 40,000 Authorized Shares',
      'Halal · Sharia-compliant · Land-backed',
      '', '© 2025 Hurrem Palace Limited. All rights reserved.',
    ].join('\n')
    const blob = new Blob([content], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'Hurrem_Palace_Brochure.pdf'; a.click()
    URL.revokeObjectURL(url)
  }

  const ov = (a: number) => imgOverlay(isDark, a)

  return (
    <section id="home" style={{ position: 'relative', height: '100svh', overflow: 'hidden', backgroundColor: '#0A0807' }}>
      <div style={{ position: 'absolute', inset: '-8%', transform: `scale(${1 + scrollY * 0.00025}) translateY(${scrollY * 0.28}px)`, willChange: 'transform' }}>
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          autoPlay loop muted playsInline
          poster={IMG.coast}
          preload="auto"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: `brightness(${isDark ? 0.48 : 0.68}) saturate(0.75)` }}
        />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${ov(0.22)} 0%, ${ov(0.04)} 35%, ${ov(0.5)} 75%, ${ov(0.95)} 100%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, ${ov(0.3)} 100%)` }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 4 L68 36 L36 68 L4 36 Z' stroke='%23B38A3E' stroke-width='0.35' fill='none' opacity='0.18'/%3E%3C/svg%3E")`, backgroundSize: '72px 72px', opacity: 0.7 }} />
      {!isMobile && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%) translateY(${-scrollY * 0.08}px)`, width: 'clamp(260px, 30vw, 420px)', height: 'clamp(380px, 52vh, 640px)', pointerEvents: 'none' }}><ArchBorder /></div>}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%) translateY(${-scrollY * 0.14}px)`, textAlign: 'center', width: '100%', padding: '0 24px', pointerEvents: 'none' }}>
        <div style={{ fontFamily: CINZEL, fontWeight: 700, fontSize: isMobile ? 'clamp(22px, 7vw, 36px)' : 'clamp(32px, 5.5vw, 80px)', letterSpacing: '0.28em', color: imgText(isDark), lineHeight: 1, marginBottom: 20, textShadow: isDark ? '0 4px 60px rgba(0,0,0,0.7)' : '0 2px 24px rgba(255,255,255,0.5)', animation: `fadeUp 1.4s 0.3s ${EASE} both`, opacity: 0 }}>HURREM PALACE</div>
        <div style={{ fontFamily: CORMORANT, fontSize: isMobile ? 14 : 'clamp(15px, 2vw, 22px)', fontStyle: 'italic', color: imgTextSec(isDark), letterSpacing: '0.12em', lineHeight: 1.9, animation: `fadeUp 1.4s 0.6s ${EASE} both`, opacity: 0 }}>An Ottoman Legacy<br />on Bangladesh's Coast</div>
        <div style={{ marginTop: 24, fontFamily: JOST, fontSize: 11, letterSpacing: '0.35em', color: imgGold(isDark), animation: `fadeUp 1.4s 0.9s ${EASE} both`, opacity: 0 }}>2027 — 2032</div>
      </div>
      {!isMobile && (
        <div style={{ position: 'absolute', bottom: 44, left: 48, animation: `fadeUp 1.2s 1.1s ${EASE} both`, opacity: 0, pointerEvents: 'none' }}>
          <div style={{ width: 1, height: 44, background: `linear-gradient(to bottom, ${DC.gold}, transparent)`, marginBottom: 14, opacity: 0.5 }} />
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.35em', color: imgBrass(isDark), marginBottom: 5 }}>LOCATION</div>
          <div style={{ fontFamily: CINZEL, fontSize: 12, letterSpacing: '0.2em', color: imgTextSec(isDark), lineHeight: 1.9 }}>SHAMUK BEACH<br />COX'S BAZAR</div>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.3em', color: imgBrass(isDark), marginTop: 4 }}>BANGLADESH</div>
        </div>
      )}
      <div style={{ position: 'absolute', bottom: isMobile ? 36 : 44, right: isMobile ? 24 : 48, textAlign: 'right', animation: `fadeUp 1.2s 1.3s ${EASE} both`, opacity: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 14 }}>
        {!isMobile && <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.3em', color: imgTextSec(isDark) }}>DISCOVER THE PALACE</div>}
        <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, ${DC.gold}, transparent)`, marginLeft: 'auto', opacity: 0.6, animation: 'shimmer 2.5s 2s infinite' }} />
        <button onClick={downloadBrochure} style={{
          fontFamily: JOST, fontSize: 9, letterSpacing: '0.26em', color: imgText(isDark),
          background: 'none', border: `1px solid ${imgGold(isDark)}77`, padding: '9px 18px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8, transition: `all 0.4s ${EASE}`,
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = DC.gold; e.currentTarget.style.backgroundColor = 'rgba(179,138,62,0.12)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = `${imgGold(isDark)}77`; e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          <svg width="10" height="11" viewBox="0 0 10 12" fill="none"><path d="M5 0 L5 8 M1 5 L5 9 L9 5 M0 11 L10 11" stroke={DC.gold} strokeWidth="1" strokeLinecap="round" /></svg>
          DOWNLOAD BROCHURE
        </button>
      </div>
      {!isMobile && <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', fontFamily: JOST, fontSize: 9, letterSpacing: '0.3em', color: imgBrass(isDark), writingMode: 'vertical-rl', paddingBottom: 44, pointerEvents: 'none', animation: `fadeUp 1.2s 1.5s ${EASE} both`, opacity: 0 }}>SCROLL TO ENTER</div>}
    </section>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// MANIFESTO
// ═════════════════════════════════════════════════════════════════════════════
function ManifestoSection() {
  const { isDark } = useTheme()
  const { ref, visible } = useReveal(0.1)
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const w = useWindowWidth()
  const isMobile = w < 768

  useEffect(() => {
    const fn = () => {
      const el = sectionRef.current; if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight + window.innerHeight
      setScrollProgress(Math.max(0, Math.min(1, (window.innerHeight - rect.top) / total)))
    }
    window.addEventListener('scroll', fn, { passive: true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scale = 1.18 - scrollProgress * 0.18
  const ov = (a: number) => imgOverlay(isDark, a)
  const lines = [
    { text: 'NOT A HOTEL.', italic: true, dim: true },
    { text: 'A PALACE.',    italic: false, dim: false },
    { text: 'A DESTINATION.', italic: false, dim: false },
    { text: 'A LEGACY.',   italic: false, dim: false },
  ]

  return (
    <section ref={sectionRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '80px 28px' : '120px 40px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: '-6%', backgroundImage: `url(${IMG.hero})`, backgroundSize: 'cover', backgroundPosition: 'center 35%', transform: `scale(${scale})`, transition: 'transform 0.1s linear', willChange: 'transform', filter: imgFilter(isDark, 0.18, 0.55) }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 90% 80% at 50% 50%, ${ov(0.38)} 0%, ${ov(0.82)} 100%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${ov(0.6)} 0%, transparent 30%, transparent 70%, ${ov(0.7)} 100%)` }} />
      <div ref={ref as React.RefObject<HTMLDivElement>} style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 920 }}>
        <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.5em', color: imgGold(isDark), marginBottom: isMobile ? 40 : 64, transition: `opacity 1s ${EASE}`, opacity: visible ? 1 : 0 }}>THE PALACE IS COMING</div>
        {lines.map((line, i) => (
          <div key={line.text} style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 'clamp(28px, 9vw, 52px)' : 'clamp(36px, 6.5vw, 96px)', color: line.dim ? imgTextSec(isDark) : imgText(isDark), fontStyle: line.italic ? 'italic' : 'normal', fontWeight: line.italic ? 400 : 700, lineHeight: 1.12, transition: `opacity 1.1s ${i * 0.18}s ${EASE}, transform 1.1s ${i * 0.18}s ${EASE}`, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(44px)' }}>{line.text}</div>
        ))}
        <div style={{ margin: '48px auto 0', width: 1, height: 60, background: `linear-gradient(to bottom, ${DC.gold}, transparent)`, opacity: visible ? 0.3 : 0, transition: `opacity 1.1s 0.9s ${EASE}` }} />
        <div style={{ marginTop: 28, fontFamily: CORMORANT, fontSize: isMobile ? 16 : 20, fontStyle: 'italic', color: imgBrass(isDark), letterSpacing: '0.06em', transition: `opacity 1.1s 1.1s ${EASE}`, opacity: visible ? 1 : 0 }}>Where empire meets the sea.</div>
      </div>
    </section>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// COAST
// ═════════════════════════════════════════════════════════════════════════════
function CoastSection() {
  const { isDark } = useTheme()
  const { ref, visible } = useReveal(0.12)
  const w = useWindowWidth()
  const isMobile = w < 768
  const ov = (a: number) => imgOverlay(isDark, a)

  return (
    <section style={{ position: 'relative', height: isMobile ? '100svh' : '100vh', overflow: 'hidden', backgroundColor: '#0A0807' }}>
      <div ref={ref as React.RefObject<HTMLDivElement>} style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG.coast})`, backgroundSize: 'cover', backgroundPosition: 'center 40%', filter: imgFilter(isDark, 0.42, 0.65), transition: `transform 1.8s ${EASE}`, transform: visible ? 'scale(1.04)' : 'scale(1.14)' }} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(125deg, ${ov(0.72)} 0%, ${ov(0.12)} 55%, ${ov(0.62)} 100%)` }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: isMobile ? 'flex-end' : 'center', justifyContent: isMobile ? 'flex-start' : 'space-between', padding: isMobile ? '0 28px 60px' : '0 80px', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 28 : 40 }}>
        <div style={{ transition: `opacity 1.2s 0.3s ${EASE}, transform 1.2s 0.3s ${EASE}`, opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-44px)' }}>
          <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${DC.gold}, transparent)`, marginBottom: 16, opacity: 0.45 }} />
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.4em', color: imgBrass(isDark), marginBottom: 8 }}>THE LOCATION</div>
          <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 20 : 'clamp(18px, 2.5vw, 28px)', letterSpacing: '0.14em', color: imgText(isDark), marginBottom: 6 }}>SHAMUK BEACH</div>
          <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 14 : 'clamp(14px, 1.8vw, 18px)', letterSpacing: '0.14em', color: imgTextSec(isDark), marginBottom: 4 }}>COX'S BAZAR</div>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.3em', color: imgBrass(isDark) }}>BANGLADESH</div>
          {!isMobile && <div style={{ marginTop: 20, fontFamily: JOST, fontSize: 10, letterSpacing: '0.18em', color: imgBrass(isDark), lineHeight: 1.9 }}>4 ACRES · PRIVATE LAND<br />BAY OF BENGAL</div>}
        </div>
        <div style={{ maxWidth: isMobile ? '100%' : 420, textAlign: isMobile ? 'left' : 'right', transition: `opacity 1.2s 0.5s ${EASE}, transform 1.2s 0.5s ${EASE}`, opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(44px)' }}>
          <div style={{ fontFamily: PLAYFAIR, fontStyle: 'italic', fontSize: isMobile ? 'clamp(20px, 5.5vw, 28px)' : 'clamp(24px, 3vw, 44px)', color: imgText(isDark), lineHeight: 1.4, marginBottom: 16 }}>Where the hills<br />meet the sea.</div>
          {!isMobile && <div style={{ fontFamily: JOST, fontSize: 12, letterSpacing: '0.12em', color: imgTextSec(isDark), lineHeight: 1.9 }}>Along the Cox's Bazar–Teknaf Marine Drive,<br />hills to the east, Bengal to the west.</div>}
        </div>
      </div>
    </section>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// STORY
// ═════════════════════════════════════════════════════════════════════════════
const BRAND_CRIMSON = '#440203'
const BRAND_CRIMSON_LIGHT = '#5A0305'   // slightly lighter for hover
const BRAND_CRIMSON_DIM   = '#2E0102'   // darker tint for dark-mode overlay

function StorySection({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { isDark } = useTheme()
  const { ref, visible } = useReveal()
  const w = useWindowWidth()
  const isMobile = w < 768

  // Crimson panel works in both themes — ivory text on deep red
  const panelBg = isDark ? BRAND_CRIMSON_DIM : BRAND_CRIMSON
  const headingCol = '#EAE0CE'
  const subCol     = '#C4A882'
  const goldAccent = DC.gold

  return (
    <section id="about" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '60fr 40fr', minHeight: isMobile ? 'auto' : '100vh' }}>
      {/* Image side */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? 280 : 600 }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG.story})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.65) saturate(0.7)', transition: `transform 1.8s ${EASE}`, transform: visible ? 'scale(1.03)' : 'scale(1.1)' }} />
        {/* Fade into the crimson panel */}
        <div style={{ position: 'absolute', inset: 0, background: isMobile ? `linear-gradient(to bottom, transparent 45%, ${panelBg} 100%)` : `linear-gradient(to right, transparent 50%, ${panelBg} 100%)` }} />
        {!isMobile && <><Corner pos="tl" /><Corner pos="br" /></>}
      </div>

      {/* Crimson text panel */}
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{ backgroundColor: panelBg, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: isMobile ? '48px 28px 64px' : 'clamp(60px, 8vh, 120px) clamp(40px, 5vw, 80px)', position: 'relative', overflow: 'hidden' }}
      >
        {/* Decorative geometric watermark */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 260, height: 260, border: `1px solid ${DC.gold}18`, borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 180, height: 180, border: `1px solid ${DC.gold}12`, borderRadius: '50%', transform: 'translate(30%, -30%)', pointerEvents: 'none' }} />
        {/* Thin left accent bar */}
        {!isMobile && <div style={{ position: 'absolute', top: '20%', left: 0, width: 2, height: '60%', background: `linear-gradient(to bottom, transparent, ${DC.gold}60, transparent)` }} />}

        <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: goldAccent, marginBottom: 20, opacity: 0.85, transition: `opacity 1s ${EASE}`, ...(visible ? {} : { opacity: 0 }) }}>OUR STORY</div>
        <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 'clamp(24px, 6vw, 36px)' : 'clamp(26px, 3.2vw, 46px)', color: headingCol, lineHeight: 1.22, marginBottom: 24, transition: `opacity 1s 0.18s ${EASE}, transform 1s 0.18s ${EASE}`, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)' }}>
          Bangladesh's First<br />Ottoman-Inspired<br />Five-Star Palace
        </div>
        <div style={{ width: 48, height: 1, background: `linear-gradient(to right, ${goldAccent}, transparent)`, marginBottom: 24, opacity: 0.65 }} />
        <div style={{ fontFamily: JOST, fontSize: 14, color: subCol, lineHeight: 1.92, marginBottom: 36, transition: `opacity 1s 0.38s ${EASE}`, opacity: visible ? 1 : 0 }}>
          A dream born from heritage. An ambition to place Bangladesh on the international tourism map. Inspired by Hürrem Sultan — the woman who shaped an empire.
        </div>
        <button
          onClick={() => onNavigate('story')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: JOST, fontSize: 10, letterSpacing: '0.28em', color: headingCol, background: 'none', border: `1px solid ${DC.gold}55`, cursor: 'pointer', padding: '11px 22px', width: 'fit-content', transition: `opacity 1s 0.52s ${EASE}, background 0.35s ease, border-color 0.35s ease`, opacity: visible ? 1 : 0 }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${DC.gold}22`; e.currentTarget.style.borderColor = DC.gold }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = `${DC.gold}55` }}
        >DISCOVER OUR STORY →</button>
      </div>
    </section>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// ARCHITECTURE — SCROLL-HIJACKED
// ═════════════════════════════════════════════════════════════════════════════
const VENUES = [
  { num: '01', name: 'IMPERIAL\nARRIVAL HALL',        img: IMG.a1, desc: 'A soaring double-height entrance dressed in hand-carved Makrana marble, gilded muqarnas ceilings and Ottoman tessellation.' },
  { num: '02', name: 'HÜRREM\nROYAL HAMMAM',          img: IMG.a2, desc: 'Authentic Turkish bath culture reimagined — warm marble slabs, star-domed skylights and imported Kütahya tilework.' },
  { num: '03', name: 'TOPKAPI\nROYAL DINING',         img: IMG.a3, desc: 'Ottoman imperial gastronomy elevated for the contemporary palate. Twelve curated courses, five centuries of culinary tradition.' },
  { num: '04', name: 'GLASS BRIDGE\nOF THE BOSPHORUS',img: IMG.a4, desc: 'A 40-metre suspended crystal walkway above the ornamental gardens, connecting the palace wings with light and sky.' },
  { num: '05', name: 'INFINITY POOL\nOF THE SULTANA', img: IMG.a5, desc: 'An endless horizon pool where the Bay of Bengal becomes your skyline. Heated. Artesian water. Gold-tiled basin.' },
  { num: '06', name: 'JAHAN\nMOSQUE',                 img: IMG.a6, desc: 'A private mosque of extraordinary beauty. Hand-painted Iznik tilework, a 22-metre dome, capacity for 800 worshippers.' },
]

function ArchitectureSection() {
  const { isDark } = useTheme()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const w = useWindowWidth()
  const isMobile = w < 768

  useEffect(() => {
    const fn = () => {
      const el = sectionRef.current; if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = (el.getBoundingClientRect().height || el.offsetHeight) - window.innerHeight
      if (scrollable < 1) return
      const progress = Math.min(0.9999, Math.max(0, -rect.top) / scrollable)
      setActive(Math.min(VENUES.length - 1, Math.floor(progress * VENUES.length)))
    }
    window.addEventListener('scroll', fn, { passive: true })
    const raf = requestAnimationFrame(fn)
    return () => { window.removeEventListener('scroll', fn); cancelAnimationFrame(raf) }
  }, [])

  const ov = (a: number) => imgOverlay(isDark, a)

  return (
    <section id="architecture" ref={sectionRef} style={{ height: `${VENUES.length * 100}svh` }}>
      <div style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden', backgroundColor: '#0A0807' }}>
        {VENUES.map((v, i) => (
          <div key={v.num} style={{ position: 'absolute', inset: 0, backgroundImage: `url(${v.img})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: imgFilter(isDark, 0.42, 0.68), transition: `opacity 1.0s ${EASE}, transform 1.4s ${EASE}`, opacity: active === i ? 1 : 0, transform: active === i ? 'scale(1.04)' : 'scale(1.09)' }} />
        ))}
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${ov(0.88)} 0%, ${ov(0.16)} 55%, ${ov(0.52)} 100%)`, pointerEvents: 'none' }} />
        {isMobile && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${ov(0.38)} 0%, ${ov(0.78)} 60%, ${ov(0.98)} 100%)`, pointerEvents: 'none' }} />}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, backgroundColor: `${imgGold(isDark)}22`, zIndex: 2 }}>
          <div style={{ height: '100%', width: `${((active + 1) / VENUES.length) * 100}%`, backgroundColor: imgGold(isDark), transition: `width 0.6s ${EASE}`, opacity: 0.8 }} />
        </div>
        <div style={{ position: 'absolute', top: isMobile ? 56 : 72, left: isMobile ? 24 : 80, zIndex: 2 }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: imgGold(isDark) }}>SIGNATURE ARCHITECTURE</div>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.2em', color: imgBrass(isDark), marginTop: 4 }}>{String(active + 1).padStart(2, '0')} — {String(VENUES.length).padStart(2, '0')}</div>
        </div>
        {isMobile ? (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 24px 80px', zIndex: 2 }}>
            <div key={active} style={{ animation: `slideLeft 0.7s ${EASE} both` }}>
              <div style={{ fontFamily: CINZEL, fontSize: 48, color: imgGold(isDark), opacity: 0.14, lineHeight: 1, marginBottom: -10 }}>{VENUES[active].num}</div>
              <div style={{ fontFamily: PLAYFAIR, fontSize: 'clamp(24px, 7vw, 36px)', color: imgText(isDark), lineHeight: 1.2, marginBottom: 12, whiteSpace: 'pre-line' }}>{VENUES[active].name}</div>
              <div style={{ width: 32, height: 1, background: DC.gold, opacity: 0.45, marginBottom: 12 }} />
              <div style={{ fontFamily: JOST, fontSize: 12, color: imgTextSec(isDark), lineHeight: 1.8 }}>{VENUES[active].desc}</div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              {VENUES.map((_, i) => <div key={i} style={{ width: i === active ? 24 : 6, height: 2, backgroundColor: i === active ? imgText(isDark) : imgBrass(isDark), transition: 'width 0.4s ease', borderRadius: 1 }} />)}
            </div>
          </div>
        ) : (
          <>
            <div style={{ position: 'absolute', left: 80, top: '50%', transform: 'translateY(-50%)', maxWidth: 460, zIndex: 2 }}>
              <div key={active} style={{ animation: `slideLeft 0.7s ${EASE} both` }}>
                <div style={{ fontFamily: CINZEL, fontSize: 72, color: imgGold(isDark), opacity: 0.13, lineHeight: 1, marginBottom: -16, userSelect: 'none' }}>{VENUES[active].num}</div>
                <div style={{ fontFamily: PLAYFAIR, fontSize: 'clamp(28px, 3.5vw, 48px)', color: imgText(isDark), lineHeight: 1.18, marginBottom: 20, whiteSpace: 'pre-line' }}>{VENUES[active].name}</div>
                <div style={{ width: 36, height: 1, background: DC.gold, opacity: 0.45, marginBottom: 18 }} />
                <div style={{ fontFamily: JOST, fontSize: 13, color: imgTextSec(isDark), lineHeight: 1.88, maxWidth: 360 }}>{VENUES[active].desc}</div>
              </div>
            </div>
            <div style={{ position: 'absolute', right: 80, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 20, zIndex: 2 }}>
              {VENUES.map((v, i) => (
                <div key={v.num} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ height: 1, width: active === i ? 28 : 10, backgroundColor: active === i ? imgText(isDark) : imgBrass(isDark), transition: 'width 0.4s ease, background-color 0.4s ease', display: 'block' }} />
                  <span style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.2em', color: active === i ? imgText(isDark) : imgBrass(isDark), transition: 'color 0.4s ease' }}>{v.num}</span>
                </div>
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: 44, left: '50%', transform: 'translateX(-50%)', fontFamily: JOST, fontSize: 9, letterSpacing: '0.3em', color: imgBrass(isDark), animation: 'progressPulse 2.5s infinite', whiteSpace: 'nowrap' }}>SCROLL TO EXPLORE</div>
          </>
        )}
      </div>
    </section>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// PALACE FACILITIES — free-browse interactive grid
// ═════════════════════════════════════════════════════════════════════════════
const FACILITY_ITEMS = [
  { cat: 'DINING',       num: '01', img: IMG.fDining,       tagline: 'Ottoman feast. Contemporary mastery.',          items: ["Topkapi Royal Dining", "Harem Garden Restaurant", "Bosphorus Terrace Café", "Sultana's Tea Lounge", "Palace Bar"] },
  { cat: 'BANQUET',      num: '02', img: IMG.fBanquet,      tagline: 'Imperial venues for every grand occasion.',     items: ["Imperial Grand Ballroom", "Suleiman Conference Hall", "Ottoman Garden Pavilion", "Roxelana Private Dining"] },
  { cat: 'POOLS',        num: '03', img: IMG.fPools,        tagline: 'Infinity, artisan water, Bengal horizon.',      items: ["Infinity Pool of the Sultana", "Children's Ottoman Pool", "Heated Indoor Pool", "Hydrotherapy Pool"] },
  { cat: 'WELLNESS',     num: '04', img: IMG.fWellness,     tagline: 'Ancient ritual. Modern restoration.',           items: ["Hürrem Royal Hammam", "Ayurvedic Spa", "Fitness Palace", "Meditation Terrace"] },
  { cat: 'FAMILY',       num: '05', img: IMG.fFamily,       tagline: 'Discovery for the next generation.',            items: ["Kids' Discovery Centre", "Family Beach Club", "Junior Ottoman Academy"] },
  { cat: 'LIBRARY',      num: '06', img: IMG.fLibrary,      tagline: 'Centuries of knowledge. One chamber.',          items: ["Imperial Reading Room", "Ottoman Heritage Archive"] },
  { cat: 'SHOPPING',     num: '07', img: IMG.fShopping,     tagline: 'Rare artisanship. Curated collections.',        items: ["Palace Artisan Boutique", "Turkish Bazaar", "Jewellery Atelier"] },
  { cat: 'FAITH',        num: '08', img: IMG.fFaith,        tagline: 'A private sanctuary of extraordinary beauty.',  items: ["Jahan Mosque", "Prayer Rooms", "Wudu Facilities"] },
  { cat: 'BEACH',        num: '09', img: IMG.fBeach,        tagline: 'The Bay of Bengal, privately yours.',           items: ["Private Beach Club", "Water Sports Centre", "Sunset Pier"] },
  { cat: 'PRESIDENTIAL', num: '10', img: IMG.fPresidential, tagline: 'The pinnacle of palace living.',                items: ["Presidential Suite", "Royal Medical Centre", "Private Helipad"] },
]

type FacilityItem = typeof FACILITY_ITEMS[0]

function FacilityCard({ fi, index, onOpen }: { fi: FacilityItem; index: number; onOpen: (fi: FacilityItem) => void }) {
  const { isDark } = useTheme()
  const { ref, visible } = useReveal(0.1)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onClick={() => onOpen(fi)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden', cursor: 'pointer',
        aspectRatio: '4/5',
        transition: `opacity 0.8s ${index * 0.07}s ${EASE}, transform 0.8s ${index * 0.07}s ${EASE}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
      }}
    >
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${fi.img})`, backgroundSize: 'cover', backgroundPosition: 'center',
        filter: `brightness(${isDark ? (hovered ? 0.55 : 0.42) : (hovered ? 0.72 : 0.58)}) saturate(0.7)`,
        transition: `transform 0.7s ${EASE}, filter 0.5s ease`,
        transform: hovered ? 'scale(1.07)' : 'scale(1)',
      }} />

      {/* Persistent gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,8,7,0.95) 0%, rgba(10,8,7,0.35) 55%, transparent 100%)' }} />

      {/* Hover reveal overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: isDark ? 'rgba(10,8,7,0.72)' : 'rgba(30,18,12,0.7)',
        transition: `opacity 0.45s ease`,
        opacity: hovered ? 1 : 0,
      }} />

      {/* Number watermark */}
      <div style={{ position: 'absolute', top: 16, left: 16, fontFamily: CINZEL, fontSize: 36, color: DC.gold, opacity: hovered ? 0.2 : 0.1, lineHeight: 1, transition: 'opacity 0.4s ease', pointerEvents: 'none' }}>{fi.num}</div>

      {/* Click hint badge */}
      <div style={{ position: 'absolute', top: 16, right: 16, fontFamily: JOST, fontSize: 8, letterSpacing: '0.22em', color: DC.champagne, backgroundColor: `${DC.gold}33`, border: `1px solid ${DC.gold}55`, padding: '5px 10px', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease', backdropFilter: 'blur(4px)' }}>VIEW</div>

      {/* Category name — always visible at bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: hovered ? '20px 20px 24px' : '20px 20px 22px', transition: `padding 0.4s ${EASE}` }}>
        <div style={{ fontFamily: CINZEL, fontSize: 'clamp(13px, 1.8vw, 16px)', letterSpacing: '0.2em', color: DC.ivory, marginBottom: hovered ? 10 : 0, transition: `margin 0.4s ${EASE}` }}>{fi.cat}</div>

        {/* Tagline — slides in on hover */}
        <div style={{ fontFamily: CORMORANT, fontSize: 14, fontStyle: 'italic', color: DC.sand, lineHeight: 1.5, maxHeight: hovered ? '80px' : '0', overflow: 'hidden', transition: `max-height 0.45s ${EASE}, opacity 0.35s ease`, opacity: hovered ? 1 : 0 }}>{fi.tagline}</div>

        {/* Venue pills — pop in on hover */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: hovered ? 10 : 0, maxHeight: hovered ? '120px' : '0', overflow: 'hidden', transition: `max-height 0.5s 0.05s ${EASE}, margin 0.4s ${EASE}` }}>
          {fi.items.map(v => (
            <span key={v} style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.1em', color: DC.champagne, padding: '3px 9px', border: `1px solid ${DC.gold}44`, backgroundColor: `${DC.gold}11`, opacity: hovered ? 1 : 0, transition: 'opacity 0.35s 0.1s ease' }}>{v}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function FacilityModal({ fi, onClose }: { fi: FacilityItem; onClose: () => void }) {
  const C = useC()
  const { isDark } = useTheme()
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', backgroundColor: 'rgba(10,8,7,0.88)', backdropFilter: 'blur(12px)', animation: `fadeIn 0.35s ${EASE}` }}>
      <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 820, maxHeight: '88vh', overflow: 'hidden', backgroundColor: isDark ? DC.palaceBlack : '#EDE4D4', border: `1px solid ${C.brass}44`, display: 'grid', gridTemplateColumns: '1fr 1fr', animation: `fadeUp 0.4s ${EASE}` }}>
        {/* Image side */}
        <div style={{ position: 'relative', minHeight: 380 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${fi.img})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.55) saturate(0.7)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 55%, rgba(17,16,14,0.9) 100%)' }} />
          <div style={{ position: 'absolute', top: 24, left: 24, fontFamily: CINZEL, fontSize: 52, color: DC.gold, opacity: 0.18, lineHeight: 1 }}>{fi.num}</div>
        </div>
        {/* Content side */}
        <div style={{ padding: '44px 36px', overflow: 'auto' }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.4em', color: C.gold, marginBottom: 12 }}>PALACE FACILITIES</div>
          <div style={{ fontFamily: CINZEL, fontSize: 'clamp(20px, 3vw, 28px)', letterSpacing: '0.15em', color: C.ivory, lineHeight: 1.15, marginBottom: 12 }}>{fi.cat}</div>
          <div style={{ fontFamily: CORMORANT, fontSize: 16, fontStyle: 'italic', color: C.sand, marginBottom: 24 }}>{fi.tagline}</div>
          <div style={{ width: 28, height: 1, background: C.gold, opacity: 0.4, marginBottom: 24 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {fi.items.map((v, i) => (
              <div key={v} style={{ fontFamily: JOST, fontSize: 12, letterSpacing: '0.1em', color: C.sand, padding: '13px 0', borderBottom: i < fi.items.length - 1 ? `1px solid ${C.brass}28` : 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: C.gold, opacity: 0.6, flexShrink: 0 }} />{v}
              </div>
            ))}
          </div>
        </div>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, fontFamily: JOST, fontSize: 9, letterSpacing: '0.3em', color: C.sand, background: 'none', border: `1px solid ${C.brass}44`, cursor: 'pointer', padding: '6px 14px' }}>CLOSE ✕</button>
      </div>
    </div>
  )
}

function FacilityGrid() {
  const C = useC()
  const { ref, visible } = useReveal(0.06)
  const w = useWindowWidth()
  const isMobile = w < 768
  const [modal, setModal] = useState<FacilityItem | null>(null)

  return (
    <section style={{ backgroundColor: C.imperialBlack, padding: isMobile ? '64px 0 0' : '96px 0 0' }}>
      {/* Header */}
      <div ref={ref as React.RefObject<HTMLDivElement>} style={{ padding: isMobile ? '0 24px 40px' : '0 80px 56px' }}>
        <div style={{ transition: `opacity 1s ${EASE}`, opacity: visible ? 1 : 0 }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: 16 }}>PALACE FACILITIES</div>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 'clamp(28px, 7vw, 40px)' : 'clamp(32px, 4vw, 52px)', color: C.ivory, lineHeight: 1.12 }}>
              The Complete <span style={{ fontStyle: 'italic' }}>Palace Experience.</span>
            </div>
            <div style={{ fontFamily: JOST, fontSize: 11, color: C.brass, textAlign: isMobile ? 'left' : 'right', lineHeight: 1.7, flexShrink: 0 }}>
              Tap any card to explore<br />venues within each world.
            </div>
          </div>
        </div>
      </div>

      {/* Card grid — staggered pop-in on scroll */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)', gap: 2 }}>
        {FACILITY_ITEMS.map((fi, i) => (
          <FacilityCard key={fi.cat} fi={fi} index={i} onOpen={setModal} />
        ))}
      </div>

      {modal && <FacilityModal fi={modal} onClose={() => setModal(null)} />}
    </section>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// INVESTMENT
// ═════════════════════════════════════════════════════════════════════════════
const BENEFITS = [
  { num: '01', title: 'LAND-BACKED',            desc: "Secured against company-owned land at Shamuk Beach, Cox's Bazar. Physical land, not financial speculation." },
  { num: '02', title: 'LONG-TERM',              desc: 'A 2027–2032 development timeline with defined milestones and board oversight. Built for generational value.' },
  { num: '03', title: 'TRANSFERABLE',           desc: 'Shares may be transferred, gifted or bequeathed to heirs. A legacy asset that grows across generations.' },
  { num: '04', title: 'OPERATIONAL OPPORTUNITY',desc: 'Qualifying shareholders may access revenue-sharing arrangements during the operational phase from 2032.' },
  { num: '05', title: 'PRIVILEGES',             desc: 'Priority palace booking, exclusive shareholder rates, invitations to annual shareholder events.' },
  { num: '06', title: 'INHERITANCE',            desc: 'Fully halal and Sharia-compliant. Structured for clean transfer within your estate under Islamic inheritance principles.' },
]
const PACKAGES = [
  { label: 'SINGLE',  shares: '1 SHARE',    note: 'Per share base price',  full: '৳5,00,000',    m12: '৳45,000 / mo',  m24: '৳24,000 / mo' },
  { label: 'PREMIUM', shares: '5–9 SHARES', note: '৳5,00,000 / share',    full: '৳25,00,000+',  m12: '৳2,10,000 / mo',m24: '৳1,15,000 / mo', featured: true },
  { label: 'PRIVATE', shares: '10+ SHARES', note: 'Enquire privately',     full: 'Private terms', m12: 'Custom',        m24: 'Custom' },
]
type Plan = 'full' | 'm12' | 'm24'

function InvestmentSection({ onNavigate }: { onNavigate: (p: string) => void }) {
  const C = useC()
  const { isDark } = useTheme()
  const [activeBenefit, setActiveBenefit] = useState(0)
  const [plan, setPlan] = useState<Plan>('full')
  const [userPicked, setUserPicked] = useState(false)

  // Auto-cycle every 2 s unless user has manually selected
  useEffect(() => {
    if (userPicked) return
    const t = setInterval(() => setActiveBenefit(a => (a + 1) % BENEFITS.length), 2000)
    return () => clearInterval(t)
  }, [userPicked])
  const { ref, visible } = useReveal(0.1)
  const w = useWindowWidth()
  const isMobile = w < 768

  // Light theme: solid dignified parchment — no washed-out image overlay
  const sectionBg   = isDark ? C.palaceBlack : '#E8DDD0'
  const cardBg      = isDark ? C.palaceBlack : '#F0E8D8'
  const cardBgAlt   = isDark ? BRAND_CRIMSON_DIM : BRAND_CRIMSON   // featured package uses brand crimson
  const borderCol   = isDark ? `${C.brass}44` : `${C.brass}66`
  const btnActiveBg = isDark ? `${BRAND_CRIMSON}55` : `${BRAND_CRIMSON}22`

  return (
    <section id="investment" style={{ position: 'relative', overflow: 'hidden', backgroundColor: sectionBg }}>
      {/* Dark mode keeps the subtle dome image; light mode uses clean top accent instead */}
      {isDark && <>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG.dome})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.1) saturate(0.3)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,8,7,0.82)' }} />
      </>}
      {!isDark && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, opacity: 0.6 }} />}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1320, margin: '0 auto', padding: isMobile ? '80px 24px' : '120px 80px' }}>
        {/* Header */}
        <div ref={ref as React.RefObject<HTMLDivElement>} style={{ marginBottom: isMobile ? 48 : 80 }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: 20, transition: `opacity 1s ${EASE}`, opacity: visible ? 1 : 0 }}>INVESTMENT</div>
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 'clamp(32px, 8vw, 52px)' : 'clamp(36px, 5.5vw, 76px)', color: C.ivory, lineHeight: 1.1, transition: `opacity 1s 0.2s ${EASE}, transform 1s 0.2s ${EASE}`, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(34px)' }}>OWN THE LAND.<br />OWN THE LEGACY.</div>
          <div style={{ marginTop: 20, fontFamily: CORMORANT, fontSize: isMobile ? 15 : 18, fontStyle: 'italic', color: C.brass, transition: `opacity 1s 0.4s ${EASE}`, opacity: visible ? 1 : 0 }}>Halal · Sharia-compliant · Land-backed</div>
        </div>

        {/* Benefits grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', border: `1px solid ${borderCol}`, marginBottom: isMobile ? 48 : 80, backgroundColor: isDark ? 'transparent' : '#F0E8D8' }}>
          <div style={{ borderRight: isMobile ? 'none' : `1px solid ${borderCol}`, borderBottom: isMobile ? `1px solid ${borderCol}` : 'none' }}>
            {BENEFITS.map((b, i) => (
              <button key={b.num} onClick={() => { setActiveBenefit(i); setUserPicked(true) }} style={{ width: '100%', padding: isMobile ? '16px 20px' : '22px 28px', display: 'flex', alignItems: 'center', gap: 16, background: activeBenefit === i ? btnActiveBg : 'transparent', border: 'none', borderBottom: i < BENEFITS.length - 1 ? `1px solid ${isDark ? `${C.brass}28` : `${C.brass}33`}` : 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.35s ease' }}>
                <span style={{ fontFamily: CINZEL, fontSize: isMobile ? 20 : 26, minWidth: 42, color: activeBenefit === i ? C.gold : C.brass, fontWeight: activeBenefit === i ? 700 : 400, transition: 'color 0.3s' }}>{b.num}</span>
                <span style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.18em', color: activeBenefit === i ? C.ivory : C.sand, fontWeight: activeBenefit === i ? 600 : 400, transition: 'color 0.3s' }}>{b.title}</span>
                {activeBenefit === i && <span style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: '50%', backgroundColor: C.gold }} />}
              </button>
            ))}
          </div>
          <div style={{ padding: isMobile ? '28px 20px' : '48px 44px', display: 'flex', alignItems: 'center', backgroundColor: isDark ? 'transparent' : '#EDE4D4' }}>
            <div key={activeBenefit} style={{ animation: `fadeIn 0.5s ${EASE}` }}>
              <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 40 : 64, color: C.gold, opacity: isDark ? 0.12 : 0.22, lineHeight: 1, marginBottom: -10 }}>{BENEFITS[activeBenefit].num}</div>
              <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 22 : 28, color: C.ivory, marginBottom: 14, lineHeight: 1.25 }}>{BENEFITS[activeBenefit].title}</div>
              <GoldLine w={28} />
              <div style={{ height: 14 }} />
              <div style={{ fontFamily: JOST, fontSize: 13, color: C.sand, lineHeight: 1.9 }}>{BENEFITS[activeBenefit].desc}</div>
            </div>
          </div>
        </div>

        {/* CTA to full investment page */}
        <div style={{ marginTop: isMobile ? 40 : 64, paddingTop: isMobile ? 32 : 48, borderTop: `1px solid ${borderCol}`, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 18 : 22, color: C.ivory, fontStyle: 'italic', marginBottom: 6 }}>Ready to explore full ownership details?</div>
            <div style={{ fontFamily: JOST, fontSize: 11, color: C.brass }}>15–20% estimated annual halal profit · Land-backed · Sharia-compliant</div>
          </div>
          <button onClick={() => onNavigate('investment')} style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.26em', color: DC.ivory, background: isDark ? BRAND_CRIMSON_DIM : BRAND_CRIMSON, border: `1px solid ${DC.gold}55`, padding: '13px 32px', cursor: 'pointer', whiteSpace: 'nowrap', transition: `all 0.4s ${EASE}` }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = BRAND_CRIMSON_LIGHT; e.currentTarget.style.borderColor = DC.gold; e.currentTarget.style.letterSpacing = '0.34em' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = isDark ? BRAND_CRIMSON_DIM : BRAND_CRIMSON; e.currentTarget.style.borderColor = `${DC.gold}55`; e.currentTarget.style.letterSpacing = '0.26em' }}
          >EXPLORE INVESTMENT →</button>
        </div>
      </div>
    </section>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// CONTACT
// ═════════════════════════════════════════════════════════════════════════════
function ContactSection() {
  const C = useC()
  const { ref, visible } = useReveal()
  const [form, setForm] = useState({ name: '', phone: '', email: '', interest: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const w = useWindowWidth()
  const isMobile = w < 768
  const fieldStyle: React.CSSProperties = { width: '100%', background: 'none', border: 'none', borderBottom: `1px solid ${C.brass}66`, padding: '12px 0', fontFamily: JOST, fontSize: 15, color: C.ivory, outline: 'none', letterSpacing: '0.04em', transition: 'border-color 0.3s ease' }
  const labelStyle: React.CSSProperties = { display: 'block', fontFamily: JOST, fontSize: 9, letterSpacing: '0.35em', color: C.gold, marginBottom: 10 }

  return (
    <section id="contact" style={{ backgroundColor: C.imperialBlack, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: isMobile ? '80px 24px' : '120px 80px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.15fr', gap: isMobile ? 48 : 80 }}>
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: 28, transition: `opacity 1s ${EASE}`, opacity: visible ? 1 : 0 }}>GET IN TOUCH</div>
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 'clamp(32px, 8vw, 52px)' : 'clamp(36px, 4vw, 58px)', color: C.ivory, lineHeight: 1.18, marginBottom: 32, transition: `opacity 1s 0.18s ${EASE}, transform 1s 0.18s ${EASE}`, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(22px)' }}>Let's Talk</div>
          <div style={{ fontFamily: CORMORANT, fontSize: isMobile ? 17 : 20, fontStyle: 'italic', color: C.sand, lineHeight: 2, marginBottom: 44, transition: `opacity 1s 0.32s ${EASE}`, opacity: visible ? 1 : 0 }}>About the palace.<br />About ownership.<br />About the future.</div>
          <div style={{ transition: `opacity 1s 0.5s ${EASE}`, opacity: visible ? 1 : 0 }}>
            <GoldLine w={40} /><div style={{ height: 28 }} />
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.35em', color: C.gold, marginBottom: 8 }}>DHAKA OFFICE</div>
              <div style={{ fontFamily: JOST, fontSize: 13, color: C.sand, lineHeight: 1.9 }}>Hurrem Palace Limited<br />House 07, Road 137, Gulshan-1<br />Dhaka-1212, Bangladesh</div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.35em', color: C.gold, marginBottom: 8 }}>CONTACT</div>
              <div style={{ fontFamily: JOST, fontSize: 13, color: C.sand, lineHeight: 1.9 }}>info@hurrempalace.com<br />+01819-911999</div>
            </div>
            <div>
              <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.35em', color: C.gold, marginBottom: 8 }}>PROJECT SITE</div>
              <div style={{ fontFamily: JOST, fontSize: 13, color: C.sand, lineHeight: 1.9 }}>Shamuk Beach · Cox's Bazar–Teknaf Marine Drive<br />Cox's Bazar, Bangladesh</div>
            </div>
            {!isMobile && <div style={{ marginTop: 44, opacity: 0.3 }}><ImperialSeal size={72} /></div>}
          </div>
        </div>
        <div style={{ paddingTop: isMobile ? 0 : 72 }}>
          {!submitted ? (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
              {[{ k: 'name', l: 'NAME', t: 'text' }, { k: 'phone', l: 'PHONE', t: 'tel' }, { k: 'email', l: 'EMAIL', t: 'email' }].map(({ k, l, t }) => (
                <div key={k} style={{ marginBottom: 28 }}>
                  <label style={labelStyle}>{l}</label>
                  <input type={t} value={form[k as keyof typeof form]} onChange={e => setForm({ ...form, [k]: e.target.value })} style={fieldStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = C.gold)} onBlur={e => (e.currentTarget.style.borderColor = `${C.brass}66`)} />
                </div>
              ))}
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>INTEREST</label>
                <select value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })} style={{ ...fieldStyle, cursor: 'pointer', appearance: 'none', color: form.interest ? C.ivory : C.brass }}
                  onFocus={e => (e.currentTarget.style.borderColor = C.gold)} onBlur={e => (e.currentTarget.style.borderColor = `${C.brass}66`)}>
                  <option value="" style={{ backgroundColor: DC.palaceBlack }}>Select your interest</option>
                  {['Investment Enquiry', 'Partnership', 'Media & Press', 'General Enquiry'].map(o => <option key={o} value={o.toLowerCase()} style={{ backgroundColor: DC.palaceBlack }}>{o}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 40 }}>
                <label style={labelStyle}>MESSAGE</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} style={{ ...fieldStyle, resize: 'none' }}
                  onFocus={e => (e.currentTarget.style.borderColor = C.gold)} onBlur={e => (e.currentTarget.style.borderColor = `${C.brass}66`)} />
              </div>
              <button type="submit" style={{ width: '100%', padding: '17px', border: `1px solid ${C.gold}`, backgroundColor: 'transparent', fontFamily: JOST, fontSize: isMobile ? 10 : 11, letterSpacing: '0.26em', color: C.champagne, cursor: 'pointer', transition: `all 0.5s ${EASE}` }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${C.gold}18`; e.currentTarget.style.letterSpacing = '0.36em' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.letterSpacing = '0.26em' }}>
                REQUEST A PRIVATE CONSULTATION
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0', animation: `fadeIn 0.8s ${EASE}` }}>
              <ImperialSeal size={80} opacity={0.7} />
              <div style={{ fontFamily: PLAYFAIR, fontSize: 22, color: C.ivory, marginTop: 32, marginBottom: 14 }}>Your enquiry has been received.</div>
              <div style={{ fontFamily: CORMORANT, fontSize: 16, fontStyle: 'italic', color: C.sand }}>A member of the palace team will be in touch shortly.</div>
              <div style={{ margin: '28px auto 0', width: 60, height: 1, background: C.gold, opacity: 0.3 }} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// MAP SECTION
// ═════════════════════════════════════════════════════════════════════════════
function MapSection() {
  const C = useC()
  const { isDark } = useTheme()
  const { ref, visible } = useReveal(0.1)
  const w = useWindowWidth()
  const isMobile = w < 768

  return (
    <section style={{ backgroundColor: C.palaceBlack, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, opacity: 0.25 }} />
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: isMobile ? '64px 24px 80px' : '96px 80px 112px' }}>
        <div ref={ref as React.RefObject<HTMLDivElement>} style={{ marginBottom: isMobile ? 40 : 64, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: 16, transition: `opacity 1s ${EASE}`, opacity: visible ? 1 : 0 }}>THE LOCATION</div>
            <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 'clamp(26px, 7vw, 44px)' : 'clamp(32px, 4vw, 52px)', color: C.ivory, lineHeight: 1.15, transition: `opacity 1s 0.2s ${EASE}, transform 1s 0.2s ${EASE}`, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}>
              Shamuk Beach<br /><span style={{ fontStyle: 'italic', color: C.sand, fontSize: '0.7em' }}>Cox's Bazar, Bangladesh</span>
            </div>
          </div>
          <div style={{ transition: `opacity 1s 0.4s ${EASE}`, opacity: visible ? 1 : 0 }}>
            {[{ label: 'SITE AREA', value: '4 ACRES' }, { label: 'LAND TYPE', value: 'PRIVATE' }, { label: 'COAST', value: 'BAY OF BENGAL' }].map(stat => (
              <div key={stat.label} style={{ display: 'flex', gap: 20, alignItems: 'baseline', marginBottom: 8 }}>
                <div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.3em', color: C.brass, minWidth: 80 }}>{stat.label}</div>
                <div style={{ fontFamily: CINZEL, fontSize: 12, letterSpacing: '0.18em', color: C.champagne }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'relative', width: '100%', height: isMobile ? 320 : 520, transition: `opacity 1.2s 0.5s ${EASE}`, opacity: visible ? 1 : 0 }}>
          {['tl','tr','bl','br'].map(p => <div key={p} style={{ position: 'absolute', ...(p.includes('t') ? { top: -1 } : { bottom: -1 }), ...(p.includes('l') ? { left: -1 } : { right: -1 }), width: 28, height: 28, borderTop: p.includes('t') ? `1px solid ${C.gold}` : 'none', borderBottom: p.includes('b') ? `1px solid ${C.gold}` : 'none', borderLeft: p.includes('l') ? `1px solid ${C.gold}` : 'none', borderRight: p.includes('r') ? `1px solid ${C.gold}` : 'none', zIndex: 2, opacity: 0.5 }} />)}
          <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 3, pointerEvents: 'none' }}>
            <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.3em', color: '#fff', backgroundColor: 'rgba(10,8,7,0.72)', padding: '6px 14px', backdropFilter: 'blur(6px)' }}>SHAMUK BEACH · COX'S BAZAR</div>
          </div>
          <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=91.9300%2C21.3500%2C92.0700%2C21.5200&layer=mapnik&marker=21.43%2C92.00" width="100%" height="100%"
            style={{ border: `1px solid ${C.brass}33`, filter: isDark ? 'grayscale(0.7) brightness(0.55) contrast(1.1) sepia(0.2)' : 'grayscale(0.3) brightness(0.95) saturate(0.85)', display: 'block' }}
            title="Shamuk Beach, Cox's Bazar" />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: `linear-gradient(to top, ${isDark ? 'rgba(17,16,14,0.9)' : 'rgba(235,226,208,0.9)'} 0%, transparent 100%)`, padding: '32px 24px 16px', pointerEvents: 'none', zIndex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: CINZEL, fontSize: 10, letterSpacing: '0.22em', color: C.champagne, opacity: 0.7 }}>BAY OF BENGAL</div>
            <div style={{ fontFamily: CORMORANT, fontSize: 14, fontStyle: 'italic', color: C.sand, opacity: 0.6 }}>Cox's Bazar–Teknaf Marine Drive</div>
          </div>
        </div>
        <div style={{ marginTop: isMobile ? 32 : 48, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: isMobile ? 24 : 0, borderTop: `1px solid ${C.brass}28`, paddingTop: 36 }}>
          {[{ dir: 'WEST', desc: 'Bay of Bengal', note: 'Uninterrupted ocean horizon' }, { dir: 'EAST', desc: 'Hill ranges', note: 'Natural backdrop of verdant hills' }, { dir: 'ACCESS', desc: 'Marine Drive', note: "Cox's Bazar–Teknaf coastal road" }].map((item, i) => (
            <div key={item.dir} style={{ padding: isMobile ? '0' : '0 40px', borderLeft: !isMobile && i > 0 ? `1px solid ${C.brass}22` : 'none' }}>
              <div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.4em', color: C.gold, marginBottom: 8 }}>{item.dir}</div>
              <div style={{ fontFamily: CINZEL, fontSize: 14, letterSpacing: '0.14em', color: C.ivory, marginBottom: 5 }}>{item.desc}</div>
              <div style={{ fontFamily: JOST, fontSize: 11, color: C.brass, lineHeight: 1.7 }}>{item.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// FOOTER
// ═════════════════════════════════════════════════════════════════════════════
function Footer({ onNavigate }: { onNavigate: (page: string | null) => void }) {
  const C = useC()
  const w = useWindowWidth()
  const isMobile = w < 768

  return (
    <footer style={{ backgroundColor: C.imperialBlack, borderTop: `1px solid ${C.brass}28` }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: isMobile ? '60px 24px 0' : '80px 80px 0' }}>
        <img
          src={hurremLogo}
          alt="Hurrem Palace"
          style={{ width: isMobile ? 168 : 240, height: 'auto', display: 'block', marginBottom: 12 }}
        />
        <div style={{ fontFamily: CORMORANT, fontSize: 13, fontStyle: 'italic', color: C.brass, marginBottom: 48, letterSpacing: '0.08em' }}>An Ottoman Legacy on Bangladesh's Coast</div>
        <div style={{ width: '100%', height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, opacity: 0.3, marginBottom: 48 }} />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? '32px 20px' : 40, marginBottom: 56 }}>
          {[
            { head: 'EXPLORE', links: [['OUR STORY', 'story'], ['PROJECT & LOCATION', 'location'], ['COMPANY DETAILS', 'company'], ['ARCHITECTURE', 'architecture'], ['INVESTMENT', 'investment'], ['NEWS & EVENTS', 'news']] as [string, string | null][] },
            { head: 'NAVIGATE', links: [['HOME', null], ['CONTACT', null]] as [string, string | null][] },
            { head: 'LEGAL', links: [['PRIVACY POLICY', null], ['TERMS OF USE', null], ['INVESTMENT DISCLOSURE', null]] as [string, string | null][] },
            { head: 'CONTACT', links: [['info@hurrempalace.com', null], ['+01819-911999', null], ["Gulshan-1, Dhaka-1212", null]] as [string, string | null][] },
          ].map(col => (
            <div key={col.head}>
              <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.4em', color: C.gold, marginBottom: 18 }}>{col.head}</div>
              {col.links.map(([label, target]) => (
                <button key={label} onClick={() => target && !target.startsWith('#') ? onNavigate(target) : null} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: target ? 'pointer' : 'default', fontFamily: JOST, fontSize: isMobile ? 11 : 12, letterSpacing: '0.1em', color: C.sand, marginBottom: 11, transition: 'color 0.3s', padding: 0 }}
                  onMouseEnter={e => target && (e.currentTarget.style.color = C.champagne)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.sand)}
                >{label}</button>
              ))}
              {col.head === 'CONTACT' && (
                <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                  {[
                    { label: 'Facebook', href: 'https://facebook.com/hurrempalace', icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    )},
                    { label: 'Instagram', href: 'https://instagram.com/hurrempalace', icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                    )},
                    { label: 'WhatsApp', href: 'https://wa.me/8801819911999', icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    )},
                  ].map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                      style={{ color: C.brass, transition: 'color 0.3s', display: 'flex', alignItems: 'center' }}
                      onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
                      onMouseLeave={e => (e.currentTarget.style.color = C.brass)}
                    >{s.icon}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${C.brass}28` }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: isMobile ? '18px 24px' : '22px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.18em', color: C.brass }}>© 2025 HURREM PALACE LIMITED. ALL RIGHTS RESERVED.</div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            {!isMobile && <div style={{ fontFamily: CORMORANT, fontSize: 12, fontStyle: 'italic', color: C.brass }}>Hurrem Palace Limited — Private Limited Company</div>}
            <button onClick={() => onNavigate('admin')} style={{ fontFamily: JOST, fontSize: 7, letterSpacing: '0.18em', color: `${C.brass}55`, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>admin</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE SHELL
// ═════════════════════════════════════════════════════════════════════════════
function PageShell({ children, onBack }: { children: React.ReactNode; onBack: () => void }) {
  const C = useC()
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div style={{ backgroundColor: C.imperialBlack, minHeight: '100vh', paddingTop: 88 }}>
      <button onClick={onBack} style={{
        position: 'fixed', bottom: 88, right: 32, zIndex: 700,
        fontFamily: JOST, fontSize: 9, letterSpacing: '0.28em', color: C.sand,
        background: 'none', border: `1px solid ${C.brass}55`, cursor: 'pointer',
        padding: '10px 18px', backdropFilter: 'blur(8px)',
        backgroundColor: `${C.imperialBlack}CC`,
        transition: `color 0.3s, border-color 0.3s`,
      }}
        onMouseEnter={e => { e.currentTarget.style.color = C.champagne; e.currentTarget.style.borderColor = C.gold }}
        onMouseLeave={e => { e.currentTarget.style.color = C.sand; e.currentTarget.style.borderColor = `${C.brass}55` }}
      >← HOME</button>
      {children}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// ─── Story sub-components ────────────────────────────────────────────────────
function Chapter01Block({ r1, v1, C, isMobile }: { r1: React.RefObject<HTMLElement>; v1: boolean; C: typeof DC; isMobile: boolean }) {
  const line1 = useTypewriter('NOT A HOTEL.', 60, v1)
  const line2 = useTypewriter('A DESTINATION.', 60, line1.length >= 'NOT A HOTEL.'.length)
  return (
    <div style={{ backgroundColor: C.imperialBlack, padding: isMobile ? '80px 28px' : '120px 80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 900, textAlign: 'center' }}>
        <div ref={r1} style={{ transition: `opacity 1s ${EASE}`, opacity: v1 ? 1 : 0 }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.5em', color: C.gold, marginBottom: 48 }}>CHAPTER 01</div>
          {/* Typewriter lines */}
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 'clamp(36px, 10vw, 64px)' : 'clamp(48px, 7vw, 88px)', color: C.ivory, lineHeight: 1.05, marginBottom: 6, fontStyle: 'italic', minHeight: isMobile ? '1.1em' : '1.1em' }}>
            {line1}<span style={{ borderRight: `3px solid ${C.gold}`, marginLeft: 2, opacity: line1.length < 'NOT A HOTEL.'.length ? 1 : 0, animation: 'progressPulse 0.8s infinite', display: 'inline-block' }} />
          </div>
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 'clamp(36px, 10vw, 64px)' : 'clamp(48px, 7vw, 88px)', color: C.champagne, lineHeight: 1.05, marginBottom: 40, fontWeight: 700, minHeight: isMobile ? '1.1em' : '1.1em' }}>
            {line2}<span style={{ borderRight: `3px solid ${C.gold}`, marginLeft: 2, opacity: line2.length > 0 && line2.length < 'A DESTINATION.'.length ? 1 : 0, animation: 'progressPulse 0.8s infinite', display: 'inline-block' }} />
          </div>
          <div style={{ width: 1, height: 60, background: `linear-gradient(to bottom, ${C.gold}, transparent)`, margin: '0 auto 40px', opacity: 0.4 }} />
          <div style={{ fontFamily: JOST, fontSize: isMobile ? 14 : 16, color: C.sand, lineHeight: 1.95, maxWidth: 680, margin: '0 auto' }}>
            Hurrem Palace Limited is building more than a hotel — a complete international tourism destination on Bangladesh's coast. A world of Ottoman artistry, coastal grandeur and contemporary luxury, designed to draw visitors from across the globe.
          </div>
        </div>
      </div>
    </div>
  )
}

function StoryNumbersBlock({ C, isMobile }: { C: typeof DC; isMobile: boolean }) {
  const { ref, visible } = useReveal(0.15)
  const acres  = useCountUp(4,      1400, visible, 0)
  const shares = useCountUp(40000,  1800, visible, 0)
  const year1  = useCountUp(2027,   1600, visible, 2020)
  const year2  = useCountUp(2032,   1800, visible, 2020)
  const fmt = (n: number) => n.toLocaleString()
  return (
    <div style={{ backgroundColor: C.imperialBlack }}>
      <div ref={ref as React.RefObject<HTMLDivElement>} style={{ maxWidth: 1300, margin: '0 auto', padding: isMobile ? '64px 28px' : '96px 80px' }}>
        <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.5em', color: C.gold, marginBottom: 56 }}>CHAPTER 05 · THE PROJECT</div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 1, backgroundColor: `${C.brass}22` }}>
          {[{ val: fmt(acres),  suffix: '', unit: 'ACRES',        desc: 'Private company-owned land at Shamuk Beach' },
            { val: fmt(shares), suffix: '', unit: 'SHARES',       desc: 'Authorized at ৳5,00,000 per share' },
            { val: String(year1), suffix: '', unit: 'CONSTRUCTION', desc: 'Ground-breaking ceremony and build commences' },
            { val: String(year2), suffix: '', unit: 'OPENING',      desc: 'Target grand opening — the palace receives the world' },
          ].map((s, i) => (
            <div key={s.unit} style={{ backgroundColor: C.imperialBlack, padding: isMobile ? '36px 20px' : '56px 44px', textAlign: 'center', transition: `opacity 1s ${i * 0.1}s ${EASE}`, opacity: visible ? 1 : 0 }}>
              <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 'clamp(36px,9vw,52px)' : 'clamp(40px,5vw,68px)', color: C.gold, opacity: 0.7, lineHeight: 1, marginBottom: 8 }}>{s.val}</div>
              <div style={{ fontFamily: CINZEL, fontSize: 10, letterSpacing: '0.28em', color: C.champagne, marginBottom: 14 }}>{s.unit}</div>
              <div style={{ width: 20, height: 1, background: C.gold, opacity: 0.35, margin: '0 auto 14px' }} />
              <div style={{ fontFamily: JOST, fontSize: 11, color: C.brass, lineHeight: 1.7 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// OUR STORY PAGE
// ═════════════════════════════════════════════════════════════════════════════
function OurStoryPage({ onBack, onNavigate }: { onBack: () => void; onNavigate: (p: string) => void }) {
  const C = useC()
  const { isDark } = useTheme()
  const w = useWindowWidth()
  const isMobile = w < 768
  const { ref: r1, visible: v1 } = useReveal(0.1)
  const { ref: r2, visible: v2 } = useReveal(0.1)
  const { ref: r3, visible: v3 } = useReveal(0.1)
  const { ref: r4, visible: v4 } = useReveal(0.1)
  const { ref: r5, visible: v5 } = useReveal(0.1)
  const { ref: heroRef, offset: heroOff } = useScrollParallax(0.4)
  const { ref: ctaRef, offset: ctaOff } = useScrollParallax(0.35)

  const chapters = [
    { num: '01', title: 'THE NEED', body: 'Bangladesh has immense natural beauty and cultural heritage — yet the country lacks an iconic destination capable of drawing international visitors simply through its identity and architecture.' },
    { num: '02', title: 'THE IDEA', body: 'Create an internationally credible five-star destination. A place people travel to see, not merely a place they stay while visiting somewhere else.' },
    { num: '03', title: 'THE IDENTITY', body: 'Introduce Ottoman architectural heritage and artistry to Bangladesh — combining one of the world\'s great architectural traditions with the coastal landscape of the Bay of Bengal.' },
    { num: '04', title: 'THE AMBITION', body: 'Build a destination, not simply a hotel. A complete world — with dining, wellness, faith, culture, shopping and beach — all held within one imperial vision.' },
    { num: '05', title: 'THE LEGACY', body: 'Create something future generations can identify with and be proud of. A landmark for Bangladesh that outlives its builders and grows in meaning over time.' },
  ]

  return (
    <PageShell onBack={onBack}>
      {/* Hero — parallax */}
      <div ref={heroRef} style={{ position: 'relative', height: isMobile ? '65vh' : '90vh', overflow: 'hidden', backgroundColor: '#0A0807' }}>
        <div style={{ position: 'absolute', inset: '-15%', backgroundImage: `url(${IMG.story})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.38) saturate(0.6)', transform: `translateY(${heroOff}px)`, willChange: 'transform' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(68,2,3,0.55) 0%, rgba(10,8,7,0.4) 50%, rgba(10,8,7,0.96) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.5em', color: DC.gold, marginBottom: 24, animation: `fadeUp 1s 0.2s ${EASE} both`, opacity: 0 }}>ABOUT HURREM PALACE</div>
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 'clamp(36px, 9vw, 56px)' : 'clamp(44px, 6vw, 80px)', color: DC.ivory, lineHeight: 1.08, animation: `fadeUp 1s 0.4s ${EASE} both`, opacity: 0 }}>
            Our Story
          </div>
          <div style={{ width: 48, height: 1, background: DC.gold, opacity: 0.4, margin: '20px 0' }} />
          <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 11 : 13, letterSpacing: '0.2em', color: DC.sand, animation: `fadeUp 1s 0.6s ${EASE} both`, opacity: 0 }}>
            BANGLADESH'S FIRST OTTOMAN-INSPIRED<br />FIVE-STAR PALACE
          </div>
          <div style={{ marginTop: 16, fontFamily: CORMORANT, fontSize: isMobile ? 14 : 18, fontStyle: 'italic', color: DC.brass, animation: `fadeUp 1s 0.8s ${EASE} both`, opacity: 0 }}>A destination beyond hospitality.</div>
        </div>
      </div>

      {/* Chapter 01 — NOT A HOTEL (typewriter) */}
      <Chapter01Block r1={r1} v1={v1} C={C} isMobile={isMobile} />

      {/* Chapter 02 — A Dream for Bangladesh (vertical stagger) */}
      <div style={{ backgroundColor: C.palaceBlack }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '64px 28px' : '96px 80px' }}>
          <div ref={r2 as React.RefObject<HTMLDivElement>} style={{ marginBottom: isMobile ? 48 : 72 }}>
            <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.5em', color: C.gold, marginBottom: 20, transition: `opacity 1s ${EASE}`, opacity: v2 ? 1 : 0 }}>CHAPTER 02</div>
            <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 'clamp(28px, 7vw, 48px)' : 'clamp(36px, 4.5vw, 64px)', color: C.ivory, lineHeight: 1.15, transition: `opacity 1s 0.2s ${EASE}`, opacity: v2 ? 1 : 0 }}>
              A Dream<br /><span style={{ fontStyle: 'italic', color: C.sand }}>for Bangladesh.</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {chapters.map((ch, i) => (
              <div key={ch.num}
                style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px 1fr', gap: isMobile ? 12 : 48, padding: isMobile ? '28px 0' : '40px 0', borderBottom: `1px solid ${C.brass}22`, transition: `opacity 1s ${i * 0.12}s ${EASE}, transform 1s ${i * 0.12}s ${EASE}`, opacity: v2 ? 1 : 0, transform: v2 ? 'translateX(0)' : 'translateX(-20px)', alignItems: 'baseline' }}
              >
                {/* Left: number + title */}
                <div>
                  <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 40 : 56, color: C.gold, opacity: 0.12, lineHeight: 1, marginBottom: -6 }}>{ch.num}</div>
                  <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 11 : 12, letterSpacing: '0.28em', color: C.champagne }}>{ch.title}</div>
                  {!isMobile && <div style={{ width: 28, height: 1, background: C.gold, opacity: 0.35, marginTop: 12 }} />}
                </div>
                {/* Right: body */}
                <div style={{ fontFamily: JOST, fontSize: isMobile ? 13 : 15, color: C.sand, lineHeight: 1.95, paddingTop: isMobile ? 0 : 8 }}>{ch.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chapter 03 — Hürrem Sultan */}
      <div ref={r3 as React.RefObject<HTMLDivElement>} style={{ maxWidth: 1300, margin: '0 auto', padding: isMobile ? '64px 28px' : '96px 80px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 80, alignItems: 'center' }}>
        <div style={{ position: 'relative', height: isMobile ? 280 : 540, overflow: 'hidden', transition: `opacity 1.2s ${EASE}`, opacity: v3 ? 1 : 0 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG.ottoman1})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.65) saturate(0.75)' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to ${isMobile ? 'bottom' : 'right'}, transparent 55%, ${C.imperialBlack} 100%)` }} />
          <Corner pos="tl" /><Corner pos="br" />
        </div>
        <div style={{ transition: `opacity 1s 0.3s ${EASE}, transform 1s 0.3s ${EASE}`, opacity: v3 ? 1 : 0, transform: v3 ? 'none' : 'translateX(28px)' }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.5em', color: C.gold, marginBottom: 20 }}>CHAPTER 03 · THE INSPIRATION</div>
          <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 'clamp(28px, 8vw, 44px)' : 'clamp(36px, 4vw, 56px)', letterSpacing: '0.1em', color: C.ivory, lineHeight: 1.1, marginBottom: 24 }}>HÜRREM<br />SULTAN</div>
          <GoldLine w={40} />
          <div style={{ height: 28 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
            {['STRENGTH.', 'BEAUTY.', 'WISDOM.', 'LEGACY.'].map(word => (
              <div key={word} style={{ fontFamily: CORMORANT, fontSize: isMobile ? 22 : 28, fontStyle: 'italic', color: C.champagne, letterSpacing: '0.08em' }}>{word}</div>
            ))}
          </div>
          <div style={{ fontFamily: JOST, fontSize: 13, color: C.sand, lineHeight: 1.95 }}>
            Born Roxelana, she rose from captivity to become the most powerful woman in the Ottoman Empire — wife of Suleiman the Magnificent, confidante of an empire. Her story is one of extraordinary intelligence, grace, and ambition.<br /><br />
            Five centuries later, her name still stands for strength, beauty, wisdom, and legacy. Hurrem Palace carries that name as a commitment — to build something worthy of her spirit on the coast of Bangladesh.
          </div>
        </div>
      </div>

      {/* Chapter 04 — Why the Name */}
      <div style={{ backgroundColor: isDark ? '#35070E' : '#EBE2D0', padding: isMobile ? '80px 28px' : '120px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 30 L30 55 L5 30 Z' stroke='%23B38A3E' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }} />
        <div ref={r4 as React.RefObject<HTMLDivElement>} style={{ transition: `opacity 1s ${EASE}`, opacity: v4 ? 1 : 0 }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.5em', color: DC.gold, marginBottom: 48 }}>CHAPTER 04 · THE NAME</div>
          <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 'clamp(44px, 12vw, 80px)' : 'clamp(72px, 10vw, 128px)', letterSpacing: '0.1em', color: isDark ? DC.ivory : LC.ivory, lineHeight: 0.95, marginBottom: 8 }}>HÜRREM</div>
          <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 'clamp(28px, 8vw, 52px)' : 'clamp(48px, 7vw, 88px)', letterSpacing: '0.2em', color: DC.gold, lineHeight: 0.95, marginBottom: 40 }}>PALACE</div>
          <div style={{ fontFamily: CORMORANT, fontSize: isMobile ? 16 : 22, fontStyle: 'italic', color: isDark ? DC.sand : LC.sand, marginBottom: 32 }}>Beauty. Royal grandeur. Heritage.</div>
          <div style={{ maxWidth: 620, margin: '0 auto', fontFamily: JOST, fontSize: 13, color: isDark ? DC.brass : LC.brass, lineHeight: 1.95 }}>
            These qualities inspired the project name and the dream of carrying Ottoman artistic and architectural spirit onto Bangladeshi soil — creating a landmark that honours a legacy while building a new one.
          </div>
        </div>
      </div>

      {/* Chapter 05 — The Numbers (counting animation) */}
      <StoryNumbersBlock C={C} isMobile={isMobile} />

      {/* Chapter 06 — Chairman's Vision */}
      <div ref={r5 as React.RefObject<HTMLDivElement>} style={{ backgroundColor: C.palaceBlack }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: isMobile ? '64px 28px' : '96px 80px' }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.5em', color: C.gold, marginBottom: 56 }}>CHAPTER 06 · THE CHAIRMAN'S VISION</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '320px 1fr', gap: isMobile ? 48 : 80, alignItems: 'start' }}>
            <div style={{ transition: `opacity 1.2s ${EASE}`, opacity: v5 ? 1 : 0 }}>
              <div style={{ position: 'relative', height: isMobile ? 260 : 400, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG.chairman})`, backgroundSize: 'cover', backgroundPosition: 'center top', filter: 'grayscale(1) brightness(0.75)' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 55%, ${C.palaceBlack} 100%)` }} />
                <Corner pos="tl" /><Corner pos="br" />
              </div>
              <div style={{ padding: '18px 0 0' }}>
                <div style={{ fontFamily: CINZEL, fontSize: 12, letterSpacing: '0.18em', color: C.ivory, marginBottom: 4 }}>MD. JAHANGIR ALAM</div>
                <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.28em', color: C.brass }}>CHAIRMAN · HURREM PALACE LIMITED</div>
              </div>
            </div>
            <div style={{ transition: `opacity 1s 0.35s ${EASE}`, opacity: v5 ? 1 : 0 }}>
              <div style={{ fontFamily: CINZEL, fontSize: 80, color: C.gold, opacity: 0.2, lineHeight: 0.8, marginBottom: -16 }}>"</div>
              <div style={{ fontFamily: CORMORANT, fontSize: isMobile ? 18 : 'clamp(18px,2.2vw,26px)', fontStyle: 'italic', color: C.ivory, lineHeight: 1.65 }}>
                For more than three decades, I have had the opportunity to work across various sectors of business in Bangladesh. Along this journey, I became involved in a number of real estate projects — an experience that led me to a deeper realization: Bangladesh's tourism industry remains far behind its true potential.
              </div>
              <div style={{ width: 40, height: 1, background: C.gold, opacity: 0.35, margin: '28px 0' }} />
              <div style={{ fontFamily: JOST, fontSize: 13, color: C.sand, lineHeight: 1.9 }}>
                We do not yet have a structure in this country that draws people from abroad simply to see it. Our goal is to build one — a place that offers guests a genuine international five-star hospitality experience, while presenting to the people of Bangladesh a true reflection of the Ottoman Empire's rich architectural heritage. Hurrem Palace is the first step toward that dream.<br /><br />
                But this journey is not mine alone. I want everyone who joins us to share in its success — not only through financial opportunity, but through the pride of being part of a historic achievement.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA — parallax */}
      <div ref={ctaRef} style={{ position: 'relative', height: isMobile ? '55vh' : '70vh', overflow: 'hidden', backgroundColor: '#0A0807' }}>
        <div style={{ position: 'absolute', inset: '-15%', backgroundImage: `url(${IMG.coast})`, backgroundSize: 'cover', backgroundPosition: 'center 40%', filter: 'brightness(0.32) saturate(0.6)', transform: `translateY(${ctaOff}px)`, willChange: 'transform' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(68,2,3,0.3) 0%, rgba(10,8,7,0.6) 60%, rgba(10,8,7,1) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
          <div style={{ fontFamily: CORMORANT, fontSize: isMobile ? 20 : 28, fontStyle: 'italic', color: DC.sand, marginBottom: 32, lineHeight: 1.6 }}>
            A new chapter in Bangladesh's<br />tourism story is being built on the coast.
          </div>
          <button onClick={() => onNavigate('location')} style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.28em', color: DC.ivory, background: `${BRAND_CRIMSON}CC`, border: `1px solid ${DC.gold}77`, padding: '13px 32px', cursor: 'pointer', transition: `all 0.4s ${EASE}` }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = BRAND_CRIMSON_LIGHT; e.currentTarget.style.borderColor = DC.gold }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = `${BRAND_CRIMSON}CC`; e.currentTarget.style.borderColor = `${DC.gold}77` }}
          >EXPLORE THE PROJECT →</button>
        </div>
      </div>
    </PageShell>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// ─── Location sub-components ─────────────────────────────────────────────────
function LocationStatsBlock({ r1, v1, C, isMobile }: { r1: React.RefObject<HTMLElement>; v1: boolean; C: typeof DC; isMobile: boolean }) {
  const acres  = useCountUp(4,      1200, v1, 0)
  const shares = useCountUp(40000,  1800, v1, 0)
  const yr1    = useCountUp(2027,   1500, v1, 2020)
  const yr2    = useCountUp(2032,   1700, v1, 2020)
  const fmt = (n: number) => n >= 1000 ? n.toLocaleString() : String(n)
  const stats = [
    { val: fmt(acres),  unit: 'ACRES',   desc: 'Private company-owned land' },
    { val: fmt(shares), unit: 'SHARES',  desc: 'Authorized at ৳5,00,000 each' },
    { val: String(yr1), unit: 'START',   desc: 'Construction groundbreaking' },
    { val: String(yr2), unit: 'OPENING', desc: 'Grand opening target' },
  ]
  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <div ref={r1} style={{ maxWidth: 1300, margin: '0 auto', padding: isMobile ? '56px 28px' : '72px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 1, backgroundColor: `${C.brass}33` }}>
          {stats.map((s, i) => (
            <div key={s.unit} style={{ backgroundColor: C.palaceBlack, padding: isMobile ? '28px 16px' : '44px 36px', textAlign: 'center', transition: `opacity 1s ${i * 0.12}s ${EASE}`, opacity: v1 ? 1 : 0 }}>
              <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 'clamp(28px,8vw,48px)' : 'clamp(36px,4vw,58px)', color: C.gold, opacity: 0.7, lineHeight: 1, marginBottom: 6 }}>{s.val}</div>
              <div style={{ fontFamily: CINZEL, fontSize: 10, letterSpacing: '0.25em', color: C.champagne, marginBottom: 10 }}>{s.unit}</div>
              <div style={{ fontFamily: JOST, fontSize: 11, color: C.brass, lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const JOURNEY_STOPS = ['BANGLADESH', "COX'S BAZAR", 'MARINE DRIVE', 'SHAMUK BEACH', 'HURREM PALACE']

function JourneyBlock({ C, isMobile }: { C: typeof DC; isMobile: boolean }) {
  const { ref, visible } = useReveal(0.15)
  return (
    <div style={{ backgroundColor: C.palaceBlack, padding: isMobile ? '64px 28px' : '80px 80px' }}>
      <div ref={ref as React.RefObject<HTMLDivElement>} style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: isMobile ? 40 : 56, transition: `opacity 1s ${EASE}`, opacity: visible ? 1 : 0 }}>THE JOURNEY</div>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'center' }}>
          {JOURNEY_STOPS.map((stop, i) => {
            const isLast = i === JOURNEY_STOPS.length - 1
            const delay = i * 0.18
            return (
              <div key={stop} style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: 'center' }}>
                {/* Node + label */}
                <div style={{ textAlign: 'center', padding: isMobile ? '0' : '0 28px', display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: 'center', gap: isMobile ? 16 : 10 }}>
                  {/* Dot */}
                  <div style={{ width: isLast ? 14 : 10, height: isLast ? 14 : 10, borderRadius: '50%', backgroundColor: isLast ? C.gold : 'transparent', border: `1.5px solid ${isLast ? C.gold : C.brass}`, boxShadow: isLast ? `0 0 12px ${C.gold}55` : 'none', flexShrink: 0, transition: `opacity 0.6s ${delay}s ${EASE}, transform 0.6s ${delay}s ${EASE}`, opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0)' }} />
                  <div style={{ transition: `opacity 0.8s ${delay + 0.1}s ${EASE}, transform 0.8s ${delay + 0.1}s ${EASE}`, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(10px)' }}>
                    <div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.3em', color: C.brass, marginBottom: isMobile ? 0 : 6 }}>{String(i + 1).padStart(2, '0')}</div>
                    <div style={{ fontFamily: CINZEL, fontSize: isLast ? (isMobile ? 13 : 14) : (isMobile ? 11 : 11), letterSpacing: '0.15em', color: isLast ? C.champagne : C.sand, whiteSpace: 'nowrap', fontWeight: isLast ? 700 : 400 }}>{stop}</div>
                  </div>
                </div>
                {/* Connector line */}
                {!isLast && (
                  <div style={{ backgroundColor: C.palaceBlack, overflow: 'hidden', flexShrink: 0 }}>
                    <div style={{ width: isMobile ? 1 : 44, height: isMobile ? 28 : 1, background: `linear-gradient(${isMobile ? 'to bottom' : 'to right'}, ${C.gold}66, ${C.gold}22)`, transition: `opacity 0.6s ${delay + 0.2}s ease`, opacity: visible ? 1 : 0 }} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function TimelineBlock({ C, isMobile }: { C: typeof DC; isMobile: boolean }) {
  const { ref, visible } = useReveal(0.15)
  const milestones = [
    { year: '2023', event: 'LAND SECURED',      desc: 'Four acres of private coastal land at Shamuk Beach acquired by the company' },
    { year: '2027', event: 'CONSTRUCTION START', desc: 'Ground-breaking ceremony. Palace construction begins on the shore' },
    { year: '2032', event: 'GRAND OPENING',      desc: 'Target opening — Hurrem Palace welcomes the world to Bangladesh' },
  ]
  return (
    <div style={{ backgroundColor: C.palaceBlack, padding: isMobile ? '56px 28px' : '72px 80px' }}>
      <div ref={ref as React.RefObject<HTMLDivElement>} style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: isMobile ? 40 : 56, transition: `opacity 1s ${EASE}`, opacity: visible ? 1 : 0 }}>PROJECT TIMELINE</div>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 0 : 0 }}>
          {milestones.map((t, i, arr) => (
            <div key={t.year} style={{ flex: 1, display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: isMobile ? 24 : 0, alignItems: isMobile ? 'flex-start' : 'center' }}>
              {/* Node row */}
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', flexShrink: 0, position: 'relative' }}>
                {/* Animated node */}
                <div style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${C.gold}`, backgroundColor: i === 0 ? C.gold : 'transparent', flexShrink: 0, position: 'relative', zIndex: 1, transition: `opacity 0.6s ${i * 0.25}s ${EASE}, transform 0.8s ${i * 0.25}s cubic-bezier(0.34,1.4,0.64,1)`, opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0)', boxShadow: `0 0 ${i === 0 ? 16 : 8}px ${C.gold}${i === 0 ? '66' : '33'}` }}>
                  {i === 0 && <div style={{ position: 'absolute', inset: 3, borderRadius: '50%', backgroundColor: C.gold }} />}
                </div>
                {/* Connector */}
                {i < arr.length - 1 && !isMobile && (
                  <div style={{ height: 1, flex: 1, overflow: 'hidden', position: 'absolute', left: 8, right: 0, top: 7 }}>
                    <div style={{ height: '100%', width: '100%', background: `linear-gradient(to right, ${C.gold}66, ${C.gold}22)`, transition: `transform 0.9s ${i * 0.25 + 0.3}s ${EASE}`, transformOrigin: 'left', transform: visible ? 'scaleX(1)' : 'scaleX(0)' }} />
                  </div>
                )}
                {isMobile && i < arr.length - 1 && <div style={{ width: 1, height: 28, background: `linear-gradient(to bottom, ${C.gold}55, ${C.gold}22)`, marginTop: 6, transition: `opacity 0.6s ${i * 0.25 + 0.2}s ease`, opacity: visible ? 1 : 0 }} />}
              </div>
              {/* Text */}
              <div style={{ paddingTop: isMobile ? 0 : 24, textAlign: isMobile ? 'left' : 'center', paddingLeft: isMobile ? 0 : 0, paddingRight: isMobile ? 0 : 16, transition: `opacity 0.8s ${i * 0.25 + 0.15}s ${EASE}, transform 0.8s ${i * 0.25 + 0.15}s ${EASE}`, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)' }}>
                <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 26 : 32, color: C.gold, opacity: 0.55, marginBottom: 4, letterSpacing: '0.05em' }}>{t.year}</div>
                <div style={{ fontFamily: CINZEL, fontSize: 10, letterSpacing: '0.22em', color: C.champagne, marginBottom: 8 }}>{t.event}</div>
                <div style={{ width: 20, height: 1, background: C.gold, opacity: 0.35, margin: isMobile ? '0 0 8px' : '0 auto 8px' }} />
                <div style={{ fontFamily: JOST, fontSize: 12, color: C.brass, lineHeight: 1.75, maxWidth: 240, margin: isMobile ? 0 : '0 auto' }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CompanyGlanceBlock({ C, isMobile, isDark }: { C: typeof DC; isMobile: boolean; isDark: boolean }) {
  const { ref, visible } = useReveal(0.1)
  const rows = [
    { label: 'COMPANY',            value: 'Hurrem Palace Limited' },
    { label: 'TYPE',               value: 'Private Limited Company' },
    { label: 'PROJECT',            value: 'Ottoman-Inspired Five-Star Hotel & Resort' },
    { label: 'LOCATION',           value: "Shamuk Beach, Cox's Bazar, Bangladesh" },
    { label: 'LAND',               value: '4 Acres — Private Company-Owned' },
    { label: 'AUTHORIZED SHARES',  value: '40,000 at ৳5,00,000 per share' },
    { label: 'INVESTMENT MODEL',   value: 'Halal · Sharia-compliant · Land-backed' },
    { label: 'CONSTRUCTION START', value: '2027 (Target)' },
    { label: 'OPENING',            value: '2032 (Target)' },
    { label: 'OFFICE',             value: 'House 07, Road 137, Gulshan-1, Dhaka-1212' },
  ]
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{ backgroundColor: isDark ? '#1A0508' : '#EBE2D0' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: isMobile ? '56px 28px' : '72px 80px' }}>
        <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: isDark ? DC.gold : LC.gold, marginBottom: 40, transition: `opacity 1s ${EASE}`, opacity: visible ? 1 : 0 }}>COMPANY AT A GLANCE</div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 0 }}>
          {rows.map((item, i) => (
            <div key={item.label} style={{ padding: '16px 0', borderBottom: `1px solid ${isDark ? DC.brass : LC.brass}22`, display: 'flex', gap: 24, alignItems: 'baseline', transition: `opacity 0.8s ${i * 0.05}s ${EASE}, transform 0.8s ${i * 0.05}s ${EASE}`, opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-12px)' }}>
              <div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.3em', color: isDark ? DC.brass : LC.brass, minWidth: isMobile ? 120 : 180, flexShrink: 0 }}>{item.label}</div>
              <div style={{ fontFamily: CINZEL, fontSize: 12, letterSpacing: '0.1em', color: isDark ? DC.ivory : LC.ivory }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// PROJECT & LOCATION PAGE
// ═════════════════════════════════════════════════════════════════════════════
function LocationPage({ onBack, onNavigate }: { onBack: () => void; onNavigate: (p: string) => void }) {
  const C = useC()
  const { isDark } = useTheme()
  const w = useWindowWidth()
  const isMobile = w < 768
  const { ref: r1, visible: v1 } = useReveal(0.1)
  const { ref: r2, visible: v2 } = useReveal(0.1)
  const { ref: r3, visible: v3 } = useReveal(0.1)
  const { ref: heroRef, offset: heroOff } = useScrollParallax(0.4)
  const { ref: ctaRef2, offset: ctaOff2 } = useScrollParallax(0.35)

  const spaces = [
    { num: '01', name: 'IMPERIAL ARRIVAL HALL', img: IMG.a1, desc: 'A soaring double-height entrance in hand-carved Makrana marble, gilded muqarnas and Ottoman tessellation.' },
    { num: '02', name: 'HÜRREM ROYAL HAMMAM', img: IMG.a2, desc: 'Authentic Turkish bath culture reimagined — star-domed skylights, warm marble slabs, Kütahya tilework.' },
    { num: '03', name: 'TOPKAPI ROYAL DINING', img: IMG.a3, desc: 'Ottoman imperial gastronomy for the contemporary palate. Twelve courses, five centuries of tradition.' },
    { num: '04', name: 'GLASS BRIDGE OF THE BOSPHORUS', img: IMG.a4, desc: 'A 40-metre suspended crystal walkway above ornamental gardens, connecting palace wings with light.' },
    { num: '05', name: 'INFINITY POOL OF THE SULTANA', img: IMG.a5, desc: 'An endless horizon pool where the Bay of Bengal becomes your skyline. Gold-tiled basin. Heated.' },
    { num: '06', name: 'JAHAN MOSQUE', img: IMG.a6, desc: 'A private mosque of extraordinary beauty. Iznik tilework, 22-metre dome, 800 worshippers capacity.' },
  ]

  return (
    <PageShell onBack={onBack}>
      {/* Hero — parallax */}
      <div ref={heroRef} style={{ position: 'relative', height: isMobile ? '65vh' : '90vh', overflow: 'hidden', backgroundColor: '#0A0807' }}>
        <div style={{ position: 'absolute', inset: '-15%', backgroundImage: `url(${IMG.coast})`, backgroundSize: 'cover', backgroundPosition: 'center 40%', filter: 'brightness(0.35) saturate(0.6)', transform: `translateY(${heroOff}px)`, willChange: 'transform' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(68,2,3,0.35) 0%, rgba(10,8,7,0.5) 55%, rgba(10,8,7,1) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.5em', color: DC.gold, marginBottom: 24, animation: `fadeUp 1s 0.2s ${EASE} both`, opacity: 0 }}>THE PROJECT</div>
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 'clamp(32px, 8vw, 52px)' : 'clamp(48px, 6.5vw, 84px)', color: DC.ivory, lineHeight: 1.08, animation: `fadeUp 1s 0.4s ${EASE} both`, opacity: 0 }}>
            Where The Palace<br />Meets The Sea
          </div>
          <div style={{ width: 48, height: 1, background: DC.gold, opacity: 0.4, margin: '20px 0' }} />
          <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 10 : 12, letterSpacing: '0.25em', color: DC.sand, lineHeight: 2, animation: `fadeUp 1s 0.6s ${EASE} both`, opacity: 0 }}>SHAMUK BEACH · COX'S BAZAR · BANGLADESH</div>
        </div>
      </div>

      {/* The Land stats — counting animation */}
      <LocationStatsBlock r1={r1} v1={v1} C={C} isMobile={isMobile} />

      {/* Where Hills Meet the Sea */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: isMobile ? '64px 28px' : '96px 80px' }}>
        <div ref={r2 as React.RefObject<HTMLDivElement>} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 80, alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: 20, transition: `opacity 1s ${EASE}`, opacity: v2 ? 1 : 0 }}>THE SITE</div>
            <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 28 : 'clamp(28px, 3.2vw, 48px)', color: C.ivory, lineHeight: 1.2, marginBottom: 24, transition: `opacity 1s 0.2s ${EASE}`, opacity: v2 ? 1 : 0 }}>
              Where Hills<br />Meet the Sea
            </div>
            <GoldLine w={40} />
            <div style={{ height: 24 }} />
            <div style={{ fontFamily: JOST, fontSize: 14, color: C.sand, lineHeight: 1.95, transition: `opacity 1s 0.3s ${EASE}`, opacity: v2 ? 1 : 0 }}>
              Shamuk Beach sits along the legendary Cox's Bazar–Teknaf Marine Drive — one of the world's longest and most scenic coastal roads. With the Bay of Bengal stretching endlessly to the west and rolling green hills to the east, the four acres of private company-owned land have been chosen for their seclusion, sea frontage and natural landscape of extraordinary beauty.<br /><br />
              Pine trees, natural sand dunes and a distinctive shoreline frame the site — a canvas for an Ottoman palace that will feel as if it has always belonged here.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, transition: `opacity 1s 0.4s ${EASE}`, opacity: v2 ? 1 : 0 }}>
            {[{ dir: '◈ WEST', place: 'Bay of Bengal', detail: 'Uninterrupted ocean views from every wing of the palace' }, { dir: '◈ EAST', place: 'Teknaf Hill Range', detail: 'Natural green backdrop creating a sheltered, private setting' }, { dir: '◈ ACCESS', place: "Cox's Bazar Marine Drive", detail: 'Coastal road connecting the palace to the city and beyond' }, { dir: '◈ CLIMATE', place: 'Tropical Coastal Zone', detail: 'Warm year-round temperatures with seasonal monsoon character' }].map(item => (
              <div key={item.dir} style={{ padding: '20px 22px', borderLeft: `1px solid ${C.gold}33` }}>
                <div style={{ fontFamily: CINZEL, fontSize: 10, letterSpacing: '0.22em', color: C.champagne, marginBottom: 5 }}>{item.dir}</div>
                <div style={{ fontFamily: PLAYFAIR, fontSize: 15, color: C.ivory, marginBottom: 6, fontStyle: 'italic' }}>{item.place}</div>
                <div style={{ fontFamily: JOST, fontSize: 12, color: C.brass, lineHeight: 1.7 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Journey to the Palace — animated */}
      <JourneyBlock C={C} isMobile={isMobile} />

      {/* Signature Spaces */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: isMobile ? '64px 28px' : '96px 80px' }}>
        <div ref={r3 as React.RefObject<HTMLDivElement>} style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: 20, transition: `opacity 1s ${EASE}`, opacity: v3 ? 1 : 0 }}>SIGNATURE SPACES</div>
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 28 : 'clamp(28px, 3.5vw, 48px)', color: C.ivory, lineHeight: 1.15, transition: `opacity 1s 0.2s ${EASE}`, opacity: v3 ? 1 : 0 }}>
            An Ottoman World<br /><span style={{ fontStyle: 'italic', color: C.sand }}>on the Coast</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 1, backgroundColor: `${C.brass}22` }}>
          {spaces.map((s, i) => (
            <div key={s.num} style={{ backgroundColor: C.imperialBlack, position: 'relative', overflow: 'hidden', height: isMobile ? 200 : 280, transition: `opacity 1s ${i * 0.1}s ${EASE}`, opacity: v3 ? 1 : 0 }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.42) saturate(0.68)', transition: `transform 0.6s ${EASE}' ` }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)')}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1)')}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,8,7,0.95) 0%, rgba(10,8,7,0.3) 60%, transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px' }}>
                <div style={{ fontFamily: CINZEL, fontSize: 26, color: DC.gold, opacity: 0.15, lineHeight: 1, marginBottom: -2 }}>{s.num}</div>
                <div style={{ fontFamily: CINZEL, fontSize: 11, letterSpacing: '0.18em', color: DC.champagne, marginBottom: 6 }}>{s.name}</div>
                <div style={{ fontFamily: JOST, fontSize: 11, color: DC.sand, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Timeline — animated */}
      <TimelineBlock C={C} isMobile={isMobile} />

      {/* Company at a Glance (moved from CompanyPage) */}
      <CompanyGlanceBlock C={C} isMobile={isMobile} isDark={isDark} />

      {/* Final CTA — parallax */}
      <div ref={ctaRef2} style={{ position: 'relative', height: isMobile ? '50vh' : '65vh', overflow: 'hidden', backgroundColor: '#0A0807' }}>
        <div style={{ position: 'absolute', inset: '-15%', backgroundImage: `url(${IMG.a1})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.3) saturate(0.6)', transform: `translateY(${ctaOff2}px)`, willChange: 'transform' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(68,2,3,0.3) 0%, rgba(10,8,7,0.65) 60%, rgba(10,8,7,1) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
          <div style={{ fontFamily: CORMORANT, fontSize: isMobile ? 18 : 26, fontStyle: 'italic', color: DC.sand, marginBottom: 12, lineHeight: 1.6 }}>A palace shaped by heritage.</div>
          <div style={{ fontFamily: CORMORANT, fontSize: isMobile ? 18 : 26, fontStyle: 'italic', color: DC.sand, marginBottom: 36, lineHeight: 1.6 }}>A destination shaped by the coast.</div>
          <button onClick={() => onNavigate('company')} style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.28em', color: DC.ivory, background: `${BRAND_CRIMSON}CC`, border: `1px solid ${DC.gold}77`, padding: '13px 32px', cursor: 'pointer', transition: `all 0.4s ${EASE}` }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = BRAND_CRIMSON_LIGHT; e.currentTarget.style.borderColor = DC.gold }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = `${BRAND_CRIMSON}CC`; e.currentTarget.style.borderColor = `${DC.gold}77` }}
          >EXPLORE THE COMPANY →</button>
        </div>
      </div>
    </PageShell>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// COMPANY DETAILS PAGE
// ═════════════════════════════════════════════════════════════════════════════
function CompanyPage({ onBack }: { onBack: () => void }) {
  const C = useC()
  const { isDark } = useTheme()
  const w = useWindowWidth()
  const isMobile = w < 768
  const { ref: r1, visible: v1 } = useReveal(0.1)
  const { ref: r2, visible: v2 } = useReveal(0.1)
  const { ref: r3, visible: v3 } = useReveal(0.1)
  const { ref: r4, visible: v4 } = useReveal(0.1)
  const { ref: compHeroRef, offset: compHeroOff } = useScrollParallax(0.35)

  return (
    <PageShell onBack={onBack}>
      {/* Hero — dark crimson with parallax dome image */}
      <div ref={compHeroRef} style={{ position: 'relative', height: isMobile ? '60vh' : '80vh', overflow: 'hidden', backgroundColor: BRAND_CRIMSON_DIM }}>
        <div style={{ position: 'absolute', inset: '-15%', backgroundImage: `url(${IMG.dome})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.18) saturate(0.4)', transform: `translateY(${compHeroOff}px)`, willChange: 'transform' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 8 L72 40 L40 72 L8 40 Z' stroke='%23B38A3E' stroke-width='0.6' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(10,8,7,0.92) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.5em', color: DC.gold, marginBottom: 24, animation: `fadeUp 1s 0.2s ${EASE} both`, opacity: 0 }}>THE COMPANY</div>
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 'clamp(32px, 9vw, 52px)' : 'clamp(44px, 5.5vw, 72px)', color: DC.ivory, lineHeight: 1.1, animation: `fadeUp 1s 0.4s ${EASE} both`, opacity: 0 }}>
            The Company<br />Behind the Vision
          </div>
          <div style={{ width: 48, height: 1, background: DC.gold, opacity: 0.4, margin: '20px 0' }} />
          <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 11 : 13, letterSpacing: '0.22em', color: DC.sand, animation: `fadeUp 1s 0.6s ${EASE} both`, opacity: 0 }}>HURREM PALACE LIMITED</div>
        </div>
      </div>

      {/* Who We Are */}
      <div style={{ backgroundColor: C.imperialBlack }}>
        <div ref={r1 as React.RefObject<HTMLDivElement>} style={{ maxWidth: 1300, margin: '0 auto', padding: isMobile ? '64px 28px' : '96px 80px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 80, alignItems: 'start' }}>
          <div style={{ transition: `opacity 1s ${EASE}`, opacity: v1 ? 1 : 0 }}>
            <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: 20 }}>WHO WE ARE</div>
            <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 26 : 'clamp(26px, 3vw, 40px)', color: C.ivory, lineHeight: 1.2, marginBottom: 24 }}>Hurrem Palace<br />Limited</div>
            <GoldLine w={40} />
            <div style={{ height: 24 }} />
            <div style={{ fontFamily: JOST, fontSize: 14, color: C.sand, lineHeight: 1.95 }}>
              Hurrem Palace Limited is a private limited company in Bangladesh built around a singular purpose: modernizing the country's tourism industry through an internationally credible destination.<br /><br />
              The company owns four acres of private coastal land at Shamuk Beach, Cox's Bazar, and holds authorization for 40,000 shares at ৳5,00,000 per share — a structure designed to allow a broad range of investors to participate in a historic national project.
            </div>
          </div>
          <div style={{ transition: `opacity 1s 0.3s ${EASE}`, opacity: v1 ? 1 : 0 }}>
            <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: 28 }}>OUR PURPOSE</div>
            {[{ num: '01', title: 'TOURISM', body: "Modernize and elevate Bangladesh's tourism experience. Build a destination that competes with the world's finest." }, { num: '02', title: 'DESTINATION', body: 'Create a destination with international appeal — one that draws visitors to Bangladesh simply because of what it is.' }, { num: '03', title: 'LEGACY', body: 'Build something that outlives the generation that created it. A monument to Bangladeshi ambition and Ottoman heritage.' }].map((p, i) => (
              <div key={p.num} style={{ padding: '20px 0', borderBottom: i < 2 ? `1px solid ${C.brass}28` : 'none' }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', marginBottom: 8 }}>
                  <div style={{ fontFamily: CINZEL, fontSize: 18, color: C.gold, opacity: 0.3 }}>{p.num}</div>
                  <div style={{ fontFamily: CINZEL, fontSize: 11, letterSpacing: '0.22em', color: C.champagne }}>{p.title}</div>
                </div>
                <div style={{ fontFamily: JOST, fontSize: 13, color: C.sand, lineHeight: 1.8, paddingLeft: 36 }}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Philosophy */}
      <div ref={r2 as React.RefObject<HTMLDivElement>} style={{ backgroundColor: isDark ? '#200408' : '#EBE2D0' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: isMobile ? '64px 28px' : '96px 80px' }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: isDark ? DC.gold : LC.gold, marginBottom: 48, transition: `opacity 1s ${EASE}`, opacity: v2 ? 1 : 0 }}>OUR PHILOSOPHY</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? 32 : 2, backgroundColor: isMobile ? 'transparent' : `${C.brass}22` }}>
            {[
              { title: 'HERITAGE',    icon: '◈', body: 'We draw inspiration from an architectural legacy that has endured for centuries. Ottoman craft, Iznik tilework, muqarnas, domes — brought to the coast of Bangladesh.' },
              { title: 'HOSPITALITY', icon: '◇', body: 'The palace is envisioned as a destination where architecture and experience become inseparable. Every detail is designed to be remembered.' },
              { title: 'AMBITION',    icon: '◈', body: "The project represents a long-term vision for Bangladesh's tourism landscape — and a conviction that the country is ready for its moment on the world stage." },
            ].map((p, i) => (
              <div key={p.title} style={{ backgroundColor: isDark ? '#200408' : '#EBE2D0', padding: isMobile ? '0' : '48px 40px', transition: `opacity 1s ${i * 0.12}s ${EASE}, transform 1s ${i * 0.12}s ${EASE}`, opacity: v2 ? 1 : 0, transform: v2 ? 'translateY(0)' : 'translateY(24px)' }}>
                <div style={{ fontFamily: CINZEL, fontSize: 18, color: isDark ? DC.gold : LC.gold, opacity: 0.35, marginBottom: 16 }}>{p.icon}</div>
                <div style={{ fontFamily: CINZEL, fontSize: 11, letterSpacing: '0.28em', color: isDark ? DC.champagne : LC.champagne, marginBottom: 16 }}>{p.title}</div>
                <GoldLine w={24} />
                <div style={{ height: 16 }} />
                <div style={{ fontFamily: JOST, fontSize: 13, color: isDark ? DC.sand : LC.sand, lineHeight: 1.9 }}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chairman's Message */}
      <div ref={r3 as React.RefObject<HTMLDivElement>} style={{ backgroundColor: C.palaceBlack }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: isMobile ? '64px 28px' : '96px 80px' }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: 56, transition: `opacity 1s ${EASE}`, opacity: v3 ? 1 : 0 }}>CHAIRMAN'S MESSAGE</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '300px 1fr', gap: isMobile ? 48 : 80, alignItems: 'start' }}>
            <div style={{ transition: `opacity 1.2s ${EASE}`, opacity: v3 ? 1 : 0 }}>
              <div style={{ position: 'relative', height: isMobile ? 240 : 360, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG.chairman})`, backgroundSize: 'cover', backgroundPosition: 'center top', filter: 'grayscale(1) brightness(0.75)' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 55%, ${C.palaceBlack} 100%)` }} />
                <Corner pos="tl" /><Corner pos="br" />
              </div>
              <div style={{ padding: '18px 0 0' }}>
                <div style={{ fontFamily: CINZEL, fontSize: 12, letterSpacing: '0.15em', color: C.ivory, marginBottom: 4 }}>MD. JAHANGIR ALAM</div>
                <div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.28em', color: C.brass }}>CHAIRMAN · HURREM PALACE LIMITED</div>
              </div>
            </div>
            <div style={{ transition: `opacity 1s 0.35s ${EASE}`, opacity: v3 ? 1 : 0 }}>
              <div style={{ fontFamily: CINZEL, fontSize: 80, color: C.gold, opacity: 0.15, lineHeight: 0.8, marginBottom: -10 }}>"</div>
              <div style={{ fontFamily: CORMORANT, fontSize: isMobile ? 17 : 'clamp(17px,1.9vw,24px)', fontStyle: 'italic', color: C.ivory, lineHeight: 1.75 }}>
                For more than three decades, I have had the opportunity to work across various sectors of business in Bangladesh. Along this journey, I became involved in a number of real estate projects — an experience that led me to a deeper realization: Bangladesh's tourism industry remains far behind its true potential.
              </div>
              <div style={{ width: 36, height: 1, background: C.gold, opacity: 0.35, margin: '24px 0' }} />
              <div style={{ fontFamily: CORMORANT, fontSize: isMobile ? 17 : 'clamp(17px,1.9vw,24px)', fontStyle: 'italic', color: C.ivory, lineHeight: 1.75 }}>
                We do not yet have a structure in this country that draws people from abroad simply to see it. Our goal is to build one — a place that offers guests a genuine international five-star hospitality experience, while presenting to the people of Bangladesh a true reflection of the Ottoman Empire's rich architectural heritage. Hurrem Palace is the first step toward that dream.
              </div>
              <div style={{ width: 36, height: 1, background: C.gold, opacity: 0.35, margin: '24px 0' }} />
              <div style={{ fontFamily: CORMORANT, fontSize: isMobile ? 17 : 'clamp(17px,1.9vw,24px)', fontStyle: 'italic', color: C.ivory, lineHeight: 1.75 }}>
                But this journey is not mine alone. I want everyone who joins us to share in its success — not only through financial opportunity, but through the pride of being part of a historic achievement.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Licenses button + Contact */}
      <div ref={r4 as React.RefObject<HTMLDivElement>} style={{ backgroundColor: C.imperialBlack }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: isMobile ? '64px 28px' : '96px 80px' }}>
          {/* License button */}
          <div style={{ marginBottom: isMobile ? 56 : 80, transition: `opacity 1s ${EASE}`, opacity: v4 ? 1 : 0 }}>
            <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: 24 }}>LEGAL DOCUMENTS</div>
            <div style={{ fontFamily: JOST, fontSize: 13, color: C.sand, lineHeight: 1.9, marginBottom: 28, maxWidth: 520 }}>
              Hurrem Palace Limited holds all required company registrations and land documentation. Click below to view the official license images.
            </div>
            <button
              style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.26em', color: DC.ivory, backgroundColor: isDark ? BRAND_CRIMSON_DIM : BRAND_CRIMSON, border: `1px solid ${DC.gold}55`, padding: isMobile ? '13px 28px' : '15px 36px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 12, transition: `all 0.4s ${EASE}` }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = BRAND_CRIMSON_LIGHT; e.currentTarget.style.borderColor = DC.gold }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = isDark ? BRAND_CRIMSON_DIM : BRAND_CRIMSON; e.currentTarget.style.borderColor = `${DC.gold}55` }}
              onClick={() => alert('License images will be displayed here. Please upload the license image files to make them available.')}
            >
              <span style={{ fontSize: 14 }}>⊞</span>
              VIEW COMPANY LICENSES &amp; CERTIFICATES
            </button>
          </div>

          {/* Contact */}
          <div style={{ borderTop: `1px solid ${C.brass}28`, paddingTop: 56, transition: `opacity 1s 0.2s ${EASE}`, opacity: v4 ? 1 : 0 }}>
            <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: 36 }}>REACH US</div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? 24 : 40 }}>
              {[
                { label: 'OFFICE',       lines: ['Hurrem Palace Limited', 'House 07, Road 137', 'Gulshan-1, Dhaka-1212', 'Bangladesh'] },
                { label: 'CONTACT',      lines: ['info@hurrempalace.com', '+01819-911999'] },
                { label: 'PROJECT SITE', lines: ['Shamuk Beach', "Cox's Bazar–Teknaf Marine Drive", "Cox's Bazar, Bangladesh"] },
              ].map(col => (
                <div key={col.label}>
                  <div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.35em', color: C.gold, marginBottom: 14 }}>{col.label}</div>
                  {col.lines.map(line => <div key={line} style={{ fontFamily: JOST, fontSize: 13, color: C.sand, lineHeight: 1.9 }}>{line}</div>)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// INVESTMENT PAGE
// ═════════════════════════════════════════════════════════════════════════════
const PRIVILEGES = [
  { num: '01', title: 'FREE ANNUAL\nVACATION',         img: IMG.pVacation,    body: "Based on your package, enjoy a fully complimentary annual stay at Hurrem Palace — accommodation and specified meals included — for you and your family. Your palace awaits, every year." },
  { num: '02', title: 'LUXURY\nSHUTTLE SERVICE',       img: IMG.pShuttle,     body: "Free luxury shuttle from Cox's Bazar Airport, Bus Station, and Railway Station to the palace — for every visit throughout the year. Your journey begins in comfort." },
  { num: '03', title: 'PRIVILEGED\nSMART CARD',        img: IMG.pSmartCard,   body: "Special discounts across partner hotels, motels, chain shops, restaurants, hospitals, and transport providers — domestically and internationally. A card that opens doors." },
  { num: '04', title: 'ANNUAL\nHEALTH CHECK-UP',       img: IMG.pHealth,      body: "One complimentary full body check-up every year at the hotel's modern medical centre — a recurring benefit for the lifetime of your ownership. Your wellbeing, protected." },
  { num: '05', title: 'ANNUAL\nGIFT BOX',              img: IMG.pGift,        body: "From the moment of booking until the hotel opens, you receive an exclusive gift box every year — a gesture of gratitude from Hurrem Palace to its owners. A promise kept annually." },
  { num: '06', title: 'ELITE\nREFERRAL PROGRAMME',     img: IMG.pReferral,    body: "Guests referred by shareholders enjoy special hotel rates — creating a network of privilege that rewards loyalty and relationship. Your circle becomes the palace circle." },
  { num: '07', title: 'PROJECT\nVISIT TOKEN',           img: IMG.pVisit,       body: "Upon purchasing any package, receive an exclusive complimentary project visit token — including 1 night / 1 day accommodation and meals in Cox's Bazar. See the dream before it opens." },
  { num: '08', title: 'SEAMLESS\nINHERITANCE',          img: IMG.pInheritance, body: "In the event of a shareholder's passing, ownership transfers to heirs without legal complication — a protected, permanent family asset. A legacy that outlives a lifetime." },
  { num: '09', title: 'EASY\nSHARE TRANSFER',           img: IMG.pTransfer,    body: "Sell or transfer your shares at any time via an online application — complete liquidity and ownership flexibility at your fingertips. Your investment, your terms." },
]

function PrivilegesCarousel() {
  const { isDark } = useTheme()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const w = useWindowWidth()
  const isMobile = w < 768

  useEffect(() => {
    const fn = () => {
      const el = sectionRef.current; if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = (el.getBoundingClientRect().height || el.offsetHeight) - window.innerHeight
      if (scrollable < 1) return
      const progress = Math.min(0.9999, Math.max(0, -rect.top) / scrollable)
      setActive(Math.min(PRIVILEGES.length - 1, Math.floor(progress * PRIVILEGES.length)))
    }
    window.addEventListener('scroll', fn, { passive: true })
    const raf = requestAnimationFrame(fn)
    return () => { window.removeEventListener('scroll', fn); cancelAnimationFrame(raf) }
  }, [])

  const priv = PRIVILEGES[active]
  const ov = (a: number) => imgOverlay(isDark, a)

  return (
    <section ref={sectionRef} style={{ height: `${PRIVILEGES.length * 80}svh` }}>
      <div style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden', backgroundColor: '#0A0807' }}>
        {PRIVILEGES.map((p, i) => (
          <div key={p.num} style={{ position: 'absolute', inset: 0, backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: imgFilter(isDark, 0.38, 0.62), transition: `opacity 1s ${EASE}, transform 1.4s ${EASE}`, opacity: active === i ? 1 : 0, transform: active === i ? 'scale(1.04)' : 'scale(1.10)' }} />
        ))}
        {/* Layered overlays for text readability */}
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${ov(0.9)} 0%, ${ov(0.2)} 55%, ${ov(0.55)} 100%)`, pointerEvents: 'none' }} />
        {isMobile && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${ov(0.55)} 0%, ${ov(0.92)} 55%, ${ov(0.99)} 100%)`, pointerEvents: 'none' }} />}

        {/* Progress bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, backgroundColor: `${imgGold(isDark)}22`, zIndex: 2 }}>
          <div style={{ height: '100%', width: `${((active + 1) / PRIVILEGES.length) * 100}%`, backgroundColor: imgGold(isDark), transition: `width 0.6s ${EASE}`, opacity: 0.85 }} />
        </div>

        {/* Label */}
        <div style={{ position: 'absolute', top: isMobile ? 56 : 72, left: isMobile ? 24 : 80, zIndex: 2 }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: imgGold(isDark) }}>A LIFE OF ROYAL PRIVILEGE</div>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.2em', color: imgBrass(isDark), marginTop: 4 }}>{String(active + 1).padStart(2, '0')} — {String(PRIVILEGES.length).padStart(2, '0')}</div>
        </div>

        {isMobile ? (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 24px 80px', zIndex: 2 }}>
            <div key={active} style={{ animation: `slideLeft 0.7s ${EASE} both` }}>
              <div style={{ fontFamily: CINZEL, fontSize: 52, color: imgGold(isDark), opacity: 0.15, lineHeight: 1, marginBottom: -10 }}>{priv.num}</div>
              <div style={{ fontFamily: PLAYFAIR, fontSize: 'clamp(24px, 7vw, 36px)', color: imgText(isDark), lineHeight: 1.2, marginBottom: 14, whiteSpace: 'pre-line' }}>{priv.title}</div>
              <div style={{ width: 32, height: 1, background: DC.gold, opacity: 0.5, marginBottom: 14 }} />
              <div style={{ fontFamily: JOST, fontSize: 12, color: imgTextSec(isDark), lineHeight: 1.85 }}>{priv.body}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 24, flexWrap: 'wrap' }}>
              {PRIVILEGES.map((_, i) => <div key={i} style={{ width: i === active ? 22 : 6, height: 2, backgroundColor: i === active ? imgText(isDark) : imgBrass(isDark), transition: 'width 0.4s ease', borderRadius: 1 }} />)}
            </div>
          </div>
        ) : (
          <>
            {/* Left — privilege text */}
            <div style={{ position: 'absolute', left: 80, top: '50%', transform: 'translateY(-50%)', maxWidth: 500, zIndex: 2 }}>
              <div key={active} style={{ animation: `slideLeft 0.7s ${EASE} both` }}>
                <div style={{ fontFamily: CINZEL, fontSize: 80, color: imgGold(isDark), opacity: 0.13, lineHeight: 1, marginBottom: -20, userSelect: 'none' }}>{priv.num}</div>
                <div style={{ fontFamily: PLAYFAIR, fontSize: 'clamp(30px, 3.8vw, 52px)', color: imgText(isDark), lineHeight: 1.15, marginBottom: 22, whiteSpace: 'pre-line' }}>{priv.title}</div>
                <div style={{ width: 40, height: 1, background: DC.gold, opacity: 0.5, marginBottom: 20 }} />
                <div style={{ fontFamily: JOST, fontSize: 14, color: imgTextSec(isDark), lineHeight: 1.9, maxWidth: 400 }}>{priv.body}</div>
              </div>
            </div>
            {/* Right — index dots */}
            <div style={{ position: 'absolute', right: 80, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 18, zIndex: 2 }}>
              {PRIVILEGES.map((p, i) => (
                <div key={p.num} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ height: 1, width: active === i ? 28 : 8, backgroundColor: active === i ? imgText(isDark) : imgBrass(isDark), transition: 'all 0.4s ease', display: 'block' }} />
                  <span style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.18em', color: active === i ? imgText(isDark) : imgBrass(isDark), transition: 'color 0.4s ease' }}>{p.num}</span>
                </div>
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: 44, left: '50%', transform: 'translateX(-50%)', fontFamily: JOST, fontSize: 9, letterSpacing: '0.3em', color: imgBrass(isDark), animation: 'progressPulse 2.5s infinite', whiteSpace: 'nowrap' }}>SCROLL TO EXPLORE</div>
          </>
        )}
      </div>
    </section>
  )
}

const PROFIT_BARS = [
  { year: 'YEAR 1', pct: 15, label: '15%' },
  { year: 'YEAR 2', pct: 16, label: '16%' },
  { year: 'YEAR 3', pct: 17, label: '17%' },
  { year: 'YEAR 4', pct: 18, label: '18%' },
  { year: 'YEAR 5', pct: 19, label: '19%' },
  { year: 'YEAR 6+', pct: 20, label: '20%' },
]
const MAX_PCT = 25

function ProfitGraph() {
  const C = useC()
  const { isDark } = useTheme()
  const { ref, visible } = useReveal(0.2)
  const w = useWindowWidth()
  const isMobile = w < 768
  const border = isDark ? `${DC.brass}33` : `${LC.brass}33`

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{ backgroundColor: isDark ? DC.imperialBlack : '#EDE4D4', borderTop: `1px solid ${border}`, padding: isMobile ? '56px 24px 64px' : '72px 80px 80px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: 14, transition: `opacity 0.8s ${EASE}`, opacity: visible ? 1 : 0 }}>PROJECTED ANNUAL RETURNS</div>
        <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 22 : 32, color: C.ivory, lineHeight: 1.2, marginBottom: 40, transition: `opacity 0.8s 0.1s ${EASE}`, opacity: visible ? 1 : 0 }}>
          Profit Margin <span style={{ fontStyle: 'italic' }}>Trajectory</span>
        </div>

        {/* Bar chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? 8 : 20, height: isMobile ? 180 : 240, position: 'relative' }}>
          {/* Y-axis guide lines */}
          {[5, 10, 15, 20].map(v => (
            <div key={v} style={{ position: 'absolute', left: 0, right: 0, bottom: `${(v / MAX_PCT) * 100}%`, borderTop: `1px dashed ${C.gold}`, opacity: 0.12, pointerEvents: 'none' }}>
              <span style={{ position: 'absolute', left: -32, top: -8, fontFamily: JOST, fontSize: 8, letterSpacing: '0.05em', color: C.brass, opacity: 0.7 }}>{v}%</span>
            </div>
          ))}

          {PROFIT_BARS.map((bar, i) => {
            const targetH = (bar.pct / MAX_PCT) * 100
            return (
              <div key={bar.year} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
                {/* Percentage label */}
                <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 13 : 18, color: C.gold, letterSpacing: '0.08em', transition: `opacity 0.6s ${i * 0.12 + 0.4}s ease`, opacity: visible ? 1 : 0 }}>{bar.label}</div>
                {/* Bar */}
                <div style={{ width: '100%', position: 'relative', borderRadius: '2px 2px 0 0', overflow: 'hidden', background: isDark ? 'rgba(179,138,62,0.1)' : 'rgba(122,82,16,0.1)', height: '85%', display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{
                    width: '100%',
                    height: visible ? `${targetH}%` : '0%',
                    background: `linear-gradient(to top, ${isDark ? DC.gold : '#7A5210'} 0%, ${isDark ? DC.champagne : '#B8860B'} 100%)`,
                    transition: `height 1.1s ${i * 0.12}s cubic-bezier(0.34,1.4,0.64,1)`,
                    borderRadius: '2px 2px 0 0',
                    position: 'relative',
                  }}>
                    {/* Shimmer line at top of bar */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, backgroundColor: isDark ? DC.champagne : '#D4A020', opacity: 0.8 }} />
                  </div>
                </div>
                {/* Year label */}
                <div style={{ fontFamily: JOST, fontSize: isMobile ? 7 : 9, letterSpacing: '0.18em', color: C.brass, textAlign: 'center', transition: `opacity 0.6s ${i * 0.12 + 0.5}s ease`, opacity: visible ? 1 : 0 }}>{bar.year}</div>
              </div>
            )
          })}
        </div>

        {/* Footnote */}
        <div style={{ marginTop: 28, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center', transition: `opacity 0.8s 0.9s ${EASE}`, opacity: visible ? 1 : 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 24, height: 3, background: `linear-gradient(to right, ${isDark ? DC.gold : '#7A5210'}, ${isDark ? DC.champagne : '#B8860B'})`, borderRadius: 2 }} />
            <span style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.18em', color: C.brass }}>ESTIMATED HALAL PROFIT %</span>
          </div>
          <div style={{ fontFamily: JOST, fontSize: 9, color: C.brass, opacity: 0.6, lineHeight: 1.6 }}>* Projections based on anticipated hotel operations. Actual returns may vary.</div>
        </div>
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// ARCHITECTURE PAGE
// ═════════════════════════════════════════════════════════════════════════════
// ── Lightbox ─────────────────────────────────────────────────────────────────
type LBItem = { src: string; title: string; sub?: string }

function ImageLightbox({ items, idx, onClose, onNav }: { items: LBItem[]; idx: number; onClose: () => void; onNav: (i: number) => void }) {
  const item = items[idx]
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav((idx + 1) % items.length)
      if (e.key === 'ArrowLeft') onNav((idx - 1 + items.length) % items.length)
    }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [idx, items.length, onClose, onNav])

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(10,8,7,0.96)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: `fadeIn 0.3s ${EASE}` }}
    >
      {/* Prev */}
      <button onClick={e => { e.stopPropagation(); onNav((idx - 1 + items.length) % items.length) }}
        style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 2, background: 'rgba(10,8,7,0.6)', border: `1px solid ${DC.gold}44`, color: DC.gold, fontFamily: JOST, fontSize: 18, width: 48, height: 48, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${BRAND_CRIMSON}CC`; e.currentTarget.style.borderColor = DC.gold }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(10,8,7,0.6)'; e.currentTarget.style.borderColor = `${DC.gold}44` }}
      >‹</button>

      {/* Image container */}
      <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: '88vw', maxHeight: '88vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          key={item.src}
          src={item.src}
          alt={item.title}
          style={{ maxWidth: '100%', maxHeight: '78vh', objectFit: 'contain', display: 'block', animation: `fadeUp 0.35s ${EASE}` }}
        />
        <div style={{ marginTop: 20, textAlign: 'center', animation: `fadeUp 0.4s 0.1s ${EASE} both`, opacity: 0 }}>
          <div style={{ fontFamily: CINZEL, fontSize: 13, letterSpacing: '0.25em', color: DC.ivory, marginBottom: 4 }}>{item.title}</div>
          {item.sub && <div style={{ fontFamily: CORMORANT, fontSize: 15, fontStyle: 'italic', color: DC.sand }}>{item.sub}</div>}
          <div style={{ marginTop: 10, fontFamily: JOST, fontSize: 9, letterSpacing: '0.2em', color: DC.brass }}>{idx + 1} / {items.length}</div>
        </div>
      </div>

      {/* Next */}
      <button onClick={e => { e.stopPropagation(); onNav((idx + 1) % items.length) }}
        style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 2, background: 'rgba(10,8,7,0.6)', border: `1px solid ${DC.gold}44`, color: DC.gold, fontFamily: JOST, fontSize: 18, width: 48, height: 48, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${BRAND_CRIMSON}CC`; e.currentTarget.style.borderColor = DC.gold }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(10,8,7,0.6)'; e.currentTarget.style.borderColor = `${DC.gold}44` }}
      >›</button>

      {/* Close */}
      <button onClick={onClose}
        style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: `1px solid ${DC.gold}44`, color: DC.sand, fontFamily: JOST, fontSize: 9, letterSpacing: '0.28em', cursor: 'pointer', padding: '8px 16px', transition: 'all 0.3s' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = DC.gold; e.currentTarget.style.color = DC.ivory }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = `${DC.gold}44`; e.currentTarget.style.color = DC.sand }}
      >CLOSE ✕</button>
    </div>
  )
}

// ── Architecture Page ─────────────────────────────────────────────────────────
const ARCH_GALLERY_IMGS = [
  IMG.ag1, IMG.ag2, IMG.ag3, IMG.ag4, IMG.ag5, IMG.ag6,
  IMG.fDining, IMG.fWellness, IMG.fPools, IMG.fBanquet,
]

function ArchitecturePage({ onBack }: { onBack: () => void }) {
  const C = useC()
  const { isDark } = useTheme()
  const w = useWindowWidth()
  const isMobile = w < 768
  const { ref: heroRef, offset: heroOff } = useScrollParallax(0.4)
  const { ref: gallRef, visible: gallVis } = useReveal(0.06)
  const { ref: facRef, visible: facVis } = useReveal(0.06)

  // Build unified lightbox item list: venues + facilities + gallery
  const lbItems: LBItem[] = [
    ...VENUES.map(v => ({ src: v.img, title: v.name.replace('\n', ' '), sub: v.desc })),
    ...FACILITY_ITEMS.map(f => ({ src: f.img, title: f.cat, sub: f.tagline })),
    ...ARCH_GALLERY_IMGS.map((src, i) => ({ src, title: `PALACE DETAIL ${String(i + 1).padStart(2, '0')}` })),
  ]
  const [lbIdx, setLbIdx] = useState<number | null>(null)

  return (
    <PageShell onBack={onBack}>
      {/* ── Hero ── */}
      <div ref={heroRef} style={{ position: 'relative', height: isMobile ? '70vh' : '100vh', overflow: 'hidden', backgroundColor: '#0A0807' }}>
        <div style={{ position: 'absolute', inset: '-15%', backgroundImage: `url(${IMG.a1})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.38) saturate(0.6)', transform: `translateY(${heroOff}px)`, willChange: 'transform' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, rgba(68,2,3,0.5) 0%, rgba(10,8,7,0.35) 50%, rgba(10,8,7,0.96) 100%)` }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.55em', color: DC.gold, marginBottom: 24, animation: `fadeUp 1s 0.2s ${EASE} both`, opacity: 0 }}>ARCHITECTURE & FACILITIES</div>
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 'clamp(36px,9vw,56px)' : 'clamp(48px,7vw,96px)', color: DC.ivory, lineHeight: 1.06, animation: `fadeUp 1s 0.4s ${EASE} both`, opacity: 0 }}>
            Built for<br /><span style={{ fontStyle: 'italic' }}>Eternity.</span>
          </div>
          <div style={{ width: 48, height: 1, background: DC.gold, opacity: 0.4, margin: '22px auto' }} />
          <div style={{ fontFamily: CORMORANT, fontSize: isMobile ? 15 : 20, fontStyle: 'italic', color: DC.sand, letterSpacing: '0.06em', animation: `fadeUp 1s 0.7s ${EASE} both`, opacity: 0, maxWidth: 600 }}>
            Sixteen worlds within one palace. Six signature spaces and ten complete facilities — Ottoman artistry in every detail.
          </div>
        </div>
        {!isMobile && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${DC.gold}40, transparent)` }} />}
      </div>

      {/* ── Venues — alternating full-width sections ── */}
      <div>
        {VENUES.map((v, i) => (
          <VenueSection key={v.num} v={v} i={i} isEven={i % 2 === 0} isMobile={isMobile} isDark={isDark} C={C}
            onImageClick={() => setLbIdx(i)} />
        ))}
      </div>

      {/* ── Facilities Section ── */}
      <div style={{ backgroundColor: isDark ? DC.imperialBlack : '#EDE4D4' }}>
        <div ref={facRef as React.RefObject<HTMLDivElement>} style={{ padding: isMobile ? '64px 24px 48px' : '96px 80px 56px', transition: `opacity 1s ${EASE}`, opacity: facVis ? 1 : 0 }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: 14 }}>PALACE FACILITIES</div>
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 28 : 'clamp(28px,4vw,52px)', color: C.ivory, lineHeight: 1.15 }}>
            The Complete <span style={{ fontStyle: 'italic' }}>Palace Experience.</span>
          </div>
          <div style={{ marginTop: 16, fontFamily: JOST, fontSize: 12, color: C.brass }}>Ten curated worlds — dining, wellness, faith, beach and beyond. Click any image to preview.</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(5,1fr)', gap: 2 }}>
          {FACILITY_ITEMS.map((fi, fi_i) => (
            <FacilityArchCard key={fi.cat} fi={fi} idx={fi_i} lbOffset={VENUES.length} onOpen={setLbIdx} />
          ))}
        </div>
      </div>

      {/* ── Photo Gallery ── */}
      <div style={{ backgroundColor: isDark ? DC.palaceBlack : '#E8DDD0', padding: isMobile ? '64px 0 0' : '96px 0 0' }}>
        <div ref={gallRef as React.RefObject<HTMLDivElement>} style={{ padding: isMobile ? '0 24px 48px' : '0 80px 56px', transition: `opacity 1s ${EASE}`, opacity: gallVis ? 1 : 0 }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: 14 }}>THE PALACE IN DETAIL</div>
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 28 : 'clamp(28px,4vw,48px)', color: C.ivory, lineHeight: 1.15 }}>
            Every Corner, <span style={{ fontStyle: 'italic' }}>a Masterpiece.</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(5,1fr)', gridAutoRows: isMobile ? '140px' : '220px', gap: 2 }}>
          {ARCH_GALLERY_IMGS.map((src, idx) => (
            <GalleryThumb key={idx} src={src} idx={idx} tall={idx === 0 || idx === 5}
              lbOffset={VENUES.length + FACILITY_ITEMS.length} onOpen={setLbIdx} />
          ))}
        </div>
      </div>

      {/* ── Final CTA ── */}
      <ArchCta isDark={isDark} isMobile={isMobile} onBack={onBack} />

      {/* ── Lightbox ── */}
      {lbIdx !== null && (
        <ImageLightbox items={lbItems} idx={lbIdx} onClose={() => setLbIdx(null)} onNav={setLbIdx} />
      )}
    </PageShell>
  )
}

function VenueSection({ v, i, isEven, isMobile, isDark, C, onImageClick }: { v: typeof VENUES[0]; i: number; isEven: boolean; isMobile: boolean; isDark: boolean; C: typeof DC; onImageClick: () => void }) {
  const { ref: secRef, offset: secOff } = useScrollParallax(0.32)
  const { ref: textRef, visible: textVis } = useReveal(0.12)
  const [hov, setHov] = useState(false)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', minHeight: isMobile ? 'auto' : '80vh', direction: (!isMobile && !isEven) ? 'rtl' : 'ltr' }}>
      {/* Image — parallax + click to expand */}
      <div
        ref={secRef}
        onClick={onImageClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? 280 : 'auto', direction: 'ltr', cursor: 'zoom-in' }}
      >
        <div style={{ position: 'absolute', inset: '-20%', backgroundImage: `url(${v.img})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: `brightness(${isDark ? (hov ? 0.7 : 0.55) : (hov ? 0.8 : 0.65)}) saturate(0.7)`, transform: `translateY(${secOff}px) scale(${hov ? 1.05 : 1})`, transition: `transform 0.7s ${EASE}, filter 0.5s ease`, willChange: 'transform' }} />
        {/* Hover expand hint */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,8,7,0.35)', opacity: hov ? 1 : 0, transition: 'opacity 0.4s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.3em', color: DC.ivory, border: `1px solid ${DC.gold}88`, padding: '10px 22px', backgroundColor: `${BRAND_CRIMSON}BB`, backdropFilter: 'blur(4px)' }}>EXPAND ⤢</div>
        </div>
        {/* Corner ornaments */}
        <div style={{ position: 'absolute', top: 20, left: 20, width: 28, height: 28, borderTop: `1px solid ${DC.gold}55`, borderLeft: `1px solid ${DC.gold}55`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 20, right: 20, width: 28, height: 28, borderBottom: `1px solid ${DC.gold}55`, borderRight: `1px solid ${DC.gold}55`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 24, left: isEven ? 20 : 'auto', right: isEven ? 'auto' : 20, fontFamily: CINZEL, fontSize: isMobile ? 44 : 72, color: '#FFF', opacity: 0.07, lineHeight: 1, userSelect: 'none', direction: 'ltr', pointerEvents: 'none' }}>{v.num}</div>
        {!isMobile && <div style={{ position: 'absolute', inset: 0, background: isEven ? 'linear-gradient(to right, transparent 55%, rgba(10,8,7,0.7) 100%)' : 'linear-gradient(to left, transparent 55%, rgba(10,8,7,0.7) 100%)', pointerEvents: 'none' }} />}
        {isMobile && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 45%, rgba(10,8,7,0.9) 100%)', pointerEvents: 'none' }} />}
      </div>

      {/* Text panel */}
      <div
        ref={textRef as React.RefObject<HTMLDivElement>}
        style={{ backgroundColor: i % 3 === 0 ? (isDark ? BRAND_CRIMSON_DIM : BRAND_CRIMSON) : (isDark ? DC.palaceBlack : '#EDE4D4'), display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: isMobile ? '40px 28px 56px' : 'clamp(56px,8vh,100px) clamp(40px,5vw,80px)', direction: 'ltr' }}
      >
        <div style={{ transition: `opacity 1s ${EASE}, transform 1s ${EASE}`, opacity: textVis ? 1 : 0, transform: textVis ? 'translateX(0)' : (isEven ? 'translateX(28px)' : 'translateX(-28px)') }}>
          <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 36 : 56, color: i % 3 === 0 ? `${DC.gold}20` : `${C.gold}20`, lineHeight: 1, marginBottom: isMobile ? -6 : -10, userSelect: 'none' }}>{v.num}</div>
          <div style={{ fontFamily: CINZEL, fontSize: 10, letterSpacing: '0.35em', color: i % 3 === 0 ? DC.gold : C.gold, marginBottom: 16 }}>SIGNATURE SPACE</div>
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 'clamp(22px,5vw,30px)' : 'clamp(24px,2.8vw,38px)', color: i % 3 === 0 ? DC.ivory : C.ivory, lineHeight: 1.2, marginBottom: 20, whiteSpace: 'pre-line' }}>{v.name}</div>
          <div style={{ width: 36, height: 1, background: i % 3 === 0 ? DC.gold : C.gold, opacity: 0.5, marginBottom: 20 }} />
          <div style={{ fontFamily: JOST, fontSize: isMobile ? 13 : 14, color: i % 3 === 0 ? '#C4A882' : C.sand, lineHeight: 1.9 }}>{v.desc}</div>
        </div>
      </div>
    </div>
  )
}

function FacilityArchCard({ fi, idx, lbOffset, onOpen }: { fi: FacilityItem; idx: number; lbOffset: number; onOpen: (i: number) => void }) {
  const { ref, visible } = useReveal(0.08)
  const [hov, setHov] = useState(false)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onClick={() => onOpen(lbOffset + idx)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/5', cursor: 'zoom-in', transition: `opacity 0.8s ${idx * 0.06}s ${EASE}, transform 0.8s ${idx * 0.06}s ${EASE}`, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.97)' }}
    >
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${fi.img})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: `brightness(${hov ? 0.6 : 0.42}) saturate(0.7)`, transition: `transform 0.7s ${EASE}, filter 0.5s ease`, transform: hov ? 'scale(1.07)' : 'scale(1)' }} />
      {/* Hover expand overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,8,7,0.42)', opacity: hov ? 1 : 0, transition: 'opacity 0.4s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.25em', color: DC.ivory, border: `1px solid ${DC.gold}77`, padding: '8px 18px', backgroundColor: `${BRAND_CRIMSON}BB` }}>EXPAND ⤢</div>
      </div>
      {/* Always-visible bottom label */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(10,8,7,0.95) 0%, transparent 100%)', padding: '28px 16px 18px' }}>
        <div style={{ fontFamily: CINZEL, fontSize: 'clamp(10px,1.4vw,13px)', letterSpacing: '0.2em', color: DC.ivory, marginBottom: 4 }}>{fi.cat}</div>
        <div style={{ fontFamily: CORMORANT, fontSize: 12, fontStyle: 'italic', color: DC.sand, lineHeight: 1.4, maxHeight: hov ? '60px' : '0', overflow: 'hidden', transition: `max-height 0.4s ${EASE}` }}>{fi.tagline}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: hov ? 8 : 0, maxHeight: hov ? '80px' : '0', overflow: 'hidden', transition: `max-height 0.4s 0.05s ${EASE}` }}>
          {fi.items.map(item => <span key={item} style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.1em', color: DC.brass, padding: '2px 7px', border: `1px solid ${DC.gold}33` }}>{item}</span>)}
        </div>
      </div>
    </div>
  )
}

function GalleryThumb({ src, idx, tall, lbOffset, onOpen }: { src: string; idx: number; tall: boolean; lbOffset: number; onOpen: (i: number) => void }) {
  const { ref, visible } = useReveal(0.08)
  const [hov, setHov] = useState(false)
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onClick={() => onOpen(lbOffset + idx)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ gridRow: tall ? 'span 2' : 'span 1', position: 'relative', overflow: 'hidden', cursor: 'zoom-in', transition: `opacity 0.8s ${idx * 0.06}s ${EASE}, transform 0.8s ${idx * 0.06}s ${EASE}`, opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.96)' }}
    >
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: `brightness(${hov ? 0.65 : 0.48}) saturate(0.65)`, transition: `transform 0.7s ${EASE}, filter 0.5s ease`, transform: hov ? 'scale(1.07)' : 'scale(1)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,8,7,0.38)', opacity: hov ? 1 : 0, transition: 'opacity 0.4s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.25em', color: DC.ivory, border: `1px solid ${DC.gold}77`, padding: '8px 18px', backgroundColor: `${BRAND_CRIMSON}BB` }}>EXPAND ⤢</div>
      </div>
    </div>
  )
}

function ArchCta({ isDark, isMobile, onBack }: { isDark: boolean; isMobile: boolean; onBack: () => void }) {
  const { ref, offset } = useScrollParallax(0.35)
  return (
    <div ref={ref} style={{ position: 'relative', height: isMobile ? '55vh' : '65vh', overflow: 'hidden', backgroundColor: '#0A0807' }}>
      <div style={{ position: 'absolute', inset: '-15%', backgroundImage: `url(${IMG.a6})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.28) saturate(0.5)', transform: `translateY(${offset}px)`, willChange: 'transform' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(68,2,3,0.4) 0%, rgba(10,8,7,0.65) 55%, rgba(10,8,7,1) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px', gap: 18 }}>
        <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 22 : 30, fontStyle: 'italic', color: DC.ivory, lineHeight: 1.4 }}>Where every detail<br />tells a story.</div>
        <div style={{ width: 40, height: 1, background: DC.gold, opacity: 0.4 }} />
        <div style={{ fontFamily: JOST, fontSize: 10, color: DC.sand, letterSpacing: '0.18em' }}>HURREM PALACE · OPENING 2032</div>
        <button onClick={onBack} style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.26em', color: DC.ivory, background: `${BRAND_CRIMSON}CC`, border: `1px solid ${DC.gold}66`, padding: '13px 32px', cursor: 'pointer', transition: `all 0.4s ${EASE}`, marginTop: 8 }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = BRAND_CRIMSON_LIGHT; e.currentTarget.style.borderColor = DC.gold }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = `${BRAND_CRIMSON}CC`; e.currentTarget.style.borderColor = `${DC.gold}66` }}
        >RETURN TO PALACE →</button>
      </div>
    </div>
  )
}

function InvestmentPage({ onBack }: { onBack: () => void }) {
  const C = useC()
  const { isDark } = useTheme()
  const w = useWindowWidth()
  const isMobile = w < 768
  const [plan, setPlan] = useState<Plan>('full')
  const { ref: r1, visible: v1 } = useReveal(0.1)
  const { ref: r2, visible: v2 } = useReveal(0.1)
  const { ref: r3, visible: v3 } = useReveal(0.1)

  const sectionBg  = isDark ? C.palaceBlack : '#E8DDD0'
  const cardBg     = isDark ? C.palaceBlack : '#F0E8D8'
  const cardBgFeat = isDark ? 'rgba(94,15,26,0.3)' : 'rgba(122,82,16,0.12)'
  const border     = isDark ? `${C.brass}44` : `${C.brass}66`

  return (
    <PageShell onBack={onBack}>
      {/* ── Hero ── */}
      <div style={{ position: 'relative', height: isMobile ? '70vh' : '90vh', overflow: 'hidden', backgroundColor: '#0A0807' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG.dome})`, backgroundSize: 'cover', backgroundPosition: 'center 30%', filter: 'brightness(0.32) saturate(0.55)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(94,15,26,0.5) 0%, rgba(10,8,7,0.3) 45%, rgba(10,8,7,1) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 4 L68 36 L36 68 L4 36 Z' stroke='%23B38A3E' stroke-width='0.35' fill='none' opacity='0.12'/%3E%3C/svg%3E")`, backgroundSize: '72px 72px' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.5em', color: DC.gold, marginBottom: 28, animation: `fadeUp 1s 0.2s ${EASE} both`, opacity: 0 }}>OWNERSHIP STRUCTURE</div>
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 'clamp(36px, 9vw, 56px)' : 'clamp(48px, 6vw, 84px)', color: DC.ivory, lineHeight: 1.08, animation: `fadeUp 1s 0.4s ${EASE} both`, opacity: 0 }}>Your Share.<br /><span style={{ fontStyle: 'italic' }}>Your Rights.</span></div>
          <div style={{ width: 52, height: 1, background: DC.gold, opacity: 0.45, margin: '24px 0' }} />
          <div style={{ fontFamily: CORMORANT, fontSize: isMobile ? 15 : 20, fontStyle: 'italic', color: DC.sand, letterSpacing: '0.08em', animation: `fadeUp 1s 0.6s ${EASE} both`, opacity: 0 }}>A clear, legally structured, inheritable asset — built on trust.</div>
          <div style={{ marginTop: 12, fontFamily: JOST, fontSize: 9, letterSpacing: '0.28em', color: DC.brass, animation: `fadeUp 1s 0.8s ${EASE} both`, opacity: 0 }}>Halal · Sharia-compliant · Land-backed</div>
        </div>
      </div>

      {/* ── From Purchase to Deed ── */}
      <div ref={r1 as React.RefObject<HTMLDivElement>} style={{ backgroundColor: C.imperialBlack }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: isMobile ? '64px 28px' : '96px 80px' }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: 20, transition: `opacity 1s ${EASE}`, opacity: v1 ? 1 : 0 }}>HOW IT WORKS</div>
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 28 : 'clamp(28px, 3.5vw, 48px)', color: C.ivory, lineHeight: 1.18, marginBottom: 16, transition: `opacity 1s 0.2s ${EASE}`, opacity: v1 ? 1 : 0 }}>From <span style={{ fontStyle: 'italic' }}>Purchase to Deed.</span></div>
          <div style={{ fontFamily: JOST, fontSize: 14, color: C.sand, lineHeight: 1.9, maxWidth: 680, marginBottom: 56, transition: `opacity 1s 0.3s ${EASE}`, opacity: v1 ? 1 : 0 }}>Your share in Hurrem Palace is a permanent, legally registered ownership interest in the property. Here is how your ownership journey unfolds.</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4,1fr)', gap: 1, backgroundColor: `${C.brass}33` }}>
            {[
              { num: '01', title: 'Select & Pay', body: 'Choose your package. Pay by instalment or in full. Receive a QR-authenticated payment receipt immediately.' },
              { num: '02', title: 'Digital Certificates', body: 'Receive your Land Share Certificate and Deed of Agreement — accessible via your secure online profile.' },
              { num: '03', title: 'Sub-Kabala Deed', body: 'Every three months, sold shares are formally registered through sub-kabala deed — full legal title in your name.' },
              { num: '04', title: 'Profit & Perks', body: 'Once the hotel opens, receive your annual profit, activate your stay entitlements, and access your Smart Card benefits.' },
            ].map((step, i) => (
              <div key={step.num} style={{ backgroundColor: C.imperialBlack, padding: isMobile ? '32px 20px' : '44px 36px', position: 'relative', borderTop: `2px solid ${i === 0 ? C.gold : 'transparent'}`, transition: `opacity 1s ${i * 0.12}s ${EASE}`, opacity: v1 ? 1 : 0 }}>
                <div style={{ fontFamily: CINZEL, fontSize: 52, color: C.gold, opacity: 0.12, lineHeight: 1, marginBottom: -8 }}>{step.num}</div>
                <div style={{ fontFamily: CINZEL, fontSize: 11, letterSpacing: '0.22em', color: C.champagne, marginBottom: 14 }}>{step.title.toUpperCase()}</div>
                <div style={{ width: 20, height: 1, background: C.gold, opacity: 0.38, marginBottom: 14 }} />
                <div style={{ fontFamily: JOST, fontSize: 13, color: C.sand, lineHeight: 1.9 }}>{step.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Profit Structure ── */}
      <div ref={r2 as React.RefObject<HTMLDivElement>} style={{ backgroundColor: sectionBg, position: 'relative', overflow: 'hidden' }}>
        {isDark && <>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG.a1})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.08) saturate(0.3)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,8,7,0.88)' }} />
        </>}
        {!isDark && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, opacity: 0.5 }} />}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1300, margin: '0 auto', padding: isMobile ? '64px 28px' : '96px 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 80, alignItems: 'start' }}>
            <div>
              <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: 20, transition: `opacity 1s ${EASE}`, opacity: v2 ? 1 : 0 }}>PROFIT STRUCTURE</div>
              <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 28 : 'clamp(28px, 3vw, 44px)', color: C.ivory, lineHeight: 1.2, marginBottom: 24, transition: `opacity 1s 0.2s ${EASE}`, opacity: v2 ? 1 : 0 }}>How Your <span style={{ fontStyle: 'italic' }}>Returns Work.</span></div>
              <GoldLine w={40} /><div style={{ height: 24 }} />
              {/* Big number */}
              <div style={{ transition: `opacity 1s 0.3s ${EASE}`, opacity: v2 ? 1 : 0 }}>
                <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 'clamp(48px,12vw,72px)' : 'clamp(56px,7vw,88px)', color: C.gold, lineHeight: 1, marginBottom: 4, letterSpacing: '0.05em' }}>15–20%</div>
                <div style={{ fontFamily: CINZEL, fontSize: 11, letterSpacing: '0.28em', color: C.champagne, marginBottom: 20 }}>ESTIMATED ANNUAL HALAL PROFIT</div>
                <div style={{ fontFamily: JOST, fontSize: 14, color: C.sand, lineHeight: 1.9 }}>After the hotel commences operations, shareholders earn an estimated annual profit of 15–20% from hotel revenue, distributed proportionally to their shareholding. Profits are halal — generated through legitimate hospitality operations.</div>
                <div style={{ marginTop: 20, fontFamily: CORMORANT, fontSize: isMobile ? 14 : 16, fontStyle: 'italic', color: C.brass }}>Unused annual stay nights are calculated and added to your profit for that year, increasing your annual return.</div>
                <div style={{ marginTop: 24, fontFamily: JOST, fontSize: 10, color: C.brass, opacity: 0.65, lineHeight: 1.7, borderTop: `1px solid ${border}`, paddingTop: 16 }}>* Profit figures are projected estimates based on anticipated hotel operations. Actual revenue may be higher or lower depending on occupancy and market conditions.</div>
              </div>
            </div>
            <div style={{ transition: `opacity 1s 0.45s ${EASE}`, opacity: v2 ? 1 : 0 }}>
              <div style={{ backgroundColor: isDark ? 'rgba(179,138,62,0.07)' : 'rgba(122,82,16,0.07)', border: `1px solid ${border}`, padding: isMobile ? '32px 24px' : '44px 40px', marginBottom: 24 }}>
                <div style={{ fontFamily: CINZEL, fontSize: 11, letterSpacing: '0.25em', color: C.champagne, marginBottom: 16 }}>INVESTOR DASHBOARD</div>
                <div style={{ width: 24, height: 1, background: C.gold, opacity: 0.4, marginBottom: 20 }} />
                <div style={{ fontFamily: JOST, fontSize: 13, color: C.sand, lineHeight: 1.9, marginBottom: 16 }}>Log in to the company's secure software platform to view your current share value, download deed documents, track accumulated profit, and watch live project footage.</div>
                <div style={{ fontFamily: JOST, fontSize: 13, color: C.sand, lineHeight: 1.9 }}>All transactions — including share purchase, transfer, and profit tracking — can be managed online from anywhere in the world.</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, backgroundColor: border }}>
                {[{ label: 'LAND AREA', value: '4 ACRES' }, { label: 'TOTAL SHARES', value: '40,000' }, { label: 'PRICE / SHARE', value: '৳5,00,000' }, { label: 'OPENING', value: '2032' }].map(stat => (
                  <div key={stat.label} style={{ backgroundColor: cardBg, padding: '20px 24px' }}>
                    <div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.3em', color: C.brass, marginBottom: 6 }}>{stat.label}</div>
                    <div style={{ fontFamily: CINZEL, fontSize: 16, letterSpacing: '0.12em', color: C.ivory, fontWeight: 700 }}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Profit Graph ── */}
      <ProfitGraph />

      {/* ── A Life of Royal Privilege — scroll hijacking ── */}
      <div>
        <div style={{ backgroundColor: C.imperialBlack, padding: isMobile ? '48px 28px 32px' : '64px 80px 40px', textAlign: 'center' }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.5em', color: C.gold, marginBottom: 16 }}>SHAREHOLDER PRIVILEGES</div>
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 'clamp(28px, 7vw, 44px)' : 'clamp(36px, 4.5vw, 60px)', color: C.ivory, lineHeight: 1.1 }}>A Life of <span style={{ fontStyle: 'italic' }}>Royal Privilege.</span></div>
          <div style={{ margin: '16px auto 0', fontFamily: CORMORANT, fontSize: isMobile ? 15 : 18, fontStyle: 'italic', color: C.brass }}>Nine exclusive benefits, yours from the moment you invest.</div>
        </div>
        <PrivilegesCarousel />
      </div>

      {/* ── Share Packages ── */}
      <div ref={r3 as React.RefObject<HTMLDivElement>} style={{ backgroundColor: C.imperialBlack }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: isMobile ? '64px 28px' : '96px 80px' }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: 20, transition: `opacity 1s ${EASE}`, opacity: v3 ? 1 : 0 }}>SHARE PACKAGES</div>
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 24 : 'clamp(24px, 3vw, 40px)', color: C.ivory, lineHeight: 1.2, marginBottom: 36, transition: `opacity 1s 0.2s ${EASE}`, opacity: v3 ? 1 : 0 }}>Choose Your <span style={{ fontStyle: 'italic' }}>Investment.</span></div>

          {/* Plan toggle */}
          <div style={{ display: 'flex', width: 'fit-content', marginBottom: 40, border: `1px solid ${border}`, transition: `opacity 1s 0.3s ${EASE}`, opacity: v3 ? 1 : 0 }}>
            {(['full', 'm12', 'm24'] as Plan[]).map((p, i) => (
              <button key={p} onClick={() => setPlan(p)} style={{ padding: isMobile ? '10px 16px' : '12px 30px', fontFamily: JOST, fontSize: isMobile ? 9 : 10, letterSpacing: '0.18em', backgroundColor: plan === p ? C.gold : 'transparent', color: plan === p ? (isDark ? DC.imperialBlack : '#FFF8EE') : C.sand, border: 'none', borderLeft: i > 0 ? `1px solid ${border}` : 'none', cursor: 'pointer', transition: 'all 0.35s ease', fontWeight: plan === p ? 700 : 400 }}>
                {p === 'full' ? 'FULL PAYMENT' : p === 'm12' ? '12 MONTHS' : '24 MONTHS'}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 2, backgroundColor: border, transition: `opacity 1s 0.4s ${EASE}`, opacity: v3 ? 1 : 0 }}>
            {PACKAGES.map(pkg => (
              <div key={pkg.label} style={{ backgroundColor: pkg.featured ? cardBgFeat : cardBg, padding: isMobile ? '40px 24px' : '52px 40px', position: 'relative', borderTop: pkg.featured ? `2px solid ${C.gold}` : '2px solid transparent' }}>
                {pkg.featured && <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', fontFamily: JOST, fontSize: 8, letterSpacing: '0.3em', color: '#FFF8EE', backgroundColor: C.gold, padding: '5px 16px' }}>MOST POPULAR</div>}
                <div style={{ fontFamily: CINZEL, fontSize: 11, letterSpacing: '0.3em', color: C.champagne, marginBottom: 6 }}>{pkg.label}</div>
                <div style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.18em', color: C.brass, marginBottom: 32 }}>{pkg.shares}</div>
                <div style={{ fontFamily: PLAYFAIR, fontSize: 'clamp(22px, 2.8vw, 32px)', color: C.ivory, marginBottom: 6, fontWeight: 700 }}>{plan === 'full' ? pkg.full : plan === 'm12' ? pkg.m12 : pkg.m24}</div>
                <div style={{ fontFamily: JOST, fontSize: 10, color: C.brass, marginBottom: 32 }}>{pkg.note}</div>
                <button style={{ width: '100%', padding: '14px', border: `1px solid ${pkg.featured ? C.gold : border}`, backgroundColor: 'transparent', fontFamily: JOST, fontSize: 10, letterSpacing: '0.22em', color: pkg.featured ? C.gold : C.sand, cursor: 'pointer', transition: 'all 0.35s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${C.gold}20`; e.currentTarget.style.color = C.gold; e.currentTarget.style.borderColor = C.gold }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = pkg.featured ? C.gold : C.sand; e.currentTarget.style.borderColor = pkg.featured ? C.gold : border }}
                >REQUEST INFORMATION</button>
              </div>
            ))}
          </div>

          {/* Benefits grid */}
          <div style={{ marginTop: 56 }}>
            <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: C.gold, marginBottom: 32 }}>WHY INVEST</div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? 24 : 1, backgroundColor: isMobile ? 'transparent' : border }}>
              {BENEFITS.map((b, i) => (
                <div key={b.num} style={{ backgroundColor: cardBg, padding: isMobile ? '0 0 24px' : '32px 32px' }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ fontFamily: CINZEL, fontSize: 20, color: C.gold, opacity: 0.4 }}>{b.num}</div>
                    <div style={{ fontFamily: CINZEL, fontSize: 10, letterSpacing: '0.22em', color: C.champagne }}>{b.title}</div>
                  </div>
                  <div style={{ fontFamily: JOST, fontSize: 12, color: C.sand, lineHeight: 1.85, paddingLeft: isMobile ? 0 : 34 }}>{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Final CTA ── */}
      <div style={{ position: 'relative', height: isMobile ? '55vh' : '65vh', overflow: 'hidden', backgroundColor: '#0A0807' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG.coast})`, backgroundSize: 'cover', backgroundPosition: 'center 40%', filter: 'brightness(0.3) saturate(0.55)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,8,7,0.35) 0%, rgba(10,8,7,0.6) 55%, rgba(10,8,7,1) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px', gap: 20 }}>
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 22 : 32, color: DC.ivory, fontStyle: 'italic', lineHeight: 1.4 }}>Own the land.<br />Own the legacy.</div>
          <div style={{ width: 40, height: 1, background: DC.gold, opacity: 0.45 }} />
          <div style={{ fontFamily: JOST, fontSize: 11, color: DC.sand, letterSpacing: '0.15em' }}>Contact the palace team to begin your ownership journey.</div>
          <a href="#contact" onClick={onBack} style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.28em', color: DC.champagne, textDecoration: 'none', border: `1px solid ${DC.gold}77`, padding: '13px 32px', transition: `all 0.4s ${EASE}`, marginTop: 8 }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(179,138,62,0.12)'; e.currentTarget.style.borderColor = DC.gold }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = `${DC.gold}77` }}
          >GET IN TOUCH →</a>
        </div>
      </div>
    </PageShell>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// NEWS & EVENTS — PUBLIC COMPONENTS
// ═════════════════════════════════════════════════════════════════════════════

// ── News Card (list/grid) ────────────────────────────────────────────────────
function NewsCard({ item, onSelect, C, isDark, isMobile }: { item: ContentItem; onSelect: () => void; C: typeof DC; isDark: boolean; isMobile: boolean }) {
  const [hov, setHov] = useState(false)
  const isEvent = item.type === 'event'
  const evStatus = isEvent ? eventStatus(item) : null

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', backgroundColor: isDark ? '#0D0C0A' : '#EBE2D0', border: `1px solid ${C.brass}28`, transition: `border-color 0.35s, transform 0.35s`, transform: hov ? 'translateY(-4px)' : 'none', borderColor: hov ? `${C.gold}55` : `${C.brass}28` }}
    >
      {/* Cover image */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${item.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.7s', transform: hov ? 'scale(1.06)' : 'scale(1)', filter: imgFilter(isDark, 0.85) }} />
        {/* Category badge */}
        <div style={{ position: 'absolute', top: 14, left: 14, fontFamily: JOST, fontSize: 8, letterSpacing: '0.32em', color: DC.ivory, backgroundColor: isEvent ? BRAND_CRIMSON : `${BRAND_CRIMSON}CC`, padding: '5px 11px' }}>
          {item.category.toUpperCase()}
        </div>
        {isEvent && evStatus && (
          <div style={{ position: 'absolute', top: 14, right: 14, fontFamily: JOST, fontSize: 8, letterSpacing: '0.22em', color: evStatus === 'PAST EVENT' ? DC.sand : DC.champagne, backgroundColor: evStatus === 'PAST EVENT' ? '#222' : (evStatus === 'TODAY' ? DC.gold : '#1A3A1A'), padding: '5px 11px' }}>
            {evStatus}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: isMobile ? '20px 18px' : '24px 22px', display: 'flex', flexDirection: 'column', flex: 1, gap: 10 }}>
        {isEvent && item.eventStart ? (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
            <div style={{ fontFamily: CINZEL, fontSize: 30, lineHeight: 1, color: C.gold, fontWeight: 700 }}>{fmtDay(item.eventStart)}</div>
            <div>
              <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.28em', color: C.champagne }}>{fmtMonth3(item.eventStart)}</div>
              <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.18em', color: C.sand }}>{fmtYear(item.eventStart)}</div>
            </div>
          </div>
        ) : (
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.2em', color: C.brass }}>{item.publishedAt ? fmtDateShort(item.publishedAt) : ''}</div>
        )}
        <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 13 : 14, letterSpacing: '0.1em', color: C.ivory, lineHeight: 1.4 }}>{item.title}</div>
        <div style={{ fontFamily: JOST, fontSize: 12, color: C.sand, lineHeight: 1.75, flex: 1 }}>{item.excerpt.slice(0, 110)}{item.excerpt.length > 110 ? '…' : ''}</div>
        {item.locationName && <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.18em', color: C.brass }}>{item.locationName.toUpperCase()}</div>}
        <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.25em', color: hov ? C.gold : C.champagne, transition: 'color 0.3s', marginTop: 4 }}>
          {isEvent ? 'VIEW EVENT →' : 'READ STORY →'}
        </div>
      </div>
    </div>
  )
}

// ── Homepage News Section ────────────────────────────────────────────────────
function HomepageNewsSection({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  const { isDark } = useTheme()
  const C = isDark ? DC : LC
  const isMobile = useWindowWidth() < 768
  const allItems = usePublishedItems()
  const { ref: secRef, offset: secOffset } = useScrollParallax(0.18)
  const { ref: hRef, visible: hVis } = useReveal(0.1)

  const featured = allItems.find(i => i.homepageFeatured && i.type === 'news') || allItems.find(i => i.type === 'news')
  const secondary = allItems.filter(i => i.id !== featured?.id).slice(0, 2)

  if (!featured) return null

  return (
    <section ref={secRef as React.RefObject<HTMLElement>} style={{ backgroundColor: isDark ? '#1A0204' : BRAND_CRIMSON, position: 'relative', overflow: 'hidden', padding: isMobile ? '72px 24px' : '96px 80px' }}>
      {/* Parallax bg ornament */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transform: `translateY(${secOffset * 0.4}px)` }}>
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: 340, height: 340, borderRadius: '50%', border: `1px solid ${DC.gold}18`, opacity: 0.4 }} />
        <div style={{ position: 'absolute', bottom: '8%', left: '3%', width: 200, height: 200, borderRadius: '50%', border: `1px solid ${DC.gold}12`, opacity: 0.3 }} />
      </div>

      <div style={{ maxWidth: 1300, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Heading */}
        <div ref={hRef as React.RefObject<HTMLDivElement>} style={{ marginBottom: isMobile ? 48 : 64, transition: `opacity 1s ${EASE}, transform 1s ${EASE}`, opacity: hVis ? 1 : 0, transform: hVis ? 'none' : 'translateY(20px)' }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: DC.gold, marginBottom: 14 }}>NEWS & EVENTS</div>
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 'clamp(28px,8vw,40px)' : 'clamp(32px,3.5vw,52px)', color: DC.ivory, lineHeight: 1.1, marginBottom: 14 }}>From the Palace</div>
          <div style={{ width: 48, height: 1, background: DC.gold, opacity: 0.5, marginBottom: 14 }} />
          <div style={{ fontFamily: CORMORANT, fontSize: 15, fontStyle: 'italic', color: DC.sand, maxWidth: 440, lineHeight: 1.7 }}>The latest milestones, stories and moments from Hurrem Palace.</div>
        </div>

        {/* Featured + secondary layout */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 360px', gap: isMobile ? 32 : 40, alignItems: 'start' }}>
          {/* Featured story */}
          <div onClick={() => onNavigate('news-detail', featured.id)} style={{ cursor: 'pointer' }}>
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9', marginBottom: 24 }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${featured.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.78)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(10,8,7,0.7) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 20, left: 20, fontFamily: JOST, fontSize: 8, letterSpacing: '0.3em', color: DC.champagne, backgroundColor: BRAND_CRIMSON, padding: '5px 12px' }}>{featured.category.toUpperCase()}</div>
            </div>
            <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 'clamp(18px,5vw,24px)' : 'clamp(20px,2vw,28px)', color: DC.ivory, letterSpacing: '0.08em', lineHeight: 1.3, marginBottom: 12 }}>{featured.title}</div>
            <div style={{ fontFamily: JOST, fontSize: 13, color: DC.sand, lineHeight: 1.75, marginBottom: 16, maxWidth: 560 }}>{featured.excerpt}</div>
            {featured.publishedAt && <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.2em', color: DC.brass, marginBottom: 16 }}>{fmtDate(featured.publishedAt)}</div>}
            <div style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.28em', color: DC.gold }}>READ STORY →</div>
          </div>

          {/* Secondary stories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {secondary.map((it, i) => (
              <div key={it.id} onClick={() => onNavigate('news-detail', it.id)} style={{ cursor: 'pointer', display: 'flex', gap: 18, borderTop: `1px solid ${DC.gold}22`, paddingTop: 20 }}>
                <div style={{ fontFamily: CINZEL, fontSize: 28, color: DC.gold, opacity: 0.25, lineHeight: 1, flexShrink: 0, marginTop: -4 }}>0{i + 2}</div>
                <div>
                  <div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.28em', color: DC.brass, marginBottom: 8 }}>{it.type === 'event' ? 'EVENT' : it.category.toUpperCase()}</div>
                  <div style={{ fontFamily: CINZEL, fontSize: 13, letterSpacing: '0.08em', color: DC.ivory, lineHeight: 1.4, marginBottom: 8 }}>{it.title}</div>
                  {it.type === 'event' && it.eventStart && <div style={{ fontFamily: CINZEL, fontSize: 20, color: DC.gold, lineHeight: 1, marginBottom: 6 }}>{fmtDay(it.eventStart)} <span style={{ fontSize: 11 }}>{fmtMonth3(it.eventStart)}</span></div>}
                  <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.22em', color: DC.gold, marginTop: 6 }}>{it.type === 'event' ? 'VIEW EVENT →' : 'READ →'}</div>
                </div>
              </div>
            ))}
            <div style={{ paddingTop: 20, borderTop: `1px solid ${DC.gold}22` }}>
              <button onClick={() => onNavigate('news')} style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.32em', color: DC.champagne, background: 'none', border: `1px solid ${DC.gold}55`, cursor: 'pointer', padding: '12px 24px', transition: `all 0.4s ${EASE}` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = DC.gold; e.currentTarget.style.color = DC.ivory }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${DC.gold}55`; e.currentTarget.style.color = DC.champagne }}
              >ALL JOURNAL →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── News & Events Listing Page ───────────────────────────────────────────────
const NEWS_FILTERS = ['ALL', 'NEWS', 'EVENTS', 'ANNOUNCEMENTS', 'PROJECT UPDATES'] as const
type NewsFilter = typeof NEWS_FILTERS[number]

function NewsEventsPage({ onBack, onNavigate }: { onBack: () => void; onNavigate: (page: string, id?: string) => void }) {
  const { isDark } = useTheme()
  const C = isDark ? DC : LC
  const isMobile = useWindowWidth() < 768
  const allItems = usePublishedItems()
  const { ref: heroRef, offset: heroOffset } = useScrollParallax(0.22)

  const [filter, setFilter] = useState<NewsFilter>('ALL')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest')

  const filtered = allItems.filter(it => {
    if (filter === 'NEWS' && it.type !== 'news') return false
    if (filter === 'EVENTS' && it.type !== 'event') return false
    if (filter === 'ANNOUNCEMENTS' && it.category !== 'Announcement') return false
    if (filter === 'PROJECT UPDATES' && it.category !== 'Project Update') return false
    if (search) {
      const q = search.toLowerCase()
      return it.title.toLowerCase().includes(q) || it.excerpt.toLowerCase().includes(q) || it.category.toLowerCase().includes(q) || it.tags.some(t => t.toLowerCase().includes(q)) || it.locationName.toLowerCase().includes(q)
    }
    return true
  }).sort((a, b) => {
    const da = new Date(a.publishedAt || a.createdAt).getTime()
    const db = new Date(b.publishedAt || b.createdAt).getTime()
    return sort === 'newest' ? db - da : da - db
  })

  const featuredItem = filtered.find(i => i.featured) || filtered[0]
  const gridItems = filtered.filter(i => i.id !== featuredItem?.id)
  const upcomingEvents = allItems.filter(i => i.type === 'event' && eventStatus(i) === 'UPCOMING').sort((a, b) => new Date(a.eventStart!).getTime() - new Date(b.eventStart!).getTime())

  return (
    <PageShell onBack={onBack}>
      {/* Hero */}
      <div ref={heroRef as React.RefObject<HTMLDivElement>} style={{ position: 'relative', height: isMobile ? 340 : 480, overflow: 'hidden', backgroundColor: BRAND_CRIMSON }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${U('1732081697693-7c6569981102', 1920, 800)})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.22) saturate(0.5)', transform: `translateY(${heroOffset}px)` }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${BRAND_CRIMSON_DIM}99, ${BRAND_CRIMSON}88)` }} />
        {/* Ottoman arch decoration */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 220, height: 280, border: `1px solid ${DC.gold}25`, borderRadius: '110px 110px 0 0', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
          <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.45em', color: DC.gold, marginBottom: 16 }}>HURREM PALACE</div>
          <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 'clamp(26px,8vw,40px)' : 'clamp(32px,4vw,56px)', letterSpacing: '0.16em', color: DC.ivory, lineHeight: 1.1, marginBottom: 16 }}>NEWS &amp; EVENTS</div>
          <div style={{ fontFamily: PLAYFAIR, fontSize: isMobile ? 16 : 22, fontStyle: 'italic', color: DC.champagne, marginBottom: 16 }}>The Journal of Hurrem Palace</div>
          <div style={{ width: 48, height: 1, background: DC.gold, opacity: 0.5, marginBottom: 16 }} />
          <div style={{ fontFamily: CORMORANT, fontSize: 14, fontStyle: 'italic', color: DC.sand, maxWidth: 480 }}>Stories, milestones, announcements and events from the journey.</div>
        </div>
      </div>

      {/* Filter + Search bar */}
      <div style={{ backgroundColor: isDark ? '#0D0C0A' : '#EBE2D0', borderBottom: `1px solid ${C.brass}28`, position: 'sticky', top: 80, zIndex: 100 }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: isMobile ? '0 20px' : '0 80px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', justifyContent: 'space-between', gap: 0 }}>
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
            {NEWS_FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                fontFamily: JOST, fontSize: 9, letterSpacing: '0.22em', background: 'none', border: 'none', cursor: 'pointer',
                padding: '16px 18px', color: filter === f ? C.gold : C.sand,
                borderBottom: filter === f ? `2px solid ${C.gold}` : '2px solid transparent',
                transition: 'all 0.3s', whiteSpace: 'nowrap',
              }}>{f}</button>
            ))}
          </div>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderLeft: isMobile ? 'none' : `1px solid ${C.brass}28`, padding: isMobile ? '10px 0' : '0 0 0 24px' }}>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="SEARCH THE JOURNAL"
              style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.18em', background: 'none', border: 'none', outline: 'none', color: C.ivory, width: isMobile ? '100%' : 200, padding: '8px 0', caretColor: C.gold }}
            />
            <span style={{ color: C.brass, fontSize: 13 }}>⌕</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ backgroundColor: C.imperialBlack, minHeight: '60vh' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: isMobile ? '48px 20px' : '72px 80px' }}>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontFamily: CINZEL, fontSize: 14, letterSpacing: '0.2em', color: C.sand, marginBottom: 12 }}>NO STORIES YET</div>
              <div style={{ fontFamily: JOST, fontSize: 12, color: C.brass }}>New content from Hurrem Palace will appear here.</div>
            </div>
          ) : (
            <>
              {/* Featured story */}
              {featuredItem && filter === 'ALL' && !search && (
                <div onClick={() => onNavigate('news-detail', featuredItem.id)} style={{ cursor: 'pointer', marginBottom: 64, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 48, alignItems: 'center' }}>
                  <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9' }}>
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${featuredItem.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: imgFilter(isDark, 0.85), transition: 'transform 0.6s', }} />
                    <div style={{ position: 'absolute', bottom: 16, left: 16, fontFamily: JOST, fontSize: 8, letterSpacing: '0.3em', color: DC.ivory, backgroundColor: BRAND_CRIMSON, padding: '5px 12px' }}>{featuredItem.category.toUpperCase()}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.35em', color: C.gold, marginBottom: 16 }}>FEATURED STORY</div>
                    <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 20 : 'clamp(20px,2.2vw,30px)', color: C.ivory, lineHeight: 1.3, letterSpacing: '0.08em', marginBottom: 16 }}>{featuredItem.title}</div>
                    <div style={{ fontFamily: JOST, fontSize: 13, color: C.sand, lineHeight: 1.8, marginBottom: 20 }}>{featuredItem.excerpt}</div>
                    {featuredItem.publishedAt && <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.2em', color: C.brass, marginBottom: 20 }}>{fmtDate(featuredItem.publishedAt)} · {featuredItem.locationName || ''}</div>}
                    <div style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.28em', color: C.gold }}>{featuredItem.type === 'event' ? 'VIEW EVENT →' : 'READ STORY →'}</div>
                  </div>
                </div>
              )}

              {/* Upcoming Events strip */}
              {upcomingEvents.length > 0 && (filter === 'ALL' || filter === 'EVENTS') && !search && (
                <div style={{ marginBottom: 56 }}>
                  <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.4em', color: C.gold, marginBottom: 24, paddingBottom: 14, borderBottom: `1px solid ${C.brass}28` }}>UPCOMING EVENTS</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {upcomingEvents.map(ev => (
                      <div key={ev.id} onClick={() => onNavigate('news-detail', ev.id)} style={{ cursor: 'pointer', display: 'grid', gridTemplateColumns: isMobile ? '64px 1fr' : '80px 1fr auto', alignItems: 'center', gap: isMobile ? 16 : 24, padding: '18px 0', borderBottom: `1px solid ${C.brass}18`, transition: 'background 0.3s' }}
                        onMouseEnter={e => (e.currentTarget.style.paddingLeft = '8px')}
                        onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0')}
                      >
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontFamily: CINZEL, fontSize: 26, color: C.gold, lineHeight: 1 }}>{ev.eventStart ? fmtDay(ev.eventStart) : ''}</div>
                          <div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.22em', color: C.champagne }}>{ev.eventStart ? fmtMonth3(ev.eventStart) : ''}</div>
                          <div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.12em', color: C.sand }}>{ev.eventStart ? fmtYear(ev.eventStart) : ''}</div>
                        </div>
                        <div>
                          <div style={{ fontFamily: CINZEL, fontSize: 13, letterSpacing: '0.1em', color: C.ivory, marginBottom: 4 }}>{ev.title}</div>
                          <div style={{ fontFamily: JOST, fontSize: 11, color: C.sand }}>{ev.locationName}{ev.venue ? ` · ${ev.venue}` : ''}</div>
                        </div>
                        {!isMobile && <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.22em', color: C.gold }}>VIEW EVENT →</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sort + Grid */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, paddingBottom: 14, borderBottom: `1px solid ${C.brass}28` }}>
                <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.35em', color: C.gold }}>
                  {gridItems.length} {gridItems.length === 1 ? 'STORY' : 'STORIES'}
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {(['newest', 'oldest'] as const).map(s => (
                    <button key={s} onClick={() => setSort(s)} style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.18em', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 10px', color: sort === s ? C.gold : C.sand, borderBottom: sort === s ? `1px solid ${C.gold}` : '1px solid transparent' }}>
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 24 : 28 }}>
                {(search ? filtered : gridItems).map(it => (
                  <NewsCard key={it.id} item={it} onSelect={() => onNavigate('news-detail', it.id)} C={C} isDark={isDark} isMobile={isMobile} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </PageShell>
  )
}

// ── Article / Event Detail Page ──────────────────────────────────────────────
function ArticleDetailPage({ itemId, onBack, onNavigate }: { itemId: string; onBack: () => void; onNavigate: (page: string, id?: string) => void }) {
  const { isDark } = useTheme()
  const C = isDark ? DC : LC
  const isMobile = useWindowWidth() < 768
  const allItems = usePublishedItems()
  const { ref: heroRef, offset: heroOffset } = useScrollParallax(0.25)

  const item = allItems.find(i => i.id === itemId)
  const related = allItems.filter(i => i.id !== itemId && (i.category === item?.category || i.tags.some(t => item?.tags.includes(t)))).slice(0, 3)

  if (!item) {
    return (
      <PageShell onBack={onBack}>
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 20, padding: 40 }}>
          <div style={{ fontFamily: CINZEL, fontSize: 14, letterSpacing: '0.25em', color: C.sand }}>THIS STORY IS NO LONGER AVAILABLE</div>
          <div style={{ fontFamily: JOST, fontSize: 12, color: C.brass, marginBottom: 16 }}>Explore the latest from Hurrem Palace</div>
          <button onClick={() => onNavigate('news')} style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.25em', color: DC.ivory, backgroundColor: BRAND_CRIMSON, border: 'none', cursor: 'pointer', padding: '12px 28px' }}>NEWS &amp; EVENTS →</button>
        </div>
      </PageShell>
    )
  }

  const isEvent = item.type === 'event'
  const evSt = isEvent ? eventStatus(item) : null
  const paragraphs = item.content.split('\n\n').filter(Boolean)

  const videoEmbed = (url: string) => {
    if (!url) return null
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/)
    const viMatch = url.match(/vimeo\.com\/(\d+)/)
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`
    if (viMatch) return `https://player.vimeo.com/video/${viMatch[1]}`
    return null
  }

  const copyLink = () => { navigator.clipboard.writeText(window.location.href).catch(() => {}) }

  return (
    <PageShell onBack={onBack}>
      {/* Hero */}
      <div ref={heroRef as React.RefObject<HTMLDivElement>} style={{ position: 'relative', height: isMobile ? 320 : 520, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${item.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: imgFilter(isDark, 0.6), transform: `translateY(${heroOffset}px)` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,8,7,0.3) 0%, rgba(10,8,7,0.82) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: isMobile ? '0 24px 36px' : '0 80px 56px', maxWidth: 1300, margin: '0 auto', left: 0, right: 0 }}>
          <div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.32em', color: DC.ivory, backgroundColor: isEvent ? BRAND_CRIMSON : `${BRAND_CRIMSON}CC`, padding: '5px 12px', display: 'inline-block', marginBottom: 16, width: 'fit-content' }}>{item.category.toUpperCase()}</div>
          <div style={{ fontFamily: CINZEL, fontSize: isMobile ? 'clamp(20px,6vw,30px)' : 'clamp(24px,2.8vw,42px)', color: DC.ivory, lineHeight: 1.2, letterSpacing: '0.08em', marginBottom: 16 }}>{item.title}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'center' }}>
            {isEvent && item.eventStart && (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: CINZEL, fontSize: 22, color: DC.gold }}>{fmtDay(item.eventStart)}</span>
                <span style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.2em', color: DC.champagne }}>{fmtMonth3(item.eventStart)} {fmtYear(item.eventStart)}</span>
              </div>
            )}
            {!isEvent && item.publishedAt && <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.2em', color: DC.sand }}>{fmtDate(item.publishedAt)}</div>}
            {item.locationName && <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.18em', color: DC.brass }}>{item.locationName.toUpperCase()}</div>}
            {evSt && <div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.22em', color: evSt === 'PAST EVENT' ? DC.sand : DC.champagne, backgroundColor: evSt === 'TODAY' ? DC.gold : 'transparent', border: `1px solid ${evSt === 'TODAY' ? DC.gold : DC.brass}44`, padding: '4px 10px' }}>{evSt}</div>}
          </div>
        </div>
      </div>

      {/* Article body */}
      <div style={{ backgroundColor: C.imperialBlack }}>
        <div style={{ maxWidth: 780, margin: '0 auto', padding: isMobile ? '48px 24px' : '72px 40px' }}>
          {/* Event metadata block */}
          {isEvent && (
            <div style={{ backgroundColor: isDark ? '#0D0C0A' : '#EBE2D0', border: `1px solid ${C.brass}28`, padding: '28px 32px', marginBottom: 48, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
              {item.eventStart && <div><div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.3em', color: C.gold, marginBottom: 6 }}>DATE</div><div style={{ fontFamily: CINZEL, fontSize: 13, color: C.ivory }}>{fmtDate(item.eventStart)}{item.eventEnd ? ` – ${fmtDate(item.eventEnd)}` : ''}</div></div>}
              {item.venue && <div><div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.3em', color: C.gold, marginBottom: 6 }}>VENUE</div><div style={{ fontFamily: CINZEL, fontSize: 13, color: C.ivory }}>{item.venue}</div></div>}
              {item.locationName && <div><div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.3em', color: C.gold, marginBottom: 6 }}>LOCATION</div><div style={{ fontFamily: CINZEL, fontSize: 13, color: C.ivory }}>{item.locationName}</div>{item.mapUrl && <a href={item.mapUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.2em', color: C.gold, textDecoration: 'none' }}>VIEW ON MAP →</a>}</div>}
              {item.registrationUrl && (
                <div style={{ gridColumn: isMobile ? '1' : '1 / -1', paddingTop: 8 }}>
                  <a href={item.registrationUrl} style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.25em', color: DC.ivory, backgroundColor: BRAND_CRIMSON, border: 'none', cursor: 'pointer', padding: '12px 28px', textDecoration: 'none', display: 'inline-block', transition: `background 0.3s ${EASE}` }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = BRAND_CRIMSON_LIGHT)}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND_CRIMSON)}
                  >REGISTER FOR EVENT →</a>
                </div>
              )}
            </div>
          )}

          {/* Content paragraphs */}
          {paragraphs.map((p, i) => {
            if (p.startsWith('- ')) {
              const items = p.split('\n').filter(l => l.startsWith('- ')).map(l => l.slice(2))
              return (
                <ul key={i} style={{ listStyle: 'none', padding: 0, marginBottom: 28 }}>
                  {items.map((li, j) => (
                    <li key={j} style={{ fontFamily: CORMORANT, fontSize: isMobile ? 16 : 19, color: C.sand, lineHeight: 1.8, marginBottom: 6, paddingLeft: 20, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: C.gold }}>·</span>{li}
                    </li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={i} style={{ fontFamily: CORMORANT, fontSize: isMobile ? 17 : 20, color: C.ivory, lineHeight: 1.85, marginBottom: 28, fontStyle: i === 0 ? 'italic' : 'normal' }}>{p}</p>
            )
          })}

          {/* Video embed */}
          {item.videoUrl && videoEmbed(item.videoUrl) && (
            <div style={{ marginBottom: 40, position: 'relative', aspectRatio: '16/9' }}>
              <iframe src={videoEmbed(item.videoUrl)!} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} allowFullScreen title={item.title} />
            </div>
          )}

          {/* Tags */}
          {item.tags.length > 0 && (
            <div style={{ marginTop: 40, paddingTop: 28, borderTop: `1px solid ${C.brass}28` }}>
              <div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.32em', color: C.brass, marginBottom: 14 }}>TAGS</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {item.tags.map(tag => (
                  <span key={tag} style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.18em', color: C.sand, border: `1px solid ${C.brass}44`, padding: '5px 12px' }}>{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div style={{ marginTop: 40, paddingTop: 28, borderTop: `1px solid ${C.brass}28` }}>
            <div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.32em', color: C.brass, marginBottom: 14 }}>SHARE</div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {[
                { label: 'WHATSAPP', url: `https://wa.me/?text=${encodeURIComponent(item.title + ' ' + window.location.href)}` },
                { label: 'LINKEDIN', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
                { label: 'FACEBOOK', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` },
              ].map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.22em', color: C.sand, textDecoration: 'none', border: `1px solid ${C.brass}44`, padding: '8px 16px', transition: `border-color 0.3s, color 0.3s` }}
                  onMouseEnter={e => { e.currentTarget.style.color = C.ivory; e.currentTarget.style.borderColor = `${C.gold}77` }}
                  onMouseLeave={e => { e.currentTarget.style.color = C.sand; e.currentTarget.style.borderColor = `${C.brass}44` }}
                >{s.label}</a>
              ))}
              <button onClick={copyLink} style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.22em', color: C.sand, background: 'none', border: `1px solid ${C.brass}44`, cursor: 'pointer', padding: '8px 16px', transition: `border-color 0.3s, color 0.3s` }}
                onMouseEnter={e => { e.currentTarget.style.color = C.ivory; e.currentTarget.style.borderColor = `${C.gold}77` }}
                onMouseLeave={e => { e.currentTarget.style.color = C.sand; e.currentTarget.style.borderColor = `${C.brass}44` }}
              >COPY LINK</button>
            </div>
          </div>
        </div>

        {/* Related Stories */}
        {related.length > 0 && (
          <div style={{ borderTop: `1px solid ${C.brass}28`, padding: isMobile ? '48px 20px' : '64px 80px' }}>
            <div style={{ maxWidth: 1300, margin: '0 auto' }}>
              <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.4em', color: C.gold, marginBottom: 36 }}>MORE FROM THE PALACE</div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${Math.min(related.length, 3)}, 1fr)`, gap: isMobile ? 24 : 28 }}>
                {related.map(it => (
                  <NewsCard key={it.id} item={it} onSelect={() => { onNavigate('news-detail', it.id); window.scrollTo({ top: 0, behavior: 'smooth' }) }} C={C} isDark={isDark} isMobile={isMobile} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// ADMIN DASHBOARD
// ═════════════════════════════════════════════════════════════════════════════
const ADMIN_PASSWORD = 'palace2026'

type AdminView = 'dashboard' | 'content' | 'create-news' | 'create-event' | 'edit'

function AdminLoginPage({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  const submit = () => {
    if (pw === ADMIN_PASSWORD) { sessionStorage.setItem('hurrem_admin', '1'); onLogin() }
    else { setErr(true); setTimeout(() => setErr(false), 2000) }
  }
  return (
    <div style={{ minHeight: '100vh', backgroundColor: DC.imperialBlack, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <div style={{ fontFamily: CINZEL, fontSize: 13, letterSpacing: '0.4em', color: DC.gold, marginBottom: 8 }}>HURREM PALACE</div>
        <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.32em', color: DC.brass, marginBottom: 48 }}>ADMIN PORTAL</div>
        <div style={{ width: 40, height: 40, border: `1px solid ${DC.gold}44`, borderRadius: '50%', margin: '0 auto 32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: DC.gold, fontSize: 16 }}>⊕</span>
        </div>
        <input
          type="password" value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="ENTER PASSWORD"
          style={{ width: '100%', fontFamily: JOST, fontSize: 11, letterSpacing: '0.18em', background: '#0D0C0A', border: `1px solid ${err ? '#8B1020' : `${DC.brass}55`}`, outline: 'none', color: DC.ivory, padding: '14px 18px', marginBottom: 16, textAlign: 'center', transition: 'border-color 0.3s', boxSizing: 'border-box' }}
        />
        {err && <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.18em', color: '#8B1020', marginBottom: 12 }}>INCORRECT PASSWORD</div>}
        <button onClick={submit} style={{ width: '100%', fontFamily: JOST, fontSize: 10, letterSpacing: '0.3em', color: DC.imperialBlack, backgroundColor: DC.gold, border: 'none', cursor: 'pointer', padding: '14px', transition: `background 0.3s ${EASE}` }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = DC.champagne)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = DC.gold)}
        >SIGN IN</button>
      </div>
    </div>
  )
}

const emptyNews = (): ContentItem => ({
  id: genId(), type: 'news', title: '', slug: '', excerpt: '', content: '',
  category: 'News', status: 'draft', featured: false, homepageFeatured: false,
  publishedAt: null, scheduledAt: null, locationName: '', locationAddress: '', mapUrl: '',
  coverImage: '', videoUrl: '', author: '', tags: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
})
const emptyEvent = (): ContentItem => ({
  ...emptyNews(), type: 'event', category: 'Event',
  eventStart: '', eventEnd: '', venue: '', registrationUrl: '',
})

function AdminContentEditor({ item: initItem, onSave, onCancel }: { item: ContentItem; onSave: (item: ContentItem) => Promise<void>; onCancel: () => void }) {
  const { uploadImage } = useCMS()
  const [form, setForm] = useState<ContentItem>({ ...initItem })
  const [tagInput, setTagInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadErr, setUploadErr] = useState('')
  const set = (k: keyof ContentItem, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = async (status?: ContentStatus) => {
    setSaving(true)
    const updated = { ...form, status: status || form.status, slug: form.slug || toSlug(form.title), publishedAt: (status === 'published' && !form.publishedAt) ? new Date().toISOString() : form.publishedAt }
    try { await onSave(updated); setSaved(true); setTimeout(() => setSaved(false), 2500) }
    finally { setSaving(false) }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true); setUploadErr('')
    try { const url = await uploadImage(file); set('coverImage', url) }
    catch { setUploadErr('Upload failed. Check file size (max 10 MB) and try again.') }
    finally { setUploading(false) }
  }

  const addTag = () => {
    if (!tagInput.trim() || form.tags.includes(tagInput.trim())) return
    setForm(f => ({ ...f, tags: [...f.tags, tagInput.trim()] })); setTagInput('')
  }
  const removeTag = (t: string) => setForm(f => ({ ...f, tags: f.tags.filter(x => x !== t) }))

  const labelStyle: React.CSSProperties = { fontFamily: JOST, fontSize: 9, letterSpacing: '0.28em', color: DC.brass, marginBottom: 6, display: 'block' }
  const inputStyle: React.CSSProperties = { width: '100%', fontFamily: JOST, fontSize: 12, background: '#111009', border: `1px solid ${DC.brass}44`, outline: 'none', color: DC.ivory, padding: '10px 14px', marginBottom: 20, boxSizing: 'border-box' as const }
  const areaStyle: React.CSSProperties = { ...inputStyle, minHeight: 120, resize: 'vertical' as const, fontFamily: CORMORANT, fontSize: 14, lineHeight: 1.7 }

  return (
    <div style={{ maxWidth: 860, padding: '0 0 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36, paddingBottom: 20, borderBottom: `1px solid ${DC.brass}28` }}>
        <div style={{ fontFamily: CINZEL, fontSize: 14, letterSpacing: '0.2em', color: DC.ivory }}>{initItem.title ? 'EDIT' : 'CREATE'} {form.type.toUpperCase()}</div>
        <button onClick={onCancel} style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.2em', color: DC.sand, background: 'none', border: 'none', cursor: 'pointer' }}>✕ CANCEL</button>
      </div>

      <label style={labelStyle}>TITLE</label>
      <input value={form.title} onChange={e => { set('title', e.target.value); if (!initItem.title) set('slug', toSlug(e.target.value)) }} style={inputStyle} placeholder="Enter title…" />

      <label style={labelStyle}>SLUG</label>
      <input value={form.slug} onChange={e => set('slug', e.target.value)} style={inputStyle} placeholder="auto-generated-from-title" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <label style={labelStyle}>CATEGORY</label>
          <select value={form.category} onChange={e => set('category', e.target.value)} style={{ ...inputStyle, marginBottom: 20, cursor: 'pointer' }}>
            {NEWS_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>AUTHOR</label>
          <input value={form.author} onChange={e => set('author', e.target.value)} style={inputStyle} placeholder="Author name…" />
        </div>
      </div>

      <label style={labelStyle}>SHORT EXCERPT</label>
      <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)} style={{ ...areaStyle, minHeight: 80 }} placeholder="1-2 sentence summary…" />

      <label style={labelStyle}>COVER IMAGE</label>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
          <label style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.22em', color: uploading ? DC.brass : DC.champagne, backgroundColor: `${DC.gold}22`, border: `1px solid ${DC.gold}55`, padding: '9px 18px', cursor: uploading ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', transition: 'all 0.3s' }}>
            {uploading ? 'UPLOADING…' : '⬆ UPLOAD IMAGE'}
            <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={handleFileUpload} disabled={uploading} style={{ display: 'none' }} />
          </label>
          <span style={{ fontFamily: JOST, fontSize: 9, color: DC.brass }}>or paste URL below</span>
        </div>
        {uploadErr && <div style={{ fontFamily: JOST, fontSize: 10, color: '#E05050', marginBottom: 8 }}>{uploadErr}</div>}
        <input value={form.coverImage} onChange={e => set('coverImage', e.target.value)} style={{ ...inputStyle, marginBottom: 0 }} placeholder="https://… (auto-filled after upload)" />
      </div>
      {form.coverImage && <div style={{ position: 'relative', aspectRatio: '16/9', marginBottom: 20, overflow: 'hidden', maxWidth: 340 }}><div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${form.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} /></div>}

      <label style={labelStyle}>CONTENT</label>
      <textarea value={form.content} onChange={e => set('content', e.target.value)} style={{ ...areaStyle, minHeight: 260 }} placeholder="Full article content. Separate paragraphs with blank lines. Use '- ' to start bullet list items." />

      <label style={labelStyle}>VIDEO URL (YouTube or Vimeo)</label>
      <input value={form.videoUrl} onChange={e => set('videoUrl', e.target.value)} style={inputStyle} placeholder="https://youtube.com/watch?v=…" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <label style={labelStyle}>LOCATION NAME</label>
          <input value={form.locationName} onChange={e => set('locationName', e.target.value)} style={inputStyle} placeholder="City or place…" />
        </div>
        <div>
          <label style={labelStyle}>LOCATION ADDRESS</label>
          <input value={form.locationAddress} onChange={e => set('locationAddress', e.target.value)} style={inputStyle} placeholder="Full address…" />
        </div>
      </div>

      {form.type === 'event' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={labelStyle}>EVENT START</label>
              <input type="datetime-local" value={form.eventStart?.slice(0, 16) || ''} onChange={e => set('eventStart', e.target.value ? new Date(e.target.value).toISOString() : '')} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>EVENT END</label>
              <input type="datetime-local" value={form.eventEnd?.slice(0, 16) || ''} onChange={e => set('eventEnd', e.target.value ? new Date(e.target.value).toISOString() : '')} style={inputStyle} />
            </div>
          </div>
          <label style={labelStyle}>VENUE</label>
          <input value={form.venue || ''} onChange={e => set('venue', e.target.value)} style={inputStyle} placeholder="Venue name…" />
          <label style={labelStyle}>REGISTRATION URL</label>
          <input value={form.registrationUrl || ''} onChange={e => set('registrationUrl', e.target.value)} style={inputStyle} placeholder="https://… (leave blank for no registration button)" />
        </>
      )}

      {/* Tags */}
      <label style={labelStyle}>TAGS</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        {form.tags.map(t => (
          <span key={t} style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.15em', color: DC.sand, border: `1px solid ${DC.brass}55`, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
            {t}
            <button onClick={() => removeTag(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: DC.brass, fontSize: 11, padding: 0, lineHeight: 1 }}>×</button>
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} style={{ ...inputStyle, flex: 1, marginBottom: 0 }} placeholder="Add a tag…" />
        <button onClick={addTag} style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.18em', color: DC.ivory, backgroundColor: `${DC.gold}33`, border: `1px solid ${DC.gold}44`, cursor: 'pointer', padding: '0 18px', whiteSpace: 'nowrap' }}>ADD</button>
      </div>

      {/* Feature flags */}
      <div style={{ display: 'flex', gap: 28, marginBottom: 28, flexWrap: 'wrap' }}>
        {([['featured', 'FEATURED IN NEWS & EVENTS'], ['homepageFeatured', 'FEATURED ON HOMEPAGE']] as [keyof ContentItem, string][]).map(([k, label]) => (
          <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: JOST, fontSize: 10, letterSpacing: '0.18em', color: DC.sand }}>
            <input type="checkbox" checked={!!form[k]} onChange={e => set(k, e.target.checked)} style={{ accentColor: DC.gold, width: 14, height: 14 }} />
            {label}
          </label>
        ))}
      </div>

      {/* Schedule */}
      <div style={{ marginBottom: 28, padding: '20px 24px', backgroundColor: '#0D0C0A', border: `1px solid ${DC.brass}28` }}>
        <label style={{ ...labelStyle, marginBottom: 14 }}>PUBLICATION</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(['draft', 'published', 'scheduled'] as ContentStatus[]).map(s => (
            <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: JOST, fontSize: 10, letterSpacing: '0.16em', color: form.status === s ? DC.champagne : DC.sand }}>
              <input type="radio" name="status" checked={form.status === s} onChange={() => set('status', s)} style={{ accentColor: DC.gold }} />
              {s.toUpperCase()}{s === 'draft' ? ' — Not visible to public' : s === 'published' ? ' — Live immediately' : ' — Publish at date/time below'}
            </label>
          ))}
        </div>
        {form.status === 'scheduled' && (
          <input type="datetime-local" value={form.scheduledAt?.slice(0, 16) || ''} onChange={e => set('scheduledAt', e.target.value ? new Date(e.target.value).toISOString() : '')} style={{ ...inputStyle, marginTop: 14, marginBottom: 0 }} />
        )}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={() => handleSave('draft')} disabled={saving} style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.22em', color: DC.sand, background: 'none', border: `1px solid ${DC.brass}55`, cursor: saving ? 'not-allowed' : 'pointer', padding: '12px 22px', transition: 'all 0.3s', opacity: saving ? 0.5 : 1 }}
          onMouseEnter={e => !saving && (e.currentTarget.style.color = DC.ivory, e.currentTarget.style.borderColor = DC.brass)}
          onMouseLeave={e => (e.currentTarget.style.color = DC.sand, e.currentTarget.style.borderColor = `${DC.brass}55`)}
        >SAVE DRAFT</button>
        <button onClick={() => handleSave('published')} disabled={saving} style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.22em', color: DC.imperialBlack, backgroundColor: DC.gold, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', padding: '12px 28px', transition: `background 0.3s`, opacity: saving ? 0.6 : 1 }}
          onMouseEnter={e => !saving && (e.currentTarget.style.backgroundColor = DC.champagne)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = DC.gold)}
        >{saving ? 'SAVING…' : 'PUBLISH'}</button>
        {saved && <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.2em', color: DC.gold, animation: 'fadeIn 0.3s' }}>✓ SAVED TO SUPABASE</div>}
      </div>
    </div>
  )
}

function AdminContentTable({ items, onEdit, onDelete, onNavigate }: { items: ContentItem[]; onEdit: (item: ContentItem) => void; onDelete: (id: string) => void; onNavigate: (view: AdminView, item?: ContentItem) => void }) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<ContentStatus | 'all'>('all')
  const [filterType, setFilterType] = useState<ContentType | 'all'>('all')
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const visible = items.filter(it => {
    if (filterStatus !== 'all' && it.status !== filterStatus) return false
    if (filterType !== 'all' && it.type !== filterType) return false
    if (search) { const q = search.toLowerCase(); return it.title.toLowerCase().includes(q) || it.category.toLowerCase().includes(q) }
    return true
  })

  const statusColor = (s: ContentStatus) => ({ draft: DC.brass, published: '#4A8A4A', scheduled: DC.gold, archived: DC.sand }[s])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div style={{ fontFamily: CINZEL, fontSize: 14, letterSpacing: '0.2em', color: DC.ivory }}>CONTENT</div>
        <button onClick={() => onNavigate('create-news')} style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.28em', color: DC.imperialBlack, backgroundColor: DC.gold, border: 'none', cursor: 'pointer', padding: '11px 22px' }}>+ CREATE NEW</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…" style={{ fontFamily: JOST, fontSize: 11, letterSpacing: '0.12em', background: '#111009', border: `1px solid ${DC.brass}44`, outline: 'none', color: DC.ivory, padding: '9px 14px', flex: '1 1 180px' }} />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as ContentStatus | 'all')} style={{ fontFamily: JOST, fontSize: 11, background: '#111009', border: `1px solid ${DC.brass}44`, outline: 'none', color: DC.sand, padding: '9px 14px', cursor: 'pointer' }}>
          <option value="all">All Status</option>
          {(['draft', 'published', 'scheduled', 'archived'] as ContentStatus[]).map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <select value={filterType} onChange={e => setFilterType(e.target.value as ContentType | 'all')} style={{ fontFamily: JOST, fontSize: 11, background: '#111009', border: `1px solid ${DC.brass}44`, outline: 'none', color: DC.sand, padding: '9px 14px', cursor: 'pointer' }}>
          <option value="all">All Types</option>
          <option value="news">News</option>
          <option value="event">Events</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${DC.brass}44` }}>
              {['TITLE', 'TYPE', 'CATEGORY', 'DATE', 'STATUS', 'ACTIONS'].map(h => (
                <th key={h} style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.3em', color: DC.brass, padding: '10px 14px', textAlign: 'left', fontWeight: 400, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr><td colSpan={6} style={{ fontFamily: JOST, fontSize: 12, color: DC.brass, padding: '40px 14px', textAlign: 'center' }}>No content found</td></tr>
            )}
            {visible.map(it => (
              <tr key={it.id} style={{ borderBottom: `1px solid ${DC.brass}18`, transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0F0D0B')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <td style={{ padding: '13px 14px', maxWidth: 280 }}>
                  <div style={{ fontFamily: CINZEL, fontSize: 12, color: DC.ivory, letterSpacing: '0.06em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.title || '(Untitled)'}</div>
                  {it.excerpt && <div style={{ fontFamily: JOST, fontSize: 10, color: DC.brass, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.excerpt.slice(0, 60)}…</div>}
                </td>
                <td style={{ padding: '13px 14px', fontFamily: JOST, fontSize: 9, letterSpacing: '0.2em', color: it.type === 'event' ? DC.champagne : DC.sand, whiteSpace: 'nowrap' }}>{it.type.toUpperCase()}</td>
                <td style={{ padding: '13px 14px', fontFamily: JOST, fontSize: 10, color: DC.sand, whiteSpace: 'nowrap' }}>{it.category}</td>
                <td style={{ padding: '13px 14px', fontFamily: JOST, fontSize: 9, color: DC.brass, whiteSpace: 'nowrap' }}>{it.publishedAt ? fmtDateShort(it.publishedAt) : it.scheduledAt ? `⏱ ${fmtDateShort(it.scheduledAt)}` : fmtDateShort(it.createdAt)}</td>
                <td style={{ padding: '13px 14px', whiteSpace: 'nowrap' }}>
                  <span style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.18em', color: statusColor(it.status), border: `1px solid ${statusColor(it.status)}66`, padding: '3px 10px' }}>{it.status.toUpperCase()}</span>
                </td>
                <td style={{ padding: '13px 14px', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => onEdit(it)} style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.15em', color: DC.gold, background: 'none', border: `1px solid ${DC.gold}44`, cursor: 'pointer', padding: '5px 12px', transition: 'all 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = `${DC.gold}22`)}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >EDIT</button>
                    {confirmDelete === it.id ? (
                      <button onClick={() => { onDelete(it.id); setConfirmDelete(null) }} style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.12em', color: '#E05050', background: 'none', border: '1px solid #E0505066', cursor: 'pointer', padding: '5px 12px' }}>CONFIRM</button>
                    ) : (
                      <button onClick={() => setConfirmDelete(it.id)} style={{ fontFamily: JOST, fontSize: 9, color: DC.brass, background: 'none', border: 'none', cursor: 'pointer', padding: '5px 6px' }}>✕</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AdminDashboard({ items }: { items: ContentItem[] }) {
  const published = items.filter(i => i.status === 'published').length
  const drafts    = items.filter(i => i.status === 'draft').length
  const scheduled = items.filter(i => i.status === 'scheduled').length
  const upcoming  = items.filter(i => i.type === 'event' && eventStatus(i) === 'UPCOMING').length

  const stats = [
    { label: 'Published', value: published, color: '#4A8A4A' },
    { label: 'Drafts',    value: drafts,    color: DC.brass },
    { label: 'Scheduled', value: scheduled, color: DC.gold },
    { label: 'Upcoming Events', value: upcoming, color: DC.champagne },
  ]

  const recent = [...items].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5)

  return (
    <div>
      <div style={{ fontFamily: CINZEL, fontSize: 14, letterSpacing: '0.2em', color: DC.ivory, marginBottom: 36 }}>DASHBOARD</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 48 }}>
        {stats.map(s => (
          <div key={s.label} style={{ backgroundColor: '#0D0C0A', border: `1px solid ${DC.brass}28`, padding: '24px 28px' }}>
            <div style={{ fontFamily: CINZEL, fontSize: 36, color: s.color, lineHeight: 1, marginBottom: 8 }}>{String(s.value).padStart(2, '0')}</div>
            <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.25em', color: DC.brass }}>{s.label.toUpperCase()}</div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: JOST, fontSize: 9, letterSpacing: '0.35em', color: DC.gold, marginBottom: 20 }}>RECENT ACTIVITY</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {recent.map(it => (
          <div key={it.id} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${DC.brass}18` }}>
            <span style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.18em', color: it.status === 'published' ? '#4A8A4A' : DC.brass, border: `1px solid currentColor`, padding: '2px 8px', whiteSpace: 'nowrap' }}>{it.status.toUpperCase()}</span>
            <span style={{ fontFamily: CINZEL, fontSize: 12, color: DC.ivory, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.title || '(Untitled)'}</span>
            <span style={{ fontFamily: JOST, fontSize: 9, color: DC.brass, whiteSpace: 'nowrap' }}>{fmtDateShort(it.updatedAt)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdminPage({ onBack }: { onBack: () => void }) {
  const { items, createItem, updateItem, deleteItem } = useCMS()
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('hurrem_admin') === '1')
  const [view, setView] = useState<AdminView>('dashboard')
  const [editItem, setEditItem] = useState<ContentItem | null>(null)
  const isMobile = useWindowWidth() < 900

  if (!authed) return <AdminLoginPage onLogin={() => setAuthed(true)} />

  const handleSave = async (item: ContentItem) => {
    if (items.find(i => i.id === item.id)) await updateItem(item)
    else await createItem(item)
    setView('content')
    setEditItem(null)
  }

  const navItems: { label: string; view: AdminView }[] = [
    { label: 'Dashboard',   view: 'dashboard' },
    { label: 'All Content', view: 'content' },
    { label: '+ News',      view: 'create-news' },
    { label: '+ Event',     view: 'create-event' },
  ]

  const renderView = () => {
    if (view === 'edit' && editItem) return <AdminContentEditor item={editItem} onSave={handleSave} onCancel={() => { setView('content'); setEditItem(null) }} />
    if (view === 'create-news') return <AdminContentEditor item={emptyNews()} onSave={handleSave} onCancel={() => setView('content')} />
    if (view === 'create-event') return <AdminContentEditor item={emptyEvent()} onSave={handleSave} onCancel={() => setView('content')} />
    if (view === 'content') return <AdminContentTable items={items} onEdit={item => { setEditItem(item); setView('edit') }} onDelete={deleteItem} onNavigate={(v, item) => { setView(v); if (item) setEditItem(item) }} />
    return <AdminDashboard items={items} />
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: DC.imperialBlack, display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
      {/* Sidebar */}
      <div style={{ width: isMobile ? '100%' : 220, flexShrink: 0, backgroundColor: '#080706', borderRight: isMobile ? 'none' : `1px solid ${DC.brass}28`, borderBottom: isMobile ? `1px solid ${DC.brass}28` : 'none', padding: isMobile ? '16px 20px' : '40px 0' }}>
        <div style={{ padding: isMobile ? '0' : '0 28px 36px', display: isMobile ? 'flex' : 'block', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontFamily: CINZEL, fontSize: 10, letterSpacing: '0.35em', color: DC.gold }}>HURREM PALACE</div>
            <div style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.25em', color: DC.brass }}>ADMIN PORTAL</div>
          </div>
          <button onClick={onBack} style={{ fontFamily: JOST, fontSize: 8, letterSpacing: '0.2em', color: DC.sand, background: 'none', border: `1px solid ${DC.brass}44`, cursor: 'pointer', padding: '6px 12px', whiteSpace: 'nowrap' }}>← SITE</button>
        </div>
        <nav style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', flexWrap: 'wrap', gap: isMobile ? 4 : 0, padding: isMobile ? '4px 0 0' : 0 }}>
          {navItems.map(n => (
            <button key={n.view} onClick={() => { setView(n.view); setEditItem(null) }} style={{
              fontFamily: JOST, fontSize: 10, letterSpacing: '0.18em', background: 'none', border: 'none', cursor: 'pointer',
              padding: isMobile ? '8px 14px' : '13px 28px', textAlign: 'left',
              color: view === n.view ? DC.ivory : DC.sand,
              backgroundColor: view === n.view ? `${DC.gold}18` : 'transparent',
              borderLeft: !isMobile && view === n.view ? `2px solid ${DC.gold}` : '2px solid transparent',
              transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => view !== n.view && (e.currentTarget.style.color = DC.ivory)}
              onMouseLeave={e => view !== n.view && (e.currentTarget.style.color = DC.sand)}
            >{n.label}</button>
          ))}
          <button onClick={() => { sessionStorage.removeItem('hurrem_admin'); setAuthed(false) }} style={{ fontFamily: JOST, fontSize: 10, letterSpacing: '0.18em', background: 'none', border: 'none', cursor: 'pointer', padding: isMobile ? '8px 14px' : '13px 28px', textAlign: 'left', color: DC.brass, marginTop: isMobile ? 0 : 'auto', whiteSpace: 'nowrap' }}>Sign Out</button>
        </nav>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: isMobile ? '28px 20px' : '48px 48px', overflowX: 'auto' }}>
        {renderView()}
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// HOME + APP
// ═════════════════════════════════════════════════════════════════════════════
function HomePage({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  return (
    <>
      <HeroSection />
      <CoastSection />
      <StorySection onNavigate={onNavigate} />
      <ArchitectureSection />
      <FacilityGrid />
      <InvestmentSection onNavigate={onNavigate} />
      <HomepageNewsSection onNavigate={onNavigate} />
      <ContactSection />
      <MapSection />
    </>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [currentPage, setCurrentPage] = useState<string | null>(null)
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null)
  const handleComplete = useCallback(() => setLoaded(true), [])
  const C = isDark ? DC : LC
  const toggle = useCallback(() => setIsDark(d => !d), [])

  const handleNavigate = useCallback((page: string | null, articleId?: string) => {
    setCurrentPage(page)
    if (articleId) setSelectedArticleId(articleId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const showFooter = currentPage === null || currentPage === 'news'

  const renderPage = () => {
    switch (currentPage) {
      case 'story':        return <OurStoryPage onBack={() => handleNavigate(null)} onNavigate={handleNavigate} />
      case 'location':     return <LocationPage onBack={() => handleNavigate(null)} onNavigate={handleNavigate} />
      case 'company':      return <CompanyPage onBack={() => handleNavigate(null)} />
      case 'investment':   return <InvestmentPage onBack={() => handleNavigate(null)} />
      case 'architecture': return <ArchitecturePage onBack={() => handleNavigate(null)} />
      case 'news':         return <NewsEventsPage onBack={() => handleNavigate(null)} onNavigate={handleNavigate} />
      case 'news-detail':  return <ArticleDetailPage itemId={selectedArticleId || ''} onBack={() => handleNavigate('news')} onNavigate={handleNavigate} />
      case 'admin':        return <AdminPage onBack={() => handleNavigate(null)} />
      default:             return <HomePage onNavigate={handleNavigate} />
    }
  }

  return (
    <CMSProvider>
      <ThemeCtx.Provider value={{ isDark, toggle, C }}>
        <style>{KEYFRAMES}</style>
        {!loaded && <LoadingScreen onComplete={handleComplete} />}
        <div style={{ opacity: loaded ? 1 : 0, transition: `opacity 1s ${EASE}`, backgroundColor: C.imperialBlack }}>
          {currentPage !== 'admin' && <Navigation onNavigate={handleNavigate} />}
          {renderPage()}
          {showFooter && <Footer onNavigate={handleNavigate} />}
          {currentPage !== 'admin' && <ThemeToggle />}
        </div>
      </ThemeCtx.Provider>
    </CMSProvider>
  )
}
