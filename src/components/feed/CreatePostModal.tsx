'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ImagePlus, ChevronDown } from 'lucide-react'
import { useAppStore } from '@/stores/app-store'

const COMMUNITIES = [
  { name: 'r/QuantumDev', color: '#7C4DFF' },
  { name: 'r/NeuralArt', color: '#00E5FF' },
  { name: 'r/CyberPunk', color: '#FF4DA6' },
  { name: 'r/AIFuture', color: '#00FFB2' },
  { name: 'r/MetaVerse', color: '#7C4DFF' },
  { name: 'r/HoloTech', color: '#00E5FF' },
  { name: 'r/SpaceTech', color: '#FF4DA6' },
  { name: 'r/CryptoNexus', color: '#00FFB2' },
]

export function CreatePostModal() {
  const { createPostOpen, setCreatePostOpen } = useAppStore()
  const [selectedCommunity, setSelectedCommunity] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isCommunityOpen, setIsCommunityOpen] = useState(false)

  const handleClose = () => {
    setCreatePostOpen(false)
    // Reset form
    setTimeout(() => {
      setSelectedCommunity('')
      setTitle('')
      setContent('')
    }, 200)
  }

  const handlePost = () => {
    // Post creation logic placeholder
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="glass-strong rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 pb-4 border-b border-white/5">
                <h2 className="text-xl font-bold gradient-text">Create a Thread</h2>
                <motion.button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close"
                >
                  <X size={16} />
                </motion.button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {/* Community selector */}
                <div className="relative">
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1.5 uppercase tracking-wider">
                    Community
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCommunityOpen(!isCommunityOpen)}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                  >
                    <span className={selectedCommunity ? 'text-white' : 'text-[#94A3B8]'}>
                      {selectedCommunity || 'Select a community...'}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-[#94A3B8] transition-transform duration-200 ${isCommunityOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isCommunityOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 right-0 mt-1.5 glass-strong rounded-xl overflow-hidden z-10"
                      >
                        {COMMUNITIES.map((community) => (
                          <button
                            key={community.name}
                            type="button"
                            onClick={() => {
                              setSelectedCommunity(community.name)
                              setIsCommunityOpen(false)
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                          >
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold"
                              style={{
                                backgroundColor: `${community.color}20`,
                                border: `1px solid ${community.color}`,
                                color: community.color,
                              }}
                            >
                              {community.name.charAt(2)}
                            </div>
                            {community.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1.5 uppercase tracking-wider">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-[#94A3B8]/60 focus:border-[#7C4DFF]/40 focus:bg-white/[0.06] focus:outline-none transition-colors"
                    maxLength={300}
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1.5 uppercase tracking-wider">
                    Content
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your thoughts with the nebula..."
                    rows={5}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-[#94A3B8]/60 focus:border-[#7C4DFF]/40 focus:bg-white/[0.06] focus:outline-none transition-colors resize-none min-h-[120px]"
                  />
                </div>

                {/* Image upload area */}
                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1.5 uppercase tracking-wider">
                    Image (optional)
                  </label>
                  <div className="border-2 border-dashed border-white/[0.08] rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:border-[#7C4DFF]/30 hover:bg-white/[0.02] transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center">
                      <ImagePlus size={20} className="text-[#94A3B8]" />
                    </div>
                    <p className="text-xs text-[#94A3B8]">
                      Click to upload or drag & drop
                    </p>
                    <p className="text-[10px] text-[#94A3B8]/50">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-5 pt-2 border-t border-white/5">
                <motion.button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl text-sm text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handlePost}
                  disabled={!isFormValid}
                  className="px-5 py-2 rounded-xl text-sm font-medium text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: isFormValid
                      ? 'linear-gradient(135deg, #7C4DFF, #00E5FF)'
                      : 'rgba(255,255,255,0.05)',
                  }}
                  whileHover={isFormValid ? { scale: 1.03 } : {}}
                  whileTap={isFormValid ? { scale: 0.97 } : {}}
                >
                  Post Thread
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
