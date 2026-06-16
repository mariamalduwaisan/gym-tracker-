'use client'

type Tab = 'dashboard' | 'workouts' | 'progress'

interface Props {
  active:       Tab
  onChange:     (tab: Tab) => void
  urgentCount?: number
}

const TABS: { id: Tab; emoji: string; label: string }[] = [
  { id: 'dashboard', emoji: '⌚', label: 'Watch'    },
  { id: 'workouts',  emoji: '🏋️', label: 'Workouts' },
  { id: 'progress',  emoji: '📈', label: 'Progress' },
]

export default function Nav({ active, onChange, urgentCount = 0 }: Props) {
  return (
    <div style={{
      position:        'fixed',
      bottom: 0, left: 0, right: 0,
      zIndex:          50,
      background:      'rgba(18,18,20,.92)',
      backdropFilter:  'blur(20px)',
      borderTop:       '1px solid #2c2c2e',
      padding:         '8px 0 20px',
      display:         'flex',
    }}>
      {TABS.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            flex:     1,
            display:  'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding:  '6px 0',
            background: 'none', border: 'none',
            position: 'relative',
          }}
        >
          <span style={{ fontSize: 22 }}>{t.emoji}</span>
          <span style={{
            fontSize:   10,
            fontWeight: 600,
            color:      active === t.id ? '#A5F044' : '#636366',
            letterSpacing: '.04em',
          }}>
            {t.label}
          </span>
          {active === t.id && (
            <div style={{
              position:  'absolute',
              bottom:    -12,
              left:      '50%',
              transform: 'translateX(-50%)',
              width: 4, height: 4,
              borderRadius: '50%',
              background: '#A5F044',
            }} />
          )}
          {t.id === 'workouts' && urgentCount > 0 && (
            <div style={{
              position:     'absolute',
              top: 2, right: '28%',
              width: 16, height: 16,
              borderRadius: '50%',
              background:   '#FF375F',
              color:        '#fff',
              fontSize:     10, fontWeight: 700,
              display:      'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {urgentCount}
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
