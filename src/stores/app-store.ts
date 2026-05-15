import { create } from 'zustand'

export type ViewType = 'landing' | 'feed' | 'community' | 'profile' | 'messages' | 'saved' | 'explore' | 'settings' | 'comments' | 'post-detail'

interface AppState {
  currentView: ViewType
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  selectedCommunity: string | null
  searchOpen: boolean
  notificationsOpen: boolean
  createPostOpen: boolean
  selectedPost: string | null
  isMobile: boolean
  cursorGlow: boolean

  setView: (view: ViewType) => void
  setSidebarOpen: (open: boolean) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setSelectedCommunity: (community: string | null) => void
  setSearchOpen: (open: boolean) => void
  setNotificationsOpen: (open: boolean) => void
  setCreatePostOpen: (open: boolean) => void
  setSelectedPost: (postId: string | null) => void
  setIsMobile: (mobile: boolean) => void
  setCursorGlow: (glow: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentView: 'landing',
  sidebarOpen: true,
  sidebarCollapsed: false,
  selectedCommunity: null,
  searchOpen: false,
  notificationsOpen: false,
  createPostOpen: false,
  selectedPost: null,
  isMobile: false,
  cursorGlow: true,

  setView: (view) => set({ currentView: view }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setSelectedCommunity: (community) => set({ selectedCommunity: community, currentView: 'community' }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setNotificationsOpen: (open) => set({ notificationsOpen: open }),
  setCreatePostOpen: (open) => set({ createPostOpen: open }),
  setSelectedPost: (postId) => set({ selectedPost: postId }),
  setIsMobile: (mobile) => set({ isMobile: mobile }),
  setCursorGlow: (glow) => set({ cursorGlow: glow }),
}))
