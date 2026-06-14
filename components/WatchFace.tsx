'use client'

import { useEffect, useState } from 'react'

interface Props {
  calories: number      // today's calories burned
  calGoal: number       // daily target (300)
  days: number          // workouts done this week
  dayGoal: number       // weekly target (4)
  weightLost: number    // kg lost from start weight
  weightGoal: number    // kg to lose total (5kg goal)
}

export default function WatchFace({ calories, calGoal, days, dayGoal, weightLost, weightGoal }: Props) {
  const [time, setTime] = useState('--:--')
  const [dateStr, setDateStr] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }))
      setDateStr(now.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }).toUpperCase())
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Ring geometry
  const cx = 141, cy = 188
  const rings = [
    { r: 52, color: '#FF375F', pct: Math.min(calories / calGoal, 1.05), label: 'MOVE',   value: `${calories}`, unit: 'KCAL' },
    { r: 39, color: '#A5F044', pct: Math.min(days    / dayGoal,  1.05), label: 'EX',     value: `${days}/${dayGoal}`, unit: 'DAYS' },
    { r: 26, color: '#00D9FF', pct: Math.min(weightLost / weightGoal, 1.05), label: 'LOST', value: weightLost > 0 ? `${weightLost.toFixed(1)}` : '0', unit: 'KG' },
  ]
  const SW = 9

  return (
    <svg
      viewBox="0 0 282 430"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 240, display: 'block', margin: '0 auto', filter: 'drop-shadow(0 24px 48px rgba(0,0,0,.9))' }}
    >
      <defs>
        <linearGradient id="wf-band" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#0d0d0d" />
          <stop offset="40%"  stopColor="#1e1e1e" />
          <stop offset="60%"  stopColor="#1e1e1e" />
          <stop offset="100%" stopColor="#0d0d0d" />
        </linearGradient>
        <linearGradient id="wf-case" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#5a5a5c" />
          <stop offset="8%"   stopColor="#3a3a3c" />
          <stop offset="92%"  stopColor="#3a3a3c" />
          <stop offset="100%" stopColor="#5a5a5c" />
        </linearGradient>
        <linearGradient id="wf-case-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#5a5a5c" />
          <stop offset="6%"   stopColor="#3a3a3c" />
          <stop offset="94%"  stopColor="#3a3a3c" />
          <stop offset="100%" stopColor="#4a4a4c" />
        </linearGradient>
        <linearGradient id="wf-glare" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="50%"  stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="wf-screen">
          <rect x="52" y="72" width="180" height="226" rx="46" />
        </clipPath>
      </defs>

      {/* ── Top band ── */}
      <path
        d="M 80 72 L 80 2 Q 80 0 84 0 L 200 0 Q 204 0 204 2 L 204 72 Z"
        fill="url(#wf-band)"
      />
      {/* Band stitching lines */}
      <line x1="88" y1="6"  x2="88"  y2="68" stroke="#2a2a2a" strokeWidth="1" />
      <line x1="196" y1="6" x2="196" y2="68" stroke="#2a2a2a" strokeWidth="1" />

      {/* ── Bottom band ── */}
      <path
        d="M 80 298 L 80 428 Q 80 430 84 430 L 200 430 Q 204 430 204 428 L 204 298 Z"
        fill="url(#wf-band)"
      />
      <line x1="88"  y1="302" x2="88"  y2="424" stroke="#2a2a2a" strokeWidth="1" />
      <line x1="196" y1="302" x2="196" y2="424" stroke="#2a2a2a" strokeWidth="1" />

      {/* ── Watch case (outer shell) ── */}
      <rect x="42" y="64" width="200" height="242" rx="56" fill="url(#wf-case-v)" />
      {/* Inner case bevel */}
      <rect x="46" y="68" width="192" height="234" rx="52" fill="#1a1a1a" />

      {/* ── Crown (right side) ── */}
      <rect x="238" y="148" width="14" height="52" rx="7" fill="#3a3a3c" />
      {/* Crown knurling */}
      {[154,159,164,169,174,179,184,189].map(y => (
        <line key={y} x1="241" y1={y} x2="249" y2={y} stroke="#555" strokeWidth="0.8" strokeLinecap="round" />
      ))}

      {/* ── Side button ── */}
      <rect x="238" y="212" width="12" height="30" rx="6" fill="#3a3a3c" />

      {/* ── Screen background ── */}
      <rect x="52" y="72" width="180" height="226" rx="46" fill="#000000" />

      {/* ── Screen content (clipped) ── */}
      <g clipPath="url(#wf-screen)">

        {/* Time */}
        <text
          x="142" y="110"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="40"
          fontWeight="100"
          fontFamily="-apple-system, 'SF Pro Display', system-ui, sans-serif"
          letterSpacing="-2"
        >
          {time}
        </text>

        {/* Date */}
        <text
          x="142" y="127"
          textAnchor="middle"
          fill="#636366"
          fontSize="11"
          fontWeight="400"
          fontFamily="-apple-system, system-ui, sans-serif"
          letterSpacing="1.5"
        >
          {dateStr}
        </text>

        {/* ── Activity Rings ── */}
        {rings.map((ring) => {
          const c = 2 * Math.PI * ring.r
          return (
            <g key={ring.label}>
              {/* Track */}
              <circle cx={cx} cy={cy} r={ring.r} fill="none" stroke={ring.color} strokeWidth={SW} opacity={0.18} />
              {/* Fill — rotated so it starts from 12 o'clock */}
              <circle
                cx={cx} cy={cy} r={ring.r}
                fill="none"
                stroke={ring.color}
                strokeWidth={SW}
                strokeLinecap="round"
                strokeDasharray={c}
                strokeDashoffset={c * (1 - ring.pct)}
                transform={`rotate(-90 ${cx} ${cy})`}
                style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)' }}
              />
            </g>
          )
        })}

        {/* ── Ring stats row ── */}
        {rings.map((ring, i) => {
          const positions = [84, 142, 200]
          const x = positions[i]
          return (
            <g key={ring.label + '-stat'}>
              <text x={x} y="254" textAnchor="middle" fill={ring.color} fontSize="8" fontWeight="700"
                fontFamily="-apple-system, system-ui, sans-serif" letterSpacing="0.5">
                {ring.label}
              </text>
              <text x={x} y="266" textAnchor="middle" fill={ring.color} fontSize="13" fontWeight="700"
                fontFamily="-apple-system, system-ui, sans-serif">
                {ring.value}
              </text>
              <text x={x} y="276" textAnchor="middle" fill="#636366" fontSize="8"
                fontFamily="-apple-system, system-ui, sans-serif">
                {ring.unit}
              </text>
            </g>
          )
        })}

        {/* ── Screen glare overlay ── */}
        <rect x="52" y="72" width="180" height="226" rx="46" fill="url(#wf-glare)" />
      </g>
    </svg>
  )
}
