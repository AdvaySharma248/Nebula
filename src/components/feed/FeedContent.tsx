'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PostCard, type Post } from './PostCard'
import { CreatePostModal } from './CreatePostModal'
import { useAppStore } from '@/stores/app-store'
import { Plus } from 'lucide-react'

const FEED_TABS = [
  { id: 'foryou', label: 'For You' },
  { id: 'trending', label: 'Trending' },
  { id: 'latest', label: 'Latest' },
] as const

type FeedTabId = (typeof FEED_TABS)[number]['id']

const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    community: { name: 'r/qdev', avatar: 'Q', color: '#C7FF3F' },
    author: { name: 'qbit_wrangler', avatar: '' },
    title: 'IBM\'s new Heron processor actually feels different in person',
    content:
      'Got to run some circuits on the new Heron R2 at IBM Quantum yesterday. The gate fidelity improvement isn\'t just marketing — error rates on 2-qubit gates dropped by nearly 3x compared to Eagle. The real question is whether it scales past 133 qubits without the crosstalk issues they\'ve been hand-waving away.',
    votes: 1847,
    comments: 242,
    timestamp: '2h ago',
    userVote: null,
    isSaved: false,
  },
  {
    id: '2',
    community: { name: 'r/ml', avatar: 'M', color: '#C7FF3F' },
    author: { name: 'loss_curve', avatar: '' },
    title: 'We need to talk about how everyone is benchmarking wrong',
    content:
      'Saw yet another paper this morning claiming SOTA on MMLU while only reporting 5-shot and conveniently omitting the 0-shot numbers that are 15% lower. The benchmark gaming has gotten so bad that I don\'t even trust MMLU anymore. Can we just agree on a standardized eval protocol that includes contamination checks?',
    votes: 3421,
    comments: 587,
    timestamp: '3h ago',
    userVote: 'up',
    isSaved: true,
  },
  {
    id: '3',
    community: { name: 'r/cyber', avatar: 'C', color: '#C7FF3F' },
    author: { name: 'zero_day_collector', avatar: '' },
    title: 'New TPM bypass affects basically every enterprise laptop from the last 4 years',
    content:
      'CVE just dropped — affects Infineon TPM 2.0 implementations used in Lenovo, Dell, and HP enterprise lines. The vulnerability lets you extract attestation keys through a timing side-channel. Full writeup with PoC is already on GitHub. If you\'re relying on TPM-backed disk encryption, rotate your keys now.',
    votes: 5102,
    comments: 421,
    timestamp: '4h ago',
    userVote: null,
    isSaved: false,
  },
  {
    id: '4',
    community: { name: 'r/aifuture', avatar: 'A', color: '#C7FF3F' },
    author: { name: 'scaling_laws', avatar: '' },
    title: 'The "we ran out of data" problem might be overblown',
    content:
      'New paper from DeepMind shows that synthetic data from constitutional AI feedback loops can extend effective training data by 3-5x without model collapse, as long as you keep the human preference signal in the loop. The key insight: don\'t let the model grade its own work without supervision. Feels obvious in retrospect but the empirical results are solid.',
    votes: 2654,
    comments: 392,
    timestamp: '6h ago',
    userVote: 'up',
    isSaved: false,
  },
  {
    id: '5',
    community: { name: 'r/metaverse', avatar: 'V', color: '#C7FF3F' },
    author: { name: 'voxel_architect', avatar: '' },
    title: 'Apple Vision Pro spatial personas are actually useful for remote work',
    content:
      'I know, I know — another "metaverse is dead" take is the popular opinion. But after using spatial personas with my distributed team for 3 months, I\'m convinced the spatial awareness matters. Being able to walk up to a whiteboard while someone else is drawing, make eye contact, and point at things together — it hits different than Zoom. The hardware is still too expensive, but the interaction model works.',
    votes: 987,
    comments: 156,
    timestamp: '7h ago',
    userVote: null,
    isSaved: true,
  },
  {
    id: '6',
    community: { name: 'r/holo', avatar: 'H', color: '#C7FF3F' },
    author: { name: 'lightfield_joe', avatar: '' },
    title: 'Built a DIY light field display for under $500 — here\'s the build log',
    content:
      'Used a 4K LCD panel, microlens array from AliExpress, and a custom calibration pipeline with OpenCV. It\'s not Looking Glass quality, but the parallax effect is legit. The hardest part was the lens alignment — I ended up 3D printing a custom mounting jig. Full BOM, STL files, and calibration scripts in the repo.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop',
    votes: 4321,
    comments: 304,
    timestamp: '9h ago',
    userVote: 'up',
    isSaved: true,
  },
  {
    id: '7',
    community: { name: 'r/spacetech', avatar: 'S', color: '#C7FF3F' },
    author: { name: 'ludicrous_mode', avatar: '' },
    title: 'Relativity Space printed another Terran R tank section — this time in 40 days',
    content:
      'They just posted the timeline comparison: same tank section that took 90 days on the previous iteration is now down to 40 days. The new wire-arc additive manufacturing process is paying off. Still a long way from catching up with SpaceX\'s cadence, but the iteration speed is impressive. Question is whether they can hit the 2026 launch window.',
    votes: 2103,
    comments: 187,
    timestamp: '11h ago',
    userVote: null,
    isSaved: false,
  },
  {
    id: '8',
    community: { name: 'r/crypto', avatar: 'X', color: '#C7FF3F' },
    author: { name: 'mev_sandwich', avatar: '' },
    title: 'Succinct just shipped a zkVM that proves entire Rust programs in <2s',
    content:
      'The SP1 zkVM from Succinct now handles full Rust programs with verification times under 2 seconds on consumer hardware. I tested it with a simple Merkle proof verifier — the proof generation was ~8s on my M3 MacBook, and verification was 1.4s. This is the first time I\'ve seen zkVM performance that\'s actually usable for real applications, not just demos.',
    votes: 1567,
    comments: 232,
    timestamp: '13h ago',
    userVote: 'down',
    isSaved: false,
  },
  {
    id: '9',
    community: { name: 'r/qdev', avatar: 'Q', color: '#C7FF3F' },
    author: { name: 'pauli_x', avatar: '' },
    title: 'Open-sourced my Qiskit transpiler pass — 35% gate reduction on average',
    content:
      'After 8 months of iterating, releasing q-optimize: a peephole optimization pass for Qiskit that uses template matching + commutativity-aware gate cancellation. Benchmarks on QASM benchmarks show 30-40% gate reduction with no increase in circuit depth. It\'s not going to replace the IBM transpiler, but it\'s a nice drop-in addition. PRs welcome.',
    votes: 876,
    comments: 93,
    timestamp: '15h ago',
    userVote: null,
    isSaved: false,
  },
  {
    id: '10',
    community: { name: 'r/ml', avatar: 'M', color: '#C7FF3F' },
    author: { name: 'grad_descent', avatar: '' },
    title: 'LoRA fine-tuning on a single RTX 4090 is now actually practical for 70B models',
    content:
      'Using the new unsloth + bitsandbytes integration, I got a 70B model fine-tuned on 50K samples in 14 hours on a single 4090. The trick is the combined 4-bit quantization + paged optimizers + gradient checkpointing pipeline. Quality is surprisingly close to full fine-tune — perplexity delta of only 0.3 on my eval set.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=400&fit=crop',
    votes: 2421,
    comments: 198,
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

      {/* Sticky feed header */}
      <div
        className="sticky top-16 z-30"
        style={{
          background: '#0D0D0D',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between h-11">
            {/* Left: Feed title */}
            <h2 className="font-display font-semibold text-sm" style={{ color: '#F5F5F5' }}>
              Feed
            </h2>

            {/* Center: Tab buttons */}
            <div className="flex items-center gap-1">
              {FEED_TABS.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer"
                    style={{
                      color: isActive ? '#C7FF3F' : '#555555',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = '#888888'
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = '#555555'
                    }}
                  >
                    {tab.label}
                    {isActive && (
                      <motion.div
                        layoutId="feedTabIndicator"
                        className="absolute bottom-0 left-1 right-1"
                        style={{ height: '1px', background: '#C7FF3F' }}
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
            </div>

            {/* Right: Create thread button */}
            <motion.button
              onClick={() => setCreatePostOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium accent-bg cursor-pointer"
              whileHover={{ opacity: 0.9 }}
              whileTap={{ scale: 0.97 }}
            >
              <Plus size={13} />
              <span>Thread</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Feed body */}
      <div className="max-w-2xl mx-auto px-4 py-3 space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {SAMPLE_POSTS.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* End of feed */}
        <div className="flex flex-col items-center py-10 gap-2">
          <div className="editorial-line w-16" />
          <span className="text-tertiary text-xs">You&apos;re caught up</span>
        </div>
      </div>
    </div>
  )
}
