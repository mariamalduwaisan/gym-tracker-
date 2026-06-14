import Link from 'next/link'
import WorkoutForm from '@/components/WorkoutForm'

export default function NewWorkoutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', paddingBottom: 40 }}>
      {/* Header */}
      <div
        style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(0,0,0,.85)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #1c1c1e',
          padding: '12px 20px',
          display: 'flex', alignItems: 'center', gap: 12,
        }}
      >
        <Link href="/workouts" style={{ color: '#8e8e93', fontSize: 22, lineHeight: 1 }}>‹</Link>
        <h1 style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>New Workout</h1>
      </div>

      <div style={{ maxWidth: 600, margin: '24px auto 0', padding: '0 16px' }}>
        <div
          style={{
            background: '#1c1c1e',
            border: '1px solid #3a3a3c',
            borderRadius: 20,
            padding: '20px',
          }}
        >
          <WorkoutForm />
        </div>
      </div>
    </div>
  )
}
