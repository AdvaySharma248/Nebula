import { create } from 'zustand'

export type ViewType = 'landing' | 'feed' | 'community' | 'profile' | 'messages' | 'saved' | 'explore' | 'settings' | 'comments' | 'post-detail'

interface AppState {
  currentView: ViewType
  sidebarExpanded: boolean
  selectedCommunity: string | null
  searchOpen: boolean
  createPostOpen: boolean
  selectedPost: string | null
  isMobile: boolean

  setView: (view: ViewType) => void
  setSidebarExpanded: (expanded: boolean) => void
  setSelectedCommunity: (community: string | null) => void
  setSearchOpen: (open: boolean) => void
  setCreatePostOpen: (open: boolean) => void
  setSelectedPost: (postId: string | null) => void
  setIsMobile: (mobile: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentView: 'landing',
  sidebarExpanded: false,
  selectedCommunity: null,
  searchOpen: false,
  createPostOpen: false,
  selectedPost: null,
  isMobile: false,

  setView: (view) => set({ currentView: view }),
  setSidebarExpanded: (expanded) => set({ sidebarExpanded: expanded }),
  setSelectedCommunity: (community) => set({ selectedCommunity: community, currentView: 'community' }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setCreatePostOpen: (open) => set({ createPostOpen: open }),
  setSelectedPost: (postId) => set({ selectedPost: postId }),
  setIsMobile: (mobile) => set({ isMobile: mobile }),
}))
