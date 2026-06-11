'use client'

import { useState } from 'react'
import type { Outfit } from '@/lib/types'

interface Props {
  outfit: Outfit
  index: number
  isSaved: boolean
  onSave: () => void
  onCopy: () => void
  onShare: () => void
}

const DELAYS = ['ocard-delay-1', 'ocard-delay-2', 'ocard-delay-3']

export default function OutfitCard({ outfit, index, isSaved, onSave, onCopy, onShare }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    onCopy()
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <article className={`ocard ${DELAYS[index] ?? ''}`}>
      {/* Top row */}
      <div className="ocard-top">
        <div>
          <div className="ocard-num">Look {index + 1}</div>
          <div className="ocard-name">{outfit.name}</div>
        </div>
        <div className="conf-badge" title={`${outfit.confidenceScore}% match`}>
          <span className="conf-num">{outfit.confidenceScore ?? 90}%</span>
          <span className="conf-lbl">Match</span>
        </div>
      </div>

      {/* Color palette */}
      {outfit.colorPalette?.length > 0 && (
        <div className="palette">
          {outfit.colorPalette.map((c, i) => (
            <span key={i} className="pal-chip">{c}</span>
          ))}
        </div>
      )}

      {/* Pieces */}
      <div className="o-sec">
        <div className="o-lbl">👗 Clothing Pieces</div>
        <ul className="o-pieces">
          {outfit.pieces?.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>

      {/* Shoes */}
      <div className="o-sec">
        <div className="o-lbl">👠 Shoes</div>
        <p className="o-text">{outfit.shoes}</p>
      </div>

      {/* Accessories */}
      <div className="o-sec">
        <div className="o-lbl">👜 Bag &amp; Accessories</div>
        <p className="o-text">{outfit.accessories}</p>
      </div>

      {/* Why it works */}
      <div className="o-why">💬 {outfit.whyItWorks}</div>

      <div className="divider" />

      {/* Actions */}
      <div className="cactions">
        <button
          className={`cact ${isSaved ? 'is-saved' : ''}`}
          onClick={onSave}
          aria-label={isSaved ? 'Remove saved outfit' : 'Save outfit'}
        >
          {isSaved ? '✅ Saved' : '🤍 Save'}
        </button>
        <button
          className={`cact ${copied ? 'is-copied' : ''}`}
          onClick={handleCopy}
          aria-label="Copy outfit to clipboard"
        >
          {copied ? '✅ Copied!' : '📋 Copy'}
        </button>
        <button className="cact" onClick={onShare} aria-label="Copy share link">
          🔗 Share
        </button>
      </div>
    </article>
  )
}
