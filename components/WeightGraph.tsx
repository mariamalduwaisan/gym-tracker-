'use client'

import { WeightLog } from '@/lib/types'

interface Props {
  logs: WeightLog[]
}

export default function WeightGraph({ logs }: Props) {
  if (logs.length < 2) {
    return (
      <p style={{ color: '#636366', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>
        Log at least 2 days of weight to see your trend graph.
      </p>
    )
  }

  const W = 320, H = 100
  const PAD = { top: 12, right: 16, bottom: 24, left: 36 }
  const innerW = W - PAD.left - PAD.right
  const innerH = H - PAD.top - PAD.bottom

  const weights = logs.map((l) => l.weight_kg)
  const minW = Math.min(...weights) - 0.3
  const maxW = Math.max(...weights) + 0.3

  const toX = (i: number) => PAD.left + (i / (logs.length - 1)) * innerW
  const toY = (w: number) => PAD.top + innerH - ((w - minW) / (maxW - minW)) * innerH

  const points = logs.map((l, i) => ({ x: toX(i), y: toY(l.weight_kg) }))
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const areaD = `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${(H - PAD.bottom).toFixed(1)} L ${PAD.left} ${(H - PAD.bottom).toFixed(1)} Z`

  const first = logs[0].weight_kg
  const last = logs[logs.length - 1].weight_kg
  const delta = (last - first).toFixed(1)
  const lost = first - last

  // Show 3 date labels
  const labelIdxs = [0, Math.floor((logs.length - 1) / 2), logs.length - 1]

  return (
    <div>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
        <div>
          <p style={{ color: '#8e8e93', fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>
            Weight Trend
          </p>
          <p style={{ color: '#fff', fontSize: 22, fontWeight: 700, lineHeight: 1.1, marginTop: 2 }}>
            {last} <span style={{ fontSize: 13, color: '#8e8e93', fontWeight: 400 }}>kg</span>
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: lost > 0 ? '#A5F044' : '#FF375F', fontSize: 17, fontWeight: 700 }}>
            {lost > 0 ? '↓' : '↑'} {Math.abs(Number(delta))} kg
          </p>
          <p style={{ color: '#636366', fontSize: 11 }}>since start</p>
        </div>
      </div>

      {/* SVG chart */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', overflow: 'visible' }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wg-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#A5F044" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#A5F044" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Horizontal gridlines */}
        {[0, 0.5, 1].map((t) => {
          const y = PAD.top + innerH * (1 - t)
          const kg = (minW + t * (maxW - minW)).toFixed(1)
          return (
            <g key={t}>
              <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y}
                stroke="#2c2c2e" strokeWidth="1" />
              <text x={PAD.left - 4} y={y + 3.5} textAnchor="end"
                fill="#636366" fontSize="8" fontFamily="system-ui, sans-serif">
                {kg}
              </text>
            </g>
          )
        })}

        {/* Area fill */}
        <path d={areaD} fill="url(#wg-fill)" />

        {/* Line */}
        <path d={pathD} fill="none" stroke="#A5F044" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Dots */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#A5F044" />
        ))}

        {/* Date labels */}
        {labelIdxs.map((idx) => {
          const d = new Date(logs[idx].date)
          const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          return (
            <text key={idx} x={toX(idx)} y={H - 4} textAnchor="middle"
              fill="#636366" fontSize="8" fontFamily="system-ui, sans-serif">
              {label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}
