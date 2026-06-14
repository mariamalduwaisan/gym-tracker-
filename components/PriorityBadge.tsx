import { Priority } from '@/lib/types'

const config: Record<Priority, { label: string; color: string; bg: string; dot: string }> = {
  urgent: { label: 'Urgent',  color: '#FF375F', bg: 'rgba(255,55,95,.15)',  dot: '#FF375F' },
  high:   { label: 'High',    color: '#FF9F0A', bg: 'rgba(255,159,10,.15)', dot: '#FF9F0A' },
  medium: { label: 'Medium',  color: '#30D158', bg: 'rgba(48,209,88,.15)',  dot: '#30D158' },
  low:    { label: 'Low',     color: '#8E8E93', bg: 'rgba(142,142,147,.15)',dot: '#636366' },
}

export default function PriorityBadge({ priority }: { priority: Priority }) {
  const c = config[priority]
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '3px 10px', borderRadius: 100,
        background: c.bg, color: c.color,
        fontSize: 11, fontWeight: 600, letterSpacing: '.04em',
      }}
    >
      <span
        style={{
          width: 6, height: 6, borderRadius: '50%',
          background: c.dot,
          animation: priority === 'urgent' ? 'pulse-dot 1.2s ease infinite' : undefined,
        }}
      />
      {c.label}
    </span>
  )
}
