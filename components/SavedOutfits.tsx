'use client'

import type { SavedOutfit } from '@/lib/types'

interface Props {
  outfits: SavedOutfit[]
  onDelete: (name: string) => void
}

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return ''
  }
}

export default function SavedOutfits({ outfits, onDelete }: Props) {
  return (
    <section className="saved-sec">
      <h2 className="sec-title">Saved Outfits</h2>
      <p className="saved-sub">Your favourite looks, stored locally in your browser.</p>

      {outfits.length === 0 ? (
        <div className="saved-empty">
          <div className="saved-empty-icon">🧺</div>
          <p className="saved-empty-txt">
            No saved outfits yet — generate some looks and hit Save!
          </p>
        </div>
      ) : (
        <div className="saved-grid">
          {outfits.map(o => (
            <div key={o.name} className="scard">
              <button
                className="del-btn"
                onClick={() => onDelete(o.name)}
                title="Remove"
                aria-label={`Delete ${o.name}`}
              >
                ×
              </button>
              <div className="scard-name">{o.name}</div>
              <div className="scard-date">{fmtDate(o.savedAt)}</div>
              <div className="scard-tags">
                {o.occasion && <span className="stag">{o.occasion}</span>}
                {o.style && <span className="stag">{o.style}</span>}
                {o.confidenceScore ? <span className="stag">{o.confidenceScore}% match</span> : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
