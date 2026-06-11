'use client'

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const TShirt = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 8 L8 22 L20 27 L20 56 L44 56 L44 27 L56 22 L44 8 Q40 15 32 15 Q24 15 20 8Z" />
  </svg>
)
const ButtonShirt = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 8 L8 22 L20 27 L20 56 L44 56 L44 27 L56 22 L44 8 L38 20 L32 14 L26 20Z" />
    <line x1="32" y1="14" x2="32" y2="56" />
    <circle cx="32" cy="30" r="1.2" fill="currentColor" />
    <circle cx="32" cy="38" r="1.2" fill="currentColor" />
    <circle cx="32" cy="46" r="1.2" fill="currentColor" />
  </svg>
)
const Blouse = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 8 L8 22 L20 27 L20 56 L44 56 L44 27 L56 22 L42 8 Q38 16 32 16 Q26 16 22 8Z" />
    <path d="M20 27 Q32 34 44 27" />
  </svg>
)
const Sweater = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10 L8 22 L20 27 L20 56 L44 56 L44 27 L56 22 L44 10 Q40 15 32 15 Q24 15 20 10Z" />
    <line x1="20" y1="38" x2="44" y2="38" />
    <line x1="20" y1="44" x2="44" y2="44" />
    <line x1="20" y1="50" x2="44" y2="50" />
  </svg>
)
const Hoodie = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 8 L8 22 L20 27 L20 56 L44 56 L44 27 L56 22 L44 8 Q40 18 32 18 Q24 18 20 8Z" />
    <path d="M24 18 Q28 22 32 22 Q36 22 40 18" />
    <path d="M26 56 L26 46 Q32 42 38 46 L38 56" />
  </svg>
)
const TankTop = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 8 Q22 6 26 6 L26 8 Q26 16 32 16 Q38 16 38 8 L38 6 Q42 6 42 8 L44 56 L20 56Z" />
  </svg>
)
const Jeans = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 10 L14 30 L50 30 L50 10Z" />
    <path d="M14 30 L20 56 L32 44 L44 56 L50 30" />
    <line x1="14" y1="16" x2="50" y2="16" />
  </svg>
)
const Trousers = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 8 L14 28 L50 28 L50 8Z" />
    <path d="M14 28 L18 58 L32 46 L46 58 L50 28" />
  </svg>
)
const Skirt = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16" y1="14" x2="48" y2="14" />
    <rect x="16" y="14" width="32" height="8" rx="2" />
    <path d="M16 22 L10 58 L54 58 L48 22Z" />
  </svg>
)
const Shorts = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 10 L12 30 L52 30 L52 10Z" />
    <path d="M12 30 L20 50 L32 40 L44 50 L52 30" />
    <line x1="12" y1="18" x2="52" y2="18" />
  </svg>
)
const Leggings = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8 L18 30 L46 30 L46 8Z" />
    <path d="M18 30 L20 60 L32 50 L44 60 L46 30" />
  </svg>
)
const MiniDress = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M26 8 Q29 16 32 16 Q35 16 38 8 L46 26 L40 26 L42 48 L22 48 L24 26 L18 26Z" />
  </svg>
)
const MidiDress = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M26 8 Q29 16 32 16 Q35 16 38 8 L46 26 L40 26 L44 58 L20 58 L24 26 L18 26Z" />
  </svg>
)
const MaxiDress = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M26 8 Q29 16 32 16 Q35 16 38 8 L48 26 L40 26 L46 62 L18 62 L24 26 L16 26Z" />
  </svg>
)
const Blazer = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 8 L8 22 L20 27 L20 56 L44 56 L44 27 L56 22 L44 8 L38 22 L32 16 L26 22Z" />
    <line x1="32" y1="16" x2="32" y2="56" />
    <circle cx="32" cy="36" r="1.5" fill="currentColor" />
    <circle cx="32" cy="44" r="1.5" fill="currentColor" />
  </svg>
)
const Jacket = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 8 L8 22 L20 27 L20 56 L44 56 L44 27 L56 22 L44 8 Q40 16 32 16 Q24 16 20 8Z" />
    <path d="M20 27 L26 20" />
    <path d="M44 27 L38 20" />
    <line x1="26" y1="56" x2="26" y2="44" />
    <line x1="26" y1="44" x2="38" y2="44" />
    <line x1="38" y1="44" x2="38" y2="56" />
  </svg>
)
const Coat = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 8 L8 22 L20 27 L18 62 L46 62 L44 27 L56 22 L44 8 L38 22 L32 16 L26 22Z" />
    <line x1="32" y1="16" x2="32" y2="62" />
    <circle cx="32" cy="34" r="1.5" fill="currentColor" />
    <circle cx="32" cy="42" r="1.5" fill="currentColor" />
    <circle cx="32" cy="50" r="1.5" fill="currentColor" />
  </svg>
)
const Cardigan = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 8 L8 22 L20 27 L20 56 L44 56 L44 27 L56 22 L44 8 Q40 14 32 14 Q24 14 20 8Z" />
    <path d="M26 14 L26 56" />
    <path d="M38 14 L38 56" />
  </svg>
)
const Sneakers = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 44 Q10 30 30 34 L54 36 Q60 40 56 48 L10 48 Q4 47 6 44Z" />
    <path d="M16 34 L16 44" />
    <path d="M23 33 L23 44" />
    <path d="M30 34 L30 44" />
    <path d="M10 44 L10 48" />
  </svg>
)
const Heels = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 52 Q14 30 38 26 L52 26 L54 38 L54 52 Z" />
    <line x1="10" y1="52" x2="20" y2="52" />
    <line x1="10" y1="52" x2="10" y2="60" />
  </svg>
)
const Boots = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 8 L22 44 Q22 54 34 54 L52 54 L54 46 L38 46 L38 8Z" />
  </svg>
)
const Loafers = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 44 Q10 32 32 32 L50 34 Q58 38 54 48 L10 48 Q4 48 8 44Z" />
    <path d="M28 32 Q32 26 36 32" />
  </svg>
)
const Sandals = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 48 L56 48 L56 52 L8 52Z" />
    <line x1="20" y1="36" x2="20" y2="48" />
    <line x1="32" y1="32" x2="32" y2="48" />
    <line x1="44" y1="36" x2="44" y2="48" />
    <path d="M14 36 Q32 30 50 36" />
  </svg>
)
const Handbag = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="12" y="28" width="40" height="28" rx="4" />
    <path d="M22 28 Q22 16 32 16 Q42 16 42 28" />
  </svg>
)
const Backpack = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="14" y="18" width="36" height="40" rx="6" />
    <path d="M22 18 Q22 10 32 10 Q42 10 42 18" />
    <rect x="22" y="30" width="20" height="14" rx="3" />
    <line x1="32" y1="58" x2="32" y2="52" />
  </svg>
)
const Scarf = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 8 Q16 20 28 34 Q44 22 28 34 Q14 46 28 58" />
    <path d="M24 54 L32 60 L32 54" />
  </svg>
)
const Belt = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="26" width="52" height="12" rx="3" />
    <rect x="26" y="28" width="12" height="8" rx="2" />
    <circle cx="32" cy="32" r="2" fill="currentColor" />
    <line x1="6" y1="32" x2="18" y2="32" />
  </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────
