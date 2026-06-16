'use client'

import { useState } from 'react'
import { Workout } from '@/lib/types'

const PC: Record<string, string> = {
  urgent: '#FF375F',
  high:   '#FF9F0A',
  medium: '#30D158',
  low:    '#636366',
}

const ICONS: Record<string, string> = {
  urgent: '🚨',
  high:   '⚡',
  medium: '💪',
  low:    '📋',
}

interface Props {
  workouts: Workout[]
}

export default function NotificationBanner({ workouts }: Props) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const visible = workouts
    .filter(w => (w.priority === 'urgent' || w.priority === 'high') && w.status !== 'completed')
    .filter(w => !dismissed.has(w.id))
    .slice(0, 3)

  if (visible.length === 0) return null

  return (
    <div style={{ padding: '0 16px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {visible.map(w => (
        <div
          key={w.id}
          style={{
            background: '#1c1c1e',
            borderRadius: 16,
            overflow: 'hidden',
            display: 'flex',
            border: `1px solid ${PC[w.priority]}30`,
            boxShadow: `0 0 24px ${PC[w.priority]}20`,
            animation: 'slide-down .35s cubic-bezier(.4,0,.2,1)',
          }}
        >
          {/* Priority stripe */}
          <div style={{
            width: 4,
            flexShrink: 0,
            background: PC[w.priority],
            boxShadow: `0 0 10px ${PC[w.priority]}`,
          }} />

          <div style={{
            flex: 1,
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{ICONS[w.priority]}</span>
              <div style={{ minWidth: 0 }}>
                <p style={{
                  color: PC[w.priority],
                  fontSize: 10, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '.1em',
                }}>
                  {w.priority} priority
                </p>
                <p style={{
                  color: '#fff', fontSize: 14, fontWeight: 600, marginTop: 2,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {w.title}
                </p>
                {w.description && (
                  <p style={{
                    color: '#8e8e93', fontSize: 12, marginTop: 2,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {w.description}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => setDismissed(prev => new Set([...prev, w.id]))}
              style={{
                flexShrink: 0,
                width: 28, height: 28, borderRadius: '50%',
                background: '#3a3a3c', color: '#8e8e93',
                fontSize: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: 'none',
              }}
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
