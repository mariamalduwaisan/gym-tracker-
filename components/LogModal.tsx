'use client'

import { useState } from 'react'
import { DailyLog } from '@/lib/types'

const WORKOUTS = ['HIIT', 'Running', 'Cycling', 'Strength', 'Yoga', 'Walk']

interface Props {
  onClose: () => void
  onLogged: (log: DailyLog) => void
  existingLog?: DailyLog | null
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 14px',
  background: '#2c2c2e', border: '1px solid #3a3a3c',
  borderRadius: 12, color: '#fff', fontSize: 15,
  outline: 'none',
}

export default function LogModal({ onClose, onLogged, existingLog }: Props) {
  const today = new Date().toISOString().split('T')[0]
  const [workout, setWorkout] = useState(existingLog?.workout_name ?? 'HIIT')
  const [calories, setCalories] = useState(String(existingLog?.calories_burned ?? 300))
  const [notes, setNotes] = useState(existingLog?.notes ?? '')
  const [date, setDate] = useState(existingLog?.date ?? today)
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/daily-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date,
          workout_name: workout,
          calories_burned: parseInt(calories) || 0,
          notes: notes || null,
        }),
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
    /* Backdrop */
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}
    >
      {/* Sheet */}
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
        {/* Handle */}
        <div style={{ width: 36, height: 4, background: '#3a3a3c', borderRadius: 2, margin: '10px auto 20px' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>Log Workout</h2>
          <button onClick={onClose} style={{ color: '#8e8e93', fontSize: 22, lineHeight: 1 }}>×</button>
        </div>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Workout picker */}
          <div>
            <p style={{ color: '#8e8e93', fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 8 }}>
              Workout
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {WORKOUTS.map((w) => (
                <button
                  type="button"
                  key={w}
                  onClick={() => setWorkout(w)}
                  style={{
                    padding: '8px 16px', borderRadius: 100,
                    border: `1.5px solid ${workout === w ? '#A5F044' : '#3a3a3c'}`,
                    background: workout === w ? 'rgba(165,240,68,.15)' : 'transparent',
                    color: workout === w ? '#A5F044' : '#8e8e93',
                    fontSize: 14, fontWeight: 600,
                    transition: 'all .15s',
                  }}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Calories */}
          <div>
            <p style={{ color: '#8e8e93', fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 8 }}>
              Calories Burned
            </p>
            <div style={{ position: 'relative' }}>
              <input
                required
                type="number"
                min={0}
                max={2000}
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                style={{ ...inputStyle, paddingRight: 52 }}
              />
              <span style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                color: '#FF375F', fontSize: 13, fontWeight: 600,
              }}>kcal</span>
            </div>
            {/* Quick picks */}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              {[200, 300, 400, 500].map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() => setCalories(String(n))}
                  style={{
                    flex: 1, padding: '6px 0', borderRadius: 8,
                    background: calories === String(n) ? 'rgba(255,55,95,.15)' : '#2c2c2e',
                    border: `1px solid ${calories === String(n) ? '#FF375F' : '#3a3a3c'}`,
                    color: calories === String(n) ? '#FF375F' : '#8e8e93',
                    fontSize: 13, fontWeight: 600,
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <p style={{ color: '#8e8e93', fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 8 }}>
              Date
            </p>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ ...inputStyle, colorScheme: 'dark' }}
            />
          </div>

          {/* Notes */}
          <div>
            <p style={{ color: '#8e8e93', fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 8 }}>
              Notes <span style={{ color: '#636366', fontWeight: 400, textTransform: 'none' }}>(optional)</span>
            </p>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How did it feel?"
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 4,
              padding: '14px', borderRadius: 14,
              background: loading ? '#3a3a3c' : '#A5F044',
              color: '#000', fontWeight: 700, fontSize: 16,
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {loading
              ? <><span className="spinner" style={{ borderTopColor: '#000', width: 16, height: 16 }} /> Saving…</>
              : '🔥 Log Workout'}
          </button>
        </form>
      </div>
    </div>
  )
}
