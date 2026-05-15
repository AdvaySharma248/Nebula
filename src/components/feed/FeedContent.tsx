'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PostCard, type Post } from './PostCard'
import { CreatePostModal } from './CreatePostModal'
import { useAppStore } from '@/stores/app-store'
import { Plus, Sparkles, TrendingUp, Clock } from 'lucide-react'

const FEED_TABS = [
  { id: 'foryou', label: 'For You', icon: Sparkles },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'latest', label: 'Latest', icon: Clock },
] as const

type FeedTabId = (typeof FEED_TABS)[number]['id']

const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    community: { name: 'r/QuantumDev', avatar: 'Q', color: '#7C4DFF' },
    author: { name: 'quantum_coder', avatar: '' },
    title: 'Breaking: Quantum Error Correction Achieves 99.9% Fidelity',
    content:
      'Just witnessed the new quantum error correction protocol from IBM achieve 99.9% fidelity in their latest benchmark. This changes everything for practical quantum computing. The surface code implementation they demonstrated could scale to thousands of logical qubits much sooner than expected. Full paper dropped on arXiv last night.',
    votes: 2847,
    comments: 342,
    timestamp: '2h ago',
    userVote: null,
    isSaved: false,
  },
  {
    id: '2',
    community: { name: 'r/NeuralArt', avatar: 'N', color: '#00E5FF' },
    author: { name: 'neural_dreamer', avatar: '' },
    title: 'Generated an entire gallery using diffusion models + neural style transfer',
    content:
      'Spent the last month fine-tuning a custom Stable Diffusion pipeline that combines multiple style transfer passes. The results are insane — each piece feels like it was painted by a different master artist, yet they all share a coherent visual language. Gallery link in comments. Would love feedback from the community!',
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=400&fit=crop',
    votes: 1923,
    comments: 187,
    timestamp: '4h ago',
    userVote: 'up',
    isSaved: true,
  },
  {
    id: '3',
    community: { name: 'r/CyberPunk', avatar: 'C', color: '#FF4DA6' },
    author: { name: 'neon_rider', avatar: '' },
    title: 'Built a fully functional cyberdeck from salvaged hardware — build log inside',
    content:
      'After 6 months of scavenging e-waste and 3D printing custom parts, my portable cyberdeck is complete. Specs: custom SBC running a hardened Linux distro, 7" OLED display, mechanical chocs, integrated SDR for wireless hacking, and a custom CLI interface that would make Case jealous. Full build log with schematics.',
    votes: 4102,
    comments: 521,
    timestamp: '5h ago',
    userVote: null,
    isSaved: false,
  },
  {
    id: '4',
    community: { name: 'r/AIFuture', avatar: 'A', color: '#00FFB2' },
    author: { name: 'agi_watcher', avatar: '' },
    title: 'New Architecture Combines Transformer Efficiency with Mamba Speed',
    content:
      'The Jamba-2 architecture just dropped and it\'s a game-changer. They\'ve managed to create a hybrid Mamba-Transformer that achieves GPT-4 level performance at a fraction of the compute cost. The key insight is using selective state spaces for long-range dependencies while keeping attention for precise local reasoning. Benchmarks are impressive.',
    votes: 5621,
    comments: 892,
    timestamp: '7h ago',
    userVote: 'up',
    isSaved: false,
  },
  {
    id: '5',
    community: { name: 'r/MetaVerse', avatar: 'M', color: '#7C4DFF' },
    author: { name: 'virtual_architect', avatar: '' },
    title: 'Photorealistic VR environments now rendering at 120fps on consumer hardware',
    content:
      'NVIDIA\'s new neural rendering pipeline combined with DLSS 4.0 is producing photorealistic VR environments that are indistinguishable from reality. Tested it with the new Meta Quest 4 and the immersion is unprecedented. The eye-tracking based foveated rendering makes it feel like you\'re actually there.',
    votes: 3154,
    comments: 267,
    timestamp: '8h ago',
    userVote: null,
    isSaved: true,
  },
  {
    id: '6',
    community: { name: 'r/HoloTech', avatar: 'H', color: '#00E5FF' },
    author: { name: 'holo_engineer', avatar: '' },
    title: 'First consumer holographic display prototype — it\'s real and it works',
    content:
      'Just got hands-on with Looking Glass\'s next-gen holographic display. True volumetric 3D without glasses, 45 viewing angles, and the color reproduction is surprisingly good. The SDK supports Unity and Three.js out of the box. This could finally make holographic displays mainstream. AMA in comments.',
    votes: 7832,
    comments: 1204,
    timestamp: '10h ago',
    userVote: 'up',
    isSaved: true,
  },
  {
    id: '7',
    community: { name: 'r/SpaceTech', avatar: 'S', color: '#FF4DA6' },
    author: { name: 'star_bound', avatar: '' },
    title: 'SpaceX Starship completes first orbital refueling — Mars missions now viable',
    content:
      'Historic day for space exploration. Starship just completed its first successful orbital propellant transfer, demonstrating the critical technology needed for deep space missions. This means the Mars architecture is now technically proven. NASA is already updating their mission timelines. The next decade in space is going to be incredible.',
    votes: 12403,
    comments: 2847,
    timestamp: '12h ago',
    userVote: null,
    isSaved: false,
  },
  {
    id: '8',
    community: { name: 'r/CryptoNexus', avatar: 'C', color: '#00FFB2' },
    author: { name: 'degen_scientist', avatar: '' },
    title: 'Zero-knowledge proofs now running at 10k TPS — DeFi scalability solved?',
    content:
      'The new zkVM from RISC Zero just benchmarked at 10,000 TPS for complex smart contract execution with full zero-knowledge verification. This means we can finally have DeFi protocols that are both private AND scalable. Gas costs dropped by 95% in testnet. The L2 landscape is about to change dramatically.',
    votes: 4567,
    comments: 632,
    timestamp: '14h ago',
    userVote: 'down',
    isSaved: false,
  },
  {
    id: '9',
    community: { name: 'r/QuantumDev', avatar: 'Q', color: '#7C4DFF' },
    author: { name: 'qbit_wizard', avatar: '' },
    title: 'Open-sourced my quantum circuit optimizer — 40% reduction in gate count',
    content:
      'After a year of research, I\'m releasing Q-Optimize, an open-source quantum circuit optimization tool that reduces gate count by an average of 40% through novel peephole optimization and template matching. Works with Qiskit, Cirq, and PennyLane. Already being used by three research groups with great results.',
    votes: 1876,
    comments: 143,
    timestamp: '16h ago',
    userVote: null,
    isSaved: false,
  },
  {
    id: '10',
    community: { name: 'r/NeuralArt', avatar: 'N', color: '#00E5FF' },
    author: { name: 'pixel_alchemist', avatar: '' },
    title: 'Real-time style transfer at 4K60 — the future of creative tools',
    content:
      'Just demoed a real-time neural style transfer system running at 4K 60fps using a custom TensorRT pipeline. You can point a camera at anything and it instantly restyles it in the aesthetic of any artist. The latency is under 5ms. This is going to revolutionize live streaming, video calls, and creative workflows.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=400&fit=crop',
    votes: 3421,
    comments: 298,
    timestamp: '18h ago',
    userVote: null,
    isSaved: false,
  },
]

