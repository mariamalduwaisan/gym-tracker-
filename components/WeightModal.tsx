'use client'

import { useState } from 'react'
import { WeightLog } from '@/lib/types'

interface Props {
  onClose: () => void
  onLogged: (log: WeightLog) => void
}

export default function WeightModal({ onClose, onLogged }: Props) {
  const today = new Date().toISOString().split('T')[0]
  const [weight, setWeight] = useState('')
  const [date, setDate] = useState(today)
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!weight) return
    setLoading(true)
    try {
      const res = await fetch('/api/weight-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, weight_kg: parseFloat(weight) }),
      })
      if (!res.ok) throw new Error('Failed')
      const log = await res.json()
      onLogged(log)
      onClose()
    } catch {
      alert('Could not save. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 480,
          background: '#1c1c1e',
          borderRadius: '24px 24px 0 0',
          padding: '8px 20px 40px',
          animation: 'up .3s ease',
        }}
      >
        <div style={{ width: 36, height: 4, background: '#3a3a3c', borderRadius: 2, margin: '10px auto 20px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>Log Weight</h2>
          <button onClick={onClose} style={{ color: '#8e8e93', fontSize: 22 }}>×</button>
        </div>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ position: 'relative' }}>
            <input
              required
              type="number"
              step="0.1"
              min="30"
              max="300"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="74.5"
              autoFocus
              style={{
                width: '100%', padding: '16px 56px 16px 16px',
                background: '#2c2c2e', border: '1px solid #3a3a3c',
                borderRadius: 14, color: '#fff', fontSize: 28, fontWeight: 700,
                outline: 'none', textAlign: 'center',
              }}
            />
            <span style={{
              position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
              color: '#00D9FF', fontSize: 14, fontWeight: 600,
            }}>kg</span>
          </div>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              width: '100%', padding: '12px 14px',
              background: '#2c2c2e', border: '1px solid #3a3a3c',
              borderRadius: 12, color: '#fff', fontSize: 15,
              outline: 'none', colorScheme: 'dark',
            }}
          />

          <button
            type="submit"
            disabled={loading || !weight}
            style={{
              padding: '14px', borderRadius: 14,
              background: loading || !weight ? '#3a3a3c' : '#00D9FF',
              color: '#000', fontWeight: 700, fontSize: 16,
              border: 'none',
            }}
          >
            {loading ? 'Saving…' : '⚖️ Log Weight'}
          </button>
        </form>
      </div>
    </div>
  )
}
