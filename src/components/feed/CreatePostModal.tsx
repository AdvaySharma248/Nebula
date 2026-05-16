'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown } from 'lucide-react'
import { useAppStore } from '@/stores/app-store'

const COMMUNITIES = [
  { name: 'r/qdev', color: '#C7FF3F' },
  { name: 'r/ml', color: '#C7FF3F' },
  { name: 'r/cyber', color: '#C7FF3F' },
  { name: 'r/aifuture', color: '#C7FF3F' },
  { name: 'r/metaverse', color: '#C7FF3F' },
  { name: 'r/holo', color: '#C7FF3F' },
  { name: 'r/spacetech', color: '#C7FF3F' },
  { name: 'r/crypto', color: '#C7FF3F' },
]

export function CreatePostModal() {
  const { createPostOpen, setCreatePostOpen } = useAppStore()
  const [selectedCommunity, setSelectedCommunity] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isCommunityOpen, setIsCommunityOpen] = useState(false)

  const handleClose = () => {
    setCreatePostOpen(false)
    setTimeout(() => {
      setSelectedCommunity('')
      setTitle('')
      setContent('')
      setIsCommunityOpen(false)
    }, 200)
  }

  const handlePost = () => {
    handleClose()
  }

  const isFormValid = selectedCommunity && title.trim() && content.trim()

  return (
    <AnimatePresence>
      {createPostOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.6)' }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-lg max-h-[85vh] overflow-y-auto pointer-events-auto rounded-lg"
              style={{
                background: '#151515',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 h-12 flex-shrink-0"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <h2
                  className="font-display font-semibold text-sm"
                  style={{ color: '#F5F5F5' }}
                >
                  New thread
                </h2>
                <button
                  onClick={handleClose}
                  className="flex items-center justify-center w-7 h-7 rounded cursor-pointer transition-colors duration-150"
                  style={{ color: '#555555' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#888888'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#555555'
                  }}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {/* Community selector */}
                <div className="relative">
                  <label
                    className="block text-[10px] font-medium uppercase tracking-wider mb-1.5"
                    style={{ color: '#555555' }}
                  >
                    Community
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCommunityOpen(!isCommunityOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors cursor-pointer"
                    style={{
                      background: '#1A1A1A',
                      border: '1px solid rgba(255,255,255,0.06)',
                      color: selectedCommunity ? '#F5F5F5' : '#555555',
                    }}
                  >
                    <span>{selectedCommunity || 'Select community...'}</span>
                    <ChevronDown
                      size={14}
                      style={{ color: '#555555' }}
                      className={`transition-transform duration-150 ${isCommunityOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isCommunityOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.12 }}
                        className="absolute top-full left-0 right-0 mt-1 rounded-md overflow-hidden z-10"
                        style={{
                          background: '#1A1A1A',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        {COMMUNITIES.map((community) => (
                          <button
                            key={community.name}
                            type="button"
                            onClick={() => {
                              setSelectedCommunity(community.name)
                              setIsCommunityOpen(false)
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left transition-colors cursor-pointer"
                            style={{ color: '#888888' }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
                              ;(e.currentTarget as HTMLElement).style.color = '#F5F5F5'
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.background = 'transparent'
                              ;(e.currentTarget as HTMLElement).style.color = '#888888'
                            }}
                          >
                            <span
                              className="w-5 h-5 rounded-sm flex items-center justify-center text-[9px] font-bold"
                              style={{
                                background: 'rgba(199,255,63,0.08)',
                                color: '#C7FF3F',
                              }}
                            >
                              {community.name.charAt(2).toUpperCase()}
                            </span>
                            {community.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Title */}
                <div>
                  <label
                    className="block text-[10px] font-medium uppercase tracking-wider mb-1.5"
                    style={{ color: '#555555' }}
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What's happening?"
                    className="w-full px-3 py-2 rounded-md text-sm outline-none transition-colors"
                    style={{
                      background: '#1A1A1A',
                      border: '1px solid rgba(255,255,255,0.06)',
                      color: '#F5F5F5',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(199,255,63,0.3)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                    }}
                    maxLength={300}
                  />
                </div>

                {/* Content */}
                <div>
                  <label
                    className="block text-[10px] font-medium uppercase tracking-wider mb-1.5"
                    style={{ color: '#555555' }}
                  >
                    Content
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your thoughts..."
                    rows={5}
                    className="w-full px-3 py-2 rounded-md text-sm outline-none transition-colors resize-none min-h-[120px]"
                    style={{
                      background: '#1A1A1A',
                      border: '1px solid rgba(255,255,255,0.06)',
                      color: '#F5F5F5',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(199,255,63,0.3)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                    }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div
                className="flex items-center justify-end gap-3 px-5 h-12 flex-shrink-0"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <button
                  onClick={handleClose}
                  className="px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors"
                  style={{ color: '#888888' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#F5F5F5'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#888888'
                  }}
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handlePost}
                  disabled={!isFormValid}
                  className="px-4 py-1.5 rounded text-xs font-medium cursor-pointer transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
                  style={{
                    background: isFormValid ? '#C7FF3F' : '#1A1A1A',
                    color: isFormValid ? '#0D0D0D' : '#555555',
                  }}
                  whileHover={isFormValid ? { opacity: 0.9 } : {}}
                  whileTap={isFormValid ? { scale: 0.97 } : {}}
                >
                  Post
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
