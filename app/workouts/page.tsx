'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Workout } from '@/lib/types'
import WorkoutCard from '@/components/WorkoutCard'
import FilterBar from '@/components/FilterBar'
import WatchNotification from '@/components/WatchNotification'
import { Notification } from '@/lib/types'

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [priority, setPriority] = useState('all')
  const [status, setStatus] = useState('all')
  const [loading, setLoading] = useState(true)

  const fetchWorkouts = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (priority !== 'all') params.set('priority', priority)
    if (status !== 'all') params.set('status', status)
    const res = await fetch(`/api/workouts?${params}`)
    setWorkouts(await res.json())
    setLoading(false)
  }, [priority, status])

  useEffect(() => { fetchWorkouts() }, [fetchWorkouts])

  useEffect(() => {
    fetch('/api/notifications')
      .then((r) => r.json())
      .then(setNotifications)
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Delete this workout?')) return
    await fetch(`/api/workouts/${id}`, { method: 'DELETE' })
    setWorkouts((w) => w.filter((x) => x.id !== id))
  }

  async function handleStatusChange(id: string, newStatus: Workout['status']) {
    const res = await fetch(`/api/workouts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    const updated = await res.json()
    setWorkouts((w) => w.map((x) => (x.id === id ? updated : x)))
  }

  async function dismissNotification(id: string) {
    await fetch('/api/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, is_read: true }),
    })
    setNotifications((n) => n.map((x) => (x.id === id ? { ...x, is_read: true } : x)))
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', paddingBottom: 80 }}>
      <WatchNotification notifications={notifications} onDismiss={dismissNotification} />

      {/* Header */}
      <div
        style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(0,0,0,.85)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #1c1c1e',
          padding: '12px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <div className="flex items-center gap-3">
          <Link href="/" style={{ color: '#8e8e93', fontSize: 22, lineHeight: 1 }}>‹</Link>
          <h1 style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>Workouts</h1>
        </div>
        <Link
          href="/workouts/new"
          style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#A5F044', color: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 700, lineHeight: 1,
          }}
        >
          +
        </Link>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '16px 16px 0' }}>
        {/* Filter bar */}
        <FilterBar
          priority={priority}
          status={status}
          onPriorityChange={setPriority}
          onStatusChange={setStatus}
        />

        {/* Count */}
        <p style={{ color: '#8e8e93', fontSize: 12, margin: '12px 0 10px', textAlign: 'right' }}>
          {loading ? '…' : `${workouts.length} workout${workouts.length !== 1 ? 's' : ''}`}
        </p>

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ background: '#1c1c1e', borderRadius: 20, height: 140, animation: 'shim 1.4s ease infinite' }} />
            ))}
          </div>
        ) : workouts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#636366' }}>
            <p style={{ fontSize: 40, marginBottom: 12 }}>🏋️</p>
            <p style={{ fontSize: 16, fontWeight: 600, color: '#8e8e93' }}>No workouts found</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>Try changing the filters or add a new workout</p>
            <Link
              href="/workouts/new"
              style={{
                display: 'inline-block', marginTop: 20,
                padding: '10px 24px', borderRadius: 12,
                background: '#A5F044', color: '#000', fontWeight: 700, fontSize: 14,
              }}
            >
              + Add Workout
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {workouts.map((w) => (
              <WorkoutCard
                key={w.id}
                workout={w}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
