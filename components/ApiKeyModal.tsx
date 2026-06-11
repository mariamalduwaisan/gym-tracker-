'use client'

import { useState, useEffect, useRef } from 'react'

interface Props {
  isOpen: boolean
  defaultKey: string
  onClose: () => void
  onSave: (key: string) => void
}

export default function ApiKeyModal({ isOpen, defaultKey, onClose, onSave }: Props) {
  const [value, setValue] = useState(defaultKey)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setValue(defaultKey)
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen, defaultKey])

  const handleSave = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    onSave(trimmed)
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className="modal">
        <h2>🔑 Enter your API Key</h2>
        <p>
          Paste your OpenRouter API key to enable AI outfit generation. It is stored only in your
          browser&apos;s localStorage and never sent anywhere except OpenRouter.
        </p>

        <input
          ref={inputRef}
          className="modal-inp"
          type="password"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          placeholder="sk-or-v1-…"
          autoComplete="off"
          aria-label="OpenRouter API key"
        />

        <p className="modal-note">
          No key yet?{' '}
          <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer">
            Get one free at openrouter.ai →
          </a>
        </p>

        <div className="modal-actions">
          <button className="btn-rose" onClick={handleSave}>
            Save &amp; Continue
          </button>
          <button className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