export function FeedContent() {
  const { setCreatePostOpen } = useAppStore()
  const [activeTab, setActiveTab] = useState<FeedTabId>('foryou')

  return (
    <div className="min-h-screen">
      <CreatePostModal />

      {/* Feed header */}
      <div className="sticky top-16 z-30 border-b border-white/5" style={{ background: 'rgba(6,8,22,0.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div className="max-w-2xl mx-auto">
          {/* Tabs */}
          <div className="flex items-center gap-1 px-4 pt-3">
            {FEED_TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer"
                  style={{
                    color: isActive ? '#FFFFFF' : '#94A3B8',
                  }}
                >
                  <Icon size={15} />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="feedTabIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #7C4DFF, #00E5FF)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                </button>
              )
            })}

            {/* Create post button */}
            <motion.button
              onClick={() => setCreatePostOpen(true)}
              className="ml-auto flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-white cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #7C4DFF, #00E5FF)',
              }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(124,77,255,0.3)' }}
              whileTap={{ scale: 0.97 }}
            >
              <Plus size={16} />
              <span className="hidden sm:inline">New Thread</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Feed body */}
      <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {SAMPLE_POSTS.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* End of feed indicator */}
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3 text-[#94A3B8] text-sm">
            <div className="w-8 h-[1px] bg-white/10" />
            <span>You&apos;ve reached the edge of the nebula</span>
            <div className="w-8 h-[1px] bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  )
}
