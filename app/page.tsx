'use client'

import { useEffect, useState } from 'react'
import { DailyLog, WeightLog } from '@/lib/types'
import WatchFace from '@/components/WatchFace'
import WeightGraph from '@/components/WeightGraph'
import LogModal from '@/components/LogModal'
import WeightModal from '@/components/WeightModal'

export default function Dashboard() {
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([])
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([])
  const [loading, setLoading] = useState(true)
  const [showLog, setShowLog] = useState(false)
  const [showWeight, setShowWeight] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/api/daily-logs').then(r => r.json()),
      fetch('/api/weight-logs').then(r => r.json()),
    ]).then(([d, w]) => {
      setDailyLogs(d)
      setWeightLogs(w)
      setLoading(false)
    })
  }, [])

  // ── computed values ──────────────────────────────────────────────
  const CAL_GOAL  = 300
  const DAY_GOAL  = 4
  const today     = new Date().toISOString().split('T')[0]
  const todayLog  = dailyLogs.find(l => l.date === today)

  // calories burned today
  const todayCalories = todayLog?.calories_burned ?? 0

  // workouts done this week (Mon–Sun)
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() + (weekStart.getDay() === 0 ? -6 : 1))
  weekStart.setHours(0,0,0,0)
  const daysThisWeek = dailyLogs.filter(l => new Date(l.date) >= weekStart).length

  // weight lost from first entry
  const firstWeight  = weightLogs[0]?.weight_kg   ?? 0
  const latestWeight = weightLogs[weightLogs.length - 1]?.weight_kg ?? 0
  const weightLost   = firstWeight > 0 ? Math.max(0, parseFloat((firstWeight - latestWeight).toFixed(1))) : 0

  // recent 7 logs for the history list
  const recentLogs = dailyLogs.slice(0, 7)

  // ── handlers ──────────────────────────────────────────────────────
  function onLogged(log: DailyLog) {
    setDailyLogs(prev => {
      const filtered = prev.filter(l => l.date !== log.date)
      return [log, ...filtered].sort((a, b) => b.date.localeCompare(a.date))
    })
  }

  function onWeightLogged(log: WeightLog) {
    setWeightLogs(prev => {
      const filtered = prev.filter(l => l.date !== log.date)
      return [...filtered, log].sort((a, b) => a.date.localeCompare(b.date))
    })
  }

  async function deleteLog(id: string) {
    await fetch(`/api/daily-logs?id=${id}`, { method: 'DELETE' })
    setDailyLogs(prev => prev.filter(l => l.id !== id))
  }

  function fmtDate(dateStr: string) {
    const d = new Date(dateStr + 'T00:00:00')
    if (dateStr === today) return 'Today'
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1)
    if (dateStr === yesterday.toISOString().split('T')[0]) return 'Yesterday'
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', paddingBottom: 24 }}>

      {/* ── App header ────────────────────────────────────────────── */}
      <header style={{
        padding: '20px 20px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}>
        <div>
          <p style={{ color: '#636366', fontSize: 11, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase' }}>
            Your Journey
          </p>
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, lineHeight: 1.2, marginTop: 2 }}>
            Transformation<br />Journey
          </h1>
        </div>
        {todayLog ? (
          <div style={{
            padding: '6px 14px', borderRadius: 100,
            background: 'rgba(165,240,68,.15)', border: '1px solid rgba(165,240,68,.3)',
            color: '#A5F044', fontSize: 12, fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A5F044', display: 'inline-block' }} />
            Done today
          </div>
        ) : (
          <div style={{
            padding: '6px 14px', borderRadius: 100,
            background: 'rgba(255,159,10,.12)', border: '1px solid rgba(255,159,10,.25)',
            color: '#FF9F0A', fontSize: 12, fontWeight: 700,
          }}>
            Log workout
          </div>
        )}
      </header>

      {/* ── Apple Watch illustration ───────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '28px 0 12px' }}>
        {loading ? (
          <div style={{
            width: 200, height: 360,
            background: '#1c1c1e', borderRadius: 60,
            animation: 'shim 1.4s ease infinite',
          }} />
        ) : (
          <WatchFace
            calories={todayCalories}
            calGoal={CAL_GOAL}
            days={daysThisWeek}
            dayGoal={DAY_GOAL}
            weightLost={weightLost}
            weightGoal={5}
          />
        )}
      </div>

      {/* ── Ring legend ────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 20,
        padding: '0 20px 20px',
      }}>
        {[
          { color: '#FF375F', label: 'Move',     sub: `${todayCalories} / ${CAL_GOAL} kcal` },
          { color: '#A5F044', label: 'Exercise', sub: `${daysThisWeek} / ${DAY_GOAL} days` },
          { color: '#00D9FF', label: 'Progress', sub: `${weightLost} kg lost` },
        ].map(r => (
          <div key={r.label} style={{ textAlign: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.color, margin: '0 auto 4px' }} />
            <p style={{ color: r.color, fontSize: 10, fontWeight: 700 }}>{r.label}</p>
            <p style={{ color: '#636366', fontSize: 10, marginTop: 1 }}>{r.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Action buttons ─────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 10, padding: '0 20px 24px' }}>
        <button
          onClick={() => setShowLog(true)}
          style={{
            flex: 1, padding: '14px 0', borderRadius: 16,
            background: todayLog ? '#2c2c2e' : '#A5F044',
            color: todayLog ? '#8e8e93' : '#000',
            fontWeight: 700, fontSize: 15, border: 'none',
          }}
        >
          {todayLog ? `✓ ${todayLog.calories_burned} kcal logged` : '+ Log Today\'s Workout'}
        </button>
        <button
          onClick={() => setShowWeight(true)}
          style={{
            width: 52, height: 52, borderRadius: 14,
            background: '#2c2c2e', color: '#00D9FF',
            fontSize: 22, border: 'none',
          }}
        >
          ⚖️
        </button>
      </div>

      {/* ── Weight graph ───────────────────────────────────────────── */}
      {weightLogs.length >= 2 && (
        <div style={{
          margin: '0 16px 20px',
          background: '#1c1c1e', border: '1px solid #2c2c2e',
          borderRadius: 20, padding: '18px 16px 12px',
        }}>
          <WeightGraph logs={weightLogs} />
        </div>
      )}

      {/* ── 7-day history ──────────────────────────────────────────── */}
      <div style={{ padding: '0 16px' }}>
        <p style={{
          color: '#8e8e93', fontSize: 12, fontWeight: 600,
          letterSpacing: '.06em', textTransform: 'uppercase',
          marginBottom: 10,
        }}>
          Recent Workouts
        </p>

        {recentLogs.length === 0 ? (
          <div style={{
            background: '#1c1c1e', borderRadius: 16,
            padding: '28px', textAlign: 'center',
          }}>
            <p style={{ fontSize: 32, marginBottom: 8 }}>🏋️</p>
            <p style={{ color: '#636366', fontSize: 14 }}>No workouts logged yet.</p>
            <p style={{ color: '#636366', fontSize: 13, marginTop: 4 }}>Tap the button above to start your journey.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, borderRadius: 16, overflow: 'hidden' }}>
            {recentLogs.map((log, i) => (
              <div
                key={log.id}
                style={{
                  background: '#1c1c1e',
                  padding: '14px 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  borderBottom: i < recentLogs.length - 1 ? '1px solid #2c2c2e' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Day dot */}
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: log.date === today ? 'rgba(165,240,68,.15)' : '#2c2c2e',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    border: log.date === today ? '1.5px solid #A5F044' : '1px solid #3a3a3c',
                  }}>
                    <span style={{ color: log.date === today ? '#A5F044' : '#8e8e93', fontSize: 9, fontWeight: 700 }}>
                      {new Date(log.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                    </span>
                    <span style={{ color: log.date === today ? '#A5F044' : '#fff', fontSize: 13, fontWeight: 700, lineHeight: 1 }}>
                      {new Date(log.date + 'T00:00:00').getDate()}
                    </span>
                  </div>

                  <div>
                    <p style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{log.workout_name}</p>
                    <p style={{ color: '#636366', fontSize: 12, marginTop: 1 }}>{fmtDate(log.date)}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: '#FF375F', fontSize: 15, fontWeight: 700 }}>{log.calories_burned}</p>
                    <p style={{ color: '#636366', fontSize: 10 }}>kcal</p>
                  </div>
                  <button
                    onClick={() => deleteLog(log.id)}
                    style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'rgba(255,55,95,.1)', color: '#FF375F',
                      fontSize: 16, border: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Modals ─────────────────────────────────────────────────── */}
      {showLog    && <LogModal    onClose={() => setShowLog(false)}    onLogged={onLogged}       existingLog={todayLog} />}
      {showWeight && <WeightModal onClose={() => setShowWeight(false)} onLogged={onWeightLogged} />}
    </div>
  )
}