interface ClothingItem {
  id: string
  label: string
  icon: React.ReactNode
}

interface Category {
  name: string
  items: ClothingItem[]
}

const CATEGORIES: Category[] = [
  {
    name: 'Tops',
    items: [
      { id: 'T-Shirt',      label: 'T-Shirt',      icon: <TShirt /> },
      { id: 'Button Shirt', label: 'Shirt',         icon: <ButtonShirt /> },
      { id: 'Blouse',       label: 'Blouse',        icon: <Blouse /> },
      { id: 'Sweater',      label: 'Sweater',       icon: <Sweater /> },
      { id: 'Hoodie',       label: 'Hoodie',        icon: <Hoodie /> },
      { id: 'Tank Top',     label: 'Tank Top',      icon: <TankTop /> },
    ],
  },
  {
    name: 'Bottoms',
    items: [
      { id: 'Jeans',     label: 'Jeans',     icon: <Jeans /> },
      { id: 'Trousers',  label: 'Trousers',  icon: <Trousers /> },
      { id: 'Skirt',     label: 'Skirt',     icon: <Skirt /> },
      { id: 'Shorts',    label: 'Shorts',    icon: <Shorts /> },
      { id: 'Leggings',  label: 'Leggings',  icon: <Leggings /> },
    ],
  },
  {
    name: 'Dresses',
    items: [
      { id: 'Mini Dress', label: 'Mini',  icon: <MiniDress /> },
      { id: 'Midi Dress', label: 'Midi',  icon: <MidiDress /> },
      { id: 'Maxi Dress', label: 'Maxi',  icon: <MaxiDress /> },
    ],
  },
  {
    name: 'Outerwear',
    items: [
      { id: 'Blazer',    label: 'Blazer',    icon: <Blazer /> },
      { id: 'Jacket',    label: 'Jacket',    icon: <Jacket /> },
      { id: 'Coat',      label: 'Coat',      icon: <Coat /> },
      { id: 'Cardigan',  label: 'Cardigan',  icon: <Cardigan /> },
    ],
  },
  {
    name: 'Shoes',
    items: [
      { id: 'Sneakers', label: 'Sneakers', icon: <Sneakers /> },
      { id: 'Heels',    label: 'Heels',    icon: <Heels /> },
      { id: 'Boots',    label: 'Boots',    icon: <Boots /> },
      { id: 'Loafers',  label: 'Loafers',  icon: <Loafers /> },
      { id: 'Sandals',  label: 'Sandals',  icon: <Sandals /> },
    ],
  },
  {
    name: 'Accessories',
    items: [
      { id: 'Handbag',   label: 'Handbag',   icon: <Handbag /> },
      { id: 'Backpack',  label: 'Backpack',  icon: <Backpack /> },
      { id: 'Scarf',     label: 'Scarf',     icon: <Scarf /> },
      { id: 'Belt',      label: 'Belt',      icon: <Belt /> },
    ],
  },
]

// ─── Component ────────────────────────────────────────────────────────────────
interface Props {
  selected: string[]
  onChange: (items: string[]) => void
}

export default function ClothingPicker({ selected, onChange }: Props) {
  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter(s => s !== id)
        : [...selected, id],
    )
  }

  return (
    <div className="cp-wrap">
      {CATEGORIES.map(cat => (
        <div key={cat.name} className="cp-category">
          <div className="cp-cat-label">{cat.name}</div>
          <div className="cp-grid">
            {cat.items.map(item => (
              <button
                key={item.id}
                className={`cp-card${selected.includes(item.id) ? ' on' : ''}`}
                onClick={() => toggle(item.id)}
                aria-pressed={selected.includes(item.id)}
                title={item.id}
              >
                <span className="cp-icon">{item.icon}</span>
                <span className="cp-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
