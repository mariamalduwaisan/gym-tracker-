'use client'

import { useEffect, useState } from 'react'
import { Notification } from '@/lib/types'

interface Props {
  notifications: Notification[]
  onDismiss: (id: string) => void
}

const typeStyles: Record<string, { bg: string; border: string; icon: string }> = {
  warning:     { bg: '#2a0a0f', border: '#FF375F', icon: '🔴' },
  reminder:    { bg: '#1a1a0a', border: '#FF9F0A', icon: '⏰' },
  achievement: { bg: '#0a1a0f', border: '#A5F044', icon: '🏆' },
  info:        { bg: '#0a1520', border: '#00D9FF', icon: 'ℹ️'  },
}

export default function WatchNotification({ notifications, onDismiss }: Props) {
  const [visible, setVisible] = useState<Notification[]>([])

  useEffect(() => {
    const unread = notifications.filter((n) => !n.is_read).slice(0, 3)
    setVisible(unread)
  }, [notifications])

  if (visible.length === 0) return null

  return (
    <div
      className="fixed top-4 left-1/2 z-50 flex flex-col gap-2"
      style={{ transform: 'translateX(-50%)', width: 'min(420px, 92vw)' }}
    >
      {visible.map((n, i) => {
        const s = typeStyles[n.type] ?? typeStyles.info
        return (
          <div
            key={n.id}
            style={{
              background: s.bg,
              border: `1px solid ${s.border}`,
              borderRadius: 16,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              boxShadow: `0 4px 32px ${s.border}44`,
              animation: `slide-down .35s ease ${i * 0.08}s both`,
            }}
          >
            <span style={{ fontSize: 20, flexShrink: 0, lineHeight: 1.4 }}>{s.icon}</span>
            <p style={{ fontSize: 13, color: '#fff', lineHeight: 1.45, flex: 1 }}>{n.message}</p>
            <button
              onClick={() => onDismiss(n.id)}
              style={{
                flexShrink: 0,
                width: 22, height: 22,
                borderRadius: '50%',
                background: 'rgba(255,255,255,.1)',
                color: '#fff',
                fontSize: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ✕
            </button>
          </div>
        )
      })}
    </div>
  )
}
